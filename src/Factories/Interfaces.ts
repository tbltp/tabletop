import { CharacterType, CharacterSize } from '../Character/BaseCharacter';

export interface SheetData {
    characterData: BaseCharacterData;
}
export interface BaseCharacterData {
    size: CharacterSize;
    type: CharacterType;
    abilityScores: {
        [ability: string]: AbilityData;
    };
}
export interface AbilityData {
    name: string;
    abbreviation: string;
    score: number;
}
