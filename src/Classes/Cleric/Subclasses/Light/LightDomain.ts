import { ResourceTrait } from "Base/Interfaces";
import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams } from "../../../PlayerClass";
import * as LightDomainDict from "./Light.json";

export class LightDomain {
    
    static getFeature(level: string, featureName: string) {
        return LightDomainDict["features"][level][featureName];
    }

    static light1(pc: PlayerCharacter, params: LevelingParams) {
      pc.pcHelper.addSpells(["BURNING HANDS", "FAERIE FIRE", "LIGHT"], "wisdom");
      // warding flare needs to have a minimum of one use available
      const wardingFlare: ResourceTrait = {
        title: "Warding Flare",
        description: "Number of times you can use Warding Flare per long rest.",
        resourceMax: pc.abilityScores.wisdom.modifier,
      };
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
      pc.pcHelper.addSpells(["FLAMING SPHERE", "SCORCHING RAY"], "wisdom");
    }
  
    static light5(pc: PlayerCharacter, params: LevelingParams) {
      pc.pcHelper.addSpells(["DAYLIGHT", "FIREBALL"], "wisdom");
    }
  
    static light6(pc: PlayerCharacter, params: LevelingParams) {
      pc.pcHelper.addFeatures(LightDomain.getFeature("6", "IMPROVED FLARE"));
    }
  
    static light7(pc: PlayerCharacter, params: LevelingParams) {
      pc.pcHelper.addSpells(["GUARDIAN OF FAITH", "WALL OF FIRE"], "wisdom");
    }
  
    static light8(pc: PlayerCharacter, params: LevelingParams) {
      pc.pcHelper.addFeatures(
        LightDomain.getFeature("8", "POTENT SPELLCASTING")
      );
    }
  
    static light9(pc: PlayerCharacter, params: LevelingParams) {
      pc.pcHelper.addSpells(["FLAME STRIKE", "SCRYING"], "wisdom");
    }
  
    static light14(pc: PlayerCharacter, params: LevelingParams) {
      pc.pcHelper.findScalingTraitByName("Divine Strike").dice = "2d8";
    }
  
    static light17(pc: PlayerCharacter, params: LevelingParams) {
      pc.pcHelper.addFeatures(
        LightDomain.getFeature("17", "CORONA OF LIGHT")
      );
    }
}