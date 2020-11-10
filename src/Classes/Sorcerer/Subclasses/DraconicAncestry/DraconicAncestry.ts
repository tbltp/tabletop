import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams } from "Classes/PlayerClass";
import * as DraconicAncestryArchetypeDict from "./DraconicAncestry.json"
import * as DraconicBloodline from "../../../../../Assets/DraconicBloodline.json"


export class DraconicAncestry {

    static getFeature(level: string, featureName: string) {
        return DraconicAncestryArchetypeDict["features"][level][featureName];
    }

    static draconicAncestry1(pc: PlayerCharacter, params: LevelingParams) {
        /** TO DO
         * Draconic Resilience: HpMax++ every level, add armor class
         * Dragon Ancestor: Figure out how to reflect choice, and damage in one line.
         */
    }
  
    static draconicAncestry6(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(DraconicAncestry.getFeature("6", "ELEMENTAL AFFINITY"))
    }
  
    static draconicAncestry14(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(DraconicAncestry.getFeature("14", "DRAGON WINGS"))
    }
  
    static draconicAncestry18(pc: PlayerCharacter, params: LevelingParams) {
      pc.addFeatures(DraconicAncestry.getFeature("18", "DRACONIC PRESENCE"))
    }
}