import { PlayerCharacter } from "../../../../Character/PlayerCharacter";
import { LevelingParams, PlayerClass } from "../../../PlayerClass";
import * as ArmorerDict from "./Armorer.json";

export class Armorer {

  static getFeature(level: string, featureName: string) {
      return ArmorerDict["features"][level][featureName];
  }

  static addArmorerSpells(pc: PlayerCharacter, level: string){
    pc.pcHelper.addSpells(this.armorerSpells[level], "intelligence");
  }

  static armorer3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
        Armorer.getFeature("3", "ARCANE ARMOR"),
        Armorer.getFeature("3", "ARMOR MODEL")
    );
    Armorer.addArmorerSpells(pc, "3");
    pc.traits.toolProficiencies.add(params.subclassParams.toolProficiencies[0]);
    pc.traits.armorProficiencies.add("Heavy");
  }

  static armorer5(pc: PlayerCharacter, params: LevelingParams) {
    if(!pc.pcHelper.findFeatureTraitByName("Extra Attack")) {
      pc.pcHelper.addFeatures(Armorer.getFeature("5", "EXTRA ATTACK"));
      pc.pcHelper.addEffectsToFeature("Extra Attack", {scaling: {uses: 1}})
    }
    Armorer.addArmorerSpells(pc, "5");
  }
  
  static armorer9(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Armorer.getFeature("9", "ARMOR MODIFICATIONS"));
    Armorer.addArmorerSpells(pc, "9");
    pc.pcHelper.findFeatureTraitByName("Infuse Items").resource.resourceMax.value += 2;
  }

  static armorer13(pc: PlayerCharacter, params: LevelingParams) {
    Armorer.addArmorerSpells(pc, "13");
  }

  static armorer15(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Armorer.getFeature("15", "PERFECTED ARMOR"));
    pc.pcHelper.addEffectsToFeature("Perfected Armor", { resource: { resourceMax: pc.charProficiency.baseBonus } } );
  }

  static armorer17(pc: PlayerCharacter, params: LevelingParams) {
    Armorer.addArmorerSpells(pc, "17");
  }

  static armorerSpells = {
      "3": ["MAGIC MISSLE", "THUNDERWAVE"],
      "5": ["MIRROR IMAGE", "SHATTER"],
      "9": ["HYPNOTIC PATTERN", "LIGHTNING BOLT"],
      "13": ["FIRE SHIELD", "GREATER INVISIBILITY"],
      "17": ["PASS WALL", "WALL OF FORCE"]
  }

}