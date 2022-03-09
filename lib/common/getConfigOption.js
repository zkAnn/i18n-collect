

import path from "path"
import readFile from "./readFile.js";
export default async ()=>{
 
 
  let defaultOption = {
    entry : '.',//入口目录
    output:'./i18n',//出口目录
    from:"zh",//源语言
    to:["en"],//需要翻译的语言 Array | string
    baidu:{//百度翻译api
      appid:'',
      secretKey:''
    }
  }
  let option = await readFile(path.join('file://',process.cwd(),'i18n-collect.config.mjs'))
  if(option){
    option = {...defaultOption,...option};
    if(typeof option.to ==="string"){
      option.to = [option.to]
    }
    return option
  }
 return defaultOption;
}