import { useTranslations } from "next-intl";

/** Genuinely sequential 3-step explainer, numbered because the steps have an order. */
export function HowItWorks() {
  const t = useTranslations("HowItWorks");

  const steps = [
    { title: t("step1Title"), body: t("step1Body") },
    { title: t("step2Title"), body: t("step2Body") },
    { title: t("step3Title"), body: t("step3Body") },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[#16301F]">
        {t("title")}
      </h2>

      <ol className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title} className="border-t-2 border-[#2F5A3D] pt-4">
            <p className="text-sm text-[#7FA787]">{index + 1}</p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold text-[#16301F]">
              {step.title}
            </p>
            <p className="mt-2 text-sm text-[#26291F]">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
