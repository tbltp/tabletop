import * as RaceChoices from './Choice Build Specs/RaceChoices.json';
import * as ClassChoices from './Choice Build Specs/ClassChoices.json';
import * as SubclassChoices from './Choice Build Specs/ClassChoices.json';
import * as BackgroundChoices from './Choice Build Specs/BackgroundChoices.json';
import * as Invocations from '../Classes/Warlock/EldritchInvocations.json';
import * as SpellList from '../../Assets/SpellList.json';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import { Race } from '../Races/Race';
import { PlayerClass } from '../Classes/PlayerClass';
import { Background } from '../Backgrounds/Background';

export class Choices {

    static renderRaceChoices(){
        return Object.keys(RaceChoices);
    }

    static renderRaceSelectionChoices(race: string){
        
        return Object.keys(RaceChoices[race]);
        // .forEach( key => RaceChoices[race][key]['prop'] = key );
    }

    static renderClassChoices(){
        return Object.keys(ClassChoices);
    }

    static renderClassChoicesAtLevel(pclass: string, level: number) {
        return Object.keys(ClassChoices[pclass][level]);        
    }

    static renderClassSelections(pclass: string, level: number, pclassField: string) {
        return Object.keys(ClassChoices[pclass][level][pclassField]);
    }



    
    static functionRailRoad: {[key: string]: (spec: ChoiceParams) => string[]} = {
        getSpellList: Choices.getSpellList,
    }

    static prereqChecks = {
        Level: Choices.checkLevel,
        Cantrip: Choices.checkSpell,
        Feature: Choices.checkFeature
    }

    static checkLevel(level: string, pc: PlayerCharacter){
        return pc.level.totalLevel >= parseInt(level) ? true : false
    }
    
    static checkSpell(spell: string, pc: PlayerCharacter){
        return pc.spells["0"].filter(x => x.name === spell) ? true : false
    }

    static checkFeature(feature: string, pc: PlayerCharacter){
        return pc.traits.features.filter(x => x.title === feature) ? true : false

    }

    static getSpellList(spec: ChoiceParams){
        return SpellList[spec.list][spec.level];
    }

    static getKnownSpells(pc: PlayerCharacter){
        return [...Object.values(pc.spells)]
    }

    static getKnownSpellsAtLevel(level: string, pc: PlayerCharacter){
        return [...Object.values(pc.spells[level])]
    }

    static getSkillProficiencies(pc: PlayerCharacter){
        let expertiseElligibleSkills = [];

        for(const skill in pc.skills){
            if(pc.skills[skill].proficient && !pc.skills[skill].expertise){
                expertiseElligibleSkills.push(skill)
            }
        }

        return expertiseElligibleSkills
    }

    static getSpellListAll(level: string){
        let allSpellLists = [];

        for(const spellList in SpellList){
            for(let i = 0; i < parseInt(level); i++){
                allSpellLists.push(...SpellList[spellList][i])
            }
        }

        return allSpellLists;
    }

    static getAvailableClericWeapons(pc: PlayerCharacter){
        return pc.traits.weaponProficiencies.has("Martial") ||
        pc.traits.weaponProficiencies.has("Warhammer") ?
        ["MACE", "WARHAMMER"] :
        ["MACE"]
    }

    static getAvailableClericArmor(pc: PlayerCharacter){
        return pc.traits.armorProficiencies.has("Heavy") ?
        ["SCALE MAIL", "LEATHER", "CHAIN MAIL"] :
        ["SCALE MAIL", "LEATHER"]
    }

    static getEldritchInvocations(pc: PlayerCharacter){
        let elligibleInvocations = [];
        for(const invocation of Object.keys(Invocations)){
            if(!Invocations[invocation].prereqs){
                elligibleInvocations.push(Invocations[invocation])
            }
            else{
                let validInv = true;
                for(const prereq of Invocations[invocation].prereqs){
                    if(!Choices.prereqChecks[prereq.type](prereq.value, pc)){
                        validInv = false;
                        break;
                    }
                }
                validInv ? elligibleInvocations.push(Invocations[invocation]) : null;
            }
        }

        return elligibleInvocations;
    }
}

export interface ChoiceParams {
    pc?: PlayerCharacter;
    list?: string;
    level?: string;
    
}