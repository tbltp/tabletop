import { PlayerCharacter } from "../Base/PlayerCharacter";
import { Spell, Trait, ResourceTrait } from "../Base/Interfaces";
import * as ClassTraits from "../../Assets/ClassTraits.json";
import * as Languages from "../../Assets/Languages.json";
import * as Gear from "../../Assets/Gear.json";
import * as ToolKits from "../../Assets/Tools.json";
import * as Spells from "../../Assets/Spells.json";
import * as Armor from '../../Assets/Armor.json';
import * as Weapons from '../../Assets/Weapons.json';
import { Inventory } from "../Base/Inventory";


export abstract class PlayerClass {

    constructor(
        name: string,
        languages: string[], 
        skillProficiencies: string[], 
        weaponProficiencies: string[], 
        armorProficiencies: string[], 
        toolProficiencies: string[],
        weapons: string[],
        armor: string[],
        equipment: string[],
        toolKits: string[],
        lvlOneParams: LevelingParams,
        hitDie: string,
        hpBase: number,
        savingThrowProficiencies: string[] 
    ) {

        this.name = name;
        this.languages = languages;
        this.skillProficiencies = skillProficiencies;
        this.weaponProficiencies = weaponProficiencies;
        this.armorProficiencies = armorProficiencies;
        this.toolProficiencies = toolProficiencies;
        this.weapons = weapons;
        this.armor = armor;
        this.equipment = equipment;
        this.toolKits = toolKits;
        this.lvlOneParams = lvlOneParams;
        this.hitDie = hitDie;
        this.savingThrowProficiencies = savingThrowProficiencies;
        this.features = [];
        this.hpBase = hpBase;
    }


    name: string;
    languages: string[];
    skillProficiencies: string[];
    weaponProficiencies: string[];
    armorProficiencies: string[];
    toolProficiencies: string[];
    weapons: string[];
    armor: string[];
    equipment: string[];
    equipmentPack: string;
    toolKits: string[];
    lvlOneParams: LevelingParams;
    hitDie: string;
    hpBase: number;
    savingThrowProficiencies: string[];
    features: Trait[];
    
    //TODO: wtf is a Path
    //path: Path;

    abstract abilitiesAtLevels: {[key: string]: (pc: PlayerCharacter, params: LevelingParams) => void; };

    addLanguages(pc: PlayerCharacter): void {
        for(let language of this.languages) { pc.traits.languages.push(Languages[language]); };
    }

    addSkillProficiencies(pc: PlayerCharacter): void {
        for(let skill of this.skillProficiencies) { pc.skills[skill].proficient = true; }
    }

    addWeaponProficiencies(pc: PlayerCharacter): void {
        for(let weapon of this.weaponProficiencies) { pc.traits.weaponProficiencies.push(weapon) };
    }

    addArmorProficiencies(pc: PlayerCharacter): void {
        for(let armor of this.armorProficiencies) { pc.traits.armorProficiencies.push(armor) };
    }

    addToolProficiencies(pc: PlayerCharacter): void {
        for(let tool of this.toolProficiencies) { pc.traits.toolProficiencies.push(tool) };
    }

    addFeatures(pc: PlayerCharacter): void {
        for(let trait of this.features) { pc.traits.features.push(trait) };
    }

    addWeapons(pc: PlayerCharacter): void { 
        for(const weapon of this.weapons){ 
            pc.inventory.weapons.push(Weapons[weapon]) 
            if (pc.attacks.filter(attack => attack.name == Weapons[weapon].name).length == 0) { pc.attacks.push(Inventory.buildAttack(pc, Weapons[weapon])) }
        }
    }

    addArmor(pc: PlayerCharacter): void { 
        for(const armor of this.armor){ 
            pc.inventory.armor.push(Armor[armor]) 
            pc.armorClasses.push(Inventory.acFromArmorType[Armor[armor].armorType](pc, Armor[armor]))
        }
    }

    addEquipment(pc: PlayerCharacter): void {
        for(const item of Inventory.equipmentPacks[this.equipmentPack]()){ pc.inventory.items.push(item); }
       
        for(const item of this.equipment) { pc.inventory.items.push(Gear[item]); }
    }

    addToolkits(pc: PlayerCharacter): void {
       for(const tool of this.toolKits) { pc.inventory.toolKits.push(ToolKits[tool]); }
    }

    addSavingThrowProficiencies(pc: PlayerCharacter): void {
        for(const savingThrowProficiency of this.savingThrowProficiencies){ pc.abilityScores[savingThrowProficiency].savingThrowProficiency = true; }
    }

    apply(pc: PlayerCharacter): void {
        this.addLanguages(pc);
        this.addSkillProficiencies(pc);
        this.addWeaponProficiencies(pc);
        this.addArmorProficiencies(pc);
        this.addToolProficiencies(pc);
        this.addWeapons(pc);
        this.addArmor(pc);
        this.addEquipment(pc);
        this.addToolkits(pc);
        this.addSavingThrowProficiencies(pc);
        this.abilitiesAtLevels["1"](pc, this.lvlOneParams);

        pc.hitDie = this.hitDie;
 
        pc.baseStats.hpMax.base = this.hpBase;
    }

    pushClassFeatures(pc: PlayerCharacter, level: string, className: string) {
        for(let key in ClassTraits[className][level]) {
            pc.addFeatures(ClassTraits[className][level][key]);
        }
    }

    static pushCustomizedClassFeature(pc: PlayerCharacter, level: string, className: string, feature: string, choices: string[]) {
        const customFeature: Trait = {...ClassTraits[className][level][feature], choices: choices};
        pc.addFeatures(customFeature);
    }
    
    static quickClassLevelUp(pc: PlayerCharacter, pcls: PlayerClass, argsAry: LevelingParams[], level: number): void {
        for(let i = 2; i <= level; i++) {
            pcls.abilitiesAtLevels[i](pc, argsAry[i - 1]);
        }
    }
}
    
export class SpellSlotFactory {

    private static getLevelString(level: number): string {
        let slotLevel: string = '';
        switch(level) {
            case 1: {
                slotLevel = 'first';
                break;
            }
            case 2: {
                slotLevel = 'sixth';
                break;
            }
            case 7: {
                slotLevel = 'seventh';
                break;
            }
            case 8: {
                slotLevel = 'eigth';
                break;
            }
            case 9: {
                slotLevel = 'ninth';
                break;
            }
            default: {
                slotLevel = 'zeroth';
                break;
            }
        }
        return slotLevel;
    }

    private static generateSpellSlots(level: number, max: number): ResourceTrait {
        
        const slotLevelString: string = SpellSlotFactory.getLevelString(level);
        return {
            title: slotLevelString.charAt(0).toUpperCase() + 
                slotLevelString.slice(1) + 
                " Level Spell Slots",
            description: "Number of " + slotLevelString + 
                " level spells you can cast",
            resourceMax: {value: max}
        };
    }

    public static getSpellSlots(level: number, max: number): ResourceTrait {
        return SpellSlotFactory.generateSpellSlots(level, max);
    }

    public static findPlayerSpellSlots(pc: PlayerCharacter, level: number): ResourceTrait {
        const slotLevelString: string = SpellSlotFactory.getLevelString(level);
        const resourceTitle: string = slotLevelString.charAt(0).toUpperCase() + slotLevelString.slice(1) +
            " Level Spell Slots";
        return pc.findResourceTraitByName(resourceTitle);
    }

}

export interface LevelingParams {
    isNoInput: boolean,
	abilityScoreImprovement?: { 
		ability: string, 
		improvement: number 
	} [],
    spellSelection?: string [],
    spellReplacements?: {
        [key: string]: string
    },
    proficiencySelection?: string[],
    fightingStyle?: string [],
	archetypeSelection?: {
		archetype: string, //school/oath/patron/etc
		options?: string [] //totems/maneuvers/elements/beast companions/etc
	} []
}