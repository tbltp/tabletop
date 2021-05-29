import { PlayerClass, LevelingParams, ClassCreationParams } from "../PlayerClass";
import { PlayerCharacter } from "../../Base/PlayerCharacter";
import * as PaladinClassTraits from "./Paladin.json";
import { PaladinSubclass } from "./Subclasses/PaladinSubclass";
import * as FightingStyle from "../../../Assets/FightingStyles.json";

export class Paladin extends PlayerClass {
  constructor(params: ClassCreationParams) {
    super(
      "Paladin",
      [],
      [],
      ["Simple", "Martial"],
      ["Light", "Medium", "Shield"],
      [],
      [],
      [],
      [],
      [],
      "d10",
      10,
      []
    );

    this.characterStart(params.multiclass, params.skillProficiencies, params.weapons, params.armor, params.equipmentPack);

    for (let level in this.abilitiesAtLevels) {
      const func: Function = this.abilitiesAtLevels[level];
      this.abilitiesAtLevels[level] = func.bind(this);
    }
  }

  characterStart(multiclass: boolean, skillProficiencies: string[], weapons: string[], armor: string[], equipmentPack: string){
    if(!multiclass){
      this.skillProficiencies = skillProficiencies;
      this.armorProficiencies.push("Heavy");
      this.weapons = weapons;
      this.armor = armor;
      this.equipmentPack = equipmentPack;
      this.savingThrowProficiencies = ["wisdom", "charisma"];
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

  private pushPaladinFeatures(pc: PlayerCharacter, level: number) {
    this.pushClassFeatures(pc, level, PaladinClassTraits);
  }

  private upgradeLayOnHands(pc: PlayerCharacter): void {
    pc.pcHelper.findFeatureTraitByName("Lay on Hands").resource.resourceMax.value += 5;
  }

  private handlePaladinSpellSelections(
    pc: PlayerCharacter,
    params?: LevelingParams,
    level?: string
  ) {
    level ? this.addPreparationSpells(pc, "PALADIN", level) : null;
    params ? this.handleSpellSelections(pc, params, "PALADIN") : null;
  }

  level1(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushPaladinFeatures(pc, 1);
    this.addSpellcasting(pc, "PALADIN");

  }

  level2(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushPaladinFeatures(pc, 2);
    this.handlePaladinSpellSelections(pc, null, "1")
    this.upgradeLayOnHands(pc);
    pc.pcHelper.addFeatures(FightingStyle[params.fightingStyles[0]]); // ? Why not this.handleFightingStyle uwu owo
  }

  level3(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushPaladinFeatures(pc, 3);
    this.subclass = new PaladinSubclass(params.subclassParams);
    this.subclassDriver(pc, "3", params);

    if(PlayerClass.multiClassCheck(pc, "Channel Divinity")){
      pc.pcHelper.addEffectsToClassFeature("Channel Divinity", {resource: {resourceMax: {value: 1}}})
    }
    
    this.upgradeLayOnHands(pc);
  }

  level4(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushPaladinFeatures(pc, 4);
    this.subclassDriver(pc, "4", params);
    this.upgradeLayOnHands(pc);
  }

  level5(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushPaladinFeatures(pc, 5);
    this.subclassDriver(pc, "5", params);
    this.handlePaladinSpellSelections(pc, null, "2")
    
    if(!pc.pcHelper.findFeatureTraitByName("Extra Attack")){
      pc.pcHelper.addEffectsToClassFeature("Extra Attack", {scaling: {uses: 1}})
    }
    
    this.upgradeLayOnHands(pc);
  }

  level6(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushPaladinFeatures(pc, 6);
    this.subclassDriver(pc, "6", params);
    this.upgradeLayOnHands(pc);
  }

  level7(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "7", params);
    this.upgradeLayOnHands(pc);
  }

  level8(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "8", params);
    this.upgradeLayOnHands(pc);
  }

  level9(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "9", params);
    this.handlePaladinSpellSelections(pc, null, "3")
    this.upgradeLayOnHands(pc);
  }

  level10(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushPaladinFeatures(pc, 10);
    this.subclassDriver(pc, "10", params);
    this.upgradeLayOnHands(pc);
  }

  level11(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushPaladinFeatures(pc, 11);
    this.subclassDriver(pc, "11", params);
    this.upgradeLayOnHands(pc);
  }

  level12(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "12", params);
    this.upgradeLayOnHands(pc);
  }

  level13(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "13", params);
    this.handlePaladinSpellSelections(pc, null, "4")
    this.upgradeLayOnHands(pc);
  }

  level14(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushPaladinFeatures(pc, 14);
    this.subclassDriver(pc, "14", params);
    this.upgradeLayOnHands(pc);
  }

  level15(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "15", params);
    this.upgradeLayOnHands(pc);
  }

  level16(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "16", params);
    this.upgradeLayOnHands(pc);
  }

  level17(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "17", params);
    this.handlePaladinSpellSelections(pc, null, "5")
    this.upgradeLayOnHands(pc);
  }

  level18(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "18", params);
    this.upgradeLayOnHands(pc);
  }

  level19(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "19", params);
    this.upgradeLayOnHands(pc);
  }

  level20(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "20", params);
    this.upgradeLayOnHands(pc);
  }
}

export class DSPaladin extends Paladin {
  constructor(){
    super({ multiclass: true });
  }
}