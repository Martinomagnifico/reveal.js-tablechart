import fs from "node:fs";
import { resolve } from "node:path";
import type { Connect, Plugin, ResolvedConfig } from "vite";

interface DynamicIndexOptions {
	/** Where the page sources are, relative to the project root. */
	views?: string;
	/** Stylesheet for the generated page, as a URL the dev server can serve. */
	stylesheet?: string;
	/** Stylesheet for the generated page, as a URL the preview server can serve. */
	previewStylesheet?: string;
}

/**
 * Serve the index page as a list of the decks, so a page added is linked without an
 * index page having to be written and kept up to date beside it.
 *
 * The dev server lists the .pug pages in `views`. The preview server lists the built
 * .html pages in the build folder. The build itself has no index of its own: each
 * demo is linked from the readme rather than from a page in the demo folder.
 */
export default function dynamicIndex(options: DynamicIndexOptions = {}): Plugin {
	const {
		views = "src/demo/views",
		stylesheet = "/src/demo/style/demo.scss",
		previewStylesheet = "/assets/css/demo.css",
	} = options;
	let root = process.cwd();
	let outDir = "dist";

	// The pages in a folder: files with the extension that are not partials. A leading
	// underscore marks a partial.
	const pagesIn = (dir: string, ext: string): string[] => {
		try {
			return fs
				.readdirSync(dir)
				.filter((file) => file.endsWith(ext) && !file.startsWith("_"))
				.map((file) => file.slice(0, -ext.length))
				.sort();
		} catch {
			return [];
		}
	};

	// The pages at the top, then a group for each folder that has pages, such as
	// `charts`. Folders without pages are left out.
	const indexPage = (dir: string, ext: string, css: string): string => {
		const linksTo = (pages: string[], folder = "") =>
			pages
				.map((name) => `<li><a href="/${folder}${name}.html">${name}</a></li>`)
				.join("\n\t\t\t");
		let folders: string[] = [];
		try {
			folders = fs
				.readdirSync(dir, { withFileTypes: true })
				.filter((entry) => entry.isDirectory())
				.map((entry) => entry.name)
				.sort();
		} catch {
			// No pages folder is not worth failing the request over.
		}
		const groups = folders
			.map((folder) => ({ folder, pages: pagesIn(resolve(dir, folder), ext) }))
			.filter(({ pages }) => pages.length)
			.map(
				({ folder, pages }) =>
					`<li>${folder}\n\t\t\t<ul>\n\t\t\t${linksTo(pages, `${folder}/`)}\n\t\t\t</ul></li>`
			)
			.join("\n\t\t\t");
		const links = [linksTo(pagesIn(dir, ext)), groups].filter(Boolean).join("\n\t\t\t");

		return `<!DOCTYPE html>
<html lang="en" class="index">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Pages</title>
	<link rel="stylesheet" href="${css}">
</head>
<body>
	<ul class="fileindex">
			${links}
	</ul>
</body>
</html>
`;
	};

	const serveIndex =
		(page: () => string): Connect.NextHandleFunction =>
		(req, res, next) => {
			const url = (req.url ?? "").split("?")[0];
			if (url !== "/" && url !== "/index.html") return next();
			res.setHeader("Content-Type", "text/html");
			res.end(page());
		};

	return {
		name: "vite-plugin-dynamic-index",

		configResolved(config: ResolvedConfig) {
			root = config.root;
			outDir = resolve(root, config.build.outDir);
		},

		configureServer(server) {
			server.middlewares.use(serveIndex(() => indexPage(resolve(root, views), ".pug", stylesheet)));
		},

		configurePreviewServer(server) {
			server.middlewares.use(serveIndex(() => indexPage(outDir, ".html", previewStylesheet)));
		},
	};
}
