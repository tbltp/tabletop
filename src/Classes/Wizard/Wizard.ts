import { PlayerClass, LevelingParams, ClassCreationParams } from "../PlayerClass";
import { PlayerCharacter } from "../../Character/PlayerCharacter";
import * as SpellcastingAbility from "../../../Assets/SpellcastingAbility.json";
import * as WizardClassTraits from './Wizard.json';
import { WizardSubclass } from "./Subclasses/WizardSubclass";
import { Trait } from "Character/Interfaces";

export class Wizard extends PlayerClass {
  constructor(params: ClassCreationParams) {
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
      "d6",
      6,
      []
    );

    this.characterStart(params.multiclass, params.skillProficiencies, params.weapons, params.equipmentPack, params.arcaneFocus);

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
    this.handleSpellSelections(pc, params, "WIZARD");
  }

  level1(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.pushWizardFeatures(pc, 1);
    this.addSpellcasting(pc, "WIZARD");
    this.handleWizardSpellSelections(pc, params);
    // PlayerClass.pushCustomizedClassFeature(pc, 1, WizardClassTraits, "SPELLBOOK", params.spellBookSpells)
    // const spellbook: Trait = pc.pcHelper.findFeatureTraitByName("Spellbook");
    // spellbook.choices = params.spellBookSpells;

  }

  level2(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.subclass = new WizardSubclass(params.subclassParams);
    this.subclassDriver(pc, "2", params);
    this.handleWizardSpellSelections(pc, params);
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
    this.subclassDriver(pc, "6", params);
    this.handleWizardSpellSelections(pc, params);
  }

  level7(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
  }

  level8(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.subclassDriver(pc, "8", params);
    this.handleWizardSpellSelections(pc, params);
  }

  level9(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
  }

  level10(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.subclassDriver(pc, "10", params);
    this.handleWizardSpellSelections(pc, params);
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
    this.subclassDriver(pc, "14", params);
    this.handleWizardSpellSelections(pc, params);
  }

  level15(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
  }

  level16(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.subclassDriver(pc, "16", params);
    this.handleWizardSpellSelections(pc, params);
  }

  level17(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
  }

  level18(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.pushWizardFeatures(pc, 18);
    this.subclassDriver(pc, "18", params);
    this.handleWizardSpellSelections(pc, params);
  }

  level19(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
  }

  level20(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.pushWizardFeatures(pc, 20)
    pc.pcHelper.customizeFeature("Signature Spells", params.signatureSpells)
    this.subclassDriver(pc, "20", params);
    this.handleWizardSpellSelections(pc, params);
  }
}

export class DSWizard extends Wizard {
  constructor(){
    super({ multiclass: true });
  }
}

export interface WizardLevelingParams extends LevelingParams {
  spellBookSpells?: string[]
  signatureSpells?: string[]
}