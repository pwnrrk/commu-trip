import { Button } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import Link from "next/link";

/** Sticky top navigation shown on every traveler page. */
export function SiteHeader() {
  const t = useTranslations("SiteHeader");

  return (
    <header className="sticky top-0 z-20 border-b border-[#CFDECF] bg-[#F5F6F1]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#16301F]"
        >
          CommuTrip
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-[#26291F] md:flex">
          <Link href="/discover" className="hover:text-[#16301F]">
            {t("discover")}
          </Link>
          <Link href="/providers" className="hover:text-[#16301F]">
            {t("providers")}
          </Link>
          <Link href="/drivers" className="hover:text-[#16301F]">
            {t("driverHubs")}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" color="#16301F">
            {t("signIn")}
          </Button>
          <Button
            size="sm"
            bg="#D8531C"
            color="white"
            _hover={{ bg: "#B24417" }}
          >
            {t("startTrip")}
          </Button>
        </div>
      </div>
    </header>
  );
}
