import { readListParams } from '@hmziq/brand-core/app/list-params';

/** The members list is URL state all the way (app-blocks.md, phase 4): the
 * page reads it here, and writes every link back with listHref. */
export function load({ url }) {
	return {
		list: readListParams(url.search, ['role', 'status'])
	};
}
