## 安装
```
npm i create-language -g
```

## 无配置使用
#### 在需要生成字体包的目录执行命令，默认生成zh.mjs、en.mjs、untranslated.mjs
```
 cl create font
 ```
 该命令会找出所有$T("关键字")里的关键字

 ```
 <template>
  <div>
    <ul>
      <li>{{$T("你好")}}</li>
      <li>{{$T("测试")}}</li>
      <li>{{$T("小明今年 {age} 岁了",{age:18})}}</li>
    </ul>
  </div>
  <script>
  export default {
    data(){
      return {
        title:this.$T("标题"),
        test:this.$T("测试")
      }
    }
  }
  </script>
 </template>
 ```
生成的zh.mjs
```
 export default {
   n1:"你好",
   n2:"测试",
   n3:"小明今年 {age} 岁了",
   n4:"标题
 }
 ```
## 写入
#### 在untranslated.mjs里翻译好对应的en，将文件名改为translated.mjs，执行命令
```
 cl write en
 ```
## 配置
 在执行命令目录下创建一份配置文件create-languate.json

 ```
 {
   entry:"入口目录",//默认"."
   output:"字体包生成目录",//默认"."
 }
 ```