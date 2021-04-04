import { ResourceTrait, ScalingTrait } from "../../../../Base/Interfaces";
import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../PlayerClass";
import * as TwilightDomainDict from "./Twilight.json";


export class TwilightDomain {

  static getFeature(level: string, featureName: string) {
      return TwilightDomainDict["features"][level][featureName];
  }
  
  static getSpells(pc: PlayerCharacter, level: string){
    pc.pcHelper.addSpells(TwilightDomain.spells[level],"wisdom");
  }

  static upSanc(pc: PlayerCharacter) {
    const sanctuary = pc.pcHelper.findScalingTraitByName("TWILIGHT SANCTUARY");
    sanctuary.bonus++;
  }

  static twilight1(pc: PlayerCharacter, params: LevelingParams) {
    TwilightDomain.getSpells(pc,"1");
    pc.traits.armorProficiencies.add("Heavy");
    pc.traits.weaponProficiencies.add("Martial");
    pc.pcHelper.addFeatures(
      TwilightDomain.getFeature("1", "BONUS PROFICIENCIES"),
      TwilightDomain.getFeature("1", "EYES OF NIGHT"),
      TwilightDomain.getFeature("1", "VIGILANT BLESSING")
    );
    const eyes: ResourceTrait = {
      title: "Eyes of Night",
      description: "The number of creatures you may share Eyes of Night with",
      resourceMax: (pc.abilityScores.wisdom.modifier.value>=1)? pc.abilityScores.wisdom.modifier : {value: 1}
    }
    pc.pcHelper.addResourceTraits(eyes);
  }
  
  static twilight2(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
      TwilightDomain.getFeature("2", "TWILIGHT SANCTUARY")
    );
    const sanctuary: ScalingTrait = {
      title: "Twilight Sanctuary",
      description: "Temporary hit points granted by Twilight Sanctuary",
      dice: "1d6",
      bonus: 2
    }
    pc.pcHelper.addScalingTraits(sanctuary);
  }

  static twilight3(pc: PlayerCharacter, params: LevelingParams) {
    TwilightDomain.getSpells(pc,"3");
    TwilightDomain.upSanc(pc);
  }

  static twilight5(pc: PlayerCharacter, params: LevelingParams) {
    TwilightDomain.getSpells(pc,"5");
    TwilightDomain.upSanc(pc);
  }

  static twilight6(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(TwilightDomain.getFeature("6", "STEPS OF NIGHT"));
    const night: ResourceTrait = {
      title: "Steps of Night",
      description: "Number of times you may use Steps of Night",
      resourceMax: pc.proficiency.baseBonus
    }
    pc.pcHelper.addResourceTraits(night);
    TwilightDomain.upSanc(pc);
  }

  static twilight7(pc: PlayerCharacter, params: LevelingParams) {
    TwilightDomain.getSpells(pc,"7");
    TwilightDomain.upSanc(pc);
  }

  static twilight8(pc: PlayerCharacter, params: LevelingParams) {
    const divineStrike: ScalingTrait = {
      title: "Divine Strike",
      description: "Dice used for Divine Strike (radiant damage).",
      dice: "1d8",
    };
    pc.pcHelper.addScalingTraits(divineStrike);
    pc.pcHelper.addFeatures(TwilightDomain.getFeature("8", "DIVINE STRIKE"));
    TwilightDomain.upSanc(pc);
  }

  static twilight9(pc: PlayerCharacter, params: LevelingParams) {
    TwilightDomain.getSpells(pc,"9");
    TwilightDomain.upSanc(pc);
  }

  static twilight14(pc:PlayerCharacter,params:LevelingParams) {
    const divineStrike: ScalingTrait = pc.pcHelper.findScalingTraitByName("Divine Strike");
    divineStrike.dice = "2d8";
    TwilightDomain.upSanc(pc);
  }

  static twilight17(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(TwilightDomain.getFeature("17", "TWILIGHT SHROUD"));
    TwilightDomain.upSanc(pc);
  }

  static spells = {
    1: ["FAERIE FIRE","SLEEP"],
    3: ["MOONBEAM", "SEE INVISIBILITY"],
    5: ["AURA OF VITALITY", "LEOMUND'S TINY HUT"],
    7: ["AURA OF LIFE","GREATER INVISIBILITY"],
    9: ["CIRCLE OF POWER", "MISLEAD"]
  }
}