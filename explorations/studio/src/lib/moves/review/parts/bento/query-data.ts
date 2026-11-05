export type QueryState = 'fresh' | 'fetching' | 'stale' | 'inactive' | 'error';

export type InspectorQuery = {
	key: string;
	output: string;
	observers: number;
	age: number;
	stale: number;
	state: QueryState;
	fetchLeft?: number;
	data: string;
};

export const stateTone: Record<QueryState, string> = {
	fresh: 'bg-green/15 text-green',
	fetching: 'bg-primary text-primary-foreground',
	stale: 'bg-yellow/15 text-yellow',
	inactive: 'bg-foreground/8 text-muted-foreground',
	error: 'bg-red/15 text-red'
};

export const stateDot: Record<QueryState, string> = {
	fresh: 'bg-green',
	fetching: 'bg-primary',
	stale: 'bg-yellow',
	inactive: 'bg-foreground/25',
	error: 'bg-red'
};

export const inspectorSeed: InspectorQuery[] = [
	{
		key: 'Pulls { repo: "forge/engine", state: Open }',
		output: 'Vec<PullRequest>',
		observers: 3,
		age: 4,
		stale: 30,
		state: 'fresh',
		data: '[\n  { id: 4127, title: "Batch glyph atlas uploads", checks: Passed },\n  { id: 4126, title: "Fix scroll anchoring", checks: Running },\n  …4 more\n]'
	},
	{
		key: 'Pull { id: 4127 }',
		output: 'PullRequest',
		observers: 2,
		age: 0,
		stale: 15,
		state: 'fetching',
		fetchLeft: 2,
		data: '{\n  id: 4127,\n  title: "Batch glyph atlas uploads per frame",\n  author: "mara",\n  approvals: 2,\n  mergeable: true\n}'
	},
	{
		key: 'Checks { sha: "9f3c2e1" }',
		output: 'Vec<CheckRun>',
		observers: 1,
		age: 41,
		stale: 20,
		state: 'stale',
		data: '[\n  { name: "test (macos)", status: Passed },\n  { name: "clippy", status: Passed },\n  { name: "test (linux)", status: Running }\n]'
	},
	{
		key: 'Viewer',
		output: 'User',
		observers: 4,
		age: 12,
		stale: 300,
		state: 'fresh',
		data: '{\n  login: "ines",\n  teams: ["renderer", "text"],\n  unread: 3\n}'
	},
	{
		key: 'Reviews { pull: 4121 }',
		output: 'Vec<Review>',
		observers: 1,
		age: 18,
		stale: 15,
		state: 'stale',
		data: '[\n  { by: "tobi", verdict: Approved },\n  { by: "sol", verdict: Commented }\n]'
	},
	{
		key: 'Labels { repo: "forge/engine" }',
		output: 'Vec<Label>',
		observers: 0,
		age: 210,
		stale: 600,
		state: 'inactive',
		data: '["renderer", "text", "perf", "a11y", "keymap"]'
	}
];

export type Pull = { id: number; title: string; author: string; checks: 'pass' | 'run' | 'fail'; updated: string };

export const pulls: Pull[] = [
	{ id: 4127, title: 'Batch glyph atlas uploads per frame', author: 'mara', checks: 'pass', updated: '2m' },
	{ id: 4126, title: 'Fix scroll anchoring when rows resize', author: 'dk', checks: 'run', updated: '6m' },
	{ id: 4124, title: 'Add Window::on_appearance_change', author: 'ines', checks: 'pass', updated: '18m' },
	{ id: 4121, title: 'Move text shaping off the main thread', author: 'tobi', checks: 'fail', updated: '41m' },
	{ id: 4119, title: 'Keymap: respect cmd-k chords in modals', author: 'sol', checks: 'pass', updated: '1h' },
	{ id: 4118, title: 'Reduce allocations in div() styling', author: 'arun', checks: 'pass', updated: '2h' }
];

export const install = 'cargo add gpui-query';

export const queryCode = `use gpui_query::prelude::*;

#[derive(QueryKey, Clone, Hash, PartialEq, Eq)]
pub struct Pulls {
    pub repo: RepoId,
    pub state: PrState,
}

impl Query for Pulls {
    type Output = Vec<PullRequest>;
    type Error = ApiError;

    async fn fetch(&self, cx: &FetchCx) -> Result<Self::Output, Self::Error> {
        cx.http().get(format!("/repos/{}/pulls", self.repo)).json().await
    }
}`;

export const viewCode = `impl Render for Inbox {
    fn render(&mut self, _: &mut Window, cx: &mut Context<Self>) -> impl IntoElement {
        let pulls = cx
            .use_query(Pulls { repo: self.repo, state: PrState::Open })
            .stale_time(Duration::from_secs(30))
            .refetch_on_focus(true);

        match pulls.status() {
            Status::Loading => skeleton_rows(6).into_any_element(),
            Status::Error(err) => error_row(err).into_any_element(),
            Status::Ready(list) => v_flex().children(list.iter().map(pull_row)).into_any_element(),
        }
    }
}`;

export const mutationCode = `let approve = cx
    .use_mutation(Approve { pull: 4121 })
    .on_mutate(|cache, _| {
        let snapshot = cache.get(&Pull { id: 4121 });
        cache.update(&Pull { id: 4121 }, |p| p.approvals += 1);
        snapshot
    })
    .on_error(|cache, _err, snapshot| cache.set(&Pull { id: 4121 }, snapshot))
    .on_settled(|cache| cache.invalidate(&Pulls::open(repo)));`;

export const devtoolsCode = `fn main() {
    Application::new().run(|cx: &mut App| {
        let client = QueryClient::new(cx);

        #[cfg(debug_assertions)]
        QueryDevtools::install(&client, cx, "cmd-shift-q");

        cx.open_window(WindowOptions::default(), |_, cx| cx.new(Inbox::new));
    });
}`;

export const keyCode = `#[derive(QueryKey, Clone, Hash, PartialEq, Eq)]
pub enum RepoKey {
    Pulls { repo: RepoId, state: PrState },
    Pull { id: u64 },
    Checks { sha: Sha },
}

cache.invalidate(&RepoKey::Pulls { repo, state: PrState::Open });
cache.invalidate_where(|k: &RepoKey| matches!(k, RepoKey::Pull { .. }));`;

export const cargoCode = `[dependencies]
gpui = "0.2"
gpui-query = { version = "0.4", features = ["devtools"] }`;

export const refetchCode = `cx.use_query(Pulls::open(repo))
    .stale_time(Duration::from_secs(30))
    .refetch_on_focus(true)
    .refetch_on_reconnect(true)
    .refetch_interval(Duration::from_secs(60));`;
