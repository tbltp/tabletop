import { PlayerClass, LevelingParams } from "../PlayerClass";
import { PlayerCharacter } from "../../Base/PlayerCharacter";
import { ResourceTrait } from "../../Base/Interfaces";
import * as SpellList from "../../../Assets/SpellList.json";
import * as SpellcastingAbility from "../../../Assets/SpellcastingAbility.json";
import * as RangerClassTraits from "./Ranger.json";
import { RangerSubclass } from "./Subclasses/RangerSubclass";
import { SpellSlotFactory } from "../SpellSlotFactory";

export class Ranger extends PlayerClass {
  constructor(
    multiclass: boolean,
    skillProficiencies: string[],
    firstLevelParams: RangerLevelingParams,
    weapons?: string[],
    armor?: string[],
    equipmentPack?: string,
  ) {
    super(
      "Ranger",
      [],
      skillProficiencies,
      ["Simple", "Martial"],
      ["Light", "Medium", "Shield"],
      [],
      [],
      [],
      [],
      [],
      firstLevelParams,
      "d10",
      10,
      []
    );

    this.characterStart(multiclass, weapons, armor, equipmentPack);

    for (let level in this.abilitiesAtLevels) {
      const func: Function = this.abilitiesAtLevels[level];
      this.abilitiesAtLevels[level] = func.bind(this);
    }
  }

  characterStart(multiclass: boolean, weapons: string[], armor: string[], equipmentPack: string){
    if(!multiclass){
      this.weapons = [...weapons, "LONGBOW"];
      this.armor = armor;
      this.equipmentPack = equipmentPack;
      this.savingThrowProficiencies = ["strength", "dexterity"];
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

  private pushRangerFeatures(pc: PlayerCharacter, level: number) {
    this.pushClassFeatures(pc, level, RangerClassTraits);
  }

  private handleRangerSpellSelections(
    pc: PlayerCharacter,
    params: LevelingParams
  ): void {
    this.handleSpellSelections(pc, params, SpellcastingAbility["RANGER"]);
  }

  level1(pc: PlayerCharacter, params: RangerLevelingParams): void {
    PlayerClass.pushCustomizedClassFeature(
      pc, 
      1, 
      RangerClassTraits, 
      "FAVORED ENEMY", 
      [params.favoredEnemy]
    );
    PlayerClass.pushCustomizedClassFeature(
      pc,
      1,
      RangerClassTraits,
      "NATURAL EXPLORER",
      [params.favoredTerrain]
    );

    this.addSpellcasting(pc, "RANGER");

  }

  level2(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleRangerSpellSelections(pc, params);
    PlayerClass.addFightingStyle(pc, params.fightingStyle[0]);
  }

  level3(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleRangerSpellSelections(pc, params);
    this.subclass = new RangerSubclass(params.subclassSelection);
    this.subclassDriver(pc, "3", params);
    this.pushRangerFeatures(pc, 3);
  }

  level4(pc: PlayerCharacter, params: LevelingParams): void {
    pc.pcHelper.improveAbilityScores(params.abilityScoreImprovement);
    this.pushRangerFeatures(pc, 4);
    this.subclassDriver(pc, "4", params);
  }

  level5(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleRangerSpellSelections(pc, params);
    this.pushRangerFeatures(pc, 5);
    if(!pc.pcHelper.findResourceTraitByName("Extra Attack")){
      pc.pcHelper.addResourceTraits({
        title: "Extra Attack",
        description: "Number of Extra Attacks you can make.",
        resourceMax: { value: 1 },
      });
    }
    this.subclassDriver(pc, "5", params);
  }

  level6(pc: PlayerCharacter, params: RangerLevelingParams): void {
    pc.pcHelper.findFeatureTraitByName("Favored Enemy").choices.push(
      params.favoredEnemy
    );
    pc.pcHelper.findFeatureTraitByName("Natural Explorer").choices.push(
      params.favoredTerrain
    );
    this.pushRangerFeatures(pc, 6);
    this.subclassDriver(pc, "6", params);
  }

  level7(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleRangerSpellSelections(pc, params);
    this.subclassDriver(pc, "7", params);
  }

  level8(pc: PlayerCharacter, params: LevelingParams): void {
    pc.pcHelper.improveAbilityScores(params.abilityScoreImprovement);
    this.pushRangerFeatures(pc, 8);
    this.subclassDriver(pc, "8", params);
  }

  level9(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleRangerSpellSelections(pc, params);
    this.subclassDriver(pc, "9", params);
  }

  level10(pc: PlayerCharacter, params: RangerLevelingParams): void {
    this.pushRangerFeatures(pc, 10);
    pc.pcHelper.findFeatureTraitByName("Natural Explorer").choices.push(
      params.favoredTerrain
    );
    this.subclassDriver(pc, "10", params);
  }

  level11(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleRangerSpellSelections(pc, params);
    this.subclassDriver(pc, "11", params);
  }

  level12(pc: PlayerCharacter, params: LevelingParams): void {
    pc.pcHelper.improveAbilityScores(params.abilityScoreImprovement);
    this.subclassDriver(pc, "12", params);
  }

  level13(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleRangerSpellSelections(pc, params);
    this.subclassDriver(pc, "13", params);
  }

  level14(pc: PlayerCharacter, params: RangerLevelingParams): void {
    pc.pcHelper.findFeatureTraitByName("Favored Enemy").choices.push(
      params.favoredEnemy
    );
    this.pushRangerFeatures(pc, 14);
    this.subclassDriver(pc, "14", params);
  }

  level15(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleRangerSpellSelections(pc, params);
    this.subclassDriver(pc, "15", params);
  }

  level16(pc: PlayerCharacter, params: LevelingParams): void {
    pc.pcHelper.improveAbilityScores(params.abilityScoreImprovement);
    this.subclassDriver(pc, "16", params);
  }

  level17(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleRangerSpellSelections(pc, params);
    this.subclassDriver(pc, "17", params);
  }

  level18(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushRangerFeatures(pc, 18);
    this.subclassDriver(pc, "18", params);
  }

  level19(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleRangerSpellSelections(pc, params);
    pc.pcHelper.improveAbilityScores(params.abilityScoreImprovement);
    this.subclassDriver(pc, "19", params);
  }

  level20(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushRangerFeatures(pc, 20);
    this.subclassDriver(pc, "20", params);
  }
}

export class DSRanger extends Ranger {
  constructor(){
    super(true, [], {isNoInput: true});
  }
}

export interface RangerLevelingParams extends LevelingParams {
  favoredEnemy?: string;
  favoredTerrain?: string;
}
