import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { ScalingTrait } from "../../../../Base/Interfaces";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as SporesCircleDict from "./Spores.json";


export class SporesCircle 
{        
    static getFeature(level: string, featureName: string) {
        return SporesCircleDict[level][featureName];
    }

    static getSpells(pc: PlayerCharacter, level: string){
        pc.pcHelper.addSpells(SporesCircle.spells[level],"wisdom");
    }

    static spores2(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addSpells(params.spellSelections.add,"wisdom");
        SporesCircle.getSpells(pc,"2");
        const haloDamage: ScalingTrait = {
            title: "Halo of Spores",
            description: "Damage dice for Halo of Spores",
            dice: "1d4"
        }
        pc.pcHelper.addScalingTraits(haloDamage);
        pc.pcHelper.addFeatures(SporesCircle.getFeature("2", "HALO OF SPORES"));
        const symbioticHP: ScalingTrait = {
            title: "Symbiotic Entity",
            description: "The amount of temporary hit points granted by Symbiotic Entity",
            bonus: 8
        }
        pc.pcHelper.addScalingTraits(symbioticHP)
        pc.pcHelper.addFeatures(SporesCircle.getFeature("2", "SYMBIOTIC ENTITY"));
        const wildShapeScale: ScalingTrait = pc.pcHelper.findScalingTraitByName("Wild Shape");
        wildShapeScale.challengeRating = 0.25;
    }
      
    static spores3(pc: PlayerCharacter,params: LevelingParams){
        pc.pcHelper.addFeatures(SporesCircle.getFeature("3","CIRCLE SPELLS"));
        SporesCircle.getSpells(pc,"3");
        const symbioticHP: ScalingTrait = pc.pcHelper.findScalingTraitByName("Symbiotic Entity");
        symbioticHP.bonus = 12;
    }

    static spores4(pc: PlayerCharacter, params: LevelingParams){
        const wildShapeScale: ScalingTrait = pc.pcHelper.findScalingTraitByName("Wild Shape");
        wildShapeScale.challengeRating = 0.5;
        const symbioticHP: ScalingTrait = pc.pcHelper.findScalingTraitByName("Symbiotic Entity");
        symbioticHP.bonus = 16;
    }

    static spores5(pc: PlayerCharacter,params: LevelingParams){
        SporesCircle.getSpells(pc,"5");
        const symbioticHP: ScalingTrait = pc.pcHelper.findScalingTraitByName("Symbiotic Entity");
        symbioticHP.bonus = 20;
    }

    static spores6(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(SporesCircle.getFeature("6", "FUNGAL INFESTATION"));
        const symbioticHP: ScalingTrait = pc.pcHelper.findScalingTraitByName("Symbiotic Entity");
        symbioticHP.bonus = 24;
        const haloDamage: ScalingTrait = pc.pcHelper.findScalingTraitByName("Halo of Spores");
        haloDamage.dice = "1d6";
    }
    
    static spores7(pc: PlayerCharacter,params: LevelingParams){
        SporesCircle.getSpells(pc,"7");
        const symbioticHP: ScalingTrait = pc.pcHelper.findScalingTraitByName("Symbiotic Entity");
        symbioticHP.bonus = 28;
    }

    static spores8(pc: PlayerCharacter, params: LevelingParams){
        const wildShapeScale: ScalingTrait = pc.pcHelper.findScalingTraitByName("Wild Shape");
        wildShapeScale.challengeRating = 1;
        const symbioticHP: ScalingTrait = pc.pcHelper.findScalingTraitByName("Symbiotic Entity");
        symbioticHP.bonus = 32;
    }

    static spores9(pc: PlayerCharacter,params: LevelingParams){
        SporesCircle.getSpells(pc,"9");
        const symbioticHP: ScalingTrait = pc.pcHelper.findScalingTraitByName("Symbiotic Entity");
        symbioticHP.bonus = 36;
    }

    static spores10(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(SporesCircle.getFeature("10", "SPREADING SPORES"));
        const symbioticHP: ScalingTrait = pc.pcHelper.findScalingTraitByName("Symbiotic Entity");
        symbioticHP.bonus = 40;
        const haloDamage: ScalingTrait = pc.pcHelper.findScalingTraitByName("Halo of Spores");
        haloDamage.dice = "1d8";
    }

    static spores11(pc: PlayerCharacter, params: LevelingParams){
        const symbioticHP: ScalingTrait = pc.pcHelper.findScalingTraitByName("Symbiotic Entity");
        symbioticHP.bonus = 44;
    }

    static spores12(pc: PlayerCharacter, params: LevelingParams){
        const symbioticHP: ScalingTrait = pc.pcHelper.findScalingTraitByName("Symbiotic Entity");
        symbioticHP.bonus = 48;
    }

    static spores13(pc: PlayerCharacter, params: LevelingParams){
        const symbioticHP: ScalingTrait = pc.pcHelper.findScalingTraitByName("Symbiotic Entity");
        symbioticHP.bonus = 52;
    }

    static spores14(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(SporesCircle.getFeature("14", "FUNGAL BODY"));
        const symbioticHP: ScalingTrait = pc.pcHelper.findScalingTraitByName("Symbiotic Entity");
        symbioticHP.bonus = 56;
        const haloDamage: ScalingTrait = pc.pcHelper.findScalingTraitByName("Halo of Spores");
        haloDamage.dice = "1d10";
    }

    static spores15(pc: PlayerCharacter, params: LevelingParams){
        const symbioticHP: ScalingTrait = pc.pcHelper.findScalingTraitByName("Symbiotic Entity");
        symbioticHP.bonus = 60;
    }

    static spores16(pc: PlayerCharacter, params: LevelingParams){
        const symbioticHP: ScalingTrait = pc.pcHelper.findScalingTraitByName("Symbiotic Entity");
        symbioticHP.bonus = 64;
    }

    static spores17(pc: PlayerCharacter, params: LevelingParams){
        const symbioticHP: ScalingTrait = pc.pcHelper.findScalingTraitByName("Symbiotic Entity");
        symbioticHP.bonus = 68;
    }

    static spores18(pc: PlayerCharacter, params: LevelingParams){
        const symbioticHP: ScalingTrait = pc.pcHelper.findScalingTraitByName("Symbiotic Entity");
        symbioticHP.bonus = 72;
    }

    static spores19(pc: PlayerCharacter, params: LevelingParams){
        const symbioticHP: ScalingTrait = pc.pcHelper.findScalingTraitByName("Symbiotic Entity");
        symbioticHP.bonus = 76;
    }

    static spores20(pc: PlayerCharacter, params: LevelingParams){
        const symbioticHP: ScalingTrait = pc.pcHelper.findScalingTraitByName("Symbiotic Entity");
        symbioticHP.bonus = 80;
    }
    
    static spells = {
        2: ["CHILL TOUCH"],
        3: ["BLINDNESS/ DEAFNESS", "GENTLE REPOSE"],
        5: ["ANIMATE DEAD", "GASEOUS FORM"],
        7: ["BLIGHT","CONFUSION"],
        9: ["CLOUDKILL, CONTAGION"]
    }
}