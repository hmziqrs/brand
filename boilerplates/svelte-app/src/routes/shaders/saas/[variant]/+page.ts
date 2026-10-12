import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

const variants = ["analytics", "team-planning", "developer-api"] as const;

export const load: PageLoad = ({ params }) => {
	const variant = variants.find(value => value === params.variant);
	if (!variant) error(404, "Shader SaaS example not found.");
	return { variant };
};
