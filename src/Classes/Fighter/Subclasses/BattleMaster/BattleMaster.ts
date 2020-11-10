import { ResourceTrait } from "Base/Interfaces";
import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams } from "Classes/PlayerClass";
import { FighterLevelingParams } from "../../Fighter";
import * as BattleMasterDict from "./BattleMaster.json"

export class BattleMaster {

    static getFeature(level: string, featureName: string) {
        return BattleMasterDict["features"][level][featureName];
    }

    static battleMaster3(pc: PlayerCharacter, params: FighterLevelingParams) {
        // superiority dice
        const superiorityDice: ResourceTrait = {
          title: "Superiority Dice",
          description: "Number of superiority dice you can use for maneuvers",
          resourceMax: { value: 4 },
          dice: "d8"
        };
        // artisan tool proficiency
        pc.addFeatures(
            BattleMaster.getFeature("3", "COMBAT SUPERIORITY"),
            BattleMaster.getFeature("3", "STUDENT OF WAR")
        );
    
        // Insert tool proficiency, requires some modification to params.
        // Figure out how to add Maneuvers.
      }
    
      static battleMaster7(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(BattleMaster.getFeature("7", "KNOW YOUR ENEMY"))
      }
    
      static battleMaster10(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(BattleMaster.getFeature("7", "IMPROVED COMBAT SUPERIORITY"))
        pc.findResourceTraitByName("Superiority Dice").dice = "d10";
      }
    
      static battleMaster15(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(BattleMaster.getFeature("7", "RELENTLESS"))
      }
    
      static battleMaster18(pc: PlayerCharacter, params: LevelingParams) {
        pc.findResourceTraitByName("Superiority Dice").dice = "d12";
      }
}