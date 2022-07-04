import { runInThisContext } from "vm";
import { PlayerCharacter } from './PlayerCharacter';
import {
  Inventory,
  Trait,
  Spell,
} from "./Interfaces";


export abstract class BaseCharacter {
  constructor() {
    this.charSize = "";
    this.charType = CharacterType.NPC;
    this.charLevels = new LevelContainer();
    this.charProficiency = new BaseProficiency(this.charLevels);
    this.charAbilityScores = {};
    this.charSkills = {};

    const dummyAbilty = new BaseAbility("", "", 1);
    this.charHealth = new HealthContainer(dummyAbilty);
  }

 // Base Ability Scores
  protected charAbilityScores: {
    [key: string]: BaseAbility;
  };
  // Base Stats
  protected charSize: string;
  protected charType: CharacterType;
  protected charLevels: LevelContainer;
  protected charProficiency: BaseProficiency;
  protected charHealth: HealthContainer;
  // Passives

  // Skill
  protected charSkills: { [key: string]: Skill };
 
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

}

export enum CharacterType {
  NPC,
  PC,
}

export class BaseAbility {
  constructor(name: string, abbr: string, score: number) {

    this.name = name;
    this.abbr = abbr;
    this._scoreMax = 20;
    if (score < 1) {
      throw TypeError('Starting score cannot be less than 1');
    }
    if (score > this._scoreMax) {
      throw TypeError(`Starting score cannot be greater than maximum of ${this._scoreMax}`)
    }
    this._score = score;
  }

  name: string;
  abbr: string;
  private _score: number;
  private _scoreMax: number;
  private _getModifier: () => number = () => (
    Math.floor(
      (this._score - 10) / 2
    ));

  savingThrowProficiency: boolean = false;
  halfProficiency: boolean = false;

  increaseScore(bonus: number): void {
    if(this._score + bonus > this._scoreMax) {
      this._score = this._scoreMax;
      return;
    }
    if(this._score + bonus < 1) {
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
    if(this._score > this._scoreMax) {
      this._score = this._scoreMax;
    }
  }
}

export class LevelContainer {
  constructor() {
    this._levelDictionary = {};
    this._maxLevel = 20;
  }

  private _maxLevel: number;
  private _levelDictionary: {
    [className: string]: number
  }

  set maxLevel(newmax: number) {
    this._maxLevel = newmax;
  }

  increaseLevel(className: string): void {
    if(this.totalLevel < this._maxLevel) {
      if(this._levelDictionary[className]) {
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
    if(this.totalLevel > this._maxLevel) {
      this._levelDictionary[className] = currentLevel;
      throw Error(`Total levels cannot exceed max level ${this._maxLevel}`);
    }
  }

  getClassLevel(className: string): number { 
    if(this._levelDictionary[className]) {
      return this._levelDictionary[className];
    }
    throw ReferenceError(`Class ${className} not found`);
  }

  get totalLevel(): number {
    return Object.values(this._levelDictionary).reduce(
      (s, v) => s + v, 0
    );
  }
}

export class BaseProficiency {
  constructor(level: LevelContainer) {
    this._level = level;
    this._extraBonus = 0;
  }

  private _level: LevelContainer;
  private _extraBonus: number;
  
  private _calculateLevelBonus: () => number = () => (
    Math.floor((this._level.totalLevel + 7) / 4)
  );

  set extraBonus(value: number) {
    this._extraBonus = value;
  }

  get bonus(): number {
    return this._calculateLevelBonus() + this._extraBonus;
  }
}

export class HealthContainer {
  constructor(ability: BaseAbility) {
    this._extraBonus = 0;
    this._ability = ability;
    this._increaseHistory = [];
  }

  private _ability: BaseAbility;
  private _extraBonus: number;
  private _increaseHistory: number[];

  set extraBonus(value: number) {
    this._extraBonus = value;
  }
  
  get hitPointMax(): number {
    return this._increaseHistory.reduce(
      (s, v) => {
        const res = v + this._ability.modifier + this._extraBonus;
        return res > 0 ? s + res : s + 1; 
      }, 0
    );
  }

  increaseHPMax(increase: number): void {
    this._increaseHistory.push(increase);
  }
}




interface Skill {
  readonly ability: string;
  modifier:  number;
  proficient: boolean;
  expertise: boolean;
  bonus: { value: number };
}
