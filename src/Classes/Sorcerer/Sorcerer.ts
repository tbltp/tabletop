import { PlayerClass, LevelingParams } from "../PlayerClass";
import { PlayerCharacter } from "../../Base/PlayerCharacter";
import * as SpellcastingAbility from "../../../Assets/SpellcastingAbility.json";
import * as Metamagic from "../../../Assets/Metamagic.json";
import { SorcererSubclass } from "./Subclasses/SorcererSubclass";
import { SpellSlotFactory } from "../SpellSlotFactory";

export class Sorcerer extends PlayerClass {
  constructor(
    skillProficiencies: string[],
    weapons: string[],
    params: SorcererLevelingParams,
    equipmentPack: string
  ) {
    super(
      "Paladin",
      [],
      skillProficiencies,
      ["Dagger", "Dart", "Sling", "Quarterstaff", "Crossbow, light"],
      [],
      [],
      [...weapons, "DAGGER", "DAGGER"],
      [],
      [],
      [],
      params,
      "d6",
      6,
      ["constitution", "charisma"]
    );

    this.equipmentPack = equipmentPack;

    for (let level in this.abilitiesAtLevels) {
      const func: Function = this.abilitiesAtLevels[level];
      this.abilitiesAtLevels[level] = func.bind(this);
    }
  }

  /** TODO
   * ARCANE FOCUS OR COMPONENT POUCH
   */

  sorcererousOrigin: string;
  metaMagicAbilities: string[];

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

  pushSorcererFeatures(pc: PlayerCharacter, level: number) {
    this.pushClassFeatures(pc, level, "SORCERER");
  }

  private handleSorcererSpellSelections(
    pc: PlayerCharacter,
    params: LevelingParams
  ): void {
    this.handleSpellSelections(pc, params, SpellcastingAbility["SORCEROR"]);
  }

  private applySorcererSpellSlots(pc: PlayerCharacter, level: number) {
    SpellSlotFactory.applySpellSlotsAtLevel(pc, level, "PRIMARY");
  }

  private addMetaMagic(pc: PlayerCharacter, metaMagicSelection: string[]) {
    for (const metaMagic of metaMagicSelection) {
      pc.addFeatures(Metamagic[metaMagic]);
    }
  }

  level1(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    // spell replacements can happen at any level
    this.handleSorcererSpellSelections(pc, params);
    this.applySorcererSpellSlots(pc, 1);
    this.sorcererousOrigin = params.archetypeSelection[0].archetype;
    SorcererSubclass.subclassDictionary[this.sorcererousOrigin][1](pc, params);
  }

  level2(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    this.applySorcererSpellSlots(pc, 2);
    pc.addResourceTraits({
      title: "Sorcery Points",
      description: "Number of Sorcery Points you have.",
      resourceMax: { value: 2 },
    });
  }

  level3(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    this.applySorcererSpellSlots(pc, 3);
    pc.findResourceTraitByName("Sorcery Points").resourceMax.value++;
    this.addMetaMagic(pc, params.metaMagic);
  }

  level4(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    this.applySorcererSpellSlots(pc, 4);
    pc.improveAbilityScores(params.abilityScoreImprovement);
    pc.findResourceTraitByName("Sorcery Points").resourceMax.value++;
  }

  level5(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    this.applySorcererSpellSlots(pc, 5);
    pc.findResourceTraitByName("Sorcery Points").resourceMax.value++;
  }

  level6(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    this.applySorcererSpellSlots(pc, 6);
    SorcererSubclass.subclassDictionary[this.sorcererousOrigin][6](pc, params);
    pc.findResourceTraitByName("Sorcery Points").resourceMax.value++;
  }

  level7(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    this.applySorcererSpellSlots(pc, 7);
    pc.findResourceTraitByName("Sorcery Points").resourceMax.value++;
  }

  level8(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    this.applySorcererSpellSlots(pc, 8);
    pc.improveAbilityScores(params.abilityScoreImprovement);
    pc.findResourceTraitByName("Sorcery Points").resourceMax.value++;
  }

  level9(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    this.applySorcererSpellSlots(pc, 9);
    pc.findResourceTraitByName("Sorcery Points").resourceMax.value++;
  }

  level10(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    this.applySorcererSpellSlots(pc, 10);
    pc.findResourceTraitByName("Sorcery Points").resourceMax.value++;
    this.addMetaMagic(pc, params.metaMagic);
  }

  level11(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    this.applySorcererSpellSlots(pc, 11);
    pc.findResourceTraitByName("Sorcery Points").resourceMax.value++;
  }

  level12(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    pc.improveAbilityScores(params.abilityScoreImprovement);
    pc.findResourceTraitByName("Sorcery Points").resourceMax.value++;
  }

  level13(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    this.applySorcererSpellSlots(pc, 13);
    pc.findResourceTraitByName("Sorcery Points").resourceMax.value++;
  }

  level14(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    SorcererSubclass.subclassDictionary[this.sorcererousOrigin][14](pc, params);
    pc.findResourceTraitByName("Sorcery Points").resourceMax.value++;
  }

  level15(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    this.applySorcererSpellSlots(pc, 15);
    pc.findResourceTraitByName("Sorcery Points").resourceMax.value++;
  }

  level16(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    pc.improveAbilityScores(params.abilityScoreImprovement);
    pc.findResourceTraitByName("Sorcery Points").resourceMax.value++;
  }

  level17(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    this.applySorcererSpellSlots(pc, 17);
    pc.findResourceTraitByName("Sorcery Points").resourceMax.value++;
    this.addMetaMagic(pc, params.metaMagic);
  }

  level18(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    this.applySorcererSpellSlots(pc, 18);
    SorcererSubclass.subclassDictionary[this.sorcererousOrigin][18](pc, params);
    pc.findResourceTraitByName("Sorcery Points").resourceMax.value++;
  }

  level19(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    this.applySorcererSpellSlots(pc, 19);
    pc.improveAbilityScores(params.abilityScoreImprovement);
    pc.findResourceTraitByName("Sorcery Points").resourceMax.value++;
  }

  level20(pc: PlayerCharacter, params: SorcererLevelingParams): void {
    this.handleSorcererSpellSelections(pc, params);
    this.applySorcererSpellSlots(pc, 20);
    pc.findResourceTraitByName("Sorcery Points").resourceMax.value++;
    this.pushSorcererFeatures(pc, 20);
  }
}

interface SorcererLevelingParams extends LevelingParams {
  metaMagic?: string[];
}
