import { BaseCharacterData } from "Factories/Interfaces";
import { BaseCharacter, CharacterType } from "./BaseCharacter";

export class PlayerCharacter extends BaseCharacter {
    constructor(data: BaseCharacterData) {
        super();
        this.charType = CharacterType.PC;
        this.setScores(data.abilityScores);
    }
}

export class NonPlayerCharacter extends BaseCharacter {
    constructor(data: BaseCharacterData) {
        super();
        this.charType = CharacterType.NPC;
        this.setScores(data.abilityScores);
    }
}

