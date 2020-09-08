import { PlayerCharacter } from "../Base/PlayerCharacter";
import { Spell, Trait } from "../Base/Interfaces";
import * as Languages from "../../Assets/Languages.json";
import * as Gear from "../../Assets/Gear.json";
import * as ToolKits from "../../Assets/Tools.json";
import * as Spells from "../../Assets/Spells.json";


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
        lvlOneParams: levelingParams,
        hitDie: string,
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
    toolKits: string[];
    lvlOneParams: levelingParams;
    hitDie: string;
    savingThrowProficiencies: string[];
    features: Trait[];
    
    //TODO: wtf is a Path
    //path: Path;

    abstract abilitiesAtLevels: {[key: string]: (pc: PlayerCharacter, params: levelingParams) => void; };

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

    addWeapons(pc: PlayerCharacter): void { }

    addArmor(pc: PlayerCharacter): void { }

    addEquipment(pc: PlayerCharacter): void {
       // for(const item of this.equipment) { pc.inventory.items.push(Gear[item]); }
    }

    addToolkits(pc: PlayerCharacter): void {
       for(const tool of this.toolKits) { pc.inventory.toolKits.push(ToolKits[tool]); }
    }

    addSavingThrowProficiencies(pc: PlayerCharacter): void {
        for(const savingThrowProficiency in this.savingThrowProficiencies){ pc.abilityScores[savingThrowProficiency].savingThrowProficiency = true; }
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
        this.abilitiesAtLevels["1"](pc, this.lvlOneParams); 
    }

    static addSpells(pc: PlayerCharacter, spellList: string[], spellcastingAbility: string) {
        let spells: Spell[] = []
        for(const selectedSpell of spellList) { spells.push({...Spells[selectedSpell], spellcastingAbility: spellcastingAbility}); }
        for(const spell of spells) {  pc.spells[spell.minimumLevel].push(spell) }
    }

    static improveAbilityScore(pc: PlayerCharacter, abilityScoreImprovements: {ability: string, improvement: number}[]) {
        for(const ability of abilityScoreImprovements) { pc.abilityScores[ability.ability].update(ability.improvement); }
    }


}

export interface levelingParams {
    isNoInput: boolean,
	abilityScoreImprovement?: { 
		ability: string, 
		improvement: number 
	} [],
	spellSelection?: string [],
	fightingStyle?: string [],
	archetypeSelection?: {
		archetype: string, //school/oath/patron/etc
		options?: string [] //totems/maneuvers/elements/beast companions/etc
	} []
}