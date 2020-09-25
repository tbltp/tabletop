import {
  Inventory,
  Trait,
  ResourceTrait,
  Spell,
  ScalingTrait,
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
      strength: new BaseAbility("Str", str),
      dexterity: new BaseAbility("Dex", dex),
      constitution: new BaseAbility("Con", con),
      intelligence: new BaseAbility("Int", int),
      wisdom: new BaseAbility("Wis", wis),
      charisma: new BaseAbility("Cha", cha),
    };

    this.proficiency = new BaseProficiency(this.level.totalLevel);

    this.baseStats = {
      initiativeBonus: {
        base: 0,
        modifier: this.abilityScores["dexterity"].modifier,
        bonus: { value: 0 },
      },
      baseArmorClass: {
        base: 10,
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
  level: { totalLevel: number } = { totalLevel: 1 };
  baseStats: {
    [key: string]: {
      base: number;
      modifier: { value: number };
      bonus: { value: number };
    };
  };
  speed: { value: number } = { value: 0 };
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
    items: [],
    gp: 0,
  };

  // Skill Check Modifiers
  skills: { [key: string]: Skill };

  // Traits (Class Features, Racial Traits, Feats)
  traits: {
    armorProficiencies: string[];
    weaponProficiencies: string[];
    toolProficiencies: string[];
    languages: Trait[];
    features: Trait[];
    resources: ResourceTrait[];
    scalingEffects: ScalingTrait[];
  } = {
    armorProficiencies: [],
    weaponProficiencies: [],
    toolProficiencies: [],
    languages: [],
    features: [],
    resources: [],
    scalingEffects: [],
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
      this.skills[skill].modifier.value
    );
  }
}

export class BaseAbility {
  constructor(name: string, score: number) {
    this.name = name;
    this.score = score;
    this.scoreMax = 20;
    this.modifier = { value: Math.floor((this.score - 10) / 2) };
  }

  name: string;
  score: number;
  scoreMax: number;
  modifier: { value: number };
  savingThrowProficiency: boolean = false;

  update(bonus: number) {
    this.score =
      this.score + bonus > this.scoreMax ? this.scoreMax : this.score + bonus;
    this.modifier.value = Math.floor((this.score - 10) / 2);
  }
}

export class BaseProficiency {
  constructor(level: number) {
    this.baseBonus = { value: Math.floor((level + 7) / 4) };
    this.halfBonus = { value: Math.floor(this.baseBonus.value / 2) };
  }

  baseBonus: { value: number };
  halfBonus: { value: number };

  levelUp(level: number) {
    this.baseBonus.value = Math.floor((level + 7) / 4);
    this.halfBonus.value = Math.floor(this.baseBonus.value / 2);
  }
}

interface Skill {
  readonly ability: string;
  modifier: { value: number };
  proficient: boolean;
  expertise: boolean;
  bonus: { value: number };
}
