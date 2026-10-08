import { getRequestConfig } from "next-intl/server";

/**
 * Request-scoped i18n configuration for Server Components. The app ships
 * with a single locale for now; swap the static value for a cookie/header
 * lookup if locale switching is added later.
 */
export default getRequestConfig(async () => {
  const locale = "en";

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
