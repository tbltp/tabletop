import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams } from "../../../PlayerClass";
import * as KnowledgeDomainDict from "./Knowledge.json";
import * as Languages from "../../../../../Assets/Languages.json";

export class KnowledgeDomain {
    
  static getFeature(level: string, featureName: string) {
      return KnowledgeDomainDict["features"][level][featureName];
  }
  
  static getSpells(pc: PlayerCharacter, level: string){
    pc.pcHelper.addSpells(KnowledgeDomain.spells[level],"wisdom");
  }

  static knowledge1(pc: PlayerCharacter, params: LevelingParams) {;
    KnowledgeDomain.getSpells(pc,"1");
    // Languages
    pc.traits.languages.push(
      Languages[params.subclassParams.options[0]],
      Languages[params.subclassParams.options[1]]
    ); // Languages, How do we pass this?
    for (const skill of params.proficiencySelection) {
      // Skill Proficiencies / Expertise
      pc.skills[skill].proficient = true;
      pc.skills[skill].expertise = true;
    }
    pc.pcHelper.addFeatures({
      ...KnowledgeDomain.getFeature("1", "BLESSINGS OF KNOWLEDGE"),
      choices: [
        ...params.subclassParams.options,
        ...params.proficiencySelection,
      ],
    });
  }

  static knowledge2(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
        KnowledgeDomain.getFeature(
        "2",
        "THE KNOWLEDGE OF THE AGES"
      )
    );
  }

  static knowledge3(pc: PlayerCharacter, params: LevelingParams) {
    KnowledgeDomain.getSpells(pc,"3");
  }

  static knowledge5(pc: PlayerCharacter, params: LevelingParams) {
    KnowledgeDomain.getSpells(pc,"5");
  }

  static knowledge6(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
        KnowledgeDomain.getFeature(
        "6",
        "READ THOUGHTS"
      )
    );
  }

  static knowledge7(pc: PlayerCharacter, params: LevelingParams) {
    KnowledgeDomain.getSpells(pc,"7");
  }

  static knowledge8(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
        KnowledgeDomain.getFeature("8", "POTENT SPELLCASTING")
    );
  }

  static knowledge9(pc: PlayerCharacter, params: LevelingParams) {
    KnowledgeDomain.getSpells(pc,"9");
  }

  static knowledge14(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.findScalingTraitByName("Divine Strike").dice = "2d8";
  }

  static knowledge17(pc: PlayerCharacter, params: LevelingParams) {
    pc.pcHelper.addFeatures(
        KnowledgeDomain.getFeature("17", "VISION OF THE PAST")
    );
  } 

  static spells = {
    1: ["COMMAND","IDENTIFY"],
    3: ["AUGURY", "SUGGESTION"],
    5: ["NONDETECTION","SPEAK WITH DEAD"],
    7: ["ARCANE EYE","CONFUSION"],
    9: ["LEGEND LORE","SCRYING"]
  }
}