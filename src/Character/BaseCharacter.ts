import { searchInDictionary } from "../Utilities/General";
import {
  IAbilityScore,
  ILevelContainer,
  IProficiency,
  ISkill,
} from "./Interfaces";

export abstract class BaseCharacter {
  constructor() {
    this.charSize = "";
    this.charType = CharacterType.NPC;
    this.charLevels = new LevelContainer();
    this.charProficiency = new Proficiency(this.charLevels);
    this.charAbilityScores = {};
    this.charSkills = {};
    this.charHealth = new HealthContainer();
  }

  // Base Ability Scores
  protected charAbilityScores: {
    [key: string]: AbilityScore;
  };
  // Base Stats
  protected charSize: string;
  protected charType: CharacterType;
  protected charLevels: LevelContainer;
  protected charProficiency: Proficiency;
  protected charHealth: HealthContainer;

  // Skill
  protected charSkills: { [key: string]: Skill };

  // Passives
  protected passiveSkills: { [key: string]: PassiveSkill };

  // Inventory

  // Features (Class Features, Racial Traits, Feats)

  // Known Spells

  // Spell Slots

  // Accessors
  get type(): CharacterType {
    return this.charType;
  }

  get size(): string {
    return this.charSize;
  }

  //Exposed Methods
  findAbilityScore(ability: string): AbilityScore | undefined {
    return searchInDictionary(ability, this.charAbilityScores);
  }

  findSkill(skillName: string): Skill | undefined {
    return searchInDictionary(skillName, this.charSkills);
  }

  findPassive(passiveName: string): PassiveSkill | undefined { 
    return searchInDictionary(passiveName, this.passiveSkills);
  }
}

export class AbilityScore implements IAbilityScore {
  constructor(name: string, abbr: string, score: number) {
    this.name = name;
    this.abbr = abbr;
    this._scoreMax = 20;
    if (score < 1) {
      throw TypeError("Starting score cannot be less than 1");
    }
    if (score > this._scoreMax) {
      throw TypeError(
        `Starting score cannot be greater than maximum of ${this._scoreMax}`
      );
    }
    this._score = score;
  }

  name: string;
  abbr: string;
  private _score: number;
  private _scoreMax: number;
  private _getModifier: () => number = () => Math.floor((this._score - 10) / 2);

  savingThrowProficiency: boolean = false;
  halfProficiency: boolean = false;

  increaseScore(bonus: number): void {
    if (this._score + bonus > this._scoreMax) {
      this._score = this._scoreMax;
      return;
    }
    if (this._score + bonus < 1) {
      this._score = 1;
      return;
    }
    this._score = this._score + bonus;
  }

  get score(): number {
    return this._score;
  }

  get modifier(): number {
    return this._getModifier();
  }

  set scoreMax(newmax: number) {
    this._scoreMax = newmax;
    if (this._score > this._scoreMax) {
      this._score = this._scoreMax;
    }
  }
}

export class LevelContainer implements ILevelContainer {
  constructor() {
    this._levelDictionary = {};
    this._maxLevel = 20;
  }

  private _maxLevel: number;
  private _levelDictionary: {
    [className: string]: number;
  };

  set maxLevel(newmax: number) {
    this._maxLevel = newmax;
  }

  increaseLevel(className: string): void {
    if (this.totalLevel < this._maxLevel) {
      if (this._levelDictionary[className]) {
        this._levelDictionary[className]++;
      } else {
        this._levelDictionary[className] = 1;
      }
    } else {
      throw Error(`Total levels cannot exceed max level ${this._maxLevel}`);
    }
  }

  setClassLevel(className: string, newLevel: number): void {
    const currentLevel = this._levelDictionary[className];
    this._levelDictionary[className] = newLevel;
    if (this.totalLevel > this._maxLevel) {
      this._levelDictionary[className] = currentLevel;
      throw Error(`Total levels cannot exceed max level ${this._maxLevel}`);
    }
  }

  getClassLevel(className: string): number {
    if (this._levelDictionary[className]) {
      return this._levelDictionary[className];
    }
    return undefined;
  }

  get totalLevel(): number {
    return Object.values(this._levelDictionary).reduce((s, v) => s + v, 0);
  }
}

export class Proficiency implements IProficiency {
  constructor(level: ILevelContainer) {
    this._level = level;
    this._extraBonus = 0;
  }

  private _level: ILevelContainer;
  private _extraBonus: number;

  private _calculateLevelBonus: () => number = () =>
    Math.floor((this._level.totalLevel + 7) / 4);

  set extraBonus(value: number) {
    this._extraBonus = value;
  }

  get bonus(): number {
    return this._calculateLevelBonus() + this._extraBonus;
  }
}

export class HealthContainer {
  constructor() {
    this._extraBonus = 0;
    this._increaseHistory = [];
    this._ability = {
      name: "",
      abbr: "",
      score: 0,
      modifier: 0,
    }
  }

  private _ability: IAbilityScore;
  private _extraBonus: number;
  private _increaseHistory: number[];

  set linkedAbility(ability: IAbilityScore) {
    this._ability = ability;
  }

  set extraBonus(value: number) {
    this._extraBonus = value;
  }

  get hitPointMax(): number {
    return this._increaseHistory.reduce((s, v) => {
      const res = v + this._ability.modifier + this._extraBonus;
      return res > 0 ? s + res : s + 1;
    }, 0);
  }

  increaseHPMax(increase: number): void {
    this._increaseHistory.push(increase);
  }
}

export class Skill implements ISkill {
  constructor(
    name: string,
    ability: IAbilityScore,
    proficiency: IProficiency
  ) {
    this.name = name;
    this._ability = ability;
    this._proficiency = proficiency;
    this._skillProficiency = SkillProficiency.NONE;
    this._extraBonus = 0;
  }
  name: string;
  private _ability: IAbilityScore;
  private _proficiency: IProficiency;
  private _skillProficiency: SkillProficiency;
  private _extraBonus: number;

  set skillProficiency(proficiency: SkillProficiency) {
    this._skillProficiency = proficiency;
  }

  set extraBonus(value: number) {
    this._extraBonus = value;
  }

  get bonus(): number {
    return (
      this._ability.modifier +
      this._proficiency.bonus * this._skillProficiency +
      this._extraBonus
    );
  }
}

export class PassiveSkill {
  constructor(
    name: string,
    base: number,
    skill: ISkill,
  ) {
    this.name = name;
    this._base = base;
    this._skill = skill;
  }

  name: string;
  private _base: number;
  private _skill: ISkill;

  get passiveValue(): number {
    return this._base + this._skill.bonus;
  }
}

export enum CharacterType {
  NPC,
  PC,
}

export enum SkillProficiency {
  NONE = 0,
  HALF = 0.5,
  FULL = 1,
  DOUBLE = 2,
}
