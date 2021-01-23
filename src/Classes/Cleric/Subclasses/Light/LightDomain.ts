import { ResourceTrait } from "Base/Interfaces";
import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams } from "../../../PlayerClass";
import * as LightDomainDict from "./Light.json";

export class LightDomain {
  
  static getFeature(level: string, featureName: string) {
      return LightDomainDict["features"][level][featureName];
  }

  static getSpells(pc: PlayerCharacter, level: string){
    pc.pcHelper.addSpells(LightDomain.spells[level],"wisdom");
  }

  static light1(pc: PlayerCharacter, params: LevelingParams) {
    LightDomain.getSpells(pc,"1");

    const wardingFlare: ResourceTrait = {
      title: "Warding Flare",
      description: "Number of times you can use Warding Flare per long rest.",
      resourceMax: (pc.abilityScores.wisdom.modifier.value >= 1) ? pc.abilityScores.wisdom.modifier : {value: 1}
    }
    
    pc.pcHelper.addResourceTraits(wardingFlare);
    pc.pcHelper.addFeatures(
      LightDomain.getFeature("1", "WARDING FLARE"),
      LightDomain.getFeature("1", "BONUS CANTRIP")
    );
  }

  static light2(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
      LightDomain.getFeature(
        "2",
        "CHANNEL DIVINITY: RADIANCE OF THE DAWN"
      )
    );
  }

  static light3(pc: PlayerCharacter, params: LevelingParams) {
    LightDomain.getSpells(pc,"3");
  }

  static light5(pc: PlayerCharacter, params: LevelingParams) {
    LightDomain.getSpells(pc,"5");
  }

  static light6(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(LightDomain.getFeature("6", "IMPROVED FLARE"));
  }

  static light7(pc: PlayerCharacter, params: LevelingParams) {
    LightDomain.getSpells(pc,"7");
  }

  static light8(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
      LightDomain.getFeature("8", "POTENT SPELLCASTING")
    );
  }

  static light9(pc: PlayerCharacter, params: LevelingParams) {
    LightDomain.getSpells(pc,"9");
  }

  static light17(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
      LightDomain.getFeature("17", "CORONA OF LIGHT")
    );
  }

  static spells = {
    1: ["BURNING HANDS","FAERIE FIRE","LIGHT"],
    3: ["FLAMING SPHERE","SCORCHING RAY"],
    5: ["DAYLIGHT","FIREBALL"],
    7: ["GUARDIAN OF FAITH", "WALL OF FIRE"],
    9: ["FLAME STRIKE","SCRYING"]
  }
}