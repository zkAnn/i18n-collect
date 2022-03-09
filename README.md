
## 主要功能：快速生成国际化所需的语言包

## 快速上手
### 安装
```
npm i i18n-collect -g
```
or
```
sudo yarn i18n-collect -g
```
`注：Mac需要sudo权限`

安装完成后，输入 `cl -v` 命令，返回版本号即表示安装成功。
### 创建语言包
```
 cl create 
 ```
 在需要生成字体包的目录执行命令，生成语言包文件

 该命令会扫描当前目录下所有文件，找出$T("关键字")里的关键字


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

以上文件会生成三份文件：zh.mjs、en.mjs、untranslated.mjs

zh.mjs
```
 export default {
   n1:"你好",
   n2:"测试",
   n3:"小明今年 {age} 岁了",
   n4:"标题
 }
 ```
 en.mjs
 ```
 export default {}
 ```

 untranslated.mjs
 ```
 export default {
   n1:{
     zh:"你好",
     en:""
   },
   n2:{
     zh:"测试",
     en:""
   },
   n3:{
     zh:"小明今年 {age} 岁了",
     en:""
   },
   n4:{
     zh:"标题",
     en:""
   },
 }
 ```

 
## 写入命令
#### 在untranslated.mjs里翻译好对应的en，并将文件名改为translated.mjs，执行命令
```
 cl write
 ```
 
## 配置文件

 在执行命令目录下创建一份配置文件i18n-collect.config.mjs

 ```
export default {
    entry : '.',//入口目录
    output:'./i18n',//出口目录
    from:"zh",//源语言
    to:["en"],//需要翻译的语言 Array<string> | string
    baidu:{//百度翻译api
      appid:'',
      secretKey:''
    }
}
 ```
### entry
扫描入口，相对于命令执行路径。
默认值：`.`
 
如配置：`entry："./src"`
则会扫描src目录下所有文件
### output
语言包生成路径
默认值：`./i18n`

### from
源语言
默认值：`zh`
如需自动化翻译，语种列表参考百度翻译[https://fanyi-api.baidu.com/doc/21]

### to
目标语言
默认值：`en`
类型：String | Array\<String\>
如需自动化翻译，语种列表参考百度翻译[https://fanyi-api.baidu.com/doc/21]
### baidu
用于百度翻译Api调用，实现自动翻译，appid和secretKey的获取参考[https://fanyi-api.baidu.com/doc/21]



