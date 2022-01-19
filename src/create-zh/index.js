import fs from "fs";
import chalk from "chalk";
import ora from "ora";
import path from "path";
const spinner = ora();
const ignore = ["lang", "node_modules"];

function writeZh(keywords) {
  const zh = arrToObj(keywords);
  try {
    fs.statSync("./lang");
  } catch (err) {
    fs.mkdirSync("./lang");
  }

  fs.writeFileSync(
    "./lang/zh.js",
    writeFileTemplate(JSON.stringify(zh, null, 2)),
    { encoding: "utf8" }
  );
  return path.join(process.cwd(), "lang/zh.js");
}

function findKeyWords() {
  // 查找当前目录下 .vue和.js文件
  const files = getFiles(process.cwd());
  let zhFile = null;
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
function writeFileTemplate(data) {
  const tempalte = `export default ${data}`;
  return tempalte;
}
function arrToObj(arr, prefix = "n") {
  let obj = {};
  arr.forEach((item, index) => {
    obj[`${prefix}${index + 1}`] = item;
  });
  return obj;
}
function getFiles(val) {
  let arrFiles = [];
  const files = fs.readdirSync(val);
  for (let i = 0; i < files.length; i++) {
    const item = files[i];
    const stat = fs.lstatSync(path.join(val, item));
    if (stat.isDirectory() === true) {
      if (!ignore.includes(item)) {
        arrFiles = arrFiles.concat(getFiles(path.join(val, item)));
      }
    } else {
      if (/^.*\.(vue|js)$/.test(item)) {
        /* 只提取vue和js文件 */
        arrFiles.push(path.join(val, item));
      }
    }
  }
  return arrFiles;
}
export default async () => {
  try {
    console.log(chalk.cyan("查找路径：" + process.cwd()));
    spinner.start(chalk.cyan("正在查找关键字..."));
    let keywords = findKeyWords();
    if (!keywords.length) {
      spinner.fail(chalk.green(`未找到关键字`));
      return;
    }
    spinner.succeed(chalk.green(`本次查找到${keywords.length}个关键字`));
    console.log(keywords);
    spinner.start(chalk.cyan("写入文件..."));
    let path = writeZh(keywords);
    spinner.succeed(chalk.green("写入文件:", path));
  } catch (err) {
    spinner.fail();
    console.log(err);
  }
};

// {
//   output:"src/i18n/config",
//   include:['src'],
//   excludes:['node_module'],
// }
