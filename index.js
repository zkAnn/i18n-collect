#!/usr/bin/env node

import commander from "commander";

import createZh from "./src/create-zh/index.js";
import createOther from "./src/create-other/index.js";
const version = "1.0.0";

commander
  .version(version, "-v, --version")
  .command("create <language>")
  .description("搜索当前目录下的vue和js文件，生成相应的语言包")
  .action(async (language) => {
    if (language === "zh") {
      await createZh();
    } else {
      await createOther();
    }
  });
commander.parse(process.argv);
