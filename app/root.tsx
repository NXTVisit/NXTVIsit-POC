import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { ActionFunctionArgs, json } from "@remix-run/node";
import "./tailwind.css?inline";
import styles from "./tailwind.css?url";

// i18 imports
import { useChangeLanguage } from "remix-i18next/react";
import { useTranslation } from "react-i18next";
import i18next from "./localization/i18next.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
	const lang = params.lang as string | undefined;
	let locale = lang ?? await i18next.getLocale(request);
	return json({ locale });
}

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: styles },
];

export let handle = {
	// In the handle export, we can add a i18n key with namespaces our route
	// will need to load. This key can be a single string or an array of strings.
	// TIP: In most cases, you should set this to your defaultNS from your i18n config
	// or if you did not set one, set it to the i18next default namespace "translation"
	i18n: "common",
};


export function Layout({ children }: { children: React.ReactNode }) {
	let { locale } = useLoaderData<typeof loader>();
	let { i18n } = useTranslation();
	useChangeLanguage(locale);

	return (
		<html lang={locale} dir={i18n.dir()}>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}
