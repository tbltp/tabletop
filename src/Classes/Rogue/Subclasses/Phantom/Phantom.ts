import { ResourceTrait, ScalingTrait } from "../../../../Base/Interfaces";
import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as PhantomArchetypeDict from "./Phantom.json"

export class Phantom {
  static getFeature(level: string, featureName: string) {
    return PhantomArchetypeDict["features"][level][featureName];
  }

  static upWails(pc: PlayerCharacter, params: LevelingParams) {
    const wails: ScalingTrait = pc.pcHelper.findScalingTraitByName("WAILS FROM THE GRAVE");
    wails.bonus++;
  }

  static phantom3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Phantom.getFeature("3", "WHISPERS OF THE DEAD"), 
    Phantom.getFeature("3", "WAILS FROM THE GRAVE"));
    const grave: ResourceTrait= {
      title: "Wails from the Grave",
      description: "The number of times you may use Wails from the Grave",
      resourceMax: pc.proficiency.baseBonus
    }
    const wails: ScalingTrait = {
      title: "Wails from the Grave",
      description: "The number of Sneak Attack dice you use with Wails from the Grave",
      bonus: 1
    }
    pc.pcHelper.addResourceTraits(grave);
    pc.pcHelper.addScalingTraits(wails);
  }

  static phantom9(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Phantom.getFeature("9", "TOKENS OF THE DEPARTED"));
    const tokens: ResourceTrait = {
      title: "Tokens of the Departed",
      description: "The maximum number of trinkets you may have at once",
      resourceMax: pc.proficiency.baseBonus
    }
    pc.pcHelper.addResourceTraits(tokens);
    Phantom.upWails(pc,params);
  }

  static phantom13(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Phantom.getFeature("13", "GHOST WALK"));
    Phantom.upWails(pc,params);
  }

  static phantom17(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Phantom.getFeature("17", "DEATH'S FRIEND"));
    Phantom.upWails(pc,params);
  }
}