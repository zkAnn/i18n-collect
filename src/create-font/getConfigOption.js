

import path from "path"
import readFile from "./readFile.js";
export default async ()=>{
 
 
  let defaultOption = {
    entry : '.',
    output:'.'
  }
  let option = await readFile(path.join('file://',process.cwd(),'create-language.mjs'))
  if(option){
    return {...defaultOption,...option}
  }
 return defaultOption;
}