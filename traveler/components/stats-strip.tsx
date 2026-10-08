import { useTranslations } from "next-intl";

/** Compact trust strip: trip, province, and traveler counts. */
export function StatsStrip() {
  const t = useTranslations("StatsStrip");

  const stats = [
    { label: t("tripsHosted"), value: t("tripsHostedValue") },
    { label: t("provincesCovered"), value: t("provincesCoveredValue") },
    { label: t("travelersMatched"), value: t("travelersMatchedValue") },
  ];

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 border-b border-[#CFDECF] pb-12 text-center sm:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label}>
          <p className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[#16301F]">
            {stat.value}
          </p>
          <p className="mt-1 text-sm text-[#26291F]">{stat.label}</p>
        </div>
      ))}
      <p className="col-span-full text-xs text-[#7FA787]">{t("sampleNote")}</p>
    </div>
  );
}
