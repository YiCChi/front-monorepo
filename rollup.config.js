import { glob } from "glob";
import { defineConfig } from "rollup";
import path from "path";
import { fileURLToPath } from "url";
import terser from "@rollup/plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
// import pkg from "./package.json" assert { type: "json" };
import typescript from "@rollup/plugin-typescript";
import { readFileSync, readSync } from "fs";

const pkg = JSON.parse(readFileSync(path.resolve(process.cwd(), 'package.json'), "utf-8"));
/**
 * @param {Record<string, string>} args
 * @returns {Array<import('rollup').RollupOptions>}
 */
function asyncConfig(args) {
  const { configProject: project } = args;

  // console.log(args);
  if (!project) {
    throw new Error("Missing project");
  }

  return defineConfig({
    input: Object.fromEntries(
      glob
        .sync(`./packages/${project}/src/**/*.ts{,x}`)
        .filter((path) => !/.+test.+/.test(path))
        .map((file) => [
          path.relative(
            `./packages/${project}/src`,
            file.slice(0, file.length - path.extname(file).length)
          ),
          fileURLToPath(new URL(file, import.meta.url)),
        ])
    ),
    output: {
      dir: path.resolve(`./packages/${project}/dist`),
      format: "esm",
      preserveModules: true,
      entryFileNames: "[name].mjs",
      sourcemap: true,
    },
    plugins: [
      typescript({
        tsconfig: path.resolve(`./packages/${project}/tsconfig.json`),
        // compilerOptions: {
        //   declaration: true,
        //   declarationDir: path.resolve(`./packages/${project}/dist`),
        // },
      }),
      terser(),
      commonjs({ esmExternals: true }),
    ],
    external: [
      ...Object.keys(pkg.dependencies),
      "react/jsx-runtime",
      // ...Object.keys(pkg.peerDependencies),
    ],
    treeshake: {
      preset: "smallest",
    },
  });
}

export default asyncConfig;
