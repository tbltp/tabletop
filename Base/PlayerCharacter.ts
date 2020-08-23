import { BaseCharacter } from './BaseCharacter';

export class PlayerCharacter extends BaseCharacter {
    
    constructor(
        str: number, 
        dex: number,
        con: number,
        int: number,
        wis: number,
        cha: number) {
        super(str,dex,con,int,wis,cha);
    }
}

const player = new PlayerCharacter(14, 15, 8, 9, 10, 17);
console.log(player);



