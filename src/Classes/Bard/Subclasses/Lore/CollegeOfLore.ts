import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../PlayerClass";
import * as CollegeOfLoreDict from "./CollegeOfLore.json";
import { Trait } from "../../../../Base/Interfaces";

export class CollegeOfLore {
    
    static getFeature(level: string, featureName: string) {
        return CollegeOfLoreDict["features"][level][featureName];
    }
  
    static lore3(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(CollegeOfLore.getFeature("3", "CUTTING WORDS"));
    }
  
    static lore6(pc: PlayerCharacter, params: LevelingParams) {
      const lore6Trait: Trait = {
        ...CollegeOfLore.getFeature("6", "ADDITIONAL MAGICAL SECRETS"),
        choices: params.archetypeSelection[0].options,
      };
      pc.addSpells(params.archetypeSelection[0].options, "charisma");
      pc.addFeatures(lore6Trait);
    }
  
    static lore14(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(CollegeOfLore.getFeature("14", "PEERLESS SKILL"));
    }  
}