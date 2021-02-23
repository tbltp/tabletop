import { Trait, ResourceTrait, ScalingTrait, Spell, AttachedFeature } from "./Interfaces";
import { PlayerCharacter } from "./PlayerCharacter";
import * as Spells from '../../Assets/Spells.json';

export class PlayerCharacterHelper {
    constructor(pc: PlayerCharacter){
        this.pc = pc;
    }

    pc: PlayerCharacter;

    private findTraitByName(traitType: string, name: string): Trait | null {
      //accepts title casing or all caps
        const results = this.pc.traits[traitType].filter(
          (trait) => trait.title === name || trait.title.toUpperCase() === name
        );
        return results.length === 1 ? results[0] : null;
      }
    
      private addTraits(type: string, ...traits: Trait[]) {
        this.pc.traits[type].push(...traits);
      }
    
      isSpellcaster(): boolean {
        for (let knownSpells of Object.keys(this.pc.spells)) {
          if (this.pc.spells[knownSpells].length > 0) {
            return true;
          }
        }
        return false;
      }
    
      findFeatureTraitByName(name: string): Trait {
        return this.findTraitByName("features", name);
      }
    
      findResourceTraitByName(name: string): ResourceTrait {
        return this.findTraitByName("resources", name) as ResourceTrait;
      }
    
      findScalingTraitByName(name: string): ScalingTrait {
        return this.findTraitByName("scalingEffects", name) as ScalingTrait;
      }
    
      getSpellCountAtLevel(level: number): number {
        return this.pc.spells[level].length;
      }
    
      getCantripCount(): number {
        return this.pc.spells[0].length;
      }
    
      getSpellCount(): number {
        //ignore cantrips
        return Object.values(this.pc.spells)
          .slice(1)
          .map((splsAtLvl) => splsAtLvl.length)
          .reduce((l1, l2) => l1 + l2);
      }
    
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
    
      addFeatures(...features: Trait[]): void {
        this.addTraits("features", ...features);
      }

      removeFeatures(...oldFeatures: string[]) {
        for (let oldftr of oldFeatures) {
          for (let i = 0; i < this.pc.traits.features.length; i++) {
            const title: string = this.pc.traits.features[i].title; 
            if (title.toUpperCase() == oldftr) {
              this.pc.traits.features.splice(i, 1);
            }
          }
        }
      }
    
      addResourceTraits(...resTraits: ResourceTrait[]): void {
        this.addTraits("resources", ...resTraits);
      }
    
      addScalingTraits(...scalTraits: ScalingTrait[]): void {
        this.addTraits("scalingEffects", ...scalTraits);
      }
    
      addSpells(spellList: string[], spellcastingAbility: string, source?: AttachedFeature): void {
        let spells: Spell[] = [];
        for (const selectedSpell of spellList) {
          //console.log(Spells[selectedSpell] ? `${selectedSpell} +1`: `${selectedSpell} - FIX` )
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

      addCustomSpells(...customSpells: Spell[]): void {
        customSpells.forEach(
          spell => {
            this.pc.spells[spell.minimumLevel].push(spell);
          }
        )
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

      addNote(title: string, description: string){
        this.pc.notes.push({title: title, description: description, date: new Date().toLocaleDateString()})
      }
}