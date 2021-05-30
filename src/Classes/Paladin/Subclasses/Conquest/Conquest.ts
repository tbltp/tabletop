import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams, PlayerClass } from "../../../../Classes/PlayerClass";
import * as ConquestOathDict from "./OathOfConquest.json"
import {ScalingTrait} from "../../../../Base/Interfaces"

export class Conquest {
  
  static getFeature(level: string, featureName: string) {
    return ConquestOathDict["features"][level][featureName];
  }

  static addArchetypeSpells(pc: PlayerCharacter, level: string){
    pc.pcHelper.addSpells(this.oathSpells[level], "charisma");
  }
  
  static improveAura(pc: PlayerCharacter,params: LevelingParams){
    pc.pcHelper.findFeatureTraitByName("Aura of Conquest").scaling.bonus++;
  }

  static conquest3(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
      Conquest.getFeature("3", "CONQUERING PRESENCE"),
      Conquest.getFeature("3", "GUIDED STRIKE")
    );
    Conquest.addArchetypeSpells(pc, "3");
  }

  static conquest5(pc: PlayerCharacter, params: LevelingParams) {
    Conquest.addArchetypeSpells(pc, "5");
  }

  static conquest7(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Conquest.getFeature("7", "AURA OF CONQUEST"));
    pc.pcHelper.addEffectsToFeature("Aura of Conquest", {scaling: {bonus: 3}})
  }

  static conquest9(pc: PlayerCharacter, params: LevelingParams) {
    Conquest.addArchetypeSpells(pc, "9");
  }

  static conquest13(pc: PlayerCharacter, params: LevelingParams) {
    Conquest.addArchetypeSpells(pc, "13");
  }

  static conquest15(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Conquest.getFeature("15", "SCORNFUL REBUKE"));
  }

  static conquest17(pc: PlayerCharacter, params: LevelingParams) {
    Conquest.addArchetypeSpells(pc, "17");
  }

  static conquest20(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(Conquest.getFeature("20", "INVINCIBLE CONQUEROR"));
    Conquest.improveAura(pc, params);
  }

  static oathSpells = {
    "3": ["ARMOR OF AGATHYS", "COMMAND"],
    "5": ["HOLD PERSON", "SPIRITUAL WEAPON"],
    "9": ["BESTOW CURSE", "FEAR"],
    "13": ["DOMINATE BEAST", "STONESKIN"],
    "17": ["CLOUDKILL", "DOMINATE PERSON"]
  };
}