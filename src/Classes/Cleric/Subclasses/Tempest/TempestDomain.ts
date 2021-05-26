import { ResourceTrait, ScalingTrait } from "Base/Interfaces";
import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams, PlayerClass } from "../../../PlayerClass";
import * as TempestDomainDict from "./Tempest.json";

export class TempestDomain {
    
  static getFeature(level: string, featureName: string) {
      return TempestDomainDict["features"][level][featureName];
  }

  static getSpells(pc: PlayerCharacter, level: string){
    pc.pcHelper.addSpells(TempestDomain.spells[level],"wisdom");
  }

  static tempest1(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
      TempestDomain.getFeature("1", "WRATH OF THE STORM"),
      TempestDomain.getFeature( "1", "BONUS PROFICIENCY")
    );
    TempestDomain.getSpells(pc,"1");

    const wrathOfTheStorm: ResourceTrait = { resourceMax: (pc.abilityScores.wisdom.modifier.value >= 1) ? pc.abilityScores.wisdom.modifier : {value: 1} };
    pc.pcHelper.addEffectsToClassFeature("Wrath of the Storm", {resource: wrathOfTheStorm});
    
    pc.traits.armorProficiencies.add("Heavy");
    pc.traits.weaponProficiencies.add("Martial");
  }

  static tempest2(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
      TempestDomain.getFeature(
        "2",
        "DESTRUCTIVE WRATH"
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
    pc.pcHelper.addFeatures(TempestDomain.getFeature("8", "DIVINE STRIKE"));
    pc.pcHelper.addEffectsToClassFeature("Divine Strike", {scaling: {dice: "1d8"}})
  }

  static tempest9(pc: PlayerCharacter, params: LevelingParams) {
    TempestDomain.getSpells(pc,"9");
  }

  static tempest14(pc:PlayerCharacter,params:LevelingParams) {
   pc.pcHelper.findFeatureTraitByName("Divine Strike").scaling.dice = "2d8";
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