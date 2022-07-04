import { PlayerCharacter } from "../../../../Character/PlayerCharacter";
import { LevelingParams } from "../../../PlayerClass";
import * as ArtilleristDict from "./Artillerist.json";

export class Artillerist {

  static getFeature(level: string, featureName: string) {
      return ArtilleristDict["features"][level][featureName];
  }

  static addArtilleristSpells(pc: PlayerCharacter, level: string){
    pc.pcHelper.addSpells(this.artilleristSpells[level], "intelligence");
  }

  static artillerist3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
      Artillerist.getFeature("3", "ELDRITCH CANNON"),
    );
    Artillerist.addArtilleristSpells(pc, "3");
    pc.traits.toolProficiencies.add(params.subclassParams.toolProficiencies[0]);
  }

  static artillerist5(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Artillerist.getFeature("5", "ARCANE FIREARM"));
    Artillerist.addArtilleristSpells(pc, "5");
  }
  
  static artillerist9(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Artillerist.getFeature("9", "EXPLOSIVE CANNON"));
    Artillerist.addArtilleristSpells(pc, "9");
  }

  static artillerist13(pc: PlayerCharacter, params: LevelingParams) {
    Artillerist.addArtilleristSpells(pc, "13");
  }

  static artillerist15(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Artillerist.getFeature("15", "FORTIFIED POSITION"));
  }

  static artillerist17(pc: PlayerCharacter, params: LevelingParams) {
    Artillerist.addArtilleristSpells(pc, "17");
  }

  static artilleristSpells = {
      "3": ["SHIELD", "THUNDERWAVE"],
      "5": ["SCORCHING RAY", "SHATTER"],
      "9": ["FIREBALL", "WIND WALL"],
      "13": ["ICE STORM", "WALL OF FIRE"],
      "17": ["CONE OF COLD", "WALL OF FORCE"]
  }

}