import { BaseCharacterData } from "Factories/Interfaces";
import { BaseCharacter, CharacterType } from "./BaseCharacter";

export class PlayerCharacter extends BaseCharacter {


    constructor(data: BaseCharacterData) {
        super();
        this.charType = CharacterType.PC;
        this.charSize = data.size;
        this.setScores(data.abilityScores);
        this.charHealth.linkedAbility = this.findAbilityScore('constitution');
    }
}

export class NonPlayerCharacter extends BaseCharacter {
    constructor(data: BaseCharacterData) {
        super();
        this.charType = CharacterType.NPC;
        this.setScores(data.abilityScores);
    }
}

