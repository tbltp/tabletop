import { PlayerClass, LevelingParams } from "./PlayerClass";
import { PlayerCharacter } from "../Base/PlayerCharacter";
import { ResourceTrait } from "../Base/Interfaces";
import * as SpellList from "../../Assets/SpellList.json";
import * as SpellcastingAbility from "../../Assets/SpellcastingAbility.json";
import { RangerArchetype } from "./Archetypes";
import { SpellSlotFactory } from "./SpellSlotFactory";

export class Ranger extends PlayerClass {
  constructor(
    skillProficiencies: string[],
    weapons: string[],
    armor: string[],
    rangerParams: RangerLevelingParams,
    equipmentPack: string,
    multiclass: boolean
  ) {
    super(
      "Ranger",
      [],
      skillProficiencies,
      ["Simple", "Martial"],
      ["Light", "Medium", "Shield"],
      [],
      [...weapons],
      armor,
      [],
      [],
      rangerParams,
      "d10",
      10,
      ["strength", "dexterity"]
    );

    this.equipmentPack = equipmentPack;

    if (!multiclass) {
      this.weapons.push("LONGBOW");
    }

    for (let level in this.abilitiesAtLevels) {
      const func: Function = this.abilitiesAtLevels[level];
      this.abilitiesAtLevels[level] = func.bind(this);
    }
  }

  /** TODO
   * FIGHTING STYLE
   */

  rangerArchetype: string;

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
    this.pushClassFeatures(pc, level, "RANGER");
  }

  private handleRangerSpellSelections(
    pc: PlayerCharacter,
    params: LevelingParams
  ): void {
    this.handleSpellSelections(pc, params, SpellcastingAbility["RANGER"]);
  }

  private applyRangerSpellSlots(pc: PlayerCharacter, level: number) {
    SpellSlotFactory.applySpellSlotsAtLevel(pc, level, "SECONDARY");
  }

  level1(pc: PlayerCharacter, params: RangerLevelingParams): void {
    PlayerClass.pushCustomizedClassFeature(pc, 1, "RANGER", "FAVORED ENEMY", [
      params.favoredEnemy,
    ]);
    PlayerClass.pushCustomizedClassFeature(
      pc,
      1,
      "RANGER",
      "NATURAL EXPLORER",
      [params.favoredTerrain]
    );
  }

  level2(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleRangerSpellSelections(pc, params);
    this.applyRangerSpellSlots(pc, 2);

    // TO DO FIGHTING STYLE
  }

  level3(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleRangerSpellSelections(pc, params);
    this.applyRangerSpellSlots(pc, 3);
    this.rangerArchetype = params.archetypeSelection[0].archetype;
    RangerArchetype.archetypeHelper[this.rangerArchetype][3](pc, params);
    this.pushRangerFeatures(pc, 3);
  }

  level4(pc: PlayerCharacter, params: LevelingParams): void {
    this.applyRangerSpellSlots(pc, 4);
    pc.improveAbilityScores(params.abilityScoreImprovement);
    this.pushRangerFeatures(pc, 4);
  }

  level5(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleRangerSpellSelections(pc, params);
    this.applyRangerSpellSlots(pc, 5);
    this.pushRangerFeatures(pc, 5);
  }

  level6(pc: PlayerCharacter, params: RangerLevelingParams): void {
    pc.findFeatureTraitByName("Favored Enemy").choices.push(
      params.favoredEnemy
    );
    pc.findFeatureTraitByName("Natural Explorer").choices.push(
      params.favoredTerrain
    );
    this.pushRangerFeatures(pc, 6);
  }

  level7(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleRangerSpellSelections(pc, params);
    this.applyRangerSpellSlots(pc, 7);
    RangerArchetype.archetypeHelper[this.rangerArchetype][7](pc, params);
  }

  level8(pc: PlayerCharacter, params: LevelingParams): void {
    pc.improveAbilityScores(params.abilityScoreImprovement);
    this.pushRangerFeatures(pc, 8);
  }

  level9(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleRangerSpellSelections(pc, params);
    this.applyRangerSpellSlots(pc, 9);
  }

  level10(pc: PlayerCharacter, params: RangerLevelingParams): void {
    this.pushRangerFeatures(pc, 10);
    pc.findFeatureTraitByName("Natural Explorer").choices.push(
      params.favoredTerrain
    );
  }

  level11(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleRangerSpellSelections(pc, params);
    this.applyRangerSpellSlots(pc, 11);
    RangerArchetype.archetypeHelper[this.rangerArchetype][11](pc, params);
  }

  level12(pc: PlayerCharacter, params: LevelingParams): void {
    pc.improveAbilityScores(params.abilityScoreImprovement);
  }

  level13(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleRangerSpellSelections(pc, params);
    this.applyRangerSpellSlots(pc, 13);
  }

  level14(pc: PlayerCharacter, params: RangerLevelingParams): void {
    pc.findFeatureTraitByName("Favored Enemy").choices.push(
      params.favoredEnemy
    );
    this.pushRangerFeatures(pc, 14);
  }

  level15(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleRangerSpellSelections(pc, params);
    this.applyRangerSpellSlots(pc, 15);
    RangerArchetype.archetypeHelper[this.rangerArchetype][15](pc, params);
  }

  level16(pc: PlayerCharacter, params: LevelingParams): void {
    pc.improveAbilityScores(params.abilityScoreImprovement);
  }

  level17(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleRangerSpellSelections(pc, params);
    this.applyRangerSpellSlots(pc, 17);
  }

  level18(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushRangerFeatures(pc, 18);
  }

  level19(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleRangerSpellSelections(pc, params);
    this.applyRangerSpellSlots(pc, 19);
    pc.improveAbilityScores(params.abilityScoreImprovement);
  }

  level20(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushRangerFeatures(pc, 20);
  }
}

interface RangerLevelingParams extends LevelingParams {
  favoredEnemy?: string;
  favoredTerrain?: string;
}
