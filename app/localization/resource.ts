import english from "../../resources/locales/en/common.json";
import japanese from "../../resources/locales/jpn/common.json";

export const supportedLanguages = ["en", "jpn"];
export type Language = typeof supportedLanguages[number];

export type Resource = {
	common: typeof english;
}

export const resources: Record<Language, Resource> = {
	en: {
		common: english,
	},
	jpn: {
		common: japanese
	}
}