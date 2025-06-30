import fs from "fs";

export default function saveObjectToFile(obj, filename = "") {
  const name = filename == "" ? "output.json" : `${filename}.json`;
  const jsonStr = JSON.stringify(obj, null, 2);
  fs.writeFile(name, jsonStr, (err) => {
    if (err) {
      console.error("写入失败", err);
    } else {
      console.log(`文件 ${name} 写入成功`);
    }
  });
}
