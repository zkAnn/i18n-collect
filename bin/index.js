#!/usr/bin/env node

import commander from "commander";
import collect from "../lib/collect/index.js";
import write from "../lib/write/index.js"
const version = "1.0.0";

commander
  .version(version, "-v, --version")
  .command("create")
  .description("搜索文件，生成相应的语言包")
  .action(() => {
    collect()
  })
commander.command("write")
  .description("写入语言包")
  .action(() => {
    write();
  })
commander.parse(process.argv);
