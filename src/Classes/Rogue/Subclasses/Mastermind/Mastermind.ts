import * as Languages from "../../../../../Assets/Languages.json";
import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import { RogueSubclassParams } from "../RogueSubclass";
import * as MastermindArchetypeDict from "./Mastermind.json"

export class Mastermind {

  static getFeature(level: string, featureName: string) {
    return MastermindArchetypeDict["features"][level][featureName];
  }

  static mastermind3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
      Mastermind.getFeature("3", "MASTER OF INTRIGUE"), 
      Mastermind.getFeature("3", "MASTER OF TACTICS")
    );
    
    pc.traits.toolProficiencies.add("Forgery Kit");
    pc.traits.toolProficiencies.add("Disguise Kit");
    pc.traits.toolProficiencies.add((params.subclassParams as RogueSubclassParams).gamingSet[0]);
    params.subclassParams.languages.map(l => pc.traits.languages.add(Languages[l]));
  }
  
  static mastermind9(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Mastermind.getFeature("9", "INSIGHTFUL MANIPULATOR"));
  }

  static mastermind13(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Mastermind.getFeature("13", "MISDIRECTION"));
  }

  static mastermind17(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Mastermind.getFeature("17", "SOUL OF DECEIT"));
  }
}