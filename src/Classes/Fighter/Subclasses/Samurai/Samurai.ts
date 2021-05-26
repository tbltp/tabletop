import { ResourceTrait, ScalingTrait } from "Base/Interfaces";
import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams, PlayerClass } from "../../../../Classes/PlayerClass";
import * as SamuraiArchetype from "./Samurai.json"
import * as Languages from "../../../../../Assets/Languages.json";

export class Samurai {

  static getFeature(level: string, featureName: string) {
    return SamuraiArchetype["features"][level][featureName];
  }

  static upSpirit(pc: PlayerCharacter) {
    pc.pcHelper.findFeatureTraitByName("Fighting Spirit").scaling.bonus+=5;
  }
  static samurai3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Samurai.getFeature("3", "BONUS PROFICIENCY"), Samurai.getFeature("3", "FIGHTING SPIRIT"));
    pc.pcHelper.addEffectsToClassFeature("Fighting Spirit", {resource: {resourceMax: {value: 3}}, scaling: {bonus: 5}})
    
    params.subclassParams.skillProficiencies.length > 0 ?    
    pc.skills[params.subclassParams.skillProficiencies[0]].proficient = true :
    pc.traits.languages.add(Languages[params.subclassParams.languages[0]]);
  }

  static samurai7(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Samurai.getFeature("7", "ELEGANT COURTIER"));
    if(params.subclassParams.savingThrows) {
      pc.abilityScores[params.subclassParams.savingThrows[0]].savingThrowProficiency = true;
    }
  }

  static samurai10(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Samurai.getFeature("10", "TIRELESS SPIRIT"));
    Samurai.upSpirit(pc);
  }

  static samurai15(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Samurai.getFeature("15", "RAPID STRIKE"));
    Samurai.upSpirit(pc);
  }

  static samurai18(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Samurai.getFeature("18", "STRENGTH BEFORE DEATH"));
  }
}