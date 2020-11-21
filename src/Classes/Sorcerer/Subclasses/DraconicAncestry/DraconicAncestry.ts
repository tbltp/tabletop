import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as DraconicAncestryArchetypeDict from "./DraconicAncestry.json"
import * as DraconicBloodline from "../../../../../Assets/DraconicBloodline.json"


export class DraconicAncestry {

    static getFeature(level: string, featureName: string) {
        return DraconicAncestryArchetypeDict["features"][level][featureName];
    }

    static draconicAncestry1(pc: PlayerCharacter, params: LevelingParams) {

      pc.armorClasses.push({
        name: "Draconic Resilience",
        base: 13,
        modifier: [pc.abilityScores.dexterity.modifier],
        bonus: {value: 0}
      })

      pc.baseStats.HpMax.bonus.value++;

    }

    static draconicAncestry6(pc: PlayerCharacter, params: LevelingParams) {
      pc.pcHelper.addFeatures(DraconicAncestry.getFeature("6", "ELEMENTAL AFFINITY"))
      pc.baseStats.HpMax.bonus.value++;
    }
  
    static draconicAncestry14(pc: PlayerCharacter, params: LevelingParams) {
      pc.pcHelper.addFeatures(DraconicAncestry.getFeature("14", "DRAGON WINGS"))
      pc.baseStats.HpMax.bonus.value++;
    }
  
    static draconicAncestry18(pc: PlayerCharacter, params: LevelingParams) {
      pc.pcHelper.addFeatures(DraconicAncestry.getFeature("18", "DRACONIC PRESENCE"))
      pc.baseStats.HpMax.bonus.value++;
    }

    static draconicResilienceHpBonus(pc: PlayerCharacter, params: LevelingParams){
      pc.baseStats.HpMax.bonus.value++;
    }
}