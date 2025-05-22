// May not work properly on Linux or MacOS

import fs from "fs";
import path from "path";
import open from "open";
import { exec } from "child_process";

const componentName = process.argv[2];

if (!componentName) {
  console.error("❌ Please provide the component name (e.g. MyComponent)");
  process.exit(1);
}

const componentPath = path.join("src/components", `${componentName}.astro`);
if (!fs.existsSync(componentPath)) {
  console.error(`❌ Component not found: ${componentPath}`);
  process.exit(1);
}

const previewDir = path.join("src/pages/preview");
const previewPage = path.join(previewDir, `index.astro`);
const relativeImportPath = path.relative(previewDir, componentPath).replace(/\\/g, "/");

if (!fs.existsSync(previewDir)) {
  fs.mkdirSync(previewDir, { recursive: true });
}

const content = `---
import ${componentName} from '${relativeImportPath}';
import "../../styles/global.css";
---

<html>
  <head><title>${componentName} Preview</title></head>
  <body style="padding: 2rem; background: black; color: white;">
    <${componentName} />
  </body>
</html>
`;

fs.writeFileSync(previewPage, content);
console.log(`✅ Preview created: ${previewPage}`);

const url = `http://localhost:4321/preview/`;

const devServer = exec("npx astro dev", { stdio: "inherit" });

devServer.stdout?.on("data", (data) => {
  if (data.includes("Local")) {
    console.log(`🌐 Opening browser at ${url}`);
    open(url);
  }
});

devServer.stderr?.on("data", (data) => {
  console.error(data);
});
