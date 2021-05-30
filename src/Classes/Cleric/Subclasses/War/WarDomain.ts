import { ResourceTrait, ScalingTrait } from "Base/Interfaces";
import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams, PlayerClass } from "../../../PlayerClass";
import * as WarDomainDict from "./War.json";

export class WarDomain {
    
  static getFeature(level: string, featureName: string) {
      return WarDomainDict["features"][level][featureName];
  }

  static getSpells(pc: PlayerCharacter, level: string){
    pc.pcHelper.addSpells(WarDomain.spells[level],"wisdom");
  }

  static war1(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
      WarDomain.getFeature("1", "WAR PRIEST"),
      WarDomain.getFeature("1", "BONUS PROFICIENCIES")
    );
    WarDomain.getSpells(pc,"1");

    const warPriest: ResourceTrait = { resourceMax: (pc.abilityScores.wisdom.modifier.value >= 1) ? pc.abilityScores.wisdom.modifier : {value: 1} };
    pc.pcHelper.addEffectsToFeature("War Priest", {resource: warPriest})

    pc.traits.weaponProficiencies.add("Martial");
    pc.traits.armorProficiencies.add("Heavy");
  }

  static war2(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
        WarDomain.getFeature("2", "CHANNEL DIVINITY: GUIDED STRIKE")
    );
  }

  static war3(pc: PlayerCharacter, params: LevelingParams) {
    WarDomain.getSpells(pc,"3");
  }

  static war5(pc: PlayerCharacter, params: LevelingParams) {
    WarDomain.getSpells(pc,"5");
  }

  static war6(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
        WarDomain.getFeature(
        "6",
        "CHANNEL DIVINITY: WAR GOD'S BLESSING"
      )
    );
  }

  static war7(pc: PlayerCharacter, params: LevelingParams) {
    WarDomain.getSpells(pc,"7");
  }

  static war8(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(WarDomain.getFeature("8", "DIVINE STRIKE"));
    pc.pcHelper.addEffectsToFeature("Divine Strike", {scaling: {dice: "1d8"}})
  }

  static war9(pc: PlayerCharacter, params: LevelingParams) {
    WarDomain.getSpells(pc,"9");
  }

  static war14(pc:PlayerCharacter,params:LevelingParams) {
    pc.pcHelper.findFeatureTraitByName("Divine Strike").scaling.dice = "2d8";
  }

  static war17(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(WarDomain.getFeature("17", "AVATAR OF BATTLE"));
  }

  static spells = {
    1: ["DIVINE FAVOR","SHIELD OF FAITH"],
    3: ["MAGIC WEAPON", "SPIRITUAL WEAPON"],
    5: ["CURSADER'S MANTLE", "SPIRIT GUARDIANS"],
    7: ["FREEDOM OF MOVEMENT","STONESKIN"],
    9: ["FLAME STRIKE, HOLD MONSTER"]
  }
}