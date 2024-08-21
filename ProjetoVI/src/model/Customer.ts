

export class Customer{
    private idCustomer :number;
    private nameCustomer : String;
    private cpfCustomer : number;

constructor(idCustomer : number, nameCustomer : String, cpfCustomer : number){
    if(idCustomer == null || idCustomer === undefined){
        throw new Error("idCustomer não pode ser nulo ou indefinido.");
    }
    if (nameCustomer.trim() === ""){
        throw new Error("Nome não pode ser indefinido.");
    }
    if(cpfCustomer == null || cpfCustomer === undefined){
        throw new Error("CPF não pode ser indefinido.");
    }
    this.idCustomer = idCustomer;
    this.nameCustomer = nameCustomer;
    this.cpfCustomer = cpfCustomer;
    }
    public getIdCustomer(): number {
        return this.idCustomer;
    }

    public getNameCustomer(): String {
        return this.nameCustomer;
    }

    public getCpfCustomer(): number {
        return this.cpfCustomer;
    }


    
}