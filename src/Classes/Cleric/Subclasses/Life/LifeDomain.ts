import { ScalingTrait } from "Base/Interfaces";
import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams } from "../../../PlayerClass";
import * as LifeDomainDict from "./Life.json";


export class LifeDomain {

    static getFeature(level: string, featureName: string) {
        return LifeDomainDict["features"][level][featureName];
    }
    
    static life1(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["BLESS", "CURE WOUNDS"], "wisdom");
        pc.traits.armorProficiencies.push("Heavy");
        pc.addFeatures(
          LifeDomain.getFeature("1", "DISCIPLE OF LIFE"),
          LifeDomain.getFeature("1", "BONUS PROFICIENCY")
        );
      }
    
      static life2(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(
            LifeDomain.getFeature("2", "CHANNEL DIVINITY: PRESERVE LIFE")
        );
      }
    
      static life3(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["LESSER RESTORATION", "SPIRITUAL WEAPON"], "wisdom");
      }
    
      static life5(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["BEACON OF HOPE", "REVIVIFY"], "wisdom");
      }
    
      static life6(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(LifeDomain.getFeature("6", "BLESSED HEALER"));
      }
    
      static life7(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["DEATH WARD", "GUARDIAN OF FAITH"], "wisdom");
      }
    
      static life8(pc: PlayerCharacter, params: LevelingParams) {
        const divineStrike: ScalingTrait = {
          title: "Divine Strike",
          description: "Dice used for Divine Strike (radiant damage).",
          dice: "1d8",
        };
        pc.addScalingTraits(divineStrike);
        pc.addFeatures(LifeDomain.getFeature("8", "DIVINE STRIKE"));
      }
    
      static life9(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["MASS CURE WOUNDS", "RAISE DEAD"], "wisdom");
      }
    
      static life17(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(LifeDomain.getFeature("17", "SUPREME HEALING"));
      }
}