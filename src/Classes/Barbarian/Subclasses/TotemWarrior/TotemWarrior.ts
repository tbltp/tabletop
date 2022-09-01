import { PlayerCharacter } from "../../../../Character/PlayerCharacter";
import { LevelingParams } from "../../../PlayerClass";
import { BarbarianSubclassParams } from "../BarbarianSubclass";
import * as TotemWarriorDict from "./TotemWarrior.json";

export class TotemWarrior {

  static getFeature(level: string, featureName: string) {
    return TotemWarriorDict["features"][level][featureName];
  }

  static totemWarrior3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
      TotemWarrior.getFeature("3", "SPIRIT SEEKER"),
      TotemWarrior.getFeature(
        "3",
        (params.subclassParams as BarbarianSubclassParams).totem
      )
    );
    pc.pcHelper.addSpells(["BEAST SENSE", "SPEAK WITH ANIMALS"], "None");
  }
  
  static totemWarrior6(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
      TotemWarrior.getFeature(
        "6",
        (params.subclassParams as BarbarianSubclassParams).totem
        )
    );
  }
  
  static totemWarrior10(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
      TotemWarrior.getFeature("10", "SPIRIT WALKER")
    );
    pc.pcHelper.addSpells(["COMMUNE WITH NATURE"], "None");
  }
  
  static totemWarrior14(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
      TotemWarrior.getFeature(
        "14",
        (params.subclassParams as BarbarianSubclassParams).totem
      )
    );
  }
}