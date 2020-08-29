import { Feat } from './Feat';
import * as Feats from '../../Assets/Feats.json';
import { PlayerCharacter } from '../Base/PlayerCharacter';

export class Alert extends Feat {
    constructor(){
        super();
    }

    trait = Feats["ALERT"];

    apply(pc: PlayerCharacter) {

        pc.baseStats["initiatveBonus"].bonus += 5;
        pc.traits.features.push(this.trait);
    }
}

export class Athlete extends Feat {
    constructor(abilityScore: string){
        super();
        this.abilityScore = abilityScore;
    }

    trait = Feats["ATHLETE"];
    private abilityScore: string;

    apply(pc: PlayerCharacter) {

        pc.abilityScores[this.abilityScore].update(1);
        pc.traits.features.push(this.trait);
    }
}

export class Actor extends Feat {
    constructor(){
        super();
    }

    trait = Feats["ACTOR"];

    apply(pc: PlayerCharacter) {

        pc.abilityScores.charisma.update(1);
        pc.traits.features.push(this.trait);
    }
}

export class Charger extends Feat {
    constructor(){
        super();
    }

    trait = Feats["CHARGER"];

    apply(pc: PlayerCharacter) {

        pc.traits.features.push(this.trait);
    }
}

export class CrossbowExpert extends Feat {
    constructor(){
        super();
    }

    trait = Feats["CROSSBOW EXPERT"];

    apply(pc: PlayerCharacter) {

        pc.traits.features.push(this.trait);
    }
}

export class DefensiveDuelist extends Feat {
    constructor(){
        super();
    }

    trait = Feats["DEFENSIVE DUELIST"];

    apply(pc: PlayerCharacter) {

        if(!this.abilityPrereqCheck(pc, "dexterity", 13)) {
            throw Error('Requirement Not Met: 13 Dex');
        }

        pc.traits.features.push(this.trait);
    }
}

export class DualWielder extends Feat {
    constructor(){
        super();
    }

    trait = Feats["DUAL WIELDER"];

    apply(pc: PlayerCharacter) {

        pc.traits.features.push(this.trait);
    }
}

export class DungeonDelver extends Feat {
    constructor(){
        super();
    }

    trait = Feats["DUNGEON DELVER"];

    apply(pc: PlayerCharacter) {

        pc.traits.features.push(this.trait);
    }
}

export class Durable extends Feat {
    constructor(abilityScore: string){
        super();
        this.abilityScore = abilityScore;
    }

    trait = Feats["DURABLE"];
    private abilityScore: string;

    apply(pc: PlayerCharacter) {

        pc.abilityScores[this.abilityScore].update(1);
        pc.traits.features.push(this.trait);
    }
}

export class ElementalAdept extends Feat {
    constructor(element: string){
        super();
        this.element = element;
    }

    trait = Feats["ELEMENTAL ADEPT"];
    private element: string;

    apply(pc: PlayerCharacter) {

        this.trait.description += `(${this.element})`
        pc.traits.features.push(this.trait);
    }
}

export class Grappler extends Feat {
    constructor(){
        super();
    }

    trait = Feats["GRAPPLER"];

    apply(pc: PlayerCharacter) {

        if(!this.abilityPrereqCheck(pc, "strength", 13)) {
            throw Error('Requirement Not Met: 13 Str');
        }

        pc.traits.features.push(this.trait);
    }
}

export class GreatWeaponMaster extends Feat {
    constructor(){
        super();
    }

    trait = Feats["GREAT WEAPON MASTER"];

    apply(pc: PlayerCharacter) {

        pc.traits.features.push(this.trait);
    }
}

export class Healer extends Feat {
    constructor(){
        super();
    }

    trait = Feats["HEALER"];

    apply(pc: PlayerCharacter) {

        pc.traits.features.push(this.trait);
    }
}

export class HeavilyArmored extends Feat {
    constructor(){
        super();
    }

    trait = Feats["HEAVILY ARMORED"];

    apply(pc: PlayerCharacter) {

        if(!this.armorPrereqCheck(pc, "Medium")){
            throw Error("Requirement Not Met: Medium Armor Proficiency")
        }

        pc.abilityScores.strength.update(1);
        pc.traits.armorProficiencies.push("Heavy");
        pc.traits.features.push(this.trait);
    }
}

export class HeavyArmorMaster extends Feat {
    constructor(){
        super();
    }

    trait = Feats["HEAVY ARMOR MASTER"];

    apply(pc: PlayerCharacter) {

        if(!this.armorPrereqCheck(pc, "Heavy")){
            throw Error("Requirement Not Met: Heavy Armor Proficiency")
        }

        pc.abilityScores.strength.update(1);
        pc.traits.features.push(this.trait);
    }
}