import { ResourceTrait, ScalingTrait } from "Base/Interfaces";
import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams } from "../../../PlayerClass";
import * as TempestDomainDict from "./Tempest.json";

export class TempestDomain {
    
  static getFeature(level: string, featureName: string) {
      return TempestDomainDict["features"][level][featureName];
  }

  static getSpells(pc: PlayerCharacter, level: string){
    pc.pcHelper.addSpells(TempestDomain.spells[level],"wisdom");
  }

  static tempest1(pc: PlayerCharacter, params: LevelingParams) {
    TempestDomain.getSpells(pc,"1");

    const wrathOfTheStorm: ResourceTrait = {
      title: "Wrath of the Storm",
      description:
        "Number of times you can use Wrath of the Storm per long rest.",
      resourceMax: (pc.abilityScores.wisdom.modifier.value >= 1) ? pc.abilityScores.wisdom.modifier : {value: 1}
    };
    pc.pcHelper.addResourceTraits(wrathOfTheStorm);
    pc.traits.armorProficiencies.push("Heavy");
    pc.traits.weaponProficiencies.push("Martial");
    pc.pcHelper.addFeatures(
      TempestDomain.getFeature("1", "WRATH OF THE STORM"),
      TempestDomain.getFeature( "1", "BONUS PROFICIENCY")
    );
  }

  static tempest2(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
      TempestDomain.getFeature(
        "2",
        "CHANNEL DIVINITY: DESTRUCTIVE WRATH"
      )
    );
  }

  static tempest3(pc: PlayerCharacter, params: LevelingParams) {
    TempestDomain.getSpells(pc,"3");
  }

  static tempest5(pc: PlayerCharacter, params: LevelingParams) {
    TempestDomain.getSpells(pc,"5");
  }

  static tempest6(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
      TempestDomain.getFeature("6", "THUNDERBOLT STRIKE")
    );
  }

  static tempest7(pc: PlayerCharacter, params: LevelingParams) {
    TempestDomain.getSpells(pc,"7");
  }

  static tempest8(pc: PlayerCharacter, params: LevelingParams) {
    const divineStrike: ScalingTrait = {
      title: "Divine Strike",
      description: "Dice used for Divine Strike (thunder damage).",
      dice: "1d8",
    };
    pc.pcHelper.addScalingTraits(divineStrike);
    pc.pcHelper.addFeatures(TempestDomain.getFeature("8", "DIVINE STRIKE"));
  }

  static tempest9(pc: PlayerCharacter, params: LevelingParams) {
    TempestDomain.getSpells(pc,"9");
  }

  static tempest14(pc:PlayerCharacter,params:LevelingParams) {
    const divineStrike: ScalingTrait = pc.pcHelper.findScalingTraitByName("Divine Strike");
    divineStrike.dice = "2d8";
  }

  static tempest17(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(TempestDomain.getFeature("17", "STORMBORN"));
  }

  static spells = {
    1: ["FOG CLOUD","THUNDERWAVE"],
    3: ["GUST OF WIND","SHATTER"],
    5: ["CALL LIGHTNING","SLEET STORM"],
    7: ["CONTROL WATER","ICE STORM"],
    9: ["DESTRUCTIVE WAVE","INSECT PLAGUE"]
  }
}