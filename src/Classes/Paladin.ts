import { PlayerClass, LevelingParams, SpellSlotFactory } from './PlayerClass';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import { ResourceTrait } from '../Base/Interfaces';
import * as SpellList from '../../Assets/SpellList.json';
import { PaladinArchetype } from './Archetypes';

export class Paladin extends PlayerClass {

    constructor(skillProficiencies: string[], weapons: string[], armor: string[], params: LevelingParams, equipmentPack: string){ 
        super(
            "Paladin",
            [],
            skillProficiencies, 
            ["Simple", "Martial"],
            ["Light", "Medium", "Heavy", "Shield"],
            [],
            weapons,
            armor,
            [],
            [],
            params,
            "d10",
            10,
            ["wisdom", "charisma"]
        );

        this.equipmentPack = equipmentPack

        for(let level in this.abilitiesAtLevels) {
            const func: Function = this.abilitiesAtLevels[level];
            this.abilitiesAtLevels[level] = func.bind(this);
        }
    }

    /** TODO
     * FIGHTING STYLE LVL2
     */

	paladinOath: string;

    abilitiesAtLevels = {
        "1": this.level1,
        "2": this.level2,
        "3": this.level3,
        "4": this.level4,
        "5": this.level5,
        "6": this.level6,
        "7": this.level7,
        "8": this.level8,
        "9": this.level9,
        "10": this.level10,
        "11": this.level11,
        "12": this.level12,
        "13": this.level13,
        "14": this.level14,
        "15": this.level15,
        "16": this.level16,
        "17": this.level17,
        "18": this.level18,
        "19": this.level19,
        "20": this.level20,
    }

    pushPaladinFeatures(pc: PlayerCharacter, level: string) {
        this.pushClassFeatures(pc, level, "PALADIN");
    }

    level1(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushPaladinFeatures(pc, "1");
        pc.addResourceTraits( { title: "Lay on Hands", description: "Number of hit points you can restore with Lay on Hands", resourceMax: {value: 5} } )
    }

    level2(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushPaladinFeatures(pc, "2");
        pc.findResourceTraitByName("Lay on Hands").resourceMax.value += 5;
        const lvl1Slots = SpellSlotFactory.getSpellSlots(1, 2);
        pc.addResourceTraits(lvl1Slots);
    }

    level3(pc: PlayerCharacter, params: LevelingParams): void {
        this.paladinOath = params.archetypeSelection[0].archetype;
        this.pushPaladinFeatures(pc, "2");
        pc.findResourceTraitByName("Lay on Hands").resourceMax.value += 5;

        PaladinArchetype.archetypeHelper[this.paladinOath]["3"](pc, params);
        SpellSlotFactory.findPlayerSpellSlots(pc, 1).resourceMax.value++;
    }
    
    level4(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushPaladinFeatures(pc, "4");
        pc.findResourceTraitByName("Lay on Hands").resourceMax.value += 5;
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level5(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushPaladinFeatures(pc, "5");
        pc.findResourceTraitByName("Lay on Hands").resourceMax.value += 5;

        const lvl2Slots = SpellSlotFactory.getSpellSlots(2, 2);
        pc.addResourceTraits(lvl2Slots);
        SpellSlotFactory.findPlayerSpellSlots(pc, 1).resourceMax.value++;    }

    level6(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushPaladinFeatures(pc, "6");
        pc.findResourceTraitByName("Lay on Hands").resourceMax.value += 5;
    }

    level7(pc: PlayerCharacter, params: LevelingParams): void {
        pc.findResourceTraitByName("Lay on Hands").resourceMax.value += 5;
        PaladinArchetype.archetypeHelper[this.paladinOath]["7"](pc, params);
        
        SpellSlotFactory.findPlayerSpellSlots(pc, 2).resourceMax.value++;
    }

    level8(pc: PlayerCharacter, params: LevelingParams): void {
        pc.findResourceTraitByName("Lay on Hands").resourceMax.value += 5;
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level9(pc: PlayerCharacter, params: LevelingParams): void {
        pc.findResourceTraitByName("Lay on Hands").resourceMax.value += 5;
        
        const lvl3Slots = SpellSlotFactory.getSpellSlots(3, 2);
        pc.addResourceTraits(lvl3Slots);
    }

    level10(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushPaladinFeatures(pc, "10");
        pc.findResourceTraitByName("Lay on Hands").resourceMax.value += 5;
    }

    level11(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushPaladinFeatures(pc, "11");
        pc.findResourceTraitByName("Lay on Hands").resourceMax.value += 5;

        SpellSlotFactory.findPlayerSpellSlots(pc, 3).resourceMax.value++;
    }

    level12(pc: PlayerCharacter, params: LevelingParams): void {
        pc.findResourceTraitByName("Lay on Hands").resourceMax.value += 5;
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level13(pc: PlayerCharacter, params: LevelingParams): void {
        pc.findResourceTraitByName("Lay on Hands").resourceMax.value += 5;

        const lvl4Slots = SpellSlotFactory.getSpellSlots(4, 1);
        pc.addResourceTraits(lvl4Slots);
    }

    level14(pc: PlayerCharacter, params: LevelingParams): void {
        this.pushPaladinFeatures(pc, "15");
        pc.findResourceTraitByName("Lay on Hands").resourceMax.value += 5;
    }

    level15(pc: PlayerCharacter, params: LevelingParams): void {
        pc.findResourceTraitByName("Lay on Hands").resourceMax.value += 5;
        PaladinArchetype.archetypeHelper[this.paladinOath]["15"](pc, params);

        SpellSlotFactory.findPlayerSpellSlots(pc, 4).resourceMax.value++;
    }

    level16(pc: PlayerCharacter, params: LevelingParams): void {
        pc.findResourceTraitByName("Lay on Hands").resourceMax.value += 5;
        pc.improveAbilityScores(params.abilityScoreImprovement);
    }

    level17(pc: PlayerCharacter, params: LevelingParams): void {
        pc.findResourceTraitByName("Lay on Hands").resourceMax.value += 5;


        const lvl5Slots = SpellSlotFactory.getSpellSlots(5, 1);
        pc.addResourceTraits(lvl5Slots);
        SpellSlotFactory.findPlayerSpellSlots(pc, 4).resourceMax.value++;
    }

    level18(pc: PlayerCharacter, params: LevelingParams): void {
        pc.findResourceTraitByName("Lay on Hands").resourceMax.value += 5;
    }

    level19(pc: PlayerCharacter, params: LevelingParams): void {
        pc.findResourceTraitByName("Lay on Hands").resourceMax.value += 5;
        pc.improveAbilityScores(params.abilityScoreImprovement);

        SpellSlotFactory.findPlayerSpellSlots(pc, 5).resourceMax.value++;

    }

    level20(pc: PlayerCharacter, params: LevelingParams): void {
        pc.findResourceTraitByName("Lay on Hands").resourceMax.value += 5;
        PaladinArchetype.archetypeHelper[this.paladinOath]["20"](pc, params);
    }
    
}