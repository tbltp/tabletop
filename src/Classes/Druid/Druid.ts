import { PlayerClass, LevelingParams } from "../PlayerClass";
import { PlayerCharacter } from "../../Base/PlayerCharacter";
import { ResourceTrait, ScalingTrait } from "../../Base/Interfaces";
import * as SpellList from "../../../Assets/SpellList.json";
import * as SpellcastingAbility from "../../../Assets/SpellcastingAbility.json";
import * as DruidClassTraits from "./Druid.json";
import { DruidSubclass } from "./Subclasses/DruidSubclass";

export class Druid extends PlayerClass {
  constructor(
    multiclass: boolean,
    firstLevelParams: LevelingParams,
    skillProficiencies?: string[],
    weapons?: string[],
    armor?: string[],
    druidicFocus?: string
  ) {
    super(
      "Druid",
      [],
      [],
      [],
      ["Light", "Medium", "Shield"],
      [],
      [],
      [],
      [],
      [],
      firstLevelParams,
      "d8",
      8,
      []
    );

    this.characterStart(multiclass, skillProficiencies, weapons, armor, druidicFocus);

    for (let level in this.abilitiesAtLevels) {
      const func: Function = this.abilitiesAtLevels[level];
      this.abilitiesAtLevels[level] = func.bind(this);
    }
  }

  characterStart(multiclass: boolean, skillProficiencies: string[], weapons: string[], armor: string[], druidicFocus: string){
    if(!multiclass) {  
      this.skillProficiencies = skillProficiencies;
      this.weaponProficiencies.push("Club", "Darts", "Javelin", "Mace", "Quarterstaff", "Scimitar", "Sickle", "Sling", "Spear");
      this.toolProficiencies.push("Herbalism Kit")
      this.weapons = weapons;
      this.armor = [...armor, "LEATHER"];
      this.equipment = [druidicFocus];
      this.equipmentPack = "EXPLORER";
      this.savingThrowProficiencies = ["intelligence", "wisdom"];
    }
  }
  
  abilitiesAtLevels = {
    "1": this.level1,
    "2": this.level2,
    "3": this.level3,
    "4": this.level4,
    "5": this.level5,
    "6": this.level6,
    "7": this.level7,
    "8": this.level8,
    "9": this.level9,
    "10": this.level10,
    "11": this.level11,
    "12": this.level12,
    "13": this.level13,
    "14": this.level14,
    "15": this.level15,
    "16": this.level16,
    "17": this.level17,
    "18": this.level18,
    "19": this.level19,
    "20": this.level20,
  };

  private pushDruidFeatures(pc: PlayerCharacter, level: number) {
    this.pushClassFeatures(pc, level, DruidClassTraits);
  }

  private handleDruidSpellSelections(
    pc: PlayerCharacter,
    params: LevelingParams
  ) {
    this.handleSpellSelections(pc, params, SpellcastingAbility["DRUID"]);
  }

  level1(pc: PlayerCharacter, params: LevelingParams): void {
    pc.pcHelper.addSpells(
      [...params.spellSelections.add, ...SpellList["Druid"][1]],
      SpellcastingAbility["DRUID"]
    );
    this.pushDruidFeatures(pc, 1); 
    this.addSpellcasting(pc, "DRUID");
  }

  level2(pc: PlayerCharacter, params: LevelingParams): void {
    // druid circle  
    // wild shape
    const wildShapeRes: ResourceTrait = {
      title: "Wild Shape",
      description: "Number of times you can Wild Shape",
      resourceMax: { value: 2 },
    };
    const wildShapeScale: ScalingTrait = {
      title: "Wild Shape",
      description:
        "Max challenge rating of beasts you can Wild Shape into (No flying or swimming speed).",
      challengeRating: 0.25,
    };
    pc.pcHelper.addResourceTraits(wildShapeRes);
    pc.pcHelper.addScalingTraits(wildShapeScale);
  
    this.subclass = new DruidSubclass(params.subclassSelection);
  
    this.subclassDriver(pc, "2", params);    
    this.pushDruidFeatures(pc, 2);
  }

  level3(pc: PlayerCharacter, params: LevelingParams): void {
    // Terrain spells
    this.subclassDriver(pc, "3", params); 
    pc.pcHelper.addSpells(
      [...SpellList["Druid"][2]],
      SpellcastingAbility["DRUID"]
    );   
  }

  level4(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleDruidSpellSelections(pc, params);
    pc.pcHelper.improveAbilityScores(params.abilityScoreImprovement);
    // wild shape
    const wildShapeScale: ScalingTrait = pc.pcHelper.findScalingTraitByName(
      "Wild Shape"
    );
    wildShapeScale.description =
      "Max challenge rating of beasts you can Wild Shape into (No flying speed).";

    this.subclassDriver(pc, "4", params);
  }

  level5(pc: PlayerCharacter, params: LevelingParams): void {
    pc.pcHelper.addSpells(
      [...SpellList["Druid"][3]],
      SpellcastingAbility["DRUID"]
    );
    
    // terrain spells
    this.subclassDriver(pc, "5", params);    

  }

  level6(pc: PlayerCharacter, params: LevelingParams): void {
    // druid circle
    this.subclassDriver(pc, "6", params);    
  }

  level7(pc: PlayerCharacter, params: LevelingParams): void {
    // terrain spells
    this.subclassDriver(pc, "7", params);    
    pc.pcHelper.addSpells(
      [...SpellList["Druid"][4]],
      SpellcastingAbility["DRUID"]
    );
  }

  level8(pc: PlayerCharacter, params: LevelingParams): void {
    pc.pcHelper.improveAbilityScores(params.abilityScoreImprovement);
    // wild shape
    const wildShapeScale: ScalingTrait = pc.pcHelper.findScalingTraitByName(
      "Wild Shape"
    );
    wildShapeScale.description =
      "Max challenge rating of beasts you can Wild Shape into.";

    this.subclassDriver(pc, "8", params);
  }

  level9(pc: PlayerCharacter, params: LevelingParams): void {
    // terrain spells
    this.subclassDriver(pc, "9", params);    
    pc.pcHelper.addSpells(
      [...SpellList["Druid"][5]],
      SpellcastingAbility["DRUID"]
    );
  }

  level10(pc: PlayerCharacter, params: LevelingParams): void {
    // druid circle
    this.subclassDriver(pc, "10", params);    
  }

  level11(pc: PlayerCharacter, params: LevelingParams): void {
    pc.pcHelper.addSpells(
      [...SpellList["Druid"][6]],
      SpellcastingAbility["DRUID"]
    );
    this.subclassDriver(pc, "11", params); 
  }

  level12(pc: PlayerCharacter, params: LevelingParams): void {
    pc.pcHelper.improveAbilityScores(params.abilityScoreImprovement);
    this.subclassDriver(pc, "12", params); 
  }

  level13(pc: PlayerCharacter, params: LevelingParams): void {
    pc.pcHelper.addSpells(
      [...SpellList["Druid"][7]],
      SpellcastingAbility["DRUID"]
    );
    this.subclassDriver(pc, "13", params); 
  }

  level14(pc: PlayerCharacter, params: LevelingParams): void {
    // druid circle
    this.subclassDriver(pc, "14", params);    
  }

  level15(pc: PlayerCharacter, params: LevelingParams): void {
    pc.pcHelper.addSpells(
      [...SpellList["Druid"][8]],
      SpellcastingAbility["DRUID"]
    );
    this.subclassDriver(pc, "15", params); 
  }

  level16(pc: PlayerCharacter, params: LevelingParams): void {
    pc.pcHelper.improveAbilityScores(params.abilityScoreImprovement);
    this.subclassDriver(pc, "16", params); 
  }

  level17(pc: PlayerCharacter, params: LevelingParams): void {
    pc.pcHelper.addSpells(
      [...SpellList["Druid"][9]],
      SpellcastingAbility["DRUID"]
    );
    this.subclassDriver(pc, "17", params); 
  }

  level18(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "18", params); 
  }

  level19(pc: PlayerCharacter, params: LevelingParams): void {
    pc.pcHelper.improveAbilityScores(params.abilityScoreImprovement);
    this.subclassDriver(pc, "19", params); 
  }

  level20(pc: PlayerCharacter, params: LevelingParams): void {
    // archdruid
    pc.pcHelper.findResourceTraitByName("Wild Shape").resourceMax.value = Infinity;
    this.pushDruidFeatures(pc, 20);
    this.subclassDriver(pc, "20", params); 
  }
}

export class DSDruid extends Druid {
  constructor(){
    super(true, {isNoInput: true});
  }
}