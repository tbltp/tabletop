import { ResourceTrait, ScalingTrait } from "Base/Interfaces";
import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams } from "../../../PlayerClass";
import * as TempestDomainDict from "./Tempest.json";

export class TempestDomain {
    
    static getFeature(level: string, featureName: string) {
        return TempestDomainDict["features"][level][featureName];
    }

    static tempest1(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["FOG CLOUD", "THUNDERWAVE"], "wisdom");
        // wrath of the storm needs to have a minimum of one use available
        const wrathOfTheStorm: ResourceTrait = {
          title: "Wrath of the Storm",
          description:
            "Number of times you can use Wrath of the Storm per long rest.",
          resourceMax: pc.abilityScores.wisdom.modifier,
        };
        pc.addResourceTraits(wrathOfTheStorm);
        pc.traits.armorProficiencies.push("Heavy");
        pc.addFeatures(
          TempestDomain.getFeature("1", "WRATH OF THE STORM"),
          TempestDomain.getFeature( "1", "BONUS PROFICIENCY")
        );
      }
    
      static tempest2(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(
          TempestDomain.getFeature(
            "2",
            "CHANNEL DIVINITY: DESTRUCTIVE WRATH"
          )
        );
      }
    
      static tempest3(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["GUST OF WIND", "SHATTER"], "wisdom");
      }
    
      static tempest5(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["CALL LIGHTNING", "SLEET STORM"], "wisdom");
      }
    
      static tempest6(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(
          TempestDomain.getFeature("6", "THUNDERBOLT STRIKE")
        );
      }
    
      static tempest7(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["CONTROL WATER", "ICE STORM"], "wisdom");
      }
    
      static tempest8(pc: PlayerCharacter, params: LevelingParams) {
        const divineStrike: ScalingTrait = {
          title: "Divine Strike",
          description: "Dice used for Divine Strike (thunder damage).",
          dice: "1d8",
        };
        pc.addScalingTraits(divineStrike);
        pc.addFeatures(TempestDomain.getFeature("8", "DIVINE STRIKE"));
      }
    
      static tempest9(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["DESTRUCTIVE WAVE", "INSECT PLAGUE"], "wisdom");
      }
    
      static tempest17(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(TempestDomain.getFeature("17", "STORMBORN"));
      }
}