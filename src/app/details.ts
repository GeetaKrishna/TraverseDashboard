export class Details {

    
    glucoseLevel: number;
    chLevel: string;
    weight:string;
    highBP:string;
    lowBP:string
    // weight:string;

    constructor(highBP: string, lowBP:string){
        this.highBP = highBP;
        this.lowBP=lowBP;
    }
}
