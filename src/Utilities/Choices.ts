import * as RaceChoices from "./Choice Build Specs/RaceChoices.json";
import * as ClassChoices from "./Choice Build Specs/ClassChoices.json";
import * as SubclassChoices from "./Choice Build Specs/SubClassChoices.json";
import * as BackgroundChoices from "./Choice Build Specs/BackgroundChoices.json";
import * as FeatChoices from "./Choice Build Specs/FeatChoices.json";
import * as Invocations from "../Classes/Warlock/EldritchInvocations.json";
import * as Maneuvers from "../Classes/Fighter/Subclasses/BattleMaster/Maneuvers.json";
import * as Disciplines from "../Classes/Monk/Subclasses/FourElements/ElementalDisciplines.json";
import * as Spells from "../../Assets/Spells.json";
import * as SpellList from "../../Assets/SpellList.json";
import { PlayerCharacter } from "../Base/PlayerCharacter";
import { CharacterSheet } from "../Base/CharacterSheet";
import { Prereqs } from "./Prereqs";
import { Race } from "../Races/Race";
import { PlayerClass } from "../Classes/PlayerClass";
import { Background } from "../Backgrounds/Background";
import { PlayerCharacterHelper } from "../Base/PlayerCharacterHelper";
import { Trait } from "../Base/Interfaces";

export class Choices {
  static renderRaceChoices(): string[] {
    return Object.keys(RaceChoices);
  }

  static renderRaceSelectionChoices(race: string): [string, ChoiceSpec][] {
    return Object.entries(RaceChoices[race]);
  }

  static renderBackgroundChoices(): string[] {
    return Object.keys(BackgroundChoices);
  }

  static renderBackgroundSelectionChoices(
    background: string
  ): [string, ChoiceSpec][] {
    return Object.entries(BackgroundChoices[background]);
  }

  static renderClassChoices(): string[] {
    return Object.keys(ClassChoices);
  }

  static renderClassChoicesAtLevel(
    pclass: string,
    level: number
  ): [string, ChoiceSpec][] {
    return ClassChoices[pclass][level]
      ? Object.entries(ClassChoices[pclass][level])
      : [];
  }

  static renderSubclassChoices(
    subclass: string,
    level: number
  ): [string, ChoiceSpec][] {
    return SubclassChoices[subclass] && SubclassChoices[subclass][level]
      ? Object.entries(SubclassChoices[subclass][level])
      : [];
  }

  static renderAbilityScoreChoices(): [string, ChoiceSpec][] {
    return [
      [
        "abilities",
        {
          alias: "Ability Score Improvement (up to 2)",
          choose: 2,
          from: [
            "strength",
            "dexterity",
            "constitution",
            "intelligence",
            "wisdom",
            "charisma",
          ],
          required: true,
        },
      ],
    ];
  }

  static renderFeatChoices(): string[] {
    return Object.keys(FeatChoices);
  }

  static renderFeatSelectionChoices(feat: string): [string, ChoiceSpec][] {
    return Object.entries(FeatChoices[feat]);
  }

  static convertToParams(spec: ChoiceSpec, sheet?: CharacterSheet): ChoiceParams {
    let params: ChoiceParams = {};

    if (sheet) {
      params.pc = sheet.character;
      params.classes = sheet.playerClasses;
    }
    if (spec["args"]) {
      const args = spec["args"];
      if (args.length == 1) {
        params.level = args[0];
      } else {
        params.list = args[0];
        params.level = args[1];
      }
    }
    return params;
  }

  static functionRailRoad: {
    [key: string]: (spec: ChoiceParams) => string[];
  } = {
    getSpellList: Choices.getSpellList,
    getSpellListAll: Choices.getSpellListAll,
    getRitualSpellList: Choices.getRitualSpellList,
    getAttackSpellList: Choices.getAttackSpellList,
    getKnownManeuvers: Choices.getKnownManeuvers,
    getKnownSpells: Choices.getKnownSpells,
    getKnownSpellsAtLevel: Choices.getKnownSpellsAtLevel,
    getSkillProficiencies: Choices.getSkillProficiencies,
    getMentalSavingThrows: Choices.getMentalSavingThrows,
    getAvailableClericWeapons: Choices.getAvailableClericWeapons,
    getAvailableClericArmor: Choices.getAvailableClericArmor,
    getEldritchSpellList: Choices.getEldritchSpellList,
    getEldritchInvocations: Choices.getEldritchInvocations,
    getKnownInvocations: Choices.getKnownInvocations,
    getElementalDisciplines: Choices.getElementalDisciplines,
    getKnownElementalDisciplines: Choices.getKnownElementalDisciplines,
    getTricksterSpellList: Choices.getTricksterSpellList,
  };

  static getSpellList(spec: ChoiceParams) {
    //up to specified level
    if (+spec.level > 0) {
      let spellList = new Set<string>();
      for (let i = 1; i <= +spec.level; i++) {
        SpellList[spec.list][i].map((spell) => spellList.add(spell));
      }
      return [...spellList.values()];
    } else {
      return SpellList[spec.list][spec.level];
    }
  }

  static getSpellListAll(spec: ChoiceParams) {
    //up to specified level across all spellcasting classes
    let spellList = new Set<string>();
    for (const className in SpellList) {
      if (+spec.level > 0) {
        for (let i = 1; i <= +spec.level; i++) {
          SpellList[className][i].map((spell) => spellList.add(spell));
        }
      } else {
        SpellList[className][spec.level].map((spell) => spellList.add(spell));
      }
    }
    return [...spellList.values()];
  }

  static getRitualSpellList(spec: ChoiceParams) {
    //up to specified level
    return Choices.getSpellList(spec).filter((spell) =>
      Choices.checkForSpellProperty(spell, "ritual")
    );
  }

  static getAttackSpellList(spec: ChoiceParams) {
    //up to specified level
    return Choices.getSpellList(spec).filter((spell) =>
      Choices.checkForSpellProperty(spell, "spellAttack")
    );
  }

  static getKnownSpells(spec: ChoiceParams): string[] {
    return []
      .concat(...Object.values(spec.pc.spells).slice(1))
      .map((spell) => spell["name"].toUpperCase());
  }

  static getKnownSpellsAtLevel(spec: ChoiceParams): string[] {
    return []
      .concat(...Object.values(spec.pc.spells[spec.level]))
      .map((spell) => spell["name"].toUpperCase());
  }

  static getSkillProficiencies(spec: ChoiceParams) {
    let expertiseEligibleSkills = [];
    const pc: PlayerCharacter = spec.pc;

    for (const skill in pc.skills) {
      if (pc.skills[skill].proficient && !pc.skills[skill].expertise) {
        expertiseEligibleSkills.push(skill);
      }
    }

    return expertiseEligibleSkills;
  }

  static getMentalSavingThrows(spec: ChoiceParams) {
    //only return charisma and intelligence if already have proficiency in wisdom saving throws
    const pc: PlayerCharacter = spec.pc;
    return pc.abilityScores.wisdom.savingThrowProficiency == true
      ? ["charisma", "intelligence"]
      : ["wisdom"];
  }

  static getAvailableClericWeapons(spec: ChoiceParams) {
    return spec.pc.traits.weaponProficiencies.has("Martial") ||
      spec.pc.traits.weaponProficiencies.has("Warhammer")
      ? ["MACE", "WARHAMMER"]
      : ["MACE"];
  }

  static getAvailableClericArmor(spec: ChoiceParams) {
    return spec.pc.traits.armorProficiencies.has("Heavy")
      ? ["SCALE MAIL", "LEATHER", "CHAIN MAIL"]
      : ["SCALE MAIL", "LEATHER"];
  }

  static getEldritchSpellList(spec: ChoiceParams) {
    //get spell list for Wizard at a level BUT only Abjuration or Evocation schools
    spec.list = "Wizard";
    return Choices.getSpellList(spec).filter((spell) =>
      Choices.checkSpellSchools(spell, "abjuration", "evocation")
    );
  }

  static getTricksterSpellList(spec: ChoiceParams) {
    //get spell list for Wizard at a level BUT only Enchantment or Illusion schools
    spec.list = "Wizard";
    return Choices.getSpellList(spec).filter((spell) =>
      Choices.checkSpellSchools(spell, "enchantment", "illusion")
    );
  }

  static getKnownManeuvers(spec: ChoiceParams): string[] {
    return Choices.knownFeaturesLookup(spec, Maneuvers);
  }

  static getEldritchInvocations(spec: ChoiceParams) {
    let eligibleInvocations = [];
    for (const invocation of Object.keys(Invocations)) {
      if (!Invocations[invocation].prereqs) {
        eligibleInvocations.push(Invocations[invocation]);
      } else {
        let validInv = true;
        for (const prereq of Invocations[invocation].prereqs) {
          if (!Prereqs.prereqChecks[prereq.type](prereq.value, spec.pc)) {
            validInv = false;
            break;
          }
        }
        validInv ? eligibleInvocations.push(Invocations[invocation]) : null;
      }
    }

    return eligibleInvocations;
  }

  static getKnownInvocations(spec: ChoiceParams) {
    return Choices.knownFeaturesLookup(spec, Invocations);
  }

  static getElementalDisciplines(spec: ChoiceParams) {
    let eligibleDiscplines = [];
    for (const discipline of Object.keys(Disciplines)) {
      if (!Disciplines[discipline].prereqs) {
        eligibleDiscplines.push(Disciplines[discipline]);
      } else {
        let validInv = true;
        for (const prereq of Disciplines[discipline].prereqs) {
          if (!Prereqs.prereqChecks[prereq.type](prereq.value, spec.pc)) {
            validInv = false;
            break;
          }
        }
        validInv ? eligibleDiscplines.push(Disciplines[discipline]) : null;
      }
    }

    return eligibleDiscplines;
  }

  static getKnownElementalDisciplines(spec: ChoiceParams) {
    return Choices.knownFeaturesLookup(spec, Disciplines);
  }

  private static knownFeaturesLookup(spec: ChoiceParams, featureSet: object) {
    const pc: PlayerCharacter = spec.pc;
    const helper: PlayerCharacterHelper = pc.pcHelper;

    return helper
      .findFeatures((t: Trait) =>
        Object.keys(featureSet).includes(t.title.toUpperCase())
      )
      .map((f) => f.title);
  }

  private static checkSpellSchools(spell: string, ...schools: string[]) {
    return schools.includes(Spells[spell]["school"]);
  }

  private static checkForSpellProperty(spell: string, property: string) {
    return Spells[spell][property];
  }
}

export interface ChoiceParams {
  pc?: PlayerCharacter;
  classes?: object;
  list?: string;
  level?: string;
}

export interface ChoiceSpec {
  alias: string;
  choose: number;
  from?: string[];
  method?: string;
  args?: string[];
  required: boolean;
  or?: ChoiceSpec[];
  and?: ChoiceSpec[];
  needs?: string;
}
