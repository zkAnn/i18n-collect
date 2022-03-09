
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
   if(!fromFile){
    console.log("未找到字体包")
    return false
   }
   let toFiles = {};
   for(let item of to){
    toFiles[item] = {
      keywords:await readFile(path.join('file://',process.cwd(),configOption.output,`${item}/${item}.mjs`)),
      translated:await readFile(path.join('file://',process.cwd(),configOption.output,`${item}/translated.mjs`))
    }
   }

   spinner.start(chalk.cyan("正在对比字体包..."));
   let fromMap = createMap(fromFile)
   for(let language in toFiles){
    let item =toFiles[language];
    for(let k in item.translated){
      let key = fromMap.get(item.translated[k][from]);
      if(key && item.translated[k][language]){
        item.keywords[key] = item.translated[k][language];
        item.change = true;
      }
    }
   
  }

    spinner.succeed(chalk.green("字体包对比完成"));
    let changedLanguage = {};
   
    for(let language in toFiles){
      let item =toFiles[language];
      if(item.change){
        changedLanguage[language] =item.keywords
      }
    }
    if(!Object.keys(changedLanguage).length){
      console.log("未发现translated.mjs文件")
      return false
    }
   
    for(let key in changedLanguage){
      spinner.start(chalk.cyan(`正在写入${key}.mjs...`));
      let filePath = writeFontFile(changedLanguage[key],path.join(process.cwd(),configOption.output,key),`${key}.mjs`);
      spinner.succeed(chalk.green(`${key}.mjs写入成功，路径:`, filePath));
    }
    
   
  } catch (err) {
    spinner.fail();
    console.log(err);
  }
};