<script lang="ts">
	import SiteFooter from '$brand/components/site-footer.svelte';

	const columns = [
		{ title: 'Product', links: [{ label: 'Install', href: '#/p/specimens/footer' }, { label: 'Providers', href: '#/p/specimens/footer' }, { label: 'Changelog', href: '#/p/specimens/footer' }] },
		{ title: 'Guides', links: [{ label: 'Switching', href: '#/p/specimens/footer' }, { label: 'Your own gateway', href: '#/p/specimens/footer' }, { label: 'Troubleshooting', href: '#/p/specimens/footer' }] },
		{ title: 'Project', links: [{ label: 'Source', href: '#/p/specimens/footer' }, { label: 'MIT licence', href: '#/p/specimens/footer' }, { label: 'Security', href: '#/p/specimens/footer' }] }
	];
</script>

<SiteFooter site="claude-multi" tagline="Claude Code on any provider you already pay for." {columns} github="https://github.com/hmziqrs" class="border-t-0" />
