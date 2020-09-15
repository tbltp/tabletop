import { BaseCharacter, BaseAbility } from './BaseCharacter';
import { ResourceTrait, Spell, Trait, ScalingTrait } from './Interfaces';
import * as Spells from '../../Assets/Spells.json';

export class PlayerCharacter extends BaseCharacter {
    
    constructor(
        str: number, 
        dex: number,
        con: number,
        int: number,
        wis: number,
        cha: number) {
        super(str,dex,con,int,wis,cha);
    }

    hitDie: string;
    attacks: PCAttack[] = [];
    armorClasses: PCArmorClass[] = [ {name: "Base", ...this.baseStats.baseArmorClass} ];

    private findTraitByName(traitType: string, name: string): Trait | null {
        const results = this.traits[traitType].filter(trait => trait.title == name);
        return results.length == 1 ? results[0] : null;
    }

    isSpellcaster(): boolean {
        for(let knownSpells of Object.keys(this.spells)){ if(this.spells[knownSpells].length > 0) { return true; } }
        return false;
    }

    findFeatureTraitByName(name: string): Trait {
        return this.findTraitByName('features', name);
    }

    findResourceTraitByName(name: string): ResourceTrait{
        return this.findTraitByName('resources', name) as ResourceTrait;
    }

    findScalingTraitByName(name: string): ScalingTrait {
        return this.findTraitByName('scalingEffects', name) as ScalingTrait;
    }

    findSpellByName(spellName: string): Spell | null {
        for(let knownSpells of Object.keys(this.spells)) {
            const results = this.spells[knownSpells].filter(spell => spell.name == spellName)
            if(results.length == 1) {
                return results[0]
            }
        }
        return null;
    }

    changeAbilityScoreMaxes(abilityScores: string[], newMax: number): void {
        for(const ability of abilityScores) { this.abilityScores[ability].scoreMax = newMax; }
    }

    improveAbilityScores(abilityScoreImprovements: {ability: string, improvement: number} []): void {
        for(const ability of abilityScoreImprovements) { this.abilityScores[ability.ability].update(ability.improvement); }
    }

    addFeatures(...features: Trait[]): void {
        this.traits.features.push(...features);
    }

    addResourceTraits(...resTraits: ResourceTrait[]): void {
        this.traits.resources.push(...resTraits);
    }

    addScalingTraits(...scalTraits: ScalingTrait[]): void {
        this.traits.scalingEffects.push(...scalTraits);
    }

    addSpells(spellList: string[], spellcastingAbility: string): void {
        let spells: Spell[] = []
        for(const selectedSpell of spellList) { spells.push({...Spells[selectedSpell], spellcastingAbility: spellcastingAbility}); }
        for(const spell of spells) { this.spells[spell.minimumLevel].push(spell) }
    }

    replaceSpells(spellReplacements: {[key: string]: string}, spellcastingAbility: string): void {
        for(let oldSpell in spellReplacements) {
            const newSpell = { ...Spells[spellReplacements[oldSpell]],  spellcastingAbility: spellcastingAbility };
            const oldSpellLevel: number = Spells[oldSpell].minimumLevel;
            const oldSpellsAtLevel: Spell[] = this.spells[oldSpellLevel];
            for(let ind = 0; ind < oldSpellsAtLevel.length; ind++ ) {
                if(oldSpellsAtLevel[ind].name == Spells[oldSpell].name) {
                    oldSpellsAtLevel.splice(ind, 1);
                }
            }
            this.spells[newSpell.minimumLevel].push(newSpell);
        }
    }
}

export interface PCArmorClass {
    name: string, 
    base: number, 
    modifier: {value: number}, 
    bonus: {value: number}
}

export interface PCAttack {
    name: string,
    attackBonus: { 
        ability: {value: number}, 
        proficient: boolean,
        itemBonus: {value: number}
    }, 
    dice: string, 
    damageType: string, 
    damageBonus: {value: number}
}