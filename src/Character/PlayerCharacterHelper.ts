import * as Spells from '../../Assets/Spells.json';

import { AttachedFeature, ResourceTrait, ScalingTrait, Spell, Trait } from "./Interfaces";

import { PlayerCharacter } from "./PlayerCharacter";

export class PlayerCharacterHelper {
    constructor(pc: PlayerCharacter){
        this.pc = pc;
    }

    pc: PlayerCharacter;


    /** TRAIT FUNCTIONS:
     * These functions are used in order to find or add Traits (Feature, Resource, Scaling) to the PC.
     * 
     * private findTraitByName() ==> Accepts trait type and name, searches appropriate list in PC.traits for that trait.
     *
     * findFeatureTraitByName(), 
     * findResourceTraitByName(), 
     * findScalingTraitByName() ==> "Extend" findTraitByName() for specific types. Are exposed (i.e. not private).
     * 
     * private addTraits() ==> Accepts trait type  and body, inserts into appropriate list in PC.traits.
     * 
     * addFeatures(),
     * addResourceTraits(),
     * addScalingTraits() ==> "Extend" addTraits() for specific types. Are exposed (i.e. not private.)
     * 
     * removeFeatures() ==> Searches for feature trait in PC.traits.features, splices from list at index.
     * 
     * findFeatures() ==> Searches for feature on a custom lambda passed as a param (used for features that can be replaced.)
     */
    
    //idk if this means anything anymore
    private addTraits(type: string, ...traits: Trait[]) {
      this.pc.traits[type].push(...traits);
    }

    private nameMatch(name: string, traits: Trait[]): Trait | null {
      //accepts any casing
      const nameCaps = name.toUpperCase();
      const result = traits.find(
        t => t.title.toUpperCase() === nameCaps
      );
      return result ? result : null
    }

    findFeatureTraitByName(name: string): Trait | null {
      return this.nameMatch(name, this.pc.traits.features);
    }
    
    addFeatures(...features: Trait[]): void {
      this.addTraits("features", ...features);
    }

    addEffectsToFeature(feature: string, effect: {resource?: ResourceTrait, scaling?: ScalingTrait}){
      if(effect.resource) {this.findFeatureTraitByName(feature).resource = effect.resource }
      if(effect.scaling) {this.findFeatureTraitByName(feature).scaling = effect.scaling }
    }

    customizeFeature(feature: string, choices: string[]){
      this.findFeatureTraitByName(feature).choices = choices
    }

    removeFeatures(...oldFeatures: string[]): void {
      for (let oldftr of oldFeatures) {
        for (let i = 0; i < this.pc.traits.features.length; i++) {
          const title: string = this.pc.traits.features[i].title; 
          if (title.toUpperCase() == oldftr.toUpperCase()) {
            this.pc.traits.features.splice(i, 1);
          }
        }
      }
    }

    findFeatures(filterFunc: (Trait) => boolean): Trait[] {
      return this.pc.traits.features.filter(filterFunc);
    }

    /**
     * ABILITY SCORE FUNCTIONS:
     * 
     * changeAbilityScoreMaxes() ==> used to change Barbarian Str, Con, to 24 at level 20.
     * 
     * improveAbilityScores ==> used at levels 4, 8, 12, 16, 19, other ability score improvements for classes.
     */
      
    changeAbilityScoreMaxes(abilityScores: string[], newMax: number): void {
      for (const ability of abilityScores) {
        this.pc.abilityScores[ability].scoreMax = newMax;
      }
    }
  
    improveAbilityScores(
      abilityScoreImprovement: { abilities: string[]; value: string }
    ): void {
      for (const ability of abilityScoreImprovement.abilities) {
        this.pc.abilityScores[ability].update(+abilityScoreImprovement.value);
      }
    }
    
    /**
     * SPELL FUNCTIONS:
     * 
     * addSpells() ==> Inserts a list of spells at the appropriate level into PC.spells from a list of spell names (keys in Spells.json).
     * 
     * removeSpells() ==> Searches for a spell at its level, removes it from PC.spells[level].
     * 
     * addCustomSpells() ==> Inserts a list of Spell Objects into PC.spells.
     */

      
    addSpells(spellList: string[], spellcastingAbility: string, source?: AttachedFeature): void {
      let spells: Spell[] = [];
      for (const selectedSpell of spellList) {
        if(!selectedSpell) {continue}
        spells.push({
          ...Spells[selectedSpell],
          spellcastingAbility: spellcastingAbility,
          source: source
        });
      }
      for (const spell of spells) {
        this.pc.spells[spell.minimumLevel].push(spell);
      }
    }    

    removeSpells(...oldSpells: string[]): void {
      for (let oldSpell of oldSpells) {
        const oldSpellLevel: number = Spells[oldSpell].minimumLevel;
        const oldSpellsAtLevel: Spell[] = this.pc.spells[oldSpellLevel];
        for (let i = 0; i < oldSpellsAtLevel.length; i++) {
          if (oldSpellsAtLevel[i].name == Spells[oldSpell].name) {
            oldSpellsAtLevel.splice(i, 1);
          }
        }
      } 
    }

    addCustomSpells(...customSpells: Spell[]): void {
      customSpells.forEach(
        spell => {
          this.pc.spells[spell.minimumLevel].push(spell);
        }
      )
    }

    // ADD NOTE: Adds Note to PC.notes
    addNote(title: string, description: string){
      this.pc.notes.push({title: title, description: description, date: new Date().toLocaleDateString()})
    }
}