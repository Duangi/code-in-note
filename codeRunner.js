import shell from 'shelljs'

export default class CodeRunner{
    constructor(){
        this.extensionSupported = ['py','js']
    }
    run(fileName){
        const splited = fileName.split('.')
        const extension = splited[splited.length - 1]
        if(!this.extensionSupported.includes(extension)){
            // 如果当前系统不支持运行该拓展名字代码，则返回false
            return false
        }
        else{
            let result  // 存储代码运行结果
            shell.cd('code')
            switch (extension) {
                case 'py':
                    result = shell.exec(`sudo python3 ${fileName}`)
                    break;
                case 'js':
                    result = shell.exec(`sudo node ${fileName}`)
                    break;
                default:
                    break;
            }
            shell.cd('..')
            const {stdout,stderr,code} = result
            const simpleResult = {
                stdout,stderr,code
            }
            return simpleResult
        }
    }
}