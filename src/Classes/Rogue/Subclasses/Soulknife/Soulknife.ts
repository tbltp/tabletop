import { ResourceTrait } from "../../../../Base/Interfaces";
import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as SoulknifeArchetypeDict from "./Soulknife.json"

export class Soulknife {
  static getFeature(level: string, featureName: string) {
    return SoulknifeArchetypeDict["features"][level][featureName];
  }

  static upPsi(pc:PlayerCharacter,params:LevelingParams) {
    const power: ResourceTrait = pc.pcHelper.findResourceTraitByName("PSIONIC POWER");
    power.resourceMax = {value: pc.proficiency.baseBonus.value*2}
  }

  static soulknife3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Soulknife.getFeature("3", "PSIONIC POWER"), Soulknife.getFeature("3", "PSYCHIC BLADES"));
    const power: ResourceTrait = {
      title: "Psionic Power",
      description: "The number and size of dice for Psionic Power",
      dice: "d6",
      resourceMax: {value: pc.proficiency.baseBonus.value*2} 
    }
    const whispers: ResourceTrait= {
      title: "Psychic Whispers",
      description: "The number of creatures you may target with Psychic Whispers",
      resourceMax: pc.proficiency.baseBonus
    }
    pc.pcHelper.addResourceTraits(whispers);
    pc.pcHelper.addResourceTraits(power);
  }

  static soulknife5(pc:PlayerCharacter,params: LevelingParams) {
    const power: ResourceTrait = pc.pcHelper.findResourceTraitByName("PSIONIC POWER");
    power.dice = "d8";
    Soulknife.upPsi(pc,params);
  }

  static soulknife9(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Soulknife.getFeature("9", "SOUL BLADES"));
    Soulknife.upPsi(pc,params);
  }

  static soulknife11(pc:PlayerCharacter,params: LevelingParams) {
    const power: ResourceTrait = pc.pcHelper.findResourceTraitByName("PSIONIC POWER");
    power.dice = "d10";
  }

  static soulknife13(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Soulknife.getFeature("13", "PSYCHIC VEIL"));
    Soulknife.upPsi(pc,params);
  }

  static soulknife17(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Soulknife.getFeature("17", "REND MIND"));
    const power: ResourceTrait = pc.pcHelper.findResourceTraitByName("PSIONIC POWER");
    power.dice = "d12";
    Soulknife.upPsi(pc,params);
  }
}