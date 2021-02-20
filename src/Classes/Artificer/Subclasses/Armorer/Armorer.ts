import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../PlayerClass";
import * as ArmorerDict from "./Armorer.json";

export class Armorer {

  static getFeature(level: string, featureName: string) {
      return ArmorerDict["features"][level][featureName];
  }

  static addArmorerSpells(pc: PlayerCharacter, level: string){
    pc.pcHelper.addSpells(this.armorerSpells[level], "intelligence");
  }

  static armorer3(pc: PlayerCharacter, params: LevelingParams) {
    pc.traits.toolProficiencies.add(params.subclassParams.options[0]);
    pc.traits.armorProficiencies.add("Heavy");
    pc.pcHelper.addFeatures(
        Armorer.getFeature("3", "ARCANE ARMOR"),
        Armorer.getFeature("3", "ARMOR MODEL")
    );
    Armorer.addArmorerSpells(pc, "3");
  }

  static armorer5(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Armorer.getFeature("5", "EXTRA ATTACK"));
    Armorer.addArmorerSpells(pc, "5");
  }
  
  static armorer9(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Armorer.getFeature("9", "ARMOR MODIFICATIONS"));
    pc.pcHelper.findResourceTraitByName("Infused Items").resourceMax.value += 2;
    Armorer.addArmorerSpells(pc, "9");
  }

  static armorer13(pc: PlayerCharacter, params: LevelingParams) {
    Armorer.addArmorerSpells(pc, "13");
  }

  static armorer15(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Armorer.getFeature("15", "PERFECTED ARMOR"));
    pc.pcHelper.addResourceTraits({
        title: "Perfected Armor: Guardian Uses",
        description: "Number of times you can use the effect of your Perfected Armor: Guardian abiility.",
        resourceMax: pc.proficiency.baseBonus
    });
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