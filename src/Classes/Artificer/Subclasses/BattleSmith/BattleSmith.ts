import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams, PlayerClass } from "../../../PlayerClass";
import * as BattleSmithDict from "./BattleSmith.json";

export class BattleSmith {

  static getFeature(level: string, featureName: string) {
      return BattleSmithDict["features"][level][featureName];
  }

  static addBattleSmithSpells(pc: PlayerCharacter, level: string){
    pc.pcHelper.addSpells(this.battleSmithSpells[level], "intelligence");
  }

  static battleSmith3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
        BattleSmith.getFeature("3", "BATTLE READY"),
        BattleSmith.getFeature("3", "STEEL DEFENDER"),
    );
    BattleSmith.addBattleSmithSpells(pc, "3");
    pc.traits.toolProficiencies.add(params.subclassParams.toolProficiencies[0]);
    pc.traits.weaponProficiencies.add("Martial");
  }

  static battleSmith5(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(BattleSmith.getFeature("5", "EXTRA ATTACK"));
    BattleSmith.addBattleSmithSpells(pc, "5");
  }
  
  static battleSmith9(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(BattleSmith.getFeature("9", "ARCANE JOLT"));
    BattleSmith.addBattleSmithSpells(pc, "9");
    pc.pcHelper.addEffectsToFeature("Arcane Jolt", { resource: { resourceMax: pc.abilityScores.intelligence.modifier } })
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