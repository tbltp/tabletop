import { BaseCharacter, CharacterType } from "../Character/BaseCharacter";
import { BaseCharacterData } from './Interfaces';
import { PlayerCharacter, NonPlayerCharacter } from '../Character/CharacterClasses';



export class CharacterFactory {
    public static createCharacter(data: BaseCharacterData): BaseCharacter {
        switch(data.type) {
            case CharacterType.PC:
                return new PlayerCharacter(data);
            case CharacterType.NPC:
                return new NonPlayerCharacter(data);
        }
    }
}