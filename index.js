#!/usr/bin/env node

import commander from "commander";

import createFont from "./src/create-font/index.js";

const version = "1.0.0";

commander
  .version(version, "-v, --version")
  .command("create <language>")
  .description("搜索当前目录下的vue和js文件，生成相应的语言包")
  .action(async (language) => {
    if (language === "font") {
      await createFont();
    }else{
      console.log("Do you mean  cl create font")
    }
  })
commander.parse(process.argv);
