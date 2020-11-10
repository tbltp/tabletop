import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams } from "Classes/PlayerClass";
import * as AssassinArchetypeDict from "./Assassin.json"

export class Assassin {

    static getFeature(level: string, featureName: string) {
        return AssassinArchetypeDict["features"][level][featureName];
    }

    static assassin3(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(Assassin.getFeature("3", "BONUS PROFICIENCIES"), Assassin.getFeature("3", "ASSASSINATE"));
        pc.traits.toolProficiencies.push("Poisoner's Kit", "Disguise Kit")
      }
    
      static assassin9(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(Assassin.getFeature("9", "INFILTRATION EXPERTISE"));
      }
    
      static assassin13(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(Assassin.getFeature("13", "IMPOSTER"));
      }
    
      static assassin17(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(Assassin.getFeature("17", "DEATH STRIKE"));
      }
    
}