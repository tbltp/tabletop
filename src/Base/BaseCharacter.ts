import {
  Inventory,
  Trait,
  Spell,
} from "./Interfaces";

export abstract class BaseCharacter {
  constructor(
    str: number,
    dex: number,
    con: number,
    int: number,
    wis: number,
    cha: number
  ) {
    this.abilityScores = {
      strength: new BaseAbility("strength", "Str", str),
      dexterity: new BaseAbility("dexterity", "Dex", dex),
      constitution: new BaseAbility("constituion", "Con", con),
      intelligence: new BaseAbility("intelligence", "Int", int),
      wisdom: new BaseAbility("wisdom", "Wis", wis),
      charisma: new BaseAbility("charisma", "Cha", cha),
    };

    this.levels = new LevelContainer();
    this.proficiency = new BaseProficiency(this.levels);
    this.health = new HealthContainer(this.abilityScores['constitution']);

    
    this.baseStats = {
      initiativeBonus: {
        base: 0,
        modifier: this.abilityScores["dexterity"].modifier,
        bonus: { value: 0 },
      },
      passivePerception: {
        base: 10,
        modifier: this.abilityScores["wisdom"].modifier,
        bonus: { value: 0 },
      },
      passiveInvestigation: {
        base: 10,
        modifier: this.abilityScores["intelligence"].modifier,
        bonus: { value: 0 },
      },
      passiveInsight: {
        base: 10,
        modifier: this.abilityScores["wisdom"].modifier,
        bonus: { value: 0 },
      },
    };

    this.skills = {
      acrobatics: {
        ability: "dexterity",
        modifier: this.abilityScores["dexterity"].modifier,
        proficient: false,
        expertise: false,
        bonus: { value: 0 },
      }, //--> f(dex), + proficiency (Class Dependent);
      "animal handling": {
        ability: "wisdom",
        modifier: this.abilityScores["wisdom"].modifier,
        proficient: false,
        expertise: false,
        bonus: { value: 0 },
      }, //--> f(wis), + proficiency (Class Dependent);
      arcana: {
        ability: "intelligence",
        modifier: this.abilityScores["intelligence"].modifier,
        proficient: false,
        expertise: false,
        bonus: { value: 0 },
      }, //--> f(int), + proficiency (Class Dependent);
      athletics: {
        ability: "strength",
        modifier: this.abilityScores["strength"].modifier,
        proficient: false,
        expertise: false,
        bonus: { value: 0 },
      }, //--> f(str), + proficiency (Class Dependent);
      deception: {
        ability: "charisma",
        modifier: this.abilityScores["charisma"].modifier,
        proficient: false,
        expertise: false,
        bonus: { value: 0 },
      }, //--> f(cha), + proficiency (Class Dependent);
      history: {
        ability: "intelligence",
        modifier: this.abilityScores["intelligence"].modifier,
        proficient: false,
        expertise: false,
        bonus: { value: 0 },
      }, //--> f(int), + proficiency (Class Dependent);
      insight: {
        ability: "wisdom",
        modifier: this.abilityScores["wisdom"].modifier,
        proficient: false,
        expertise: false,
        bonus: { value: 0 },
      }, //--> f(wis), + proficiency (Class Dependent);
      intimidation: {
        ability: "charisma",
        modifier: this.abilityScores["charisma"].modifier,
        proficient: false,
        expertise: false,
        bonus: { value: 0 },
      }, //--> f(cha), + proficiency (Class Dependent);
      investigation: {
        ability: "intelligence",
        modifier: this.abilityScores["intelligence"].modifier,
        proficient: false,
        expertise: false,
        bonus: { value: 0 },
      }, //--> f(int), + proficiency (Class Dependent);
      medicine: {
        ability: "wisdom",
        modifier: this.abilityScores["wisdom"].modifier,
        proficient: false,
        expertise: false,
        bonus: { value: 0 },
      }, //--> f(wis), + proficiency (Class Dependent);
      nature: {
        ability: "intelligence",
        modifier: this.abilityScores["intelligence"].modifier,
        proficient: false,
        expertise: false,
        bonus: { value: 0 },
      }, //--> f(int), + proficiency (Class Dependent);
      perception: {
        ability: "wisdom",
        modifier: this.abilityScores["wisdom"].modifier,
        proficient: false,
        expertise: false,
        bonus: { value: 0 },
      }, //--> f(wis), + proficiency (Class Dependent);
      performance: {
        ability: "charisma",
        modifier: this.abilityScores["charisma"].modifier,
        proficient: false,
        expertise: false,
        bonus: { value: 0 },
      }, //--> f(cha), + proficiency (Class Dependent);
      persuasion: {
        ability: "charisma",
        modifier: this.abilityScores["charisma"].modifier,
        proficient: false,
        expertise: false,
        bonus: { value: 0 },
      }, //--> f(cha), + proficiency (Class Dependent);
      religion: {
        ability: "intelligence",
        modifier: this.abilityScores["intelligence"].modifier,
        proficient: false,
        expertise: false,
        bonus: { value: 0 },
      }, //--> f(int), + proficiency (Class Dependent);
      "sleight of hand": {
        ability: "dexterity",
        modifier: this.abilityScores["dexterity"].modifier,
        proficient: false,
        expertise: false,
        bonus: { value: 0 },
      }, //--> f(dex), + proficiency (Class Dependent);
      stealth: {
        ability: "dexterity",
        modifier: this.abilityScores["dexterity"].modifier,
        proficient: false,
        expertise: false,
        bonus: { value: 0 },
      }, //--> f(dex), + proficiency (Class Dependent);
      survival: {
        ability: "wisdom",
        modifier: this.abilityScores["wisdom"].modifier,
        proficient: false,
        expertise: false,
        bonus: { value: 0 },
      }, //--> f(wis), + proficiency (Class Dependent);
    };
  }

