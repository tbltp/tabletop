import { PlayerCharacter } from "../Base/PlayerCharacter";
import { Trait } from "../Base/Interfaces";
import * as Feats from "./Feats.json";

export abstract class Feat {
  constructor(
    name: string,
    abilityScore?: string,
    spellClass?: string,
    spells?: string[],
    languages?: string[],
    skills?: string[],
    tools?: string[],
    weaponProficiencies?: string[],
    element?: string
  ) {
    this.name = name;
    this.abilityScore = abilityScore;
    this.spellClass = spellClass;
    this.spells = spells;
    this.languages = languages;
    this.skills = skills;
    this.tools = tools;
    this.weaponProficiencies = weaponProficiencies;
    this.trait = Feats[name.toUpperCase()];
    this.element = element;
  }

  name: string;
  abilityScore: string | null;
  spellClass: string | null;
  spells: string[] | null;
  languages: string[] | null;
  skills: string[] | null;
  tools: string[] | null;
  weaponProficiencies: string[] | null;
  element: string | null;

  trait: Trait; // Description of Feat inside of Trait list inside PC
  abilitiesAtLevels: { [key: string]: (pc: PlayerCharacter) => void } = {};

  protected apply(pc: PlayerCharacter, choices?: string[], spell?: string) {
    if(choices || spell) {
      const newTrait: Trait = {
        ...this.trait, 
        choices: choices,
        spellAdded: spell
      }
    }
    pc.pcHelper.addFeatures(this.trait);
  }

  //TODO: separate out pre-req logic checking to an external class to handle feats, eld. invocations, elem. disciplines, multiclasses, etc
  abilityPrereqCheck(
    pc: PlayerCharacter,
    skill: string,
    target: number
  ): boolean {
    return pc.abilityScores[skill].score < target ? false : true;
  }

  armorPrereqCheck(pc: PlayerCharacter, skill: string) {
    return pc.traits.armorProficiencies.indexOf(skill) === -1 ? false : true;
  }

  spellcasterPrereqCheck(pc: PlayerCharacter) {
    return !pc.pcHelper.isSpellcaster() ? false : true;
  }
}