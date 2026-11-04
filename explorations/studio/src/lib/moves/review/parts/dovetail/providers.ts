import { siAnthropic, siDeepseek, siKimi, siMinimax, siOllama, siQwen, siXiaomi } from 'simple-icons';

export type Provider = {
	id: string;
	name: string;
	chip: string;
	icon?: { path: string };
	letter?: string;
	opus: string;
	fast: string;
	endpoint: string;
	pay: string;
};

export const providers: Provider[] = [
	{ id: 'work', name: 'Anthropic', chip: 'Anthropic', icon: siAnthropic, opus: 'opus-4.7', fast: 'haiku-4.5', endpoint: 'api.anthropic.com', pay: 'Your Anthropic plan' },
	{ id: 'glm', name: 'GLM Coding Plan', chip: 'GLM', letter: 'Z', opus: 'glm-5.3[1m]', fast: 'glm-5-turbo', endpoint: 'api.z.ai', pay: 'Coding Plan via z.ai' },
	{ id: 'kimi', name: 'Moonshot Kimi', chip: 'Kimi', icon: siKimi, opus: 'kimi-k2.7-code', fast: 'kimi-k2.5', endpoint: 'api.moonshot.ai', pay: 'Per token via moonshot.ai' },
	{ id: 'ds', name: 'DeepSeek', chip: 'DeepSeek', icon: siDeepseek, opus: 'deepseek-v4-pro[1m]', fast: 'deepseek-v4-flash', endpoint: 'api.deepseek.com', pay: 'Per token via deepseek.com' },
	{ id: 'qwen', name: 'Alibaba Qwen', chip: 'Qwen', icon: siQwen, opus: 'qwen3-coder-next', fast: 'qwen3-coder-flash', endpoint: 'dashscope-intl.aliyuncs.com', pay: 'Per token via DashScope' },
	{ id: 'mm', name: 'MiniMax', chip: 'MiniMax', icon: siMinimax, opus: 'MiniMax-M3', fast: 'MiniMax-M3', endpoint: 'api.minimax.io', pay: 'Per token via minimax.io' },
	{ id: 'mimo', name: 'Xiaomi MiMo', chip: 'MiMo', icon: siXiaomi, opus: 'mimo-v2.5-pro', fast: 'mimo-v2.5', endpoint: 'api.xiaomimimo.com', pay: 'Per token or Token Plan' },
	{ id: 'local', name: 'Local endpoint', chip: 'Local', icon: siOllama, opus: 'your-model', fast: 'your-model', endpoint: 'localhost:11434', pay: 'Your own hardware' }
];
