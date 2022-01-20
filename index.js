#!/usr/bin/env node

import commander from "commander";

import createFont from "./src/create-font/index.js";
import writeFont from "./src/write-font/index.js"
const version = "1.0.0";

commander
  .version(version, "-v, --version")
  .command("create <language>")
  .description("搜索vue和js文件，生成相应的语言包")
  .action(async (language) => {
    if (language === "font") {
      await createFont();
    }else{
      console.log("Do you mean  cl create font")
    }
  })
commander.command("write <language>")
  .description("写入语言包")
  .action(async (language) => {
    if (language === "en") {
      await writeFont();
    }else{
      console.log("Do you mean  cl write en")
    }
  })
commander.parse(process.argv);
