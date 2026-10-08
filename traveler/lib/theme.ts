import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        pine: {
          50: { value: "#EEF3EE" },
          100: { value: "#CFDECF" },
          300: { value: "#7FA787" },
          600: { value: "#2F5A3D" },
          700: { value: "#234630" },
          900: { value: "#16301F" },
        },
        fog: {
          50: { value: "#F5F6F1" },
          100: { value: "#EEF0EA" },
        },
        ember: {
          400: { value: "#E3703A" },
          500: { value: "#D8531C" },
          600: { value: "#B24417" },
        },
        marker: {
          400: { value: "#E8A63D" },
        },
        ink: {
          800: { value: "#26291F" },
          900: { value: "#1C1F1B" },
        },
      },
      fonts: {
        heading: { value: "var(--font-display), sans-serif" },
        body: { value: "var(--font-body), sans-serif" },
      },
    },
    semanticTokens: {
      colors: {
        "bg.canvas": { value: { _light: "{colors.fog.50}" } },
        "bg.panel": { value: { _light: "white" } },
        "fg.default": { value: { _light: "{colors.ink.900}" } },
        "fg.muted": { value: { _light: "{colors.ink.800}" } },
        "accent.solid": { value: { _light: "{colors.pine.600}" } },
        "accent.emphasized": { value: { _light: "{colors.pine.700}" } },
        "cta.solid": { value: { _light: "{colors.ember.500}" } },
        "cta.emphasized": { value: { _light: "{colors.ember.600}" } },
      },
    },
  },
});

/**
 * The app-wide Chakra system: trail/topographic palette (pine, fog, ember,
 * marker) layered on Chakra's default token set via `defineConfig`.
 */
export const system = createSystem(defaultConfig, config);
