import {Inventory, Trait, ResourceTrait, Spell} from './Interfaces';

export abstract class BaseCharacter {
    
    constructor(str: number, dex: number, con: number, int: number, wis: number, cha: number) {
        this.abilityScores = {
            "strength": new BaseAbility("Str", str, ["Athletics"]),
            "dexterity": new BaseAbility("Dex", dex, ["Acrobatics", "Sleight of Hand", "Stealth"]),
            "constitution": new BaseAbility("Con", con, []),
            "intelligence": new BaseAbility("Int", int, ["Arcana", "History", "Investigation", "Nature", "Religion"]),
            "wisdom": new BaseAbility("Wis", wis, ["Animal Handling", "Insight", "Medicine", "Perception", "Survival"]),
            "charisma": new BaseAbility("Cha", cha, ["Deception", "Intimidation", "Performance", "Persuasion"])
        };

        this.initiativeBonus = this.abilityScores["dexterity"].modifier;
        this.baseArmorClass = 10 + this.abilityScores["dexterity"].modifier;
        this.hpMax = 8 + this.abilityScores["constitution"].modifier;
        this.proficiencyBonus = Math.floor((this.totalLevel + 7) / 4);
        this.passivePerception = 10 + this.abilityScores["wisdom"].modifier;
        




        this.skills = {
            "Acrobatics": this.abilityScores["dexterity"].skills["Acrobatics"], //--> f(dex), + proficiency (Class Dependent);
            "Animal Handling": this.abilityScores["wisdom"].skills["Animal Handling"], //--> f(wis), + proficiency (Class Dependent);
            "Arcana": this.abilityScores["intelligence"].skills["Arcana"],  //--> f(int), + proficiency (Class Dependent);
            "Athletics": this.abilityScores["strength"].skills["Athletics"],  //--> f(str), + proficiency (Class Dependent);
            "Deception": this.abilityScores["charisma"].skills["Deception"], //--> f(cha), + proficiency (Class Dependent);
            "History": this.abilityScores["intelligence"].skills["History"],  //--> f(int), + proficiency (Class Dependent);
            "Insight": this.abilityScores["wisdom"].skills["Insight"],  //--> f(wis), + proficiency (Class Dependent);
            "Intimidation": this.abilityScores["charisma"].skills["Intimidation"],  //--> f(cha), + proficiency (Class Dependent);
            "Investigation": this.abilityScores["intelligence"].skills["Investigation"],  //--> f(int), + proficiency (Class Dependent);
            "Medicine": this.abilityScores["wisdom"].skills["Medicine"],  //--> f(wis), + proficiency (Class Dependent);
            "Nature": this.abilityScores["intelligence"].skills["Nature"],  //--> f(int), + proficiency (Class Dependent);
            "Perception": this.abilityScores["wisdom"].skills["Perception"],  //--> f(wis), + proficiency (Class Dependent);
            "Performance": this.abilityScores["charisma"].skills["Performance"],  //--> f(cha), + proficiency (Class Dependent);
            "Persuasion": this.abilityScores["charisma"].skills["Persuasion"],  //--> f(cha), + proficiency (Class Dependent);
            "Religion": this.abilityScores["intelligence"].skills["Religion"],  //--> f(int), + proficiency (Class Dependent);
            "Sleight of Hand": this.abilityScores["dexterity"].skills["Sleight of Hand"],  //--> f(dex), + proficiency (Class Dependent);
            "Stealth": this.abilityScores["dexterity"].skills["Stealth"], //--> f(dex), + proficiency (Class Dependent);
            "Survival": this.abilityScores["wisdom"].skills["Survival"]  //--> f(wis), + proficiency (Class Dependent);
        }
    }

    // Base Stats
    totalLevel: number = 1;
    baseArmorClass: number; 
    initiativeBonus: number;
    proficiencyBonus: number;
    hpMax: number;
    passivePerception: number;
    speed: number;
    size: string;

    // Base Ability Scores
    abilityScores: { 
        "strength": BaseAbility;
        "dexterity": BaseAbility;
        "constitution": BaseAbility;
        "intelligence": BaseAbility;
        "wisdom": BaseAbility;
        "charisma": BaseAbility;
    }
    // Adventuring Gear, Weapons, Armor
    inventory: Inventory = {
        weapons: [],
        armor: [],
        toolKits: [],
        items: []
    };

    // Skill Check Modifiers
    skills: {[key: string]: Skill};

    // Traits (Class Features, Racial Traits, Feats)
    traits: { armorProficiencies: string[], weaponProficiencies: string[], toolProficiencies: string[], languages: Trait[], features: Trait[], resources: ResourceTrait[] } = {
        armorProficiencies: [], 
        weaponProficiencies: [], 
        toolProficiencies: [], 
        languages: [], 
        features: [], 
        resources: []
    };


    // Known Spells 
    spells: { 
        0: Spell[],
        1: Spell[],
        2: Spell[],
        3: Spell[],
        4: Spell[],
        5: Spell[],
        6: Spell[],
        7: Spell[],
        8: Spell[],
        9: Spell[]
    };

}

class BaseAbility {
    constructor(name: string, score: number, skills: string[]) {
        this.name = name;
        this.score = score;
        this.modifier = Math.floor((this.score - 10) / 2);

        for(const skill of skills){
            this.skills[skill] = { ability: this.name, modifier: this.modifier, proficient: false }
        }
    }
    
    name: string;
    score: number;
    modifier: number;
    skills: {[key:string]: Skill} = {};

    update(bonus: number) {
        this.score += bonus;
        this.modifier = Math.floor((this.score - 10) / 2);
        for(const skill in this.skills) { this.skills[skill].modifier = this.modifier; }
    }
}

interface Skill {
    readonly ability: string;
    modifier: number;
    proficient: boolean;
}
