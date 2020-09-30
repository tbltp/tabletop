import { PlayerClass, LevelingParams } from "./PlayerClass";
import { PlayerCharacter } from "../Base/PlayerCharacter";
import * as SpellcastingAbility from "../../Assets/SpellcastingAbility.json";
import { SpellSlotFactory } from "./SpellSlotFactory";
import { WizardArchetype } from "./Archetypes";

export class Wizard extends PlayerClass {
  constructor(
    skillProficiencies: string[],
    weapons: string[],
    armor: string[],
    params: WizardLevelingParams,
    equipmentPack: string
  ) {
    super(
      "Wiizard",
      [],
      skillProficiencies,
      ["Dagger", "Dart", "Sling", "Quarterstaff", "Crossbow, hand"],
      [],
      [],
      weapons,
      [],
      [],
      [],
      params,
      "d6",
      6,
      ["intelligence", "wisdom"]
    );

    this.equipmentPack = equipmentPack;

    for (let level in this.abilitiesAtLevels) {
      const func: Function = this.abilitiesAtLevels[level];
      this.abilitiesAtLevels[level] = func.bind(this);
    }
  }

  /** TODO
   * Component Pouch or Arcane Focus, Spellbook
   * Figure out how to differentiate between spellbook spells and spells learned by leveling up, and add both to known spells.
   */

  arcaneTradition: string;

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

  pushWizardFeatures(pc: PlayerCharacter, level: number) {
    this.pushClassFeatures(pc, level, "WIZARD");
  }

  private handleWizardSpellSelections(
    pc: PlayerCharacter,
    params: WizardLevelingParams
  ) {
    this.handleSpellSelections(pc, params, SpellcastingAbility["WIZARD"]);
  }

  private applyWizardSpellSlots(pc: PlayerCharacter, level: number) {
    SpellSlotFactory.applySpellSlotsAtLevel(pc, level, "PRIMARY");
  }

  level1(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    this.applyWizardSpellSlots(pc, 1);
    this.pushWizardFeatures(pc, 1);
    PlayerClass.pushCustomizedClassFeature(pc, 1, "WIZARD", "SPELLBOOK", params.spellBookSpells)
  }

  level2(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    this.applyWizardSpellSlots(pc, 2);
    this.pushWizardFeatures(pc, 2);
    this.arcaneTradition = params.archetypeSelection[0].archetype;

    WizardArchetype.archetypeHelper[this.arcaneTradition]["2"](pc, params);
  }

  level3(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    this.applyWizardSpellSlots(pc, 3);
  }

  level4(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    this.applyWizardSpellSlots(pc, 4);
    pc.improveAbilityScores(params.abilityScoreImprovement);
  }

  level5(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    this.applyWizardSpellSlots(pc, 5);
  }

  level6(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    this.applyWizardSpellSlots(pc, 6);
    WizardArchetype.archetypeHelper[this.arcaneTradition]["6"](pc, params);
  }

  level7(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    this.applyWizardSpellSlots(pc, 7);
  }

  level8(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    this.applyWizardSpellSlots(pc, 8);
    pc.improveAbilityScores(params.abilityScoreImprovement);
  }

  level9(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    this.applyWizardSpellSlots(pc, 9);
  }

  level10(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    this.applyWizardSpellSlots(pc, 10);
    WizardArchetype.archetypeHelper[this.arcaneTradition]["10"](pc, params);
  }

  level11(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    this.applyWizardSpellSlots(pc, 11);
  }

  level12(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    this.applyWizardSpellSlots(pc, 12);
    pc.improveAbilityScores(params.abilityScoreImprovement);
  }

  level13(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    this.applyWizardSpellSlots(pc, 13);
  }

  level14(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    this.applyWizardSpellSlots(pc, 14);
    WizardArchetype.archetypeHelper[this.arcaneTradition]["14"](pc, params);
  }

  level15(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    this.applyWizardSpellSlots(pc, 15);
  }

  level16(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    this.applyWizardSpellSlots(pc, 6);
    pc.improveAbilityScores(params.abilityScoreImprovement);
  }

  level17(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    this.applyWizardSpellSlots(pc, 17);
  }

  level18(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    this.applyWizardSpellSlots(pc, 18);
    this.pushWizardFeatures(pc, 18)
  }

  level19(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    this.applyWizardSpellSlots(pc, 19);
    pc.improveAbilityScores(params.abilityScoreImprovement);
  }

  level20(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    this.applyWizardSpellSlots(pc, 20);
    PlayerClass.pushCustomizedClassFeature(pc, 20, "WIZARD", "SIGNATURE SPELLS", params.signatureSpells);
  }
}

interface WizardLevelingParams extends LevelingParams {
  spellBookSpells: string[]
  signatureSpells: string[]
}