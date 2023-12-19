import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      all: true,
      clean: true,
      enabled: true,
      provider: "v8",
      include: ["packages/**/src/**/*.ts"],
    },
    poolOptions: {
      threads: {
        minThreads: 4,
        maxThreads: 8,
        singleThread: true,
      },
    },
  },
});
