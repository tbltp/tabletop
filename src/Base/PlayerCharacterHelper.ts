import { Trait, ResourceTrait, ScalingTrait, Spell } from "./Interfaces";
import { PlayerCharacter } from "./PlayerCharacter";
import * as Spells from '../../Assets/Spells.json';

export class PlayerCharacterHelper {
    constructor(pc: PlayerCharacter){
        this.pc = pc;
    }

    pc: PlayerCharacter;

    private findTraitByName(traitType: string, name: string): Trait | null {
        const results = this.pc.traits[traitType].filter(
          (trait) => trait.title == name
        );
        return results.length == 1 ? results[0] : null;
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
    
      findSpellByName(spellName: string): Spell | null {
        for (let level of Object.keys(this.pc.spells)) {
          const results = this.pc.spells[level].filter(
            (spell) => spell.name == spellName
          );
          if (results.length == 1) {
            return results[0];
          }
        }
        return null;
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
        abilityScoreImprovements: { ability: string; improvement: number }[]
      ): void {
        for (const ability of abilityScoreImprovements) {
          this.pc.abilityScores[ability.ability].update(ability.improvement);
        }
      }
    
      addFeatures(...features: Trait[]): void {
        this.addTraits("features", ...features);
      }
    
      addResourceTraits(...resTraits: ResourceTrait[]): void {
        this.addTraits("resources", ...resTraits);
      }
    
      addScalingTraits(...scalTraits: ScalingTrait[]): void {
        this.addTraits("scalingEffects", ...scalTraits);
      }
    
      addSpells(spellList: string[], spellcastingAbility: string): void {
        let spells: Spell[] = [];
        for (const selectedSpell of spellList) {
          spells.push({
            ...Spells[selectedSpell],
            spellcastingAbility: spellcastingAbility,
          });
        }
        for (const spell of spells) {
          this.pc.spells[spell.minimumLevel].push(spell);
        }
      }
    
      replaceSpells(
        spellReplacements: { [key: string]: string },
        spellcastingAbility: string
      ): void {
        for (let oldSpell in spellReplacements) {
          const newSpell = {
            ...Spells[spellReplacements[oldSpell]],
            spellcastingAbility: spellcastingAbility,
          };
          const oldSpellLevel: number = Spells[oldSpell].minimumLevel;
          const oldSpellsAtLevel: Spell[] = this.pc.spells[oldSpellLevel];
          for (let ind = 0; ind < oldSpellsAtLevel.length; ind++) {
            if (oldSpellsAtLevel[ind].name == Spells[oldSpell].name) {
              oldSpellsAtLevel.splice(ind, 1);
            }
          }
          this.pc.spells[newSpell.minimumLevel].push(newSpell);
        }
      }
}