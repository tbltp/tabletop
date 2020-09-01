import { Feat } from './Feat';
import * as Feats from '../../Assets/Feats.json';
import * as Spells from '../../Assets/Spells.json';
import * as SpellcastingAbility from '../../Assets/SpellcastingAbility.json';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import { Spell, ISpell } from '../Base/Interfaces';

export class PolearmMaster extends Feat {
    constructor(){
        super();
    }

    trait = Feats["POLEARM MASTER"];

    apply(pc: PlayerCharacter) {

        pc.traits.features.push(this.trait);
    }
}

export class Resilient extends Feat {
    constructor(abilityScore: string){
        super();
        this.abilityScore = abilityScore;
    }

    trait = Feats["RESILIENT"];
    private abilityScore: string;

    apply(pc: PlayerCharacter) {

        pc.abilityScores[this.abilityScore].update(1);
        pc.abilityScores[this.abilityScore].savingThrowProficiency = true;
        this.trait.description += `(${this.abilityScore})`;
        pc.traits.features.push(this.trait);
    }
}

export class RitualCaster extends Feat {  // THIS IS VERY COMPLEX - NOT DONE
    constructor(spellClass: string, spells: string[]){
        super();
        this.spellClass = spellClass;
        this.spells = spells;
    }
    
    trait = Feats["RITUAL CASTER"];
    private spellClass: string;
    private spells: string[];

    apply(pc: PlayerCharacter) {

        for(const spellName of this.spells) {
            const ispell: ISpell = Spells[spellName];
            const spell: Spell = {...ispell, spellcastingAbility: SpellcastingAbility[this.spellClass]};
            pc.spells["0"].push(spell);
        }

        pc.traits.features.push(this.trait);
    }
}

export class SavageAttacker extends Feat {
    constructor(){
        super();
    }

    trait = Feats["SAVAGE ATTACKER"];

    apply(pc: PlayerCharacter) {

        pc.traits.features.push(this.trait);
    }
}

export class Sentinel extends Feat {
    constructor(){
        super();
    }

    trait = Feats["SENTINEL"];

    apply(pc: PlayerCharacter) {

        pc.traits.features.push(this.trait);
    }
}

export class Sharpshooter extends Feat {
    constructor(){
        super();
    }

    trait = Feats["SHARPSHOOTER"];

    apply(pc: PlayerCharacter) {

        pc.traits.features.push(this.trait);
    }
}

export class ShieldMaster extends Feat {
    constructor(){
        super();
    }

    trait = Feats["SHIELD MASTER"];

    apply(pc: PlayerCharacter) {

        pc.traits.features.push(this.trait);
    }
}

export class Skilled extends Feat {
    constructor(skills: string[], tools: string[]){
        super();
        this.skillProficiencies = skills;
        this.toolProficiencies = tools;
    }

    trait = Feats["SKILLED"];
    private skillProficiencies: string[];
    private toolProficiencies: string[];

    apply(pc: PlayerCharacter) {
        
        const allProficiencies = this.skillProficiencies.concat(this.toolProficiencies);
        for(let skill of this.skillProficiencies){ pc.skills[skill].proficient = true; }
        for(let tool of this.toolProficiencies){ pc.traits.toolProficiencies.push(tool); }
        this.trait.description += `(${allProficiencies[0]}, ${allProficiencies[1]}, ${allProficiencies[2]})`
        pc.traits.features.push(this.trait);
    }
}

export class Skulker extends Feat {
    constructor(){
        super();
    }

    trait = Feats["SKULKER"];

    apply(pc: PlayerCharacter) {

        if(!this.abilityPrereqCheck(pc, "dexterity", 13)) {
            throw Error('Requirement Not Met: 13 Dex');
        }
        
        pc.traits.features.push(this.trait);
    }
}

export class SpellSniper extends Feat {
    constructor(spellClass: string, cantrip: string){
        super();
        this.cantrip = cantrip;
        this.spellClass = spellClass;
    }

    trait = Feats["SPELL SNIPER"];
    private spellClass: string;
    private cantrip: string;

    apply(pc: PlayerCharacter) {

        if(!this.spellcasterPrereqCheck(pc)) { 
            throw Error('Requirement Not Met: Spellcaster');    
        }
        
        const ispell: ISpell = Spells[this.cantrip]
        const spell: Spell = {...ispell, spellcastingAbility: SpellcastingAbility[this.spellClass] }
        pc.spells["0"].push(spell)
        this.trait.description += `(${this.cantrip})`;
        pc.traits.features.push(this.trait);
    }
}

export class TavernBrawler extends Feat {
    constructor(abilityScore: string) {

        super();
        this.abilityScore = abilityScore;
    }

    trait = Feats["TAVERN BRAWLER"];
    private abilityScore: string;

    apply(pc: PlayerCharacter) {

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
    abilitiesAtLevels = {
        "0": this.plusTwoHealth,
        "1": this.plusTwoHealth,
        "2": this.plusTwoHealth,
        "3": this.plusTwoHealth,
        "4": this.plusTwoHealth,
        "5": this.plusTwoHealth,
        "6": this.plusTwoHealth,
        "7": this.plusTwoHealth,
        "8": this.plusTwoHealth,
        "9": this.plusTwoHealth,
        "10": this.plusTwoHealth,
        "11": this.plusTwoHealth,
        "12": this.plusTwoHealth,
        "13": this.plusTwoHealth,
        "14": this.plusTwoHealth,
        "15": this.plusTwoHealth,
        "16": this.plusTwoHealth,
        "17": this.plusTwoHealth,
        "18": this.plusTwoHealth,
        "19": this.plusTwoHealth,
        "20": this.plusTwoHealth
    }

    plusTwoHealth(pc: PlayerCharacter) {
        pc.baseStats["hpMax"].bonus += 2;
    }

    apply(pc: PlayerCharacter) {

        pc.baseStats['hpMax'].bonus += 2 * pc.totalLevel;
        pc.traits.features.push(this.trait);
    }
}

export class WarCaster extends Feat {
    constructor(){
        super();
    }

    trait = Feats["WAR CASTER"];

    apply(pc: PlayerCharacter) {

        if(this.spellcasterPrereqCheck(pc)) {  
            throw Error('Requirement Not Met: Spellcaster');
        }

        pc.traits.features.push(this.trait);
    }
}

export class WeaponMaster extends Feat {
    constructor(abilityScore: string, weaponProficiencies: string[]){
        super();
        this.abilityScore = abilityScore;
        this.weaponProficiencies = weaponProficiencies;
    }

    trait = Feats["WEAPON MASTER"];
    private abilityScore: string;
    private weaponProficiencies: string[];

    apply(pc: PlayerCharacter) {

        pc.abilityScores[this.abilityScore].update(1);
        for(let weapon of this.weaponProficiencies) { pc.traits.weaponProficiencies.push(weapon); }
        this.trait.description += `(${this.abilityScore}, ${this.weaponProficiencies[0]}, ${this.weaponProficiencies[1]}, ${this.weaponProficiencies[2]}, ${this.weaponProficiencies[3]})`
        pc.traits.features.push(this.trait);
    }
}