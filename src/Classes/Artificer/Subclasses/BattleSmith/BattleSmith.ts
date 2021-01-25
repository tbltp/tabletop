import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../PlayerClass";
import * as BattleSmithDict from "./BattleSmith.json";

export class BattleSmith {

  static getFeature(level: string, featureName: string) {
      return BattleSmithDict["features"][level][featureName];
  }

  static addBattleSmithSpells(pc: PlayerCharacter, level: string){
    pc.pcHelper.addSpells(this.battleSmithSpells[level], "intelligence");
  }

  static battleSmith3(pc: PlayerCharacter, params: LevelingParams) {
    pc.traits.toolProficiencies.add(params.subclassSelection.options[0]);
    pc.pcHelper.addFeatures(
        BattleSmith.getFeature("3", "BATTLE READY"),
        BattleSmith.getFeature("3", "STEEL DEFENDER"),
    );
    pc.traits.weaponProficiencies.add("Martial");
    BattleSmith.addBattleSmithSpells(pc, "3");
  }

  static battleSmith5(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(BattleSmith.getFeature("5", "EXTRA ATTACK"));
    BattleSmith.addBattleSmithSpells(pc, "5");
  }
  
  static battleSmith9(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(BattleSmith.getFeature("9", "ARCANE JOLT"));
    pc.pcHelper.addResourceTraits({
        title: "Arcane Jolt",
        description: "Number of times you can use your Arcane Jolt effect per long rest.",
        resourceMax: pc.abilityScores.intelligence.modifier
    })
    BattleSmith.addBattleSmithSpells(pc, "9");
  }

  static battleSmith13(pc: PlayerCharacter, params: LevelingParams) {
    BattleSmith.addBattleSmithSpells(pc, "13");
  }

  static battleSmith15(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(BattleSmith.getFeature("15", "FORTIFIED POSITION"));
  }

  static battleSmith17(pc: PlayerCharacter, params: LevelingParams) {
    BattleSmith.addBattleSmithSpells(pc, "17");
  }

  static battleSmithSpells = {
      "3": ["SHIELD", "HEROISM"],
      "5": ["BRANDING SMITE", "WARDING BOND"],
      "9": ["AURA OF VITALITY", "CONJURE BARRAGE"],
      "13": ["AURA OF PURITY", "FIRE SHIELD"],
      "17": ["BANISHING SMITE", "MASS CURE WOUNDS"]
  }

}