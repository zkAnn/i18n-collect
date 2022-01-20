import fs from 'fs'

export default function findKeyWords(files) {

  // 提取目标关键词
  let keywords = [];
  files.forEach((filePath) => {
    const fileString = fs.readFileSync(filePath).toString();

    let arr = [];
    fileString.replace(/\$T\(\)|\$T\(\s*(['"])(.+?)\1\s*\)|\$T\(\s*([\s\S]+?)\s*\)/g, function (text, group, group2,group3) {
     if(text==='$T()'){
       return 
     }
      if(group2){
        arr.push(group2);
      }else{
        let key = group3.match(/(['"])(.+)\1/)
        arr.push(key[2])
      }
    });
    keywords = [...keywords, ...arr];
  });
  return [...new Set(keywords)].sort((x, y) => (x > y && 1) || -1);
}