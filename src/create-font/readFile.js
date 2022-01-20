export default async(path)=>{
  try{
    let file = await import(path);
    return file.default
  }catch(err){
    // console.log(err)
  }
}