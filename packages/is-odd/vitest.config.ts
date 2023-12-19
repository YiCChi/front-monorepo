import { defineProject } from "vitest/config";
import { dirname } from "path";
import { fileURLToPath } from "url";

export default defineProject({
  test: {
    name: "is-odd",
    environment: "node",
    clearMocks: true,
    root: dirname(fileURLToPath(import.meta.url)),
  },
});
