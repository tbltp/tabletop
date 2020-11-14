import { PlayerClass, LevelingParams } from "../PlayerClass";
import { PlayerCharacter } from "../../Base/PlayerCharacter";
import * as SpellcastingAbility from "../../../Assets/SpellcastingAbility.json";
import { SpellSlotFactory } from "../SpellSlotFactory";
import { WizardSubclass } from "./Subclasses/WizardSubclass";

export class Wizard extends PlayerClass {
  constructor(
    multiclass: boolean,
    params: WizardLevelingParams,
    skillProficiencies?: string[],
    weapons?: string[],
    equipmentPack?: string
  ) {
    super(
      "Wizard",
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      params,
      "d6",
      6,
      []
    );

    this.characterStart(multiclass, skillProficiencies, weapons, equipmentPack);

    for (let level in this.abilitiesAtLevels) {
      const func: Function = this.abilitiesAtLevels[level];
      this.abilitiesAtLevels[level] = func.bind(this);
    }
  }

  characterStart(multiclass: boolean, skillProficiencies: string[], weapons: string[], equipmentPack: string){
    if(!multiclass) {
      this.skillProficiencies = skillProficiencies;
      this.weaponProficiencies = ["Dagger", "Dart", "Sling", "Quarterstaff", "Crossbow, hand"],
      this.weapons = weapons;
      this.equipmentPack = equipmentPack;
      this.savingThrowProficiencies = ["intelligence", "wisdom"];
    }
  }

  /** TODO
   * Component Pouch or Arcane Focus, Spellbook
   * Figure out how to differentiate between spellbook spells and spells learned by leveling up, and add both to known spells.
   */


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

  level1(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    this.pushWizardFeatures(pc, 1);
    PlayerClass.pushCustomizedClassFeature(pc, 1, "WIZARD", "SPELLBOOK", params.spellBookSpells)
  }

  level2(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    this.pushWizardFeatures(pc, 2);
    this.subclass = params.archetypeSelection[0].archetype;

    WizardSubclass.subclassDictionary[this.subclass]["2"](pc, params);
  }

  level3(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
  }

  level4(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    pc.improveAbilityScores(params.abilityScoreImprovement);
  }

  level5(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
  }

  level6(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    WizardSubclass.subclassDictionary[this.subclass]["6"](pc, params);
  }

  level7(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
  }

  level8(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    pc.improveAbilityScores(params.abilityScoreImprovement);
  }

  level9(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
  }

  level10(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    WizardSubclass.subclassDictionary[this.subclass]["10"](pc, params);
  }

  level11(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
  }

  level12(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    pc.improveAbilityScores(params.abilityScoreImprovement);
  }

  level13(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
  }

  level14(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    WizardSubclass.subclassDictionary[this.subclass]["14"](pc, params);
  }

  level15(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
  }

  level16(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
  }

  level17(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
  }

  level18(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    this.pushWizardFeatures(pc, 18)
  }

  level19(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    pc.improveAbilityScores(params.abilityScoreImprovement);
  }

  level20(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    PlayerClass.pushCustomizedClassFeature(pc, 20, "WIZARD", "SIGNATURE SPELLS", params.signatureSpells);
  }
}

interface WizardLevelingParams extends LevelingParams {
  spellBookSpells: string[]
  signatureSpells: string[]
}