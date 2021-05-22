import { stringFields } from "./stringFields"

export class Inverter {
    id:Number;
    name:string;
    stringFields:stringFields[]=[];
    constructor(name?){
this.name=name;
    }
}