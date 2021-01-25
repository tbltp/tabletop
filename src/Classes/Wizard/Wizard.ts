import { PlayerClass, LevelingParams } from "../PlayerClass";
import { PlayerCharacter } from "../../Base/PlayerCharacter";
import * as SpellcastingAbility from "../../../Assets/SpellcastingAbility.json";
import * as WizardClassTraits from './Wizard.json';
import { WizardSubclass } from "./Subclasses/WizardSubclass";
import { Trait } from "Base/Interfaces";

export class Wizard extends PlayerClass {
  constructor(
    multiclass: boolean,
    params: WizardLevelingParams,
    skillProficiencies?: string[],
    weapons?: string[],
    equipmentPack?: string,
    arcaneFocus?: string
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

    this.characterStart(multiclass, skillProficiencies, weapons, equipmentPack, arcaneFocus);

    for (let level in this.abilitiesAtLevels) {
      const func: Function = this.abilitiesAtLevels[level];
      this.abilitiesAtLevels[level] = func.bind(this);
    }
  }

  characterStart(multiclass: boolean, skillProficiencies: string[], weapons: string[], equipmentPack: string, arcaneFocus: string){
    if(!multiclass) {
      this.skillProficiencies = skillProficiencies;
      this.weaponProficiencies = ["Dagger", "Dart", "Sling", "Quarterstaff", "Crossbow, hand"],
      this.weapons = weapons;
      this.equipmentPack = equipmentPack;
      this.equipment = [arcaneFocus]; //POUCH is also a focus
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

  pushWizardFeatures(pc: PlayerCharacter, level: number) {
    this.pushClassFeatures(pc, level, WizardClassTraits);
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
    // PlayerClass.pushCustomizedClassFeature(pc, 1, WizardClassTraits, "SPELLBOOK", params.spellBookSpells)
    const spellbook: Trait = pc.pcHelper.findFeatureTraitByName("Spellbook");
    spellbook.choices = params.spellBookSpells;
    this.addSpellcasting(pc, "WIZARD");

  }

  level2(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    this.subclass = new WizardSubclass(params.subclassSelection);
    this.subclassDriver(pc, "2", params);
  }

  level3(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
  }

  level4(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
  }

  level5(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
  }

  level6(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    this.subclassDriver(pc, "6", params);
  }

  level7(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
  }

  level8(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    this.subclassDriver(pc, "8", params);
  }

  level9(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
  }

  level10(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    this.subclassDriver(pc, "10", params);
  }

  level11(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
  }

  level12(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.subclassDriver(pc, "12", params);
  }

  level13(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
  }

  level14(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    this.subclassDriver(pc, "14", params);
  }

  level15(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
  }

  level16(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    this.subclassDriver(pc, "16", params);
  }

  level17(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
  }

  level18(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    this.subclassDriver(pc, "18", params);
    this.pushWizardFeatures(pc, 18);
  }

  level19(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
  }

  level20(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    this.subclassDriver(pc, "20", params);
    PlayerClass.pushCustomizedClassFeature(pc, 20, WizardClassTraits, "SIGNATURE SPELLS", params.signatureSpells);
  }
}

export class DSWizard extends Wizard {
  constructor(){
    super(true, {isNoInput: true});
  }
}

export interface WizardLevelingParams extends LevelingParams {
  spellBookSpells?: string[]
  signatureSpells?: string[]
}