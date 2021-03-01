import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import { SorcererSubclass, SorcererSubclassParams } from "../SorcererSubclass";
import * as DivineSoulArchetypeDict from "./DivineSoul.json"


export class DivineSoul {

  static getFeature(level: string, featureName: string) {
    return DivineSoulArchetypeDict["features"][level][featureName];
  }

  static getSpell(pc: PlayerCharacter, align: string) {
    pc.pcHelper.addSpells(DivineSoul.spells[align],"charisma");
  }
  static divineSoul1(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(DivineSoul.getFeature("1", "DIVINE MAGIC"), DivineSoul.getFeature("1", "FAVORED BY THE GODS"))
    DivineSoul.getSpell(pc,(params.subclassParams as SorcererSubclassParams).affinity);
  }

  static divineSoul6(pc: PlayerCharacter, params: LevelingParams) {      
    pc.pcHelper.addFeatures(DivineSoul.getFeature("6", "EMPOWERED HEALING"))
  }

  static divineSoul14(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(DivineSoul.getFeature("14", "OTHERWORLDLY WINGS"))
  }

  static divineSoul18(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(DivineSoul.getFeature("17", "UNEARTHLY RECOVERY"))
  }

  static spells = {
    "Good": ["CURE WOUNDS"],
    "Evil": ["INFLICT WOUNDS"],
    "Law": ["BLESS"],
    "Chaos": ["BANE"],
    "Neutrality": ["PROTECTION FROM EVIL AND GOOD"]
  }
}