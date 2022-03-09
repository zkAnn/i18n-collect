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
    fs.mkdirSync(dir,{recursive :true});
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
    let {from ,to} = configOption;
   
    // 读取已有文件包
    let fromFile = await readFile(path.join('file://',process.cwd(),configOption.output,`${from}/${from}.mjs`));
    let toFiles = {};
    for(let item of to){
      toFiles[item] =  await readFile(path.join('file://',process.cwd(),configOption.output,`${item}/${item}.mjs`))
    }
    // 建立源语言与其他语言映射关系 如：zh=>en  "你好"=>"hello"
    let maps = {};
    if(fromFile){
      for(let key in toFiles){
        let item =toFiles[key];
       
        item && Object.keys(item).length!==0 && (maps[key] =  createMap(fromFile,item))
      }
   
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
  
    let languages = await compare(keywords,maps,configOption)
    
    
    for (let key in languages){
      let language = languages[key];
      spinner.start(chalk.cyan("写入文件..."));
      let filePath = writeFontFile(language.translated,path.join(process.cwd(),configOption.output,key),`${key}.mjs`);
      let filePath1 = ''
      if(language.untranslated&& Object.keys(language.untranslated).length){
        filePath1 = writeFontFile(language.untranslated,path.join(process.cwd(),configOption.output,key),'untranslated.mjs');
      
      }
      spinner.succeed(chalk.green("写入文件:", filePath,filePath1));
    }
  } catch (err) {
    spinner.fail();
    console.log(err);
  }
};



