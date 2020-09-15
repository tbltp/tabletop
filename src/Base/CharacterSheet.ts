import { Race } from "../Races/Race";
import { PlayerClass } from "../Classes/PlayerClass";
import { PlayerCharacter } from "./PlayerCharacter";
import { Background } from "../Backgrounds/Background";
import { Feat } from "../Feats/Feat";

class CharacterSheet {

    character: PlayerCharacter;
    race: Race;
    playerClass: PlayerClass;
    feats: Feat [];
    background: Background;

    levelUp(params): void {

        const level = this.character.level.totalLevel + 1
        this.character.level.totalLevel = level;
        this.race.abilitiesAtLevels[level.toString()](this.character);
        //same for every feat
        this.playerClass.abilitiesAtLevels[level.toString()](this.character, params);
    }

}