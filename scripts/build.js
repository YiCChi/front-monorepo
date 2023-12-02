import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const packageJsonPath = "/F:/repos/front-monorepo/package.json";

function clean() {
  rimrafSync(process.cwd() + "/dist");
}

function compile() {
  execSync("pnpm exec rollup -c");
}

function readPkgJson(leadingPath) {
  try {
    const packageJsonData = fs.readFileSync(
      leadingPath + "/package.json",
      "utf-8"
    );
    return JSON.parse(packageJsonData);
  } catch (error) {
    console.error("Error reading package.json:", error);
  }
}

function readRootPkgJson() {
  readPkgJson(process.cwd());
}

function readProjectPkgJson(project) {
  readPkgJson(process.cwd() + "/packages/" + project);
}

function readDeps() {
  const depsJsonData = fs.readFileSync(process.cwd() + "/deps.json", "utf-8");

  const deps = JSON.parse(depsJsonData);
}

function writeDeps() {
  const deps = readDeps();

  fs.writeFileSync(process.cwd() + "/deps.json", JSON.stringify(deps));
}

const root = path.resolve(fileURLToPath(new URL(".", import.meta.url)), "..");

execSync(
  `pnpm exec rollup -c --configProject=${path.relative(
    root + '/packages',
    process.cwd()
  )}`,
  { cwd: root }
);
