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
        pc.pcHelper.addFeatures(SporesCircle.getFeature("2", "HALO OF SPORES"));
        pc.pcHelper.addFeatures(SporesCircle.getFeature("2", "SYMBIOTIC ENTITY"));
        const wildShapeScale: ScalingTrait = pc.pcHelper.findScalingTraitByName("Wild Shape");
        wildShapeScale.challengeRating = 0.25;
    }
      
    static spores3(pc: PlayerCharacter,params: LevelingParams){
        pc.pcHelper.addFeatures(SporesCircle.getFeature("3","CIRCLE SPELLS"));
        SporesCircle.getSpells(pc,"3");
    }

    static spores4(pc: PlayerCharacter, params: LevelingParams){
        const wildShapeScale: ScalingTrait = pc.pcHelper.findScalingTraitByName("Wild Shape");
        wildShapeScale.challengeRating = 0.5;
    }

    static spores5(pc: PlayerCharacter,params: LevelingParams){
        SporesCircle.getSpells(pc,"5");
    }

    static spores6(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(SporesCircle.getFeature("6", "FUNGAL INFESTATION"));
    }
    
    static spores7(pc: PlayerCharacter,params: LevelingParams){
        SporesCircle.getSpells(pc,"7");
    }

    static spores8(pc: PlayerCharacter, params: LevelingParams){
        const wildShapeScale: ScalingTrait = pc.pcHelper.findScalingTraitByName("Wild Shape");
        wildShapeScale.challengeRating = 1;
    }

    static spores9(pc: PlayerCharacter,params: LevelingParams){
        SporesCircle.getSpells(pc,"9");
    }

    static spores10(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(SporesCircle.getFeature("10", "SPREADING SPORES")
        );
    }
    
    static spores14(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(SporesCircle.getFeature("14", "FUNGAL BODY"));
    }
    
    static spells = {
        3: ["BLINDNESS/ DEAFNESS", "GENTLE REPOSE"],
        5: ["ANIMATE DEAD", "GASEOUS FORM"],
        7: ["BLIGHT","CONFUSION"],
        9: ["CLOUDKILL, CONTAGION"]
    }
}