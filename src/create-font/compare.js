export default (keywords,map)=>{
  let zh = {};
  let en = {};
  let untranslated = {};
  keywords.forEach((item,index)=>{
    zh[`n${index+1}`] = item;
    let translateEn = map.get(item);
    if(translateEn){
      en[`n${index+1}`] = translateEn;
    }else{
      untranslated[`n${index+1}`] = {
        zh:item,
        en:""
      }
    }
  })
  return {zh,en,untranslated}
}


