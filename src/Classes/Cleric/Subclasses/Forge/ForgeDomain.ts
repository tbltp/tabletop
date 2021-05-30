import { ScalingTrait } from "Base/Interfaces";
import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams, PlayerClass } from "../../../PlayerClass";
import * as ForgeDomainDict from "./Forge.json";


export class ForgeDomain {

  static getFeature(level: string, featureName: string) {
      return ForgeDomainDict["features"][level][featureName];
  }
  
  static getSpells(pc: PlayerCharacter, level: string){
    pc.pcHelper.addSpells(ForgeDomain.spells[level],"wisdom");
  }

  static forge1(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
      ForgeDomain.getFeature("1", "BLESSING OF THE FORGE"),
      ForgeDomain.getFeature("1", "BONUS PROFICIENCY")
    );
    ForgeDomain.getSpells(pc,"1");
    pc.traits.armorProficiencies.add("Heavy");
    pc.traits.toolProficiencies.add("Smithing Tools"); 
  }
  
  static forge2(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
        ForgeDomain.getFeature("2", "ARTISAN'S BLESSING")
    );
  }

  static forge3(pc: PlayerCharacter, params: LevelingParams) {
    ForgeDomain.getSpells(pc,"3");
  }

  static forge5(pc: PlayerCharacter, params: LevelingParams) {
    ForgeDomain.getSpells(pc,"5");
  }

  static forge6(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(ForgeDomain.getFeature("6", "SOUL OF THE FORGE"));
  }

  static forge7(pc: PlayerCharacter, params: LevelingParams) {
    ForgeDomain.getSpells(pc,"7");
  }

  static forge8(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(ForgeDomain.getFeature("8", "DIVINE STRIKE"));
    pc.pcHelper.addEffectsToFeature("Divine Strike", {scaling: {dice: "1d8"}})
  }

  static forge9(pc: PlayerCharacter, params: LevelingParams) {
    ForgeDomain.getSpells(pc,"9");
  }

  static forge14(pc:PlayerCharacter,params:LevelingParams) {
    pc.pcHelper.findFeatureTraitByName("Divine Strike").scaling.dice = "2d8";
  }

  static forge17(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(ForgeDomain.getFeature("17", "SAINT OF FORGE AND FIRE"));
  }

  static spells = {
    1: ["IDENTIFY","SEARING SMITE"],
    3: ["HEAT METAL", "MAGIC WEAPON"],
    5: ["ELEMENTAL WEAPON", "PROTECTION FROM ENERGY"],
    7: ["FABRICATE","WALL OF FIRE"],
    9: ["ANIMATE OBJECTS", "CREATION"]
  }
}