import { ResourceTrait, ScalingTrait } from "Base/Interfaces";
import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams } from "../../../PlayerClass";
import * as WarDomainDict from "./War.json";

export class WarDomain {
    
    static getFeature(level: string, featureName: string) {
        return WarDomainDict["features"][level][featureName];
    }

    static war1(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["DIVINE FAVOR", "SHIELD OF FAITH"], "wisdom");
        // war priest needs to have a minimum of one use available
        const warPriest: ResourceTrait = {
          title: "War Priest",
          description: "Number of times you can use War Priest per long rest.",
          resourceMax: pc.abilityScores.wisdom.modifier,
        };
        pc.addResourceTraits(warPriest);
        pc.traits.weaponProficiencies.push("Martial");
        pc.traits.armorProficiencies.push("Heavy");
        pc.addFeatures(
            WarDomain.getFeature("1", "WAR PRIEST"),
            WarDomain.getFeature("1", "BONUS PROFICIENCIES")
        );
      }
    
      static war2(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(
            WarDomain.getFeature("2", "CHANNEL DIVINITY: GUIDED STRIKE")
        );
      }
    
      static war3(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["MAGIC WEAPON", "SPIRITUAL WEAPON"], "wisdom");
      }
    
      static war5(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["CRUSADER'S MANTLE", "SPIRIT GUARDIAN"], "wisdom");
      }
    
      static war6(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(
            WarDomain.getFeature(
            "6",
            "CHANNEL DIVINITY: WAR GOD'S BLESSING"
          )
        );
      }
    
      static war7(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["FREEDOM OF MOVEMENT", "STONESKIN"], "wisdom");
      }
    
      static war8(pc: PlayerCharacter, params: LevelingParams) {
        const divineStrike: ScalingTrait = {
          title: "Divine Strike",
          description: "Dice used for Divine Strike (extra weapon damage).",
          dice: "1d8",
        };
        pc.addScalingTraits(divineStrike);
        pc.addFeatures(WarDomain.getFeature("8", "DIVINE STRIKE"));
      }
    
      static war9(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["FLAME STRIKE", "HOLD MONSTER"], "wisdom");
      }
    
      static war17(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(WarDomain.getFeature("17", "AVATAR OF BATTLE"));
      }
}