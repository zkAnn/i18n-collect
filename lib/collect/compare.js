import baidu from "../common/baidu.js"

import chalk from "chalk";
import ora from "ora";
const spinner = ora();
export default async(keywords,maps,config)=>{
  let from = {};
  let to = {};
  let isTranslate = config.baidu && config.baidu.appid && config.baidu.secretKey;
  isTranslate && spinner.start(chalk.cyan("正在翻译..."));
  for(let i=0,len=keywords.length;i<len;i++){
    let keyword = keywords[i];
    from[`n${i+1}`] = keyword;
    for(let language of config.to){
      let languageMap = maps[language];
      let translateText = languageMap && languageMap.get(keyword);
      translateText = translateText || isTranslate && await baidu(keyword, config.from,language,config.baidu.appid,config.baidu.secretKey);
     
      if(!to[language]){
        to[language] = {
          translated:{},
          untranslated:{}
        }
      }
    
      if(translateText){
        to[language].translated[`n${i+1}`] = translateText
      }else{
        to[language].untranslated[`n${i+1}`] = {
          [config.from]:keyword,
          [language]:''
        }
      }
     
    }
   
    isTranslate&&(spinner.text = chalk.cyan(`正在翻译${(i/(len-1)*100).toFixed(2)}%...`))
  }
  isTranslate&&spinner.succeed(chalk.green("翻译完成"))
  to[config.from] = {
    translated:from,
  }
  return to
}





