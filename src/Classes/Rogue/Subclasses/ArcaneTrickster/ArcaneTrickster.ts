import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams } from "Classes/PlayerClass";
import { SpellSlotFactory } from "Classes/SpellSlotFactory";
import * as ArcaneTricksterArchetypeDict from "./ArcaneTrickster.json"


export class ArcaneTrickster {

    static getFeature(level: string, featureName: string) {
        return ArcaneTricksterArchetypeDict["features"][level][featureName];
    }

    static arcaneTrickster3(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(params.spellSelection, "intelligence")
        SpellSlotFactory.applySpellSlotsAtLevel(pc, 3, "TERTIARY")
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