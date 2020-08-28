import { Feat } from './Feat';
import * as Feats from '../Assets/Feats.json';
import * as Spells from '../Assets/Feats.json';
import { PlayerCharacter } from '../Base/PlayerCharacter';

export class PolearmMaster extends Feat {
    constructor(){
        super();
    }

    trait = Feats["POLEARM MASTER"];

    apply(pc: PlayerCharacter){
        pc.traits.features.push(this.trait);
    }
}

export class Resilient extends Feat {
    constructor(abilityScore: string){
        super();
        this.abilityScore = abilityScore;
    }

    abilityScore: string;
    trait = Feats["RESILIENT"];

    apply(pc: PlayerCharacter){
        pc.abilityScores[this.abilityScore].update(1);
        pc.abilityScores[this.abilityScore].savingThrowProficiency = true;
        pc.traits.features.push(this.trait);
    }
}

export class RitualCaster extends Feat {  // THIS IS VERY COMPLEX - NOT DONE
    constructor(){
        super();
    }
    
    trait = Feats["RITUAL CASTER"];

    apply(pc: PlayerCharacter){
        pc.traits.features.push(this.trait);
    }
}

export class SavageAttacker extends Feat {
    constructor(){
        super();
    }

    trait = Feats["SAVAGE ATTACKER"];

    apply(pc: PlayerCharacter){
        pc.traits.features.push(this.trait);
    }
}

export class Sentinel extends Feat {
    constructor(){
        super();
    }

    trait = Feats["SENTINEL"];

    apply(pc: PlayerCharacter){
        pc.traits.features.push(this.trait);
    }
}

export class Sharpshooter extends Feat {
    constructor(){
        super();
    }

    trait = Feats["SHARPSHOOTER"];

    apply(pc: PlayerCharacter){
        pc.traits.features.push(this.trait);
    }
}

export class ShieldMaster extends Feat {
    constructor(){
        super();
    }

    trait = Feats["SHIELD MASTER"];

    apply(pc: PlayerCharacter){
        pc.traits.features.push(this.trait);
    }
}

export class Skilled extends Feat {
    constructor(skills: string[], tools: string[]){
        super();
        this.skillProficiencies = skills;
        this.toolProficiencies = tools;
    }

    skillProficiencies: string[];
    toolProficiencies: string[];
    trait = Feats["SKILLED"];

    apply(pc: PlayerCharacter){
        for(let skill in this.skillProficiencies){ pc.skills[skill].proficient = true; }
        for(let tool in this.toolProficiencies){ pc.traits.toolProficiencies.push(tool); }
        pc.traits.features.push(this.trait);
    }
}

export class Skulker extends Feat {
    constructor(){
        super();
    }

    trait = Feats["SKULKER"];

    apply(pc: PlayerCharacter){
        if(this.abilityPrereqCheck(pc, "dexterity", 13)){ pc.traits.features.push(this.trait); }
    }
}

export class SpellSniper extends Feat {  // WAITING FOR SPELL LISTS - NOT DONE
    constructor(cantrip: string){
        super();
        this.cantrip = cantrip;
    }

    cantrip: string;
    trait = Feats["SPELL SNIPER"];

    apply(pc: PlayerCharacter){
        if(this.spellcasterPrereqCheck(pc)){ 
            pc.spells["0"].push(Spells[this.cantrip])
            this.trait.description += `(${this.cantrip})`;
            pc.traits.features.push(this.trait);
        }
    }
}

export class TavernBrawler extends Feat {
    constructor(abilityScore: string){
        super();
        this.abilityScore = abilityScore;
    }

    abilityScore: string;
    trait = Feats["TAVERN BRAWLER"];

    apply(pc: PlayerCharacter){
        pc.abilityScores[this.abilityScore].update(1);
        pc.traits.weaponProficiencies.push("Unarmed Strike", "Improvised Weapons");
        this.trait.description += `(${this.abilityScore})`;
        pc.traits.features.push(this.trait);
    }
}

export class Tough extends Feat {  // THIS IMPROVES AT LEVEL - NOT DONE
    constructor(){
        super();
    }

    trait = Feats["TOUGH"];

    apply(pc: PlayerCharacter){
        pc.hpMax += 2 * pc.totalLevel;
        pc.traits.features.push(this.trait);
    }
}

export class WarCaster extends Feat {
    constructor(){
        super();
    }

    trait = Feats["WAR CASTER"];

    apply(pc: PlayerCharacter){
        if(this.spellcasterPrereqCheck(pc)) { pc.traits.features.push(this.trait); }
    }
}

export class WeaponMaster extends Feat {
    constructor(abilityScore: string, weaponProficiencies: string[]){
        super();
        this.abilityScore = abilityScore;
        this.weaponProficiencies = weaponProficiencies;
    }

    abilityScore: string;
    weaponProficiencies: string[];
    trait = Feats["WEAPON MASTER"];

    apply(pc: PlayerCharacter){
        pc.abilityScores[this.abilityScore].update(1);
        for(let weapon of this.weaponProficiencies) { pc.traits.weaponProficiencies.push(weapon); }
        pc.traits.features.push(this.trait);
    }
}