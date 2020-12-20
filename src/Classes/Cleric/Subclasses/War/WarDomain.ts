import { ResourceTrait, ScalingTrait } from "Base/Interfaces";
import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams } from "../../../PlayerClass";
import * as WarDomainDict from "./War.json";

export class WarDomain {
    
  static getFeature(level: string, featureName: string) {
      return WarDomainDict["features"][level][featureName];
  }

  static getSpells(pc: PlayerCharacter, level: string){
    pc.pcHelper.addSpells(WarDomain.spells[level],"wisdom");
  }

  static war1(pc: PlayerCharacter, params: LevelingParams) {
    WarDomain.getSpells(pc,"1");

    const warPriest: ResourceTrait = {
      title: "War Priest",
      description: "Number of times you can use War Priest per long rest.",
      resourceMax: (pc.abilityScores.wisdom.modifier.value >= 1) ? pc.abilityScores.wisdom.modifier : {value: 1}
    };
    pc.pcHelper.addResourceTraits(warPriest);
    pc.traits.weaponProficiencies.add("Martial");
    pc.traits.armorProficiencies.add("Heavy");
    pc.pcHelper.addFeatures(
        WarDomain.getFeature("1", "WAR PRIEST"),
        WarDomain.getFeature("1", "BONUS PROFICIENCIES")
    );
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
    const divineStrike: ScalingTrait = {
      title: "Divine Strike",
      description: "Dice used for Divine Strike (extra weapon damage).",
      dice: "1d8",
    };
    pc.pcHelper.addScalingTraits(divineStrike);
    pc.pcHelper.addFeatures(WarDomain.getFeature("8", "DIVINE STRIKE"));
  }

  static war9(pc: PlayerCharacter, params: LevelingParams) {
    WarDomain.getSpells(pc,"9");
  }

  static war14(pc:PlayerCharacter,params:LevelingParams) {
    const divineStrike: ScalingTrait = pc.pcHelper.findScalingTraitByName("Divine Strike");
    divineStrike.dice = "2d8";
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