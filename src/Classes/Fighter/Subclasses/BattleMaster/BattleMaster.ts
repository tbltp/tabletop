import { ResourceTrait, Trait } from "../../../../Base/Interfaces";
import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import { FighterSubclassParams } from "../FighterSubclass";
import * as BattleMasterDict from "./BattleMaster.json";
import * as Maneuvers from "./Maneuvers.json";

export class BattleMaster {
  static getFeature(level: string, featureName: string) {
    return BattleMasterDict["features"][level][featureName];
  }

  static battleMaster3(pc: PlayerCharacter, params: LevelingParams) {
    // superiority dice
    const superiorityDice: ResourceTrait = {
      title: "Superiority Dice",
      description: "Number of superiority dice you can use for maneuvers",
      resourceMax: { value: 4 },
      dice: "d8",
    };

    pc.traits.toolProficiencies.add(params.subclassParams.toolProficiencies[0]);
    pc.pcHelper.addResourceTraits(superiorityDice);
    pc.pcHelper.addFeatures(
      BattleMaster.getFeature("3", "COMBAT SUPERIORITY"),
      BattleMaster.getFeature("3", "STUDENT OF WAR")
    );
    BattleMaster.handleManeuverSelections(pc, params);
  }

  static battleMaster7(pc: PlayerCharacter, params: LevelingParams) {
    BattleMaster.handleManeuverSelections(pc, params);
    pc.pcHelper.addFeatures(BattleMaster.getFeature("7", "KNOW YOUR ENEMY"));
  }

  static battleMaster10(pc: PlayerCharacter, params: LevelingParams) {
    BattleMaster.handleManeuverSelections(pc, params);
    pc.pcHelper.addFeatures(
      BattleMaster.getFeature("7", "IMPROVED COMBAT SUPERIORITY")
    );
    pc.pcHelper.findResourceTraitByName("Superiority Dice").dice = "d10";
  }

  static battleMaster15(pc: PlayerCharacter, params: LevelingParams) {
    BattleMaster.handleManeuverSelections(pc, params);
    pc.pcHelper.addFeatures(BattleMaster.getFeature("7", "RELENTLESS"));
  }

  static battleMaster18(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.findResourceTraitByName("Superiority Dice").dice = "d12";
  }

  static handleManeuverSelections(
    pc: PlayerCharacter,
    params: LevelingParams
  ) {

    const maneuvers: Trait[] = (params.subclassParams as FighterSubclassParams).maneuverSelections.add.map(
      (m) => Maneuvers[m]
    );
    pc.pcHelper.addFeatures(...maneuvers);
    if ((params.subclassParams as FighterSubclassParams).maneuverSelections.remove) {
      pc.pcHelper.removeFeatures((params.subclassParams as FighterSubclassParams).maneuverSelections.remove);
    }
  }
}
