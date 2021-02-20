import { PlayerClass, LevelingParams, ClassCreationParams } from "../PlayerClass";
import { PlayerCharacter } from "../../Base/PlayerCharacter";
import * as SpellcastingAbility from "../../../Assets/SpellcastingAbility.json";
import * as WizardClassTraits from './Wizard.json';
import { WizardSubclass } from "./Subclasses/WizardSubclass";

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
    this.handleSpellSelections(pc, params, SpellcastingAbility["WIZARD"]);
  }

  level1(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    this.pushWizardFeatures(pc, 1);
    PlayerClass.pushCustomizedClassFeature(pc, 1, WizardClassTraits, "SPELLBOOK", params.spellBookSpells)

    this.addSpellcasting(pc, "WIZARD");

  }

  level2(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    this.subclass = new WizardSubclass(params.subclassParams);
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
    this.handleWizardSpellSelections(pc, params);
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
  }

  level20(pc: PlayerCharacter, params: WizardLevelingParams): void {
    this.handleWizardSpellSelections(pc, params);
    PlayerClass.pushCustomizedClassFeature(pc, 20, WizardClassTraits, "SIGNATURE SPELLS", params.signatureSpells);
  }
}

export class DSWizard extends Wizard {
  constructor(){
    super({ multiclass: true });
  }
}

interface WizardLevelingParams extends LevelingParams {
  spellBookSpells?: string[]
  signatureSpells?: string[]
}