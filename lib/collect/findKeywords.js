import fs from 'fs'

export default function findKeyWords(files) {

  // 提取目标关键词
  let set = new Set();
  files.forEach((filePath) => {
    const fileString = fs.readFileSync(filePath).toString();

    
    fileString.replace(/\$T\(\)|\$T\(\s*(['"])(.+?)\1\s*\)|\$T\(\s*([\s\S]+?)\s*\)/g, function (text, group, group2,group3) {
     if(text==='$T()'){
       return 
     }
      if(group2){
        set.add(group2);
      }else{
        let key = group3.match(/(['"])(.+?)\1/);
        
        key && set.add(key[2])
      }
    });
   
  });
  return [...set];
  
}