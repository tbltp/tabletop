import * as RaceChoices from './Choice Build Specs/RaceChoices.json';
import * as ClassChoices from './Choice Build Specs/ClassChoices.json';
import * as SubclassChoices from './Choice Build Specs/ClassChoices.json';
import * as BackgroundChoices from './Choice Build Specs/BackgroundChoices.json';
import * as Invocations from '../Classes/Warlock/EldritchInvocations.json';
import * as Disciplines from '../Classes/Monk/Subclasses/FourElements/ElementalDisciplines.json';
import * as SpellList from '../../Assets/SpellList.json';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import { Prereqs } from './Prereqs';
import { Race } from '../Races/Race';
import { PlayerClass } from '../Classes/PlayerClass';
import { Background } from '../Backgrounds/Background';

export class Choices {

    static renderRaceChoices(){
        return Object.keys(RaceChoices);
    }

    static renderRaceSelectionChoices(race: string): [string, ChoiceSpec][] {        
        return Object.entries(RaceChoices[race]);
    }

    static renderBackgroundChoices(){
        return Object.keys(BackgroundChoices);
    }

    static renderBackgroundSelectionChoices(background: string): [string, ChoiceSpec][] {        
        return Object.entries(BackgroundChoices[background]);
    }

    static renderClassChoices(){
        return Object.keys(ClassChoices);
    }

    static renderClassChoicesAtLevel(pclass: string, level: number): [string, ChoiceSpec][] {
        return (ClassChoices[pclass][level]) ? Object.entries(ClassChoices[pclass][level]) : [];        
    }

    static renderSubclassChoices(subclass: string, level: number): [string, ChoiceSpec][] {
        return (SubclassChoices[subclass] && SubclassChoices[subclass][level]) ? Object.entries(SubclassChoices[subclass][level]) : [];
    }

    static convertToParams(spec: ChoiceSpec, pc?: PlayerCharacter): ChoiceParams {
        
        let params: ChoiceParams = {}; 

        if(pc) {
            params.pc = pc;
        }
        if(spec['args']) {
            const args = spec['args'];
            if(args.length == 1) {
                params.level = args[0];
            } else {
                params.list = args[0];
                params.level = args[1];
            }
        }
        return params;
    }
    
    static functionRailRoad: {[key: string]: (spec: ChoiceParams) => string[]} = {
        'getSpellList': Choices.getSpellList,
        'getSpellListAll': Choices.getSpellListAll,
        'getKnownManeuvers': Choices.getKnownSpellsAtLevel,
        'getKnownSpells': Choices.getKnownSpells,
        'getKnownSpellsAtLevel': Choices.getKnownSpellsAtLevel,
        'getSkillProficiencies': Choices.getSkillProficiencies,
        'getMentalSavingThrows': Choices.getMentalSavingThrows,
        'getAvailableClericWeapons': Choices.getAvailableClericWeapons,
        'getAvailableClericArmor': Choices.getAvailableClericArmor,
        'getEldritchSpellList': Choices.getEldritchSpellList,
        'getEldritchInvocations': Choices.getEldritchInvocations,
        'getElementalDisciplines': Choices.getElementalDisciplines,
        'getKnownElementalDisciplines': Choices.getKnownElementalDisciplines,
        'getTricksterSpellList': Choices.getTricksterSpellList,

    };

    static getSpellList(spec: ChoiceParams){
        return SpellList[spec.list][spec.level];
    }

    //up to specified level
    static getSpellListAll(spec: ChoiceParams){
        let allSpellLists = [];

        for(const spellList in SpellList){
            for(let i = 0; i < parseInt(spec.level); i++){
                allSpellLists.push(...SpellList[spellList][i])
            }
        }

        return allSpellLists;
    }

    static getKnownSpells(spec: ChoiceParams){
        return [].concat(...Object.values(spec.pc.spells).slice(1)).map(spell => spell['name'].toUpperCase());
    }

    static getKnownSpellsAtLevel(spec: ChoiceParams){
        return [].concat(...Object.values(spec.pc.spells[spec.level])).map(spell => spell['name'].toUpperCase());
    }

    //to complete
    static getKnownManeuvers(spec: ChoiceParams) {
        return [];
    }

    static getSkillProficiencies(spec: ChoiceParams){
        let expertiseeligibleSkills = [];
        const pc: PlayerCharacter = spec.pc;

        for(const skill in pc.skills){
            if(pc.skills[skill].proficient && !pc.skills[skill].expertise){
                expertiseeligibleSkills.push(skill)
            }
        }

        return expertiseeligibleSkills;
    }

    //to complete - only return choices if already have proficiency in wisdom saving throws
    static getMentalSavingThrows(spec: ChoiceParams) {
        return [];
    }

    static getAvailableClericWeapons(spec: ChoiceParams){
        return spec.pc.traits.weaponProficiencies.has("Martial") ||
        spec.pc.traits.weaponProficiencies.has("Warhammer") ?
        ["MACE", "WARHAMMER"] :
        ["MACE"]
    }

    static getAvailableClericArmor(spec: ChoiceParams){
        return spec.pc.traits.armorProficiencies.has("Heavy") ?
        ["SCALE MAIL", "LEATHER", "CHAIN MAIL"] :
        ["SCALE MAIL", "LEATHER"]
    }

    //get spell list for Wizard at a level BUT only Abjuration or Evocation schools 
    static getEldritchSpellList(spec: ChoiceParams) {
        return [];
    }

    static getEldritchInvocations(spec: ChoiceParams){
        let eligibleInvocations = [];
        for(const invocation of Object.keys(Invocations)){
            if(!Invocations[invocation].prereqs){
                eligibleInvocations.push(Invocations[invocation])
            }
            else{
                let validInv = true;
                for(const prereq of Invocations[invocation].prereqs){
                    if(!Prereqs.prereqChecks[prereq.type](prereq.value, spec.pc)){
                        validInv = false;
                        break;
                    }
                }
                validInv ? eligibleInvocations.push(Invocations[invocation]) : null;
            }
        }

        return eligibleInvocations;
    }

    static getElementalDisciplines(spec: ChoiceParams){
        let eligibleDiscplines = [];
        for(const discipline of Object.keys(Disciplines)){
            if(!Disciplines[discipline].prereqs){
                eligibleDiscplines.push(Disciplines[discipline])
            }
            else{
                let validInv = true;
                for(const prereq of Disciplines[discipline].prereqs){
                    if(!Prereqs.prereqChecks[prereq.type](prereq.value, spec.pc)){
                        validInv = false;
                        break;
                    }
                }
                validInv ? eligibleDiscplines.push(Disciplines[discipline]) : null;
            }
        }

        return eligibleDiscplines;
    }

    //to complete
    static getKnownElementalDisciplines(spec: ChoiceParams) {
        return [];
    }

    //get spell list for Wizard at a level BUT only Enchantment or Illusion schools 
    static getTricksterSpellList(spec: ChoiceParams) {
        return [];
    }

    private static getSpellsForSchools(...schools: string[]) {
        return [];
    }
}

export interface ChoiceParams {
    pc?: PlayerCharacter;
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
    or: ChoiceSpec[];
    and: ChoiceSpec[];
}