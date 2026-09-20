import { useTranslations } from "next-intl";
import Link from "next/link";
import { regions } from "@/data/trips";

/** Horizontal-scroll shelf of regions, each showing its open-trip count. */
export function RegionScroll() {
  const t = useTranslations("RegionScroll");

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#16301F]">
        {t("title")}
      </h2>
      <p className="mt-2 max-w-md text-sm text-[#26291F]">{t("description")}</p>

      <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
        {regions.map((region) => (
          <Link
            key={region.id}
            href={`/discover?region=${region.id}`}
            className="min-w-[220px] shrink-0 rounded-xl border border-[#CFDECF] bg-white p-5 transition-colors hover:border-[#2F5A3D]"
          >
            <p className="font-medium text-[#16301F]">{region.name}</p>
            <p className="mt-1 text-sm text-[#7FA787]">{region.tripCount} open trips</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
