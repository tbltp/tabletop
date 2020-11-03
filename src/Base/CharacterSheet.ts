import { Race } from "../Races/Race";
import { PlayerClass } from "../Classes/PlayerClass";
import { PlayerCharacter } from "./PlayerCharacter";
import { Background } from "../Backgrounds/Background";
import { Feat } from "../Feats/Feat";

class CharacterSheet {
  character: PlayerCharacter;
  race: Race;
  playerClass: PlayerClass;
  feats: Feat[];
  background: Background;

  //exposed responsibilities: level up, add/remove stuff to inventory, serialize to JSON, deserialize to JSON

  levelUp(params): void {
    const level = this.character.level.totalLevel + 1;
    this.character.level.totalLevel = level;
    this.race.abilitiesAtLevels[level.toString()](this.character);
    //same for every feat
    this.playerClass.abilitiesAtLevels[level.toString()](
      this.character,
      params
    );
    //logic for levels 4, 8, 12, 16, 19 - either level as normal or pick a feat
  }
}