 // Base Ability Scores
 abilityScores: {
  [key: string]: BaseAbility;
};

  // Base Stats
  proficiency: BaseProficiency;
  levels: LevelContainer;
  health: HealthContainer;
  baseStats: {
    [key: string]: object;
  };
  size: string;

 
  // Adventuring Gear, Weapons, Armor
  inventory: Inventory = {
    weapons: [],
    armor: [],
    toolKits: [],
    gear: [],
    gp: 0,
  };

  // Skill Check Modifiers
  skills: { [key: string]: Skill };

  // Traits (Class Features, Racial Traits, Feats)
  traits: {
    armorProficiencies: Set<string>;
    weaponProficiencies: Set<string>;
    toolProficiencies: Set<string>;
    languages: Set<Trait>;
    features: Trait[];
  } = {
      armorProficiencies: new Set(),
      weaponProficiencies: new Set(),
      toolProficiencies: new Set(),
      languages: new Set(),
      features: []
    };

  // Known Spells
  spells: {
    "0": Spell[];
    "1": Spell[];
    "2": Spell[];
    "3": Spell[];
    "4": Spell[];
    "5": Spell[];
    "6": Spell[];
    "7": Spell[];
    "8": Spell[];
    "9": Spell[];
  } = {
      "0": [],
      "1": [],
      "2": [],
      "3": [],
      "4": [],
      "5": [],
      "6": [],
      "7": [],
      "8": [],
      "9": [],
    };

  // Obtain total modifier
  public getSkillTotal(skill: string): number {
    return (
      this.skills[skill].bonus.value * (this.skills[skill].expertise ? 2 : 1) +
      this.skills[skill].modifier
    );
  }
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
  
  get healthMax(): number {
    return this._increaseHistory.reduce(
      (s, v) => {
        const res = v + this._ability.modifier + this._extraBonus;
        return res > 0 ? s + res : s + 1; 
      }, 0
    );
  }

  increaseHealthMax(increase: number): void {
    this._increaseHistory.push(increase);
  }
}


/*
export class Stat {
  constructor(
    name: string,
    abbr: string,
    base: number,
    ability: BaseAbility
  ) {
    this.name = name;
    this.abbr = abbr;
    this._base = base;
    this._ability = ability;
    this._extraBonus = 0;
  }
  name: string;
  abbr: string;
  private _base: number;
  private _ability: BaseAbility;
  private _extraBonus: number;

  get 
}
*/



interface Skill {
  readonly ability: string;
  modifier:  number;
  proficient: boolean;
  expertise: boolean;
  bonus: { value: number };
}
