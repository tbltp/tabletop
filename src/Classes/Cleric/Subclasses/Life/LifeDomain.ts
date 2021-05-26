import { ScalingTrait } from "Base/Interfaces";
import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams, PlayerClass } from "../../../PlayerClass";
import * as LifeDomainDict from "./Life.json";


export class LifeDomain {

  static getFeature(level: string, featureName: string) {
      return LifeDomainDict["features"][level][featureName];
  }

  static getSpells(pc: PlayerCharacter, level: string){
    pc.pcHelper.addSpells(LifeDomain.spells[level],"wisdom");
  }

  static life1(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
      LifeDomain.getFeature("1", "DISCIPLE OF LIFE"),
      LifeDomain.getFeature("1", "BONUS PROFICIENCY")
    );  
    LifeDomain.getSpells(pc,"1");
    pc.traits.armorProficiencies.add("Heavy");  
  }

  static life2(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
        LifeDomain.getFeature("2", "CHANNEL DIVINITY: PRESERVE LIFE")
    );
  }

  static life3(pc: PlayerCharacter, params: LevelingParams) {
    LifeDomain.getSpells(pc,"3");
  }

  static life5(pc: PlayerCharacter, params: LevelingParams) {
    LifeDomain.getSpells(pc,"5");
  }

  static life6(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(LifeDomain.getFeature("6", "BLESSED HEALER"));
  }

  static life7(pc: PlayerCharacter, params: LevelingParams) {
    LifeDomain.getSpells(pc,"7");
  }

  static life8(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(LifeDomain.getFeature("8", "DIVINE STRIKE"));
    pc.pcHelper.addEffectsToClassFeature("Divine Strike", {scaling: {dice: "1d8"}})
  }

  static life9(pc: PlayerCharacter, params: LevelingParams) {
    LifeDomain.getSpells(pc,"9");
  }

  static life14(pc:PlayerCharacter,params:LevelingParams) {
    pc.pcHelper.findFeatureTraitByName("Divine Strike").scaling.dice = "2d8";
  }

  static life17(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(LifeDomain.getFeature("17", "SUPREME HEALING"));
  }

  static spells = {
    1: ["BLESS","CURE WOUNDS"],
    3: ["LESSER RESTORATION", "SPIRITUAL WEAPON"],
    5: ["BEACON OF HOPE","REVIVIFY"],
    7: ["DEATH WARD","GUARDIAN OF FAITH"],
    9: ["MASS CURE WOUNDS","RAISE DEAD"]
  }
}