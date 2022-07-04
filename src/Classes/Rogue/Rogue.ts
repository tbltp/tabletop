import { PlayerClass, LevelingParams, ClassCreationParams } from "../PlayerClass";
import { PlayerCharacter } from "../../Character/PlayerCharacter";
import { Trait } from "../../Character/Interfaces";
import * as RogueClassTraits from "./Rogue.json";
import { RogueSubclass } from "./Subclasses/RogueSubclass";

export class Rogue extends PlayerClass {
  constructor(params: ClassCreationParams)
 {
    super(
      "Rogue",
      [],
      params.skillProficiencies,
      [],
      ["Light"],
      ["Thieves' Tools"],
      [],
      [],
      [],
      [],
      "d8",
      8,
      []
    );

    this.characterStart(params.multiclass, params.weapons, params.equipmentPack);

    for (let level in this.abilitiesAtLevels) {
      const func: Function = this.abilitiesAtLevels[level];
      this.abilitiesAtLevels[level] = func.bind(this);
    }
  }

  characterStart(multiclass: boolean, weapons: string[], equipmentPack: string){
    if(!multiclass){
      this.weaponProficiencies.push("Simple", "Crossbow, hand", "Longsword", "Rapier", "Shortsword");
      this.weapons = [...weapons, "DAGGER", "DAGGER"];
      this.armor = ["LEATHER"];
      this.toolKits = ["THIEVES' TOOLS"];
      this.equipmentPack = equipmentPack;
      this.savingThrowProficiencies = ["dexterity", "intelligence"];

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

  pushRogueFeatures(pc: PlayerCharacter, level: number) {
    this.pushClassFeatures(pc, level, RogueClassTraits);
  }

  level1(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushRogueFeatures(pc, 1);
    pc.pcHelper.addEffectsToFeature("Sneak Attack", {scaling: {dice: "1d6"}})
    
    // Expertise
    const expert: Trait = pc.pcHelper.findFeatureTraitByName("Expertise");
    expert.choices = params.proficiencySelection;

    for (const proficiency of params.proficiencySelection) {
      pc.skills[proficiency].expertise = true;
    }
    
  }

  level2(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushRogueFeatures(pc, 2);
  }

  level3(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclass = new RogueSubclass(params.subclassParams);
    this.subclassDriver(pc, "3", params);    
    pc.pcHelper.findFeatureTraitByName("Sneak Attack").scaling.dice = "2d6";
  }

  level4(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "4", params);
  }

  level5(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushRogueFeatures(pc, 5);
    pc.pcHelper.findFeatureTraitByName("Sneak Attack").scaling.dice = "3d6";
  }

  level6(pc: PlayerCharacter, params: LevelingParams): void {
    pc.pcHelper.findFeatureTraitByName("Expertise").choices.push(...params.proficiencySelection);
    // Expertise
    for (const proficiency of params.proficiencySelection) {
      pc.skills[proficiency].expertise = true;
    }
  }

  level7(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushRogueFeatures(pc, 7);
    this.subclassDriver(pc, "7", params);
    pc.pcHelper.findFeatureTraitByName("Sneak Attack").scaling.dice = "4d6";
  }

  level8(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "8", params);
  }

  level9(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "9", params);    
    pc.pcHelper.findFeatureTraitByName("Sneak Attack").scaling.dice = "5d6";
  }

  level10(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "10", params);
    pc.pcHelper.improveAbilityScores(params.abilityScoreImprovement);
  }

  level11(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushRogueFeatures(pc, 11);
    this.subclassDriver(pc, "11", params);
    pc.pcHelper.findFeatureTraitByName("Sneak Attack").scaling.dice = "6d6";
  }

  level12(pc: PlayerCharacter, params: LevelingParams): void {
  }

  level13(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "13", params);    
    pc.pcHelper.findFeatureTraitByName("Sneak Attack").scaling.dice = "7d6";
  }

  level14(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushRogueFeatures(pc, 14);
    this.subclassDriver(pc, "14", params);
  }

  level15(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushRogueFeatures(pc, 15);
    pc.pcHelper.findFeatureTraitByName("Sneak Attack").scaling.dice = "8d6";
    // Slippery Mind
    pc.abilityScores.wisdom.savingThrowProficiency = true;
  }

  level16(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "16", params);
  }

  level17(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "17", params);
    pc.pcHelper.findFeatureTraitByName("Sneak Attack").scaling.dice = "9d6";
  }

  level18(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushRogueFeatures(pc, 18);
  }

  level19(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "19", params);
    pc.pcHelper.findFeatureTraitByName("Sneak Attack").scaling.dice = "10d6";
  }

  level20(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushRogueFeatures(pc, 20);
    this.subclassDriver(pc, "20", params);
  }
}

export class DSRogue extends Rogue {
  constructor(){
    super({ multiclass: true });
  }
}
