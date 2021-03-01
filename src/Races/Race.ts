import { Trait } from "../Base/Interfaces";
import { PlayerCharacter } from "../Base/PlayerCharacter";
import { Feat } from "../Feats/Feat";

export abstract class Race {
  constructor(
    name: string,
    age: string,
    speed: number,
    size: string,
    languages: Trait[],
    traits: Trait[],
    weaponProficiencies: string[],
    armorProficiencies: string[],
    toolProficiencies: string[]
  ) {
    this.name = name;
    this.age = age;
    this.speed = speed;
    this.size = size;
    this.languages = languages;
    this.traits = traits;
    this.weaponProficiencies = weaponProficiencies;
    this.armorProficiencies = armorProficiencies;
    this.toolProficiencies = toolProficiencies;
  }

  name: string;
  age: string;
  speed: number;
  size: string;
  languages: Trait[];
  traits: Trait[];
  weaponProficiencies: string[];
  armorProficiencies: string[];
  toolProficiencies: string[];
  feats: Feat[];

  abstract abilitiesAtLevels: { [key: string]: (pc: PlayerCharacter) => void };

  abstract abilityIncrease(PlayerCharacter): void;

  abstract proficiencies(pc): void;

  addLanguages(pc: PlayerCharacter): void {
    for (let language of this.languages) {
      pc.traits.languages.push(language);
    }
  }

  addFeatures(pc: PlayerCharacter): void {
    for (let trait of this.traits) {
      pc.traits.features.push(trait);
    }
  }

  addWeaponProficiencies(pc: PlayerCharacter): void {
    for (let weapon of this.weaponProficiencies) {
      pc.traits.weaponProficiencies.add(weapon);
    }
  }

  addArmorProficiencies(pc: PlayerCharacter): void {
    for (let armor of this.armorProficiencies) {
      pc.traits.armorProficiencies.add(armor);
    }
  }

  addToolProficiencies(pc: PlayerCharacter): void {
    for (let tool of this.toolProficiencies) {
      pc.traits.toolProficiencies.add(tool);
    }
  }

  addFeats(pc: PlayerCharacter): void {
    for (let feat of this.feats) {
      //feat.apply(pc);
    }
  }

  apply(pc: PlayerCharacter): void {
    this.abilityIncrease(pc);
    this.proficiencies(pc);
    this.addLanguages(pc);
    this.addFeatures(pc);
    this.addWeaponProficiencies(pc);
    this.addArmorProficiencies(pc);
    this.addToolProficiencies(pc);
    pc.speed.value = this.speed;
    pc.size = this.size;
  }
}

export class DSRace extends Race {
  constructor(){
    super("", "", -1, "", [], [], [], [], []);
  }

  abilitiesAtLevels = {}

  proficiencies(){}

  abilityIncrease(){}
}

export interface  RaceParams {
  draconicAncestry?: string;
  toolProficiency?: string;
  abilityScores?: string[];
  skillProficiencies?: string[];
  language?: string;
  cantrip?: string;
  feat?: string
}