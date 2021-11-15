import express from "express";
import CodeRunner from "./codeRunner.js";
import { saveFile } from "./fileManager.js";
import { codeExtensions } from "./constants.js";


const app = express()
app.use(express.urlencoded({extended:false}))
const port = 8081

app.all('/upload-file',(request,response)=>{
    //设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    response.setHeader('Access-Control-Allow-Headers','*');

    console.log(request.method)
    if(request.method === 'OPTIONS'){
        response.sendStatus(200)
        return
    }
    // 获取代码类型和代码字符串
    const {codeType,codeString} = request.body
    console.log(request.body)
    // 判断系统是否支持运行该代码
    if( Object.keys(codeExtensions).includes(codeType.toLowerCase())){
        const extension = codeExtensions[codeType]
        const fileName = saveFile(codeString,extension)
        const res = {
            code: 0,
            fileName,
            message: `当前系统支持运行${codeType}代码，请调用/run-file接口运行文件`
        }
        response.send(res)
    }
    else{
        const err = {
            code: -1,
            message: `当前系统暂不支持运行${codeType}代码，请联系管理员`
        }
        response.send(err)
        return
    }
    
    // response.send("HELLO AXIOS");
});
app.all('/run-file',(request,response)=>{
    //设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    response.setHeader('Access-Control-Allow-Headers','*');

    const {fileName} = request.body
    const codeRunner = new CodeRunner()
    const result = codeRunner.run(fileName)
    if(result){
        response.send(result)
        return
    }
    else{
        const err = {
            code: -1,
            message: `当前系统暂不支持运行此文件，请检查文件名或后缀是否正确。`
        }
        response.send(err)
        return
    }
});
app.listen(port,()=>{
    console.log(`服务已经启动, ${port}端口正在监听中`);
})