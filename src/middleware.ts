import { defineMiddleware } from "astro:middleware";
import { getLangFromPath, useTranslations } from "./i18n/utils";

export const onRequest = defineMiddleware((context, next) => {
    const lang = getLangFromPath(context.url.pathname);
    context.locals.lang = lang;
    context.locals.t = useTranslations(lang);
    return next();
});