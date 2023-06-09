import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "./package.json";
const { version } = packageJson;

const [major, minor, patch, label = "0"] = version
  .replace(/[^\d.-]+/g, "")
  .split(/[.-]/);

export default defineManifest(async (env) => ({
  manifest_version: 3,
  name:
    env.mode === "staging"
      ? "[INTERNAL] UK Visa Sponsorship Checker"
      : "UK Visa Sponsorship Checker",
  version: `${major}.${minor}.${patch}.${label}`,
  version_name: version,
  action: {
    default_popup: "index.html",
  },
  content_scripts: [
    {
      js: ["src/content.tsx"],
      matches: ["*://*.indeed.com/*"],
    },
  ],
  background: {
    service_worker: "src/background.ts",
    type: "module",
  },
}));
