import { ResourceTrait, Trait } from "Base/Interfaces";
import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams, PlayerClass } from "../../../../Classes/PlayerClass";
import * as CavalierArchetype from "./Cavalier.json"
import * as Languages from "../../../../../Assets/Languages.json";

export class Cavalier {

  static getFeature(level: string, featureName: string) {
    return CavalierArchetype["features"][level][featureName];
  }

  //only need to run this on ability score increases
  static upWarding(pc:PlayerCharacter) {
    const wardingManeuver: ResourceTrait = pc.pcHelper.findResourceTraitByName("Warding Maneuver");
    wardingManeuver.resourceMax.value = pc.abilityScores.constitution.modifier.value;
  }

  static cavalier3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Cavalier.getFeature("3", "BONUS PROFICIENCY"));
    pc.skills[params.proficiencySelection[0]].proficient = true;
    pc.traits.languages.push(Languages[params.subclassSelection.options[0]]);
    pc.pcHelper.addFeatures(Cavalier.getFeature("3", "BORN TO THE SADDLE"));
    pc.pcHelper.addFeatures(Cavalier.getFeature("3", "UNWAVERING MARK"));
  }

  static cavalier7(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Cavalier.getFeature("7", "WARDING MANEUVER"));
    const wardingManeuver: ResourceTrait = {
      title: "Warding Maneuver",
      description: "Number of times you may use Warding Maneuver",
      dice: "1d8",
      resourceMax: {value: pc.abilityScores.constitution.modifier.value}
    }
    pc.pcHelper.addResourceTraits(wardingManeuver);
  }

  static cavalier10(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Cavalier.getFeature("10", "HOLD THE LINE"));
    PlayerClass.addFightingStyle(pc, params.fightingStyle[0]);  // move add fighting style to PC 

  }

  static cavalier15(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Cavalier.getFeature("15", "FEROCIOUS CHARGER"));
  }

  static cavalier18(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Cavalier.getFeature("18", "VIGILANT DEFENDER"));
  }
}