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
    
    isSpellcaster(): boolean {
        for(let knownSpells of Object.keys(this.spells)){ if(this.spells[knownSpells].length > 0) {return true; } }

        return false;
    }

}



