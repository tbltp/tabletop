import { ScalingTrait } from "../../../../Base/Interfaces";
import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams, PlayerClass } from "../../../../Classes/PlayerClass";
import * as RedemptionOathDict from "./OathOfRedemption.json"


export class Redemption {
  static getFeature(level: string, featureName: string) {
    return RedemptionOathDict["features"][level][featureName];
  }

  static addArchetypeSpells(pc: PlayerCharacter, level: string){
    pc.pcHelper.addSpells(this.oathSpells[level], "charisma");
  }
  
  static upSpirit(pc: PlayerCharacter) {
    pc.pcHelper.findFeatureTraitByName("Protective Spirit").scaling.bonus++;
  }
  static redemption3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
      Redemption.getFeature("3", "EMISSARY OF PEACE"),
      Redemption.getFeature("3", "REBUKE THE VIOLENT")
    )
    Redemption.addArchetypeSpells(pc, "3");
  }

  static redemption5(pc: PlayerCharacter, params: LevelingParams) {
    Redemption.addArchetypeSpells(pc, "5");
  }

  static redemption7(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Redemption.getFeature("7", "AURA OF THE GUARDIAN"));
  }

  static redemption9(pc: PlayerCharacter, params: LevelingParams) {
    Redemption.addArchetypeSpells(pc, "9");
  }

  static redemption13(pc: PlayerCharacter, params: LevelingParams) {
    Redemption.addArchetypeSpells(pc, "13");
  }

  static redemption15(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Redemption.getFeature("15", "PROTECTIVE SPIRIT"));
    pc.pcHelper.addEffectsToFeature("Protective Spirit", {scaling: {dice: "1d6", bonus: 7}})
  }

  static redemption17(pc: PlayerCharacter, params: LevelingParams) {
    Redemption.addArchetypeSpells(pc, "17");
  }

  static redemption20(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Redemption.getFeature("20", "EMISSARY OF REDEMPTION"));
    Redemption.upSpirit(pc);
  }

  static oathSpells = {
    "3": ["SANCTUARY", "SLEEP"],
    "5": ["CALM EMOTIONS", "HOLD PERSON"],
    "9": ["COUNTERSPELL", "HYPNOTIC PATTERN"],
    "13": ["OTILUKE'S RESILIENT SPHERE", "STONESKIN"],
    "17": ["HOLD MONSTER", "WALL OF FORCE"]
  };
}