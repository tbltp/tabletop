import { PlayerCharacter } from "../../../../Character/PlayerCharacter";
import { LevelingParams } from "../../../PlayerClass";
import * as CollegeOfLoreDict from "./CollegeOfLore.json";
import { Trait } from "../../../../Character/Interfaces";

export class CollegeOfLore {
    
  static getFeature(level: string, featureName: string) {
      return CollegeOfLoreDict["features"][level][featureName];
  }

  static lore3(pc: PlayerCharacter, params: LevelingParams) {
    //bonus proficiencies need to be done here
    pc.pcHelper.addFeatures(CollegeOfLore.getFeature("3", "CUTTING WORDS"));
  }

  static lore6(pc: PlayerCharacter, params: LevelingParams) {
    const lore6Trait: Trait = {
      ...CollegeOfLore.getFeature("6", "ADDITIONAL MAGICAL SECRETS"),
      choices: params.subclassParams.spellSelections.add,
    };
    pc.pcHelper.addFeatures(lore6Trait);
    pc.pcHelper.addSpells(params.subclassParams.spellSelections.add, "charisma");
  }

  static lore14(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(CollegeOfLore.getFeature("14", "PEERLESS SKILL"));
  }  
}