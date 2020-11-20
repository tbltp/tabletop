import { PlayerCharacter } from "Base/PlayerCharacter";
import { LevelingParams } from "../../../PlayerClass";
import * as KnowledgeDomainDict from "./Knowledge.json";
import * as Languages from "../../../../../Assets/Languages.json";

export class KnowledgeDomain {
    
    static getFeature(level: string, featureName: string) {
        return KnowledgeDomainDict["features"][level][featureName];
    }
  
    static knowledge1(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["COMMAND", "IDENTIFY"], "wisdom");
    
        // Languages
        pc.traits.languages.push(
          Languages[params.subclassSelection.options[0]],
          Languages[params.subclassSelection.options[1]]
        ); // Languages, How do we pass this?
        for (const skill of params.proficiencySelection) {
          // Skill Proficiencies / Expertise
          pc.skills[skill].proficient = true;
          pc.skills[skill].expertise = true;
        }
        pc.addFeatures({
          ...KnowledgeDomain.getFeature("1", "BLESSINGS OF KNOWLEDGE"),
          choices: [
            ...params.subclassSelection.options,
            ...params.proficiencySelection,
          ],
        });
      }
    
      static knowledge2(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(
            KnowledgeDomain.getFeature(
            "2",
            "THE KNOWLEDGE OF THE AGES"
          )
        );
      }
    
      static knowledge3(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["AUGURY", "SUGGESTION"], "wisdom");
      }
    
      static knowledge5(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["NONDETECTION", "SPEAK WITH DEAD"], "wisdom");
      }
    
      static knowledge6(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(
            KnowledgeDomain.getFeature(
            "6",
            "CHANNEL DIVINITY: READ THOUGHTS"
          )
        );
      }
    
      static knowledge7(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["ARCANE EYE", "CONFUSION"], "wisdom");
      }
    
      static knowledge8(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(
            KnowledgeDomain.getFeature("8", "POTENT SPELLCASTING")
        );
      }
    
      static knowledge9(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["LEGEND LORE", "SCRYING"], "wisdom");
      }
    
      static knowledge14(pc: PlayerCharacter, params: LevelingParams) {
        pc.findScalingTraitByName("Divine Strike").dice = "2d8";
      }
    
      static knowledge17(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(
            KnowledgeDomain.getFeature("17", "VISION OF THE PAST")
        );
      }  
}