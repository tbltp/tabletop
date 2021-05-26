import { PlayerClass, LevelingParams, ClassCreationParams } from "../PlayerClass";
import { PlayerCharacter } from "../../Base/PlayerCharacter";
import * as ClericClassTraits from "./Cleric.json";
import { ClericSubclass } from "./Subclasses/ClericSubclass";
import * as SpellcastingAbility from "../../../Assets/SpellcastingAbility.json";

export class Cleric extends PlayerClass {
  constructor(params: ClassCreationParams) {
    super(
      "Cleric",
      [],
      [],
      [],
      ["Light", "Medium", "Shield"],
      [],
      [],
      [],
      [],
      [],
      "d8",
      8,
      []
    );
    
    this.characterStart(params.multiclass, params.skillProficiencies, params.weapons, params.armor, params.equipmentPack, params.holySymbol);

    for (let level in this.abilitiesAtLevels) {
      const func: Function = this.abilitiesAtLevels[level];
      this.abilitiesAtLevels[level] = func.bind(this);
    }
  }

  characterStart(multiclass: boolean, skillProficiencies: string[], weapons: string[], armor: string[], equipmentPack: string, holySymbol: string){
    if(!multiclass){
      this.skillProficiencies = skillProficiencies;
      this.weaponProficiencies.push("Simple");
      this.weapons = weapons;
      this.armor = armor;
      this.equipmentPack = equipmentPack;
      this.equipment = [holySymbol]; 
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

  private pushClericFeatures(pc: PlayerCharacter, level: number) {
    this.pushClassFeatures(pc, level, ClericClassTraits);
  }

  private handleClericSpellSelections(pc: PlayerCharacter, params?: LevelingParams, level?: string, ){
    level ?? this.addPreparationSpells(pc, "CLERIC", level);
    params ?? this.handleSpellSelections(pc, params, SpellcastingAbility["CLERIC"]);
  }

  level1(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclass = new ClericSubclass(params.subclassParams);
    this.subclassDriver(pc, "1", params);
    this.addSpellcasting(pc, "CLERIC");
    this.handleClericSpellSelections(pc, params, "1");    
  }

  level2(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushClericFeatures(pc, 2);
    this.subclassDriver(pc, "2", params);

    // channel divinity multiclass check against paladin
     if(PlayerClass.multiClassCheck(pc, "Channel Divinity")){
       pc.pcHelper.addEffectsToClassFeature("Channel Divinity", {resource: {resourceMax: {value: 1}}})
    }    
  }

  level3(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "3", params);
    this.handleClericSpellSelections(pc, null, "2")
  }

  level4(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleClericSpellSelections(pc, params);
  }

  level5(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushClericFeatures(pc, 5);
    this.subclassDriver(pc, "5", params);
    this.handleClericSpellSelections(pc, null, "3")
    pc.pcHelper.addEffectsToClassFeature("Channel Divinity: Destroy Undead", {scaling: {challengeRating: 0.5}})
  }

  level6(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "6", params);
    pc.pcHelper.findFeatureTraitByName("Channel Divinity").resource.resourceMax.value++;
  }

  level7(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "7", params);
    this.handleClericSpellSelections(pc, null, "4")
  }

  level8(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "8", params);
    pc.pcHelper.findFeatureTraitByName("Destroy Undead").scaling.challengeRating = 1;
  }

  level9(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "9", params);
    this.handleClericSpellSelections(pc, null, "5")
  }

  level10(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushClericFeatures(pc, 10);
    this.handleClericSpellSelections(pc, params);
    pc.pcHelper.addEffectsToClassFeature("Divine Intervention", {resource: {resourceMax: {value: 1}}})
  }

  level11(pc: PlayerCharacter, params: LevelingParams): void {
  this.handleClericSpellSelections(pc, null, "6")
    pc.pcHelper.findFeatureTraitByName("Destroy Undead").scaling.challengeRating++;
  }

  level12(pc: PlayerCharacter, params: LevelingParams): void {
  }

  level13(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleClericSpellSelections(pc, null, "7")
  }

  level14(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "14", params);
    pc.pcHelper.findFeatureTraitByName("Destroy Undead").scaling.challengeRating++;
  }

  level15(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleClericSpellSelections(pc, null, "8")
  }

  level16(pc: PlayerCharacter, params: LevelingParams): void {
  }

  level17(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "17", params);
    this.handleClericSpellSelections(pc, null, "9")
    pc.pcHelper.findFeatureTraitByName("Destroy Undead").scaling.challengeRating++;
  }

  level18(pc: PlayerCharacter, params: LevelingParams): void {
    // channel divinity
    pc.pcHelper.findFeatureTraitByName("Channel Divinity").resource.resourceMax.value++;
  }

  level19(pc: PlayerCharacter, params: LevelingParams): void {
  }

  level20(pc: PlayerCharacter, params: LevelingParams): void {
  }
}

export class DSCleric extends Cleric {
  constructor(){
    super({multiclass: true});
  }
}
