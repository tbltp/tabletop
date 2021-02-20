import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../PlayerClass";
import * as AlchemistDict from "./Alchemist.json";

export class Alchemist {

  static getFeature(level: string, featureName: string) {
      return AlchemistDict["features"][level][featureName];
  }

  static addAlchemistSpells(pc: PlayerCharacter, level: string){
    pc.pcHelper.addSpells(this.alchemistSpells[level], "intelligence");
  }

  static alchemist3(pc: PlayerCharacter, params: LevelingParams) {
    pc.traits.toolProficiencies.add(params.subclassParams.options[0]);
    pc.pcHelper.addFeatures(Alchemist.getFeature("3", "EXPERIMENTAL ELIXIR"));
    pc.pcHelper.addResourceTraits({
        title: "Experimental Elixirs",
        description: "Number of experimental elixirs you can make per long rest.",
        resourceMax: {value: 1}
    })
    Alchemist.addAlchemistSpells(pc, "3");
  }

  static alchemist5(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Alchemist.getFeature("5", "ALCHEMICAL SAVANT"));
    Alchemist.addAlchemistSpells(pc, "5");
  }
  
  static alchemist6(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.findResourceTraitByName("Experimental Elixirs").resourceMax.value++;
  }
  
  static alchemist9(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Alchemist.getFeature("9", "RESTORATIVE REAGANTS"));
    Alchemist.addAlchemistSpells(pc, "9");
  }
  
  static alchemist13(pc: PlayerCharacter, params: LevelingParams) {
    Alchemist.addAlchemistSpells(pc, "13");
  }

  static alchemist15(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Alchemist.getFeature("15", "CHEMICAL MASTERY"));
    pc.pcHelper.findResourceTraitByName("Experimental Elixirs").resourceMax.value++;
  }

  static alchemist17(pc: PlayerCharacter, params: LevelingParams) {
    Alchemist.addAlchemistSpells(pc, "17");
  }

  static alchemistSpells = {
      "3": ["HEALING WORD", "RAY OF SICKNESS"],
      "5": ["FLAMING SPHERE", "MELF'S ACID ARROW"],
      "9": ["GASEOUS FORM", "MASS HEALING WORD"],
      "13": ["BLIGHT", "DEATH WARD"],
      "17": ["CLOUDKILL", "RAISE DEAD"]
  }

}