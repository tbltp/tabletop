import {Inventory, Trait, ResourceTrait} from './Interfaces';

export abstract class BaseCharacter {
    
    constructor(str: number, dex: number, con: number, int: number, wis: number, cha: number) {
        this.strength = new BaseAbility(str);
        this.dexterity = new BaseAbility(dex);
        this.constitution = new BaseAbility(con);
        this.intelligence = new BaseAbility(int);
        this.wisdom = new BaseAbility(wis);
        this.charisma = new BaseAbility(cha);

        
        this.initiativeBonus = this.dexterity.modifier;
        this.baseArmorClass = 10 + this.dexterity.modifier;
        this.hpMax = 8 + this.constitution.modifier;
        this.proficiencyBonus = Math.floor((this.totalLevel + 7) / 4);
        this.passivePerception = 10 + this.wisdom.modifier;
        

        this.skills = {
            "acrobatics": {ability: this.dexterity, modifier: this.dexterity.modifier}, //--> f(dex), + proficiency (Class Dependent);
            "animalHandling": {ability: this.wisdom, modifier: this.wisdom.modifier}, //--> f(wis), + proficiency (Class Dependent);
            "arcana": {ability: this.intelligence, modifier: this.intelligence.modifier},  //--> f(int), + proficiency (Class Dependent);
            "athletics": {ability: this.strength, modifier: this.strength.modifier},  //--> f(str), + proficiency (Class Dependent);
            "deception": {ability: this.charisma, modifier: this.charisma.modifier}, //--> f(cha), + proficiency (Class Dependent);
            "history": {ability: this.intelligence, modifier: this.intelligence.modifier},  //--> f(int), + proficiency (Class Dependent);
            "insight": {ability: this.wisdom, modifier: this.wisdom.modifier},  //--> f(wis), + proficiency (Class Dependent);
            "intimidation": {ability: this.charisma, modifier: this.charisma.modifier},  //--> f(cha), + proficiency (Class Dependent);
            "investigation":{ability: this.intelligence, modifier: this.intelligence.modifier},  //--> f(int), + proficiency (Class Dependent);
            "medicine": {ability: this.wisdom, modifier: this.wisdom.modifier},  //--> f(wis), + proficiency (Class Dependent);
            "nature": {ability: this.intelligence, modifier: this.intelligence.modifier},  //--> f(int), + proficiency (Class Dependent);
            "perception": {ability: this.wisdom, modifier: this.wisdom.modifier},  //--> f(wis), + proficiency (Class Dependent);
            "performance": {ability: this.charisma, modifier: this.charisma.modifier},  //--> f(cha), + proficiency (Class Dependent);
            "persuasion": {ability: this.charisma, modifier: this.charisma.modifier},  //--> f(cha), + proficiency (Class Dependent);
            "religion": {ability: this.intelligence, modifier: this.intelligence.modifier},  //--> f(int), + proficiency (Class Dependent);
            "sleightOfHand": {ability: this.dexterity, modifier: this.dexterity.modifier},  //--> f(dex), + proficiency (Class Dependent);
            "stealth": {ability: this.dexterity, modifier: this.dexterity.modifier}, //--> f(dex), + proficiency (Class Dependent);
            "survival": {ability: this.wisdom, modifier: this.wisdom.modifier}  //--> f(wis), + proficiency (Class Dependent);
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
    strength: BaseAbility;
    dexterity: BaseAbility;
    constitution: BaseAbility;
    intelligence: BaseAbility;
    wisdom: BaseAbility;
    charisma: BaseAbility;

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

}

class BaseAbility {
    score: number;
    modifier: number;

    constructor(score: number) {
        this.score = score;
        this.modifier = Math.floor((this.score - 10) / 2);
    }
    
    update(bonus: number) {
        this.score += bonus;
        this.modifier = Math.floor((this.score - 10) / 2);
    }
}

interface Skill {
    readonly ability: BaseAbility;
    modifier: number;
}