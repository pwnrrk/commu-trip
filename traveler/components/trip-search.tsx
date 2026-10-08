"use client";

import { Button, Input, Tabs } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { LuCalendarDays, LuMapPin, LuSearch, LuUsers } from "react-icons/lu";

/** Client-side search module: trip-type tabs over destination/dates/group fields. */
export function TripSearch() {
  const t = useTranslations("TripSearch");

  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_20px_50px_-20px_rgba(22,48,31,0.45)] md:p-8">
      <Tabs.Root defaultValue="trek" variant="line" colorPalette="green">
        <Tabs.List>
          <Tabs.Trigger value="trek">{t("tabTrek")}</Tabs.Trigger>
          <Tabs.Trigger value="camp">{t("tabCamp")}</Tabs.Trigger>
          <Tabs.Trigger value="tour">{t("tabTour")}</Tabs.Trigger>
          <Tabs.Trigger value="shared">{t("tabShared")}</Tabs.Trigger>
          <Tabs.Indicator />
        </Tabs.List>
      </Tabs.Root>

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-[2fr_1.4fr_1fr_auto] md:items-stretch">
        <label className="flex flex-col gap-1.5 rounded-lg border border-[#CFDECF] px-3 py-2 text-sm text-[#26291F] focus-within:border-[#2F5A3D]">
          <span className="flex items-center gap-1.5">
            <LuMapPin className="text-[#2F5A3D]" /> {t("destinationLabel")}
          </span>
          <Input
            placeholder={t("destinationPlaceholder")}
            variant="flushed"
            border="none"
            px="0"
            _focus={{ boxShadow: "none" }}
            size="sm"
          />
        </label>

        <label className="flex flex-col gap-1.5 rounded-lg border border-[#CFDECF] px-3 py-2 text-sm text-[#26291F] focus-within:border-[#2F5A3D]">
          <span className="flex items-center gap-1.5">
            <LuCalendarDays className="text-[#2F5A3D]" /> {t("datesLabel")}
          </span>
          <Input
            placeholder={t("datesPlaceholder")}
            variant="flushed"
            border="none"
            px="0"
            _focus={{ boxShadow: "none" }}
            size="sm"
          />
        </label>

        <label className="flex flex-col gap-1.5 rounded-lg border border-[#CFDECF] px-3 py-2 text-sm text-[#26291F] focus-within:border-[#2F5A3D]">
          <span className="flex items-center gap-1.5">
            <LuUsers className="text-[#2F5A3D]" /> {t("groupLabel")}
          </span>
          <Input
            placeholder={t("groupPlaceholder")}
            variant="flushed"
            border="none"
            px="0"
            _focus={{ boxShadow: "none" }}
            size="sm"
          />
        </label>

        <Button
          bg="#D8531C"
          color="white"
          _hover={{ bg: "#B24417" }}
          height="full"
          px="6"
        >
          <LuSearch /> {t("submit")}
        </Button>
      </div>
    </div>
  );
}
