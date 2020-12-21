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
    element?: string,
    maneuvers?: string[]
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
    this.maneuvers = maneuvers;
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
  maneuvers: string[] | null;

  trait: Trait; // Description of Feat inside of Trait list inside PC
  abilitiesAtLevels: { [key: string]: (pc: PlayerCharacter) => void } = {};

  public apply(pc: PlayerCharacter, choices?: string[], spell?: string) {
    if(choices || spell) {
       const newTrait = {
        ...this.trait, 
        choices: choices,
        spellAdded: spell
      }
      pc.pcHelper.addFeatures(newTrait)
    }
    pc.pcHelper.addFeatures(this.trait);
  }

  abilityPrereqCheck(
    pc: PlayerCharacter,
    skill: string,
    target: number
  ): boolean {
    return pc.abilityScores[skill].score < target ? false : true;
  }

  armorPrereqCheck(pc: PlayerCharacter, skill: string) {
    return pc.traits.armorProficiencies.has(skill) ? false : true;
  }

  spellcasterPrereqCheck(pc: PlayerCharacter) {
    return !pc.pcHelper.isSpellcaster() ? false : true;
  }
}