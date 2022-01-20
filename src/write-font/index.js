
import chalk from "chalk";
import ora from "ora";
import fs from "fs"
import path from "path";
import getConfigOption from "../common/getConfigOption.js"
import readFile from "../common/readFile.js";
const spinner = ora();

function createMap(zhFile){
  const map = new Map();
  for(let key in zhFile){
    map.set(zhFile[key],key)
  }
  return map
}
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
    let translated = await readFile(path.join('file://',process.cwd(),configOption.output,'en/translated.mjs'));
    if(!zhFile || !enFile || !translated){
      console.log("缺少zh.mjs或en.mjs或translated.mjs")
      return false
    }
    spinner.start(chalk.cyan("正在对比字体包..."));
    
    let zhMap = createMap(zhFile)
    for(let k in translated){
      let key = zhMap.get(translated[k].zh);
      if(key && translated[k].en){
        enFile[key] = translated[k].en
      }
    }
    spinner.succeed(chalk.green("字体包对比完成"));
    spinner.start(chalk.cyan("写入文件..."));
    let filePath = writeFontFile(enFile,path.join(process.cwd(),configOption.output,'en'),'en.mjs');
    spinner.succeed(chalk.green("写入文件:", filePath));
   
  } catch (err) {
    spinner.fail();
    console.log(err);
  }
};