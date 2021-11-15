import mysql from 'mysql'

export function saveFileNameToDB(){
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'abc990625.',
        database: 'code_in_note'
    })
    connection.connect()
}

export default class Mysql{
    constructor(options={
        host: 'localhost',
        user: 'root',
        password: 'abc990625.',
        database: 'code_in_note'
    }){
        this.options = options
        this.connection = this.getConnection()
    }
    getConnection = () =>{
        if(this.connection){
            return this.connection
        }
        else{
            return this.connect(this.options)
        }
    }
    connect = (options)=>{
        const connection = mysql.createConnection(options)
        return connection
    }
    // saveFileNameToDB = (id,type) =>{
    //     this.getConnection().query("INSERT INTO `code_in_note`.`file` (`id`, `type`) VALUES ('123', 'py'); ")
    // }
}
