import axios from 'axios'
import md5 from "md5-node"


export default async  (keyword,from,to,appid,secretKey) =>{
  let url = "https://fanyi-api.baidu.com/api/trans/vip/translate",
    salt = +new Date();
  let sign = md5(appid+keyword+salt+secretKey);
 
  try{
    let res = await axios.get(url,{params:{
      q:keyword,
      from,
      to,
      appid,
      salt,
      sign
    }})
    return Promise.resolve(res.data.trans_result[0].dst)
  }catch(err){
    return Promise.resolve('')
  }
}
