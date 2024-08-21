export class NFe {
    private ref :String;
    private nfe :String[];


    constructor(ref :String, nfe:String[]){
        if(ref.trim() === ""){
            throw new Error("Referencia da empresa é nula");
        }
        if(nfe.length==0){
            throw new Error("Dados da nota fiscal estão nulos.");
        }
        this.ref = ref;
        this.nfe =nfe;
    }

    public  getRef():String{
        return this.ref;
    }

    public getNfe():String[]{
        return this.nfe;
    }
    public setNfe():String[]{
        return this.nfe;
    }
    public setRef():String{
        return this.ref;
    }


}