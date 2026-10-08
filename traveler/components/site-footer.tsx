import { useTranslations } from "next-intl";
import Link from "next/link";

/** Footer with grouped links and the trailing rights line. */
export function SiteFooter() {
  const t = useTranslations("SiteFooter");

  return (
    <footer className="mt-auto border-t border-[#CFDECF] bg-[#F5F6F1]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#16301F]">
            CommuTrip
          </p>
          <p className="mt-2 text-sm text-[#26291F]">{t("tagline")}</p>
        </div>

        <div className="flex flex-col gap-2 text-sm text-[#26291F]">
          <p className="font-medium text-[#16301F]">{t("discoverHeading")}</p>
          <Link href="/discover?type=trek">{t("treks")}</Link>
          <Link href="/discover?type=camp">{t("camps")}</Link>
          <Link href="/discover?type=tour">{t("tours")}</Link>
          <Link href="/discover?type=shared">{t("sharedTrips")}</Link>
        </div>

        <div className="flex flex-col gap-2 text-sm text-[#26291F]">
          <p className="font-medium text-[#16301F]">{t("platformHeading")}</p>
          <Link href="/providers">{t("forProviders")}</Link>
          <Link href="/drivers">{t("forDrivers")}</Link>
          <Link href="/about">{t("about")}</Link>
        </div>

        <div className="flex flex-col gap-2 text-sm text-[#26291F]">
          <p className="font-medium text-[#16301F]">{t("legalHeading")}</p>
          <Link href="/terms">{t("terms")}</Link>
          <Link href="/privacy">{t("privacy")}</Link>
        </div>
      </div>

      <p className="border-t border-[#CFDECF] px-6 py-4 text-xs text-[#7FA787]">
        © {new Date().getFullYear()} CommuTrip. {t("rights")}
      </p>
    </footer>
  );
}
