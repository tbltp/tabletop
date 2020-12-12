import { join } from "path";
import { ResourceTrait } from "../../../../Base/Interfaces";
import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as MonsterSlayerArchetypeDict from "./MonsterSlayer.json"

export class MonsterSlayer {

  static getFeature(level: string, featureName: string) {
      return MonsterSlayerArchetypeDict["features"][level][featureName];
  }

  static getSpell(pc: PlayerCharacter,level:string) {
    pc.pcHelper.addSpells(MonsterSlayer.spells[level],"wisdom");
  }

  static monsterSlayer3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(MonsterSlayer.getFeature("3", "HUNTER'S SENSE"));
    const hunterSense: ResourceTrait = {
      title: "Hunter's Sense",
      description: "The number of times you may use Hunter's Sense",
      resourceMax: (pc.abilityScores.wisdom.modifier.value>=1) ? pc.abilityScores.wisdom.modifier : {value: 1}
    }
    pc.pcHelper.addResourceTraits(hunterSense);
    pc.pcHelper.addFeatures(MonsterSlayer.getFeature("3", "SLAYER'S PREY"));
    MonsterSlayer.getSpell(pc,"3");
  }

  static monsterSlayer5(pc: PlayerCharacter, params: LevelingParams) {
    MonsterSlayer.getSpell(pc,"5");
  }

  static monsterSlayer7(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(MonsterSlayer.getFeature("7", "SUPERNATURAL DEFENSE"));
  }

  static monsterSlayer9(pc: PlayerCharacter, params: LevelingParams) {
    MonsterSlayer.getSpell(pc,"9");
  }

  static monsterSlayer11(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(MonsterSlayer.getFeature("11", "MAGIC-USER'S NEMESIS"));
  }

  static monsterSlayer13(pc: PlayerCharacter, params: LevelingParams) {
    MonsterSlayer.getSpell(pc,"13");
  }

  static monsterSlayer15(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(MonsterSlayer.getFeature("15", "SLAYER'S COUNTER"));
  }

  static monsterSlayer17(pc: PlayerCharacter, params: LevelingParams) {
    MonsterSlayer.getSpell(pc,"17");
  }

  static spells = {
    "3": ["PROTECTION FROM EVIL AND GOOD"],
    "5": ["ZONE OF TRUTH"],
    "9": ["MAGIC CIRCLE"],
    "13": ["BANISHMENT"],
    "17": ["HOLD MONSTER"]
  }
}