import { CharacterType } from '../Character/BaseCharacter';
export interface BaseCharacterData {
    size: string;
    type: CharacterType;
    abilityScores: {
        [ability: string]: AbilityData
    };
};
export interface AbilityData {
    name: string;
    abbreviation: string;
    score: number;
}

