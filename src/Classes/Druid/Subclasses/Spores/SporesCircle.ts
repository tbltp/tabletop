import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { ScalingTrait } from "../../../../Base/Interfaces";
import { LevelingParams } from "../../../../Classes/PlayerClass";
import * as SporesCircleDict from "./Spores.json";


export class SporesCircle 
{        
    static getFeature(level: string, featureName: string) {
        return SporesCircleDict["features"][level][featureName];
    }

    static getSpells(pc: PlayerCharacter, level: string){
        pc.pcHelper.addSpells(SporesCircle.spells[level],"wisdom");
    }

    static upSymbioticEntity(pc: PlayerCharacter){
        const symbioticHP: ScalingTrait = pc.pcHelper.findScalingTraitByName("Symbiotic Entity");
        symbioticHP.bonus+=4;
    }

    static spores2(pc: PlayerCharacter, params: LevelingParams) {
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
        SporesCircle.upSymbioticEntity(pc);
    }

    static spores4(pc: PlayerCharacter, params: LevelingParams){
        const wildShapeScale: ScalingTrait = pc.pcHelper.findScalingTraitByName("Wild Shape");
        wildShapeScale.challengeRating = 0.5;
        SporesCircle.upSymbioticEntity(pc);
    }

    static spores5(pc: PlayerCharacter,params: LevelingParams){
        SporesCircle.getSpells(pc,"5");
        SporesCircle.upSymbioticEntity(pc);
    }

    static spores6(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(SporesCircle.getFeature("6", "FUNGAL INFESTATION"));
        SporesCircle.upSymbioticEntity(pc);
        const haloDamage: ScalingTrait = pc.pcHelper.findScalingTraitByName("Halo of Spores");
        haloDamage.dice = "1d6";
    }
    
    static spores7(pc: PlayerCharacter,params: LevelingParams){
        SporesCircle.getSpells(pc,"7");
        SporesCircle.upSymbioticEntity(pc);
    }

    static spores8(pc: PlayerCharacter, params: LevelingParams){
        const wildShapeScale: ScalingTrait = pc.pcHelper.findScalingTraitByName("Wild Shape");
        wildShapeScale.challengeRating = 1;
        SporesCircle.upSymbioticEntity(pc);
    }

    static spores9(pc: PlayerCharacter,params: LevelingParams){
        SporesCircle.getSpells(pc,"9");
        SporesCircle.upSymbioticEntity(pc);
    }

    static spores10(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(SporesCircle.getFeature("10", "SPREADING SPORES"));
        SporesCircle.upSymbioticEntity(pc);
        const haloDamage: ScalingTrait = pc.pcHelper.findScalingTraitByName("Halo of Spores");
        haloDamage.dice = "1d8";
    }

    static spores14(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(SporesCircle.getFeature("14", "FUNGAL BODY"));
        const symbioticHP: ScalingTrait = pc.pcHelper.findScalingTraitByName("Symbiotic Entity");
        symbioticHP.bonus = 56;
        const haloDamage: ScalingTrait = pc.pcHelper.findScalingTraitByName("Halo of Spores");
        haloDamage.dice = "1d10";
    }

    static spells = {
        2: ["CHILL TOUCH"],
        3: ["BLINDNESS/ DEAFNESS", "GENTLE REPOSE"],
        5: ["ANIMATE DEAD", "GASEOUS FORM"],
        7: ["BLIGHT","CONFUSION"],
        9: ["CLOUDKILL, CONTAGION"]
    }
}