import { PlayerCharacter } from "../../../../Base/PlayerCharacter";
import { ScalingTrait } from "../../../../Base/Interfaces";
import { LevelingParams, PlayerClass } from "../../../../Classes/PlayerClass";
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
        pc.pcHelper.findFeatureTraitByName("Symbiotic Entity").scaling.bonus += 4;
    }

    static spores2(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(SporesCircle.getFeature("2", "HALO OF SPORES"), SporesCircle.getFeature("2", "SYMBIOTIC ENTITY"));
        SporesCircle.getSpells(pc,"2");
        pc.pcHelper.addEffectsToFeature("Halo of Spores", {scaling: {dice: "1d4"}})
        pc.pcHelper.addEffectsToFeature("Symbiotic Entity", {scaling: {bonus: 8}})
        pc.pcHelper.findFeatureTraitByName("Wild Shape").scaling.challengeRating = 0.25;

    }
      
    static spores3(pc: PlayerCharacter,params: LevelingParams){
        pc.pcHelper.addFeatures(SporesCircle.getFeature("3","CIRCLE SPELLS"));
        SporesCircle.getSpells(pc,"3");
        SporesCircle.upSymbioticEntity(pc);
    }

    static spores4(pc: PlayerCharacter, params: LevelingParams){
        pc.pcHelper.findFeatureTraitByName("Wild Shape").scaling.challengeRating = 0.5;
        SporesCircle.upSymbioticEntity(pc);
    }

    static spores5(pc: PlayerCharacter,params: LevelingParams){
        SporesCircle.getSpells(pc,"5");
        SporesCircle.upSymbioticEntity(pc);
    }

    static spores6(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(SporesCircle.getFeature("6", "FUNGAL INFESTATION"));
        SporesCircle.upSymbioticEntity(pc);
        pc.pcHelper.findFeatureTraitByName("Halo of Spores").scaling.dice = "1d6";
    }
    
    static spores7(pc: PlayerCharacter,params: LevelingParams){
        SporesCircle.getSpells(pc,"7");
        SporesCircle.upSymbioticEntity(pc);
    }

    static spores8(pc: PlayerCharacter, params: LevelingParams){
        pc.pcHelper.findFeatureTraitByName("Wild Shape").scaling.challengeRating = 1;
        SporesCircle.upSymbioticEntity(pc);
    }

    static spores9(pc: PlayerCharacter,params: LevelingParams){
        SporesCircle.getSpells(pc,"9");
        SporesCircle.upSymbioticEntity(pc);
    }

    static spores10(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(SporesCircle.getFeature("10", "SPREADING SPORES"));
        pc.pcHelper.findFeatureTraitByName("Halo of Spores").scaling.dice = "1d8";
        SporesCircle.upSymbioticEntity(pc);
    }

    static spores14(pc: PlayerCharacter, params: LevelingParams) {
        pc.pcHelper.addFeatures(SporesCircle.getFeature("14", "FUNGAL BODY"));
        pc.pcHelper.findFeatureTraitByName("Symbiotic Entity").scaling.bonus = 56;
        pc.pcHelper.findFeatureTraitByName("Halo of Spores").scaling.dice = "1d10";
    }

    static spells = {
        2: ["CHILL TOUCH"],
        3: ["BLINDNESS/ DEAFNESS", "GENTLE REPOSE"],
        5: ["ANIMATE DEAD", "GASEOUS FORM"],
        7: ["BLIGHT","CONFUSION"],
        9: ["CLOUDKILL, CONTAGION"]
    }
}