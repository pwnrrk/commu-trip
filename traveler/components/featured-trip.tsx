import { Button } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { featuredTrips } from "@/data/trips";

/** Grid of open trip listings pulled from the featured-trips dataset. */
export function FeaturedTrips() {
  const t = useTranslations("FeaturedTrips");

  return (
    <section className="bg-[#F5F6F1] py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#16301F]">
          {t("title")}
        </h2>
        <p className="mt-2 max-w-md text-sm text-[#26291F]">
          {t("description")}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTrips.map((trip) => (
            <article
              key={trip.id}
              className="flex flex-col rounded-xl border border-[#CFDECF] bg-white p-5"
            >
              <span className="w-fit rounded-full bg-[#EEF3EE] px-2.5 py-1 text-xs font-medium text-[#2F5A3D]">
                {trip.type}
              </span>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg font-semibold text-[#16301F]">
                {trip.title}
              </h3>
              <p className="mt-1 text-sm text-[#7FA787]">
                {trip.region} · {trip.durationDays} days
              </p>

              <div className="mt-4 flex items-end justify-between">
                <p className="text-sm text-[#26291F]">
                  {t("pricePrefix")}{" "}
                  <span className="text-lg font-semibold text-[#16301F]">
                    ฿{trip.pricePerPerson.toLocaleString()}
                  </span>{" "}
                  {t("perPerson")}
                </p>
                <p className="text-xs text-[#D8531C]">
                  {t("spotsLeft", { count: trip.spotsLeft })}
                </p>
              </div>

              <Button
                mt="4"
                variant="outline"
                borderColor="#2F5A3D"
                color="#16301F"
              >
                {t("viewTrip")}
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
