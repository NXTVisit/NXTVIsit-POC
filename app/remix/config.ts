import { glob } from 'glob';
import path from 'path';

import { ensureRootRouteExists, getRouteIds, getRouteManifest } from 'remix-custom-routes';

export const routes = async () =>{
	const appDirectory = path.join(process.cwd(), 'app');
	ensureRootRouteExists(appDirectory);
	const files = glob.sync("routes/*.{js,jsx,ts,tsx,md,mdx}", {
		cwd: appDirectory,
	})

	const routerIds = getRouteIds(files, {
		indexNames: ["index", "route", "_index", "_route"]
	}).map(([id, filepath]) => [`($lang).${id}`, filepath]) as [string, string][];

	return getRouteManifest(routerIds);
}