import { ResourceTrait, Trait } from "../../../../Base/Interfaces";
import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import { FighterLevelingParams } from "../../Fighter";
import * as BattleMasterDict from "./BattleMaster.json";
import * as Maneuvers from "./Maneuvers.json";

export class BattleMaster {
  static getFeature(level: string, featureName: string) {
    return BattleMasterDict["features"][level][featureName];
  }

  static battleMaster3(pc: PlayerCharacter, params: FighterLevelingParams) {
    // superiority dice
    const superiorityDice: ResourceTrait = {
      title: "Superiority Dice",
      description: "Number of superiority dice you can use for maneuvers",
      resourceMax: { value: 4 },
      dice: "d8",
    };

    pc.traits.toolProficiencies.add(params.toolProficiency);
    pc.pcHelper.addResourceTraits(superiorityDice);
    pc.pcHelper.addFeatures(
      BattleMaster.getFeature("3", "COMBAT SUPERIORITY"),
      BattleMaster.getFeature("3", "STUDENT OF WAR")
    );
    BattleMaster.handleManeuverSelections(pc, params);
  }

  static battleMaster7(pc: PlayerCharacter, params: FighterLevelingParams) {
    BattleMaster.handleManeuverSelections(pc, params);
    pc.pcHelper.addFeatures(BattleMaster.getFeature("7", "KNOW YOUR ENEMY"));
  }

  static battleMaster10(pc: PlayerCharacter, params: FighterLevelingParams) {
    BattleMaster.handleManeuverSelections(pc, params);
    pc.pcHelper.addFeatures(
      BattleMaster.getFeature("7", "IMPROVED COMBAT SUPERIORITY")
    );
    pc.pcHelper.findResourceTraitByName("Superiority Dice").dice = "d10";
  }

  static battleMaster15(pc: PlayerCharacter, params: FighterLevelingParams) {
    BattleMaster.handleManeuverSelections(pc, params);
    pc.pcHelper.addFeatures(BattleMaster.getFeature("7", "RELENTLESS"));
  }

  static battleMaster18(pc: PlayerCharacter, params: FighterLevelingParams) {
    pc.pcHelper.findResourceTraitByName("Superiority Dice").dice = "d12";
  }

  static handleManeuverSelections(
    pc: PlayerCharacter,
    params: FighterLevelingParams
  ) {

    const maneuvers: Trait[] = params.battleManeuvers.add.map(
      (m) => Maneuvers[m]
    );
    pc.pcHelper.addFeatures(...maneuvers);
    if (params.battleManeuvers.remove) {
      pc.pcHelper.removeFeatures(params.battleManeuvers.remove);
    }
  }
}
