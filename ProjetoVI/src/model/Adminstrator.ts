export class Adminstrator{
    private login:String;
    private password : String;
    protected cpf :String;

    constructor(login: String, cpf: String, password :String){
        if(login == null || login == undefined){
            throw new Error("Não deixe o login vazio");
        }
        if(password == null || password == undefined){
            throw new Error("Não deixe a senha vazia");
        }
        if(cpf == null || cpf == undefined){
            throw new Error("Não deixe o cpf vazio")
        }
        this.login = login;
        this.password = password;
        this.cpf =cpf;
    }
    public getLogin():String{
        return this.login;
    }

    public getPassword():String{
        return this.password;
    }
}