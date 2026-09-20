import { FeaturedTrips } from "@/components/featured-trips";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { ProviderCta } from "@/components/provider-cta";
import { RegionScroll } from "@/components/region-scroll";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StatsStrip } from "@/components/stats-strip";

export default function TravelerHomePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <div className="mx-auto max-w-6xl px-6 pt-40 md:pt-48">
          <StatsStrip />
        </div>
        <RegionScroll />
        <FeaturedTrips />
        <HowItWorks />
        <ProviderCta />
      </main>
      <SiteFooter />
    </>
  );
}
