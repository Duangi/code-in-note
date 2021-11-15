import { nanoid } from "nanoid"
import fs from 'fs'

export function saveFile(str,extension){
    const id = nanoid(20)
    fs.writeFile(`./code/${id}.${extension}`,str,()=>{console.log(`文件写入成功,文件名为${id}.${extension}`)})
    return `${id}.${extension}`
}