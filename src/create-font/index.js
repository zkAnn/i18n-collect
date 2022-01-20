import fs from "fs";
import chalk from "chalk";
import ora from "ora";
import path from "path";
import getConfigOption from "../common/getConfigOption.js"
import scanFiles from "./scanFiles.js"
import readFile from "../common/readFile.js";
import createMap from "./createMap.js";
import findKeywords from "./findKeywords.js"
import compare from "./compare.js";
const spinner = ora();


function writeFontFile(keywords,dir,fileName) {
 
  try {
    fs.statSync(dir);
  } catch (err) {
    fs.mkdirSync(dir);
  }

  fs.writeFileSync(
    path.join(dir,fileName),
    writeFileTemplate(JSON.stringify(keywords, null, 2)),
    { encoding: "utf8" }
  );
  return path.join(dir, fileName);
}


function writeFileTemplate(data) {
  const tempalte = `export default ${data}`;
  return tempalte;
}


export default async () => {
  try {
    // 读取配置
    let configOption = await getConfigOption();

    // 读取已有文件包
    let zhFile = await readFile(path.join('file://',process.cwd(),configOption.output,'zh/zh.mjs'));
    let enFile = await readFile(path.join('file://',process.cwd(),configOption.output,'en/en.mjs'));
 
    let zh_en_map = new Map();
    if(enFile && zhFile){
      zh_en_map = createMap(zhFile,enFile)
    }
    // 扫描文件
    let files = scanFiles(path.join(process.cwd(),configOption.entry))
 
    spinner.start(chalk.cyan("正在查找关键字..."));
    let keywords = findKeywords(files);
    if (!keywords.length) {
      spinner.fail(chalk.green(`未找到关键字`));
      return;
    }
    spinner.succeed(chalk.green(`本次查找到${keywords.length}个关键字`));
  
    let {zh,en,untranslated} = compare(keywords,zh_en_map)
    
    let fontInfo = [
      {
        dir:"zh",
        keywords:zh,
        fileName:"zh.mjs"
      },
      {
        dir:"en",
        keywords:en,
        fileName:"en.mjs"
      },
      {
        dir:"en",
        keywords:untranslated,
        fileName:"untranslated.mjs"
      },
    ]
    
    fontInfo.forEach(item=>{
      spinner.start(chalk.cyan("写入文件..."));
      let filePath = writeFontFile(item.keywords,path.join(process.cwd(),configOption.output,item.dir),item.fileName);
      spinner.succeed(chalk.green("写入文件:", filePath));
    })
   
  } catch (err) {
    spinner.fail();
    console.log(err);
  }
};



