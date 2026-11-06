const storybook = "https://brand.hmziq.rs/storybook/";
const source = "https://github.com/hmziqrs/brand";

export const links = {
  pieces: storybook,
  rules: `${source}/blob/master/BRAND.md`,
  agentRules: `${source}/blob/master/AGENTS.md`,
  github: source,
  story: (id: string) => `${storybook}?path=/story/${id}`,
};
