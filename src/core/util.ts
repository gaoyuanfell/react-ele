const getImgSuffix = (url: string) => {
  let ms = url.match(/png|jpeg/)
  if (!ms) return ''
  return `.${ms[0]}`
}

export function getImageUrl(url:string, params:string){
  return `https://cube.elemecdn.com/${url.substr(0, 1)}/${url.substr(1, 2)}/${url.substr(3)}${getImgSuffix(url)}?${params}`
}