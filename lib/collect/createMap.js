export default (origin,other)=>{
  let map = new Map();
  for(let key in origin){
    other[key] && map.set(origin[key],other[key])
  }
  return map
}