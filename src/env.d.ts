import type { Lang, useTranslations } from "./i18n/utils";

declare global {
    namespace App {
        interface Locals {
            lang: Lang;
            t: ReturnType<typeof useTranslations>;
        }
    }
}