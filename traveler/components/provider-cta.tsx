import { Button } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

/** Band inviting tour providers / mass-event organizers to sign up. */
export function ProviderCta() {
  const t = useTranslations("ProviderCta");

  return (
    <section className="bg-[#16301F] py-14 text-[#F5F6F1]">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center">
        <div className="max-w-lg">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold">
            {t("title")}
          </h2>
          <p className="mt-2 text-sm text-[#CFDECF]">{t("body")}</p>
        </div>
        <Button bg="#D8531C" color="white" _hover={{ bg: "#B24417" }} size="lg" flexShrink={0}>
          {t("action")}
        </Button>
      </div>
    </section>
  );
}
