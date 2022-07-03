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

    this.proficiency = new BaseProficiency(this.level);

    this.baseStats = {
      initiativeBonus: {
        base: 0,
        modifier: this.abilityScores["dexterity"].modifier,
        bonus: { value: 0 },
      },
      hpMax: {
        base: undefined,
        modifier: this.abilityScores["constitution"].modifier,
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

  // Base Stats
  proficiency: BaseProficiency;
  level = 0;
  baseStats: {
    [key: string]: {
      base: number;
      modifier: number ;
      bonus: { value: number };
    };
  };
  size: string;

  // Base Ability Scores
  abilityScores: {
    strength: BaseAbility;
    dexterity: BaseAbility;
    constitution: BaseAbility;
    intelligence: BaseAbility;
    wisdom: BaseAbility;
    charisma: BaseAbility;
  };
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
  }
  name: string;
  abbr: string;
  private _base: number;
  private _ability: BaseAbility;
  private _bonus: number = 0;
}

export class BaseProficiency {
  constructor(level: number) {
    this._level = level;
  }

  private _level: number;
  private _levelFunction: (levelsToAdd: number) => void = (levelsToAdd: number) => {
    this._level += levelsToAdd;
  };
  private _calculateBonus: () => number = () => (
     Math.floor((this._level +7) / 4)
  );

  get bonus(): number {
    return this._calculateBonus();
  }
  get halfBonus(): number {
    return Math.floor(this._calculateBonus() / 2);
  }

  levelUp(levelsToAdd: number): void {
    this._levelFunction(levelsToAdd);
  }
}

interface Skill {
  readonly ability: string;
  modifier:  number;
  proficient: boolean;
  expertise: boolean;
  bonus: { value: number };
}
