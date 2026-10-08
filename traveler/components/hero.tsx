import { useTranslations } from "next-intl";
import { TopoLines } from "./topo-lines";
import { TripSearch } from "./trip-search";

/** Page hero: headline, subhead, and the overlapping trip-search module. */
export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative bg-[#16301F] pt-20 pb-28 text-[#F5F6F1] md:pt-28 md:pb-36">
      <div className="absolute inset-0 overflow-hidden">
        <TopoLines />
      </div>
      <div className="relative mx-auto max-w-6xl px-6">
        <h1 className="max-w-xl font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight md:text-5xl">
          {t("headline")}
        </h1>
        <p className="mt-4 max-w-md text-base text-[#CFDECF] md:text-lg">
          {t("subhead")}
        </p>
      </div>

      <div className="relative mx-auto -mb-32 mt-12 max-w-5xl px-6 md:-mb-40">
        <TripSearch />
      </div>
    </section>
  );
}
