## 安装
```
npm i create-language -g
```

## 无配置使用
#### 在需要生成字体包的目录执行命令，默认生成zh.js、en.js
```
 cl create font
 ```

 ## 配置
 在执行命令目录下创建一份配置文件create-languate.json

 ```
 {
   entry:"入口目录",
   output:"字体包生成目录",
 }
 ```