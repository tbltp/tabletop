import { ResourceTrait, ScalingTrait } from "Base/Interfaces";
import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams } from "../../../PlayerClass";
import * as NatureDomainDict from "./Nature.json";

export class NatureDomain {
    
    static getFeature(level: string, featureName: string) {
        return NatureDomainDict["features"][level][featureName];
    }

    static nature1(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addSpells(
          [...params.spellSelection, "ANIMAL FRIENDSHIP", "SPEAK WITH ANIMALS"],
          "wisdom"
        );
        pc.traits.armorProficiencies.push("Heavy");
        pc.pcHelper.addFeatures(
          {
            ...NatureDomain.getFeature("1", "ACOLYTE OF NATURE"),
            choices: params.spellSelection,
          },
          NatureDomain.getFeature("1", "BONUS PROFICIENCY")
        );
      }
    
      static nature2(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(
            NatureDomain.getFeature(
            "2",
            "CHANNEL DIVINITY: CHARM ANIMALS AND PLANTS"
          )
        );
      }
    
      static nature3(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addSpells(["BARKSKIN", "SPIKE GROWTH"], "wisdom");
      }
    
      static nature5(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addSpells(["PLANT GROWTH", "WIND WALL"], "wisdom");
      }
    
      static nature6(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(
            NatureDomain.getFeature("6", "DAMPEN ELEMENTS")
        );
      }
    
      static nature7(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addSpells(["DOMINATE BEAST", "GRASPING VINE"], "wisdom");
      }
    
      static nature8(pc: PlayerCharacter, params: LevelingParams) {
        const divineStrike: ScalingTrait = {
          title: "Divine Strike",
          description:
            "Dice used for Divine Strike (cold, fire, or lightning damage).",
          dice: "1d8",
        };
        pc.pcHelper.addScalingTraits(divineStrike);
        pc.pcHelper.addFeatures(NatureDomain.getFeature("8", "DIVINE STRIKE"));
      }
    
      static nature9(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addSpells(["INSECT PLAGUE", "TREE STRIDE"], "wisdom");
      }
    
      static nature17(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(
            NatureDomain.getFeature("17", "MASTER OF NATURE")
        );
      }
}