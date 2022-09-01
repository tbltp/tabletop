import { PlayerClass, LevelingParams, ClassCreationParams } from "../PlayerClass";
import * as BarbarianClassTraits from "./Barbarian.json"
import { PlayerCharacter } from "../../Character/PlayerCharacter";
import { BarbarianSubclass } from "./Subclasses/BarbarianSubclass";

export class Barbarian extends PlayerClass {
  constructor(params: ClassCreationParams) {
    super(
      "Barbarian",
      [],
      [],
      ["Simple", "Martial"],
      ["Shield"],
      [],
      [],
      [],
      [],
      [],
      "d12",
      12,
      []
    );

    this.characterStart(params.multiclass, params.skillProficiencies, params.weapons);

    for (let level in this.abilitiesAtLevels) {
      const func: Function = this.abilitiesAtLevels[level];
      this.abilitiesAtLevels[level] = func.bind(this);
    }
  }

  characterStart(multiclass: boolean, skillProficiencies: string[], weapons: string[]){
    if(!multiclass){
      this.skillProficiencies.push(...skillProficiencies)
      this.armorProficiencies.push("Light", "Medium");
      this.weapons.push(...weapons, "JAVELIN", "JAVELIN", "JAVELIN", "JAVELIN");
      this.equipmentPack = "EXPLORER";
      this.savingThrowProficiencies = ["strength", "constitution"];
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

  private pushBarbarianFeatures(pc: PlayerCharacter, level: number) {
    this.pushClassFeatures(pc, level, BarbarianClassTraits);
  }

  level1(pc: PlayerCharacter, params: LevelingParams): void {

    if(!PlayerClass.multiClassCheck(pc, "Unarmored Defense")){
      this.pushBarbarianFeatures(pc, 1);
      pc.armorClasses.push({
        name: "Unarmored Defense",
        base: 10,
        modifier: [
          pc.abilityScores.dexterity.modifier,
          pc.abilityScores.constitution.modifier,
        ],
        bonus: { value: 0 },
      });
    }

    pc.pcHelper.addEffectsToFeature("Rage", {resource: {resourceMax: {value: 2}}, scaling: {bonus: 2}});
  }

  level2(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushBarbarianFeatures(pc, 2);
  }

  level3(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclass = new BarbarianSubclass(params.subclassParams);
    this.subclassDriver(pc, "3", params);
    pc.pcHelper.findFeatureTraitByName("Rage").resource.resourceMax.value++;
  }

  level4(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "4", params);
  }

  level5(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushBarbarianFeatures(pc, 5);
    this.subclassDriver(pc,"5",params);

    pc.speeds.push(
      {
        name: "Fast Movement",
        base: pc.speeds.find(spd => spd.name === "Base Speed").base,
        bonus: {value: 10}
      }
    )

    if(!pc.pcHelper.findFeatureTraitByName("Extra Attack").scaling) {
      pc.pcHelper.addEffectsToFeature("Extra Attack", {scaling: {uses: 1} } );
    }
  }

  level6(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "6", params);
    pc.pcHelper.findFeatureTraitByName("Rage").resource.resourceMax.value++;
  }

  level7(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushBarbarianFeatures(pc, 7);
  }

  level8(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "8", params);
  }

  level9(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushBarbarianFeatures(pc, 9);
    pc.pcHelper.addEffectsToFeature("Brutal Critical", {scaling: {dice: "1dx"} } )
    pc.pcHelper.findFeatureTraitByName("Rage").scaling.bonus = 3;
  }

  level10(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "10", params);
  }

  level11(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushBarbarianFeatures(pc, 11);
  }

  level12(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "12", params);
    pc.pcHelper.findFeatureTraitByName("Rage").resource.resourceMax.value++;
  }

  level13(pc: PlayerCharacter, params: LevelingParams): void {
    pc.pcHelper.findFeatureTraitByName("Brutal Critical").scaling.dice = "2dx";
  }

  level14(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "14", params);
  }

  level15(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushBarbarianFeatures(pc, 15);
    this.subclassDriver(pc,"15",params);
  }

  level16(pc: PlayerCharacter, params: LevelingParams): void {
    this.subclassDriver(pc, "16", params);
    pc.pcHelper.findFeatureTraitByName("Rage").scaling.bonus = 3;
  }

  level17(pc: PlayerCharacter, params: LevelingParams): void {
    pc.pcHelper.findFeatureTraitByName("Brutal Critical").scaling.dice = "3dx";
    pc.pcHelper.findFeatureTraitByName("Rage").resource.resourceMax.value++;
  }

  level18(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushBarbarianFeatures(pc, 18);
    this.subclassDriver(pc, "18", params);
  }

  level19(pc: PlayerCharacter, params: LevelingParams): void {
  }

  level20(pc: PlayerCharacter, params: LevelingParams): void {
    this.pushBarbarianFeatures(pc, 20);
    this.subclassDriver(pc,"20",params);
    pc.pcHelper.changeAbilityScoreMaxes(["strength", "constitution"], 24);
    pc.pcHelper.improveAbilityScores({
      abilities: ["strength", "constitution"],
      value: "4",
    });
    pc.pcHelper.findFeatureTraitByName("Rage").resource.resourceMax.value = Infinity;
  }
}

export class DSBarbarian extends Barbarian {
  constructor() {
    super({ multiclass: true });
  }
}
