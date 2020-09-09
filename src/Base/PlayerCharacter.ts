import { BaseCharacter } from './BaseCharacter';
import { ResourceTrait, Spell, Trait } from './Interfaces';
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
    
    isSpellcaster(): boolean {
        for(let knownSpells of Object.keys(this.spells)){ if(this.spells[knownSpells].length > 0) {return true; } }

        return false;
    }

    findTraitByName(traitType: string, name: string): Trait | ResourceTrait {
        return this.traits[traitType].filter(trait => trait.title == name)[0];
    }

    findResourceTraitByName(name: string): ResourceTrait {
        return this.findTraitByName('resources', name)[0];
    }

    improveAbilityScores(abilityScoreImprovements: {ability: string, improvement: number} []): void {
        for(const ability of abilityScoreImprovements) { this.abilityScores[ability.ability].update(ability.improvement); }
    }

    addFeatures(...features: Trait []): void {
        this.traits.features.push(...features);
    }

    addResourceTraits(...resTraits: ResourceTrait []): void {
        this.traits.resources.push(...resTraits);
    }

    addSpells(spellList: string[], spellcastingAbility: string): void {
        let spells: Spell[] = []
        for(const selectedSpell of spellList) { spells.push({...Spells[selectedSpell], spellcastingAbility: spellcastingAbility}); }
        for(const spell of spells) {  this.spells[spell.minimumLevel].push(spell) }
    }
}