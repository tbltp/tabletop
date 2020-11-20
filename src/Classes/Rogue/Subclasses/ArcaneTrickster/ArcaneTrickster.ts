import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams } from "Classes/PlayerClass";
import * as ArcaneTricksterArchetypeDict from "./ArcaneTrickster.json"

export class ArcaneTrickster {

    static getFeature(level: string, featureName: string) {
        return ArcaneTricksterArchetypeDict["features"][level][featureName];
    }

    static arcaneTrickster3(pc: PlayerCharacter, params: LevelingParams) {

      // l0l FUCK
      // this.addSpellcasting(pc, "ROGUE (ARCANE TRICKSTER)");


        pc.addSpells(params.spellSelection, "intelligence")
        pc.addFeatures(ArcaneTrickster.getFeature("3", "MAGE HAND LEGERDEMAIN"));
      }
    
      static arcaneTrickster9(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(ArcaneTrickster.getFeature("9", "MAGICAL AMBUSH"));
      }
    
      static arcaneTrickster13(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(ArcaneTrickster.getFeature("13", "VERSATILE TRICKSTER"));
      }
    
      static arcaneTrickster17(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(ArcaneTrickster.getFeature("17", "SPELL THIEF"));
      }
}