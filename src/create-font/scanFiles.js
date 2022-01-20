import path from "path";
import fs from "fs";
const ignore = ["lang","node_modules"];
export default function scanFile(root) {
  let arrFiles = [];
  const files = fs.readdirSync(root);
  for (let i = 0; i < files.length; i++) {
    const item = files[i];
    const stat = fs.lstatSync(path.join(root, item));
    if (stat.isDirectory() === true) {
      if (!ignore.includes(item)) {
        arrFiles = arrFiles.concat(scanFile(path.join(root, item)));
      }
    } else {
      if (/^.*\.(vue|js)$/.test(item)) {
        /* 只提取vue和js文件 */
        arrFiles.push(path.join(root, item));
      }
    }
  }
  return arrFiles;
}