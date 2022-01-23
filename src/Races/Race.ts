import { Feat, FeatParams } from "../Feats/Feat";

import { PlayerCharacter } from "../Base/PlayerCharacter";
import { Trait } from "../Base/Interfaces";

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

  abstract abilitiesAtLevels: { [key: string]: (pc: PlayerCharacter) => void };

  abstract abilityIncrease(PlayerCharacter): void;

  abstract proficiencies(pc): void;

  addLanguages(pc: PlayerCharacter): void {
    for (let language of this.languages) {
      if(!language) { continue }
      pc.traits.languages.add(language);
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
      if(!tool) { continue }
      pc.traits.toolProficiencies.add(tool);
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
    pc.speeds.find(spd => spd.name === "Base Speed").base.value = this.speed;
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
  feat?: {
    name: string;
    featParams?: FeatParams;
  }
}