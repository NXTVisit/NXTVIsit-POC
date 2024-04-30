import type { MetaFunction } from "@remix-run/node";
import { useTranslation } from "react-i18next";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Index() {
	const { t, i18n } = useTranslation();
	return (
		<div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
			<h1>{t("Hi")} Bitch ❤️</h1>
			<button className="btn" onClick={() => i18n.changeLanguage("en")}>English</button>
			<button onClick={() => i18n.changeLanguage("jpn")}>Japanese</button>
		</div>
	);
}