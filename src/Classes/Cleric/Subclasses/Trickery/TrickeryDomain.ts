import { ScalingTrait } from "Base/Interfaces";
import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams } from "../../../PlayerClass";
import * as TrickeryDomainDict from "./Trickery.json";

export class TrickeryDomain {
    
    static getFeature(level: string, featureName: string) {
        return TrickeryDomainDict["features"][level][featureName];
    }

    static trickery1(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["CHARM PERSON", "DISGUISE SELF"], "wisdom");
        pc.addFeatures(
          TrickeryDomain.getFeature("1", "BLESSING OF THE TRICKSTER")
        );
      }
    
      static trickery2(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(
          TrickeryDomain.getFeature(
            "2",
            "CHANNEL DIVINITY: INVOKE DUPLICITY"
          )
        );
      }
    
      static trickery3(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["MIRROR IMAGE", "PASS WITHOUT TRACE"], "wisdom");
      }
    
      static trickery5(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["BLINK", "DISPEL MAGIC"], "wisdom");
      }
    
      static trickery6(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(
          TrickeryDomain.getFeature(
            "6",
            "CHANNEL DIVINITY: CLOAK OF SHADOWS"
          )
        );
      }
    
      static trickery7(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["DIMENSION DOOR", "POLYMOPRH"], "wisdom");
      }
    
      static trickery8(pc: PlayerCharacter, params: LevelingParams) {
        const divineStrike: ScalingTrait = {
          title: "Divine Strike",
          description: "Dice used for Divine Strike (poison damage).",
          dice: "1d8",
        };
        pc.addScalingTraits(divineStrike);
        pc.addFeatures(
          TrickeryDomain.getFeature("8", "DIVINE STRIKE")
        );
      }
    
      static trickery9(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["DOMINATE PERSON", "MODIFY MEMORY"], "wisdom");
      }
    
      static trickery17(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(
          TrickeryDomain.getFeature("17", "IMPROVED DUPLICITY")
        );
      }
}