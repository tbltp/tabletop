import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams } from "Classes/PlayerClass";
import * as WildMagicArchetypeDict from "./WildMagic.json"


export class WildMagic {

    /** TO DO
     * Wild Magic Surge: DM Tool, Nice-To-Have, WildMagicSurge.json, + roller.
     */
    
    static getFeature(level: string, featureName: string) {
        return WildMagicArchetypeDict["features"][level][featureName];
    }

    static wildMagic1(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(WildMagic.getFeature("1", "WILD MAGIC SURGE"), WildMagic.getFeature("3", "TIDES OF CHAOS"))
      }
    
      static wildMagic6(pc: PlayerCharacter, params: LevelingParams) {      
        pc.addFeatures(WildMagic.getFeature("6", "BEND LUCK"))
      }
    
      static wildMagic14(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(WildMagic.getFeature("14", "CONTROLLED CHAOS"))
      }
    
      static wildMagic18(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(WildMagic.getFeature("17", "SPELL BOMBARDMENT"))
      }
}