import { PlayerCharacter } from "Base/PlayerCharacter";
import * as Disciplines from "./ElementalDisciplines.json";

export class  ElementalDisciplineHelper {
    
    static invocationDict: { [key: string] : { apply(pc: PlayerCharacter) : void, undo(pc: PlayerCharacter):  void } } = {
        "BREATH OF WINTER": {
            apply:  ElementalDisciplineHelper.applyBreathOfWinter,
            undo:  ElementalDisciplineHelper.undoBreathOfWinter
        },
        "CLENCH OF THE NORTH WIND": {
            apply:  ElementalDisciplineHelper.applyClenchOfTheNorthWind,
            undo:  ElementalDisciplineHelper.undoClenchOfTheNorthWind
        },
        "ELEMENTAL ATTUNEMENT": {
            apply:  ElementalDisciplineHelper.applyElementalAttunement,
            undo:  ElementalDisciplineHelper.undoElementalAttunement,
        },
        "ETERNAL MOUNTAIN DEFENSE": {
            apply:  ElementalDisciplineHelper.applyEternalMountainDefense,
            undo:  ElementalDisciplineHelper.undoEternalMountainDefense,
        },
        "FANGS OF THE FIRE SNAKE": {
            apply:  ElementalDisciplineHelper.applyFangsOfTheFireSnake,
            undo:  ElementalDisciplineHelper.undoFangsOfTheFireSnake,
        },
        "FIST OF FOUR THUNDERS": {
            apply:  ElementalDisciplineHelper.applyFistOfFourThunders,
            undo:  ElementalDisciplineHelper.undoFistOfFourThunders,
        },
        "FIST OF UNBROKEN AIR": {
            apply:  ElementalDisciplineHelper.applyFistOfUnbrokenAir,
            undo:  ElementalDisciplineHelper.undoFistOfUnbrokenAir,
        },
        "FLAMES OF THE PHOENIX": {
            apply:  ElementalDisciplineHelper.applyFlamesOfThePhoenix,
            undo:  ElementalDisciplineHelper.undoFlamesOfThePhoenix,
        },
        "GONG OF THE SUMMIT": {
            apply:  ElementalDisciplineHelper.applyGongOfTheSummit,
            undo:  ElementalDisciplineHelper.undoGongOfTheSummit,
        },
        "MIST STANCE": {
            apply:  ElementalDisciplineHelper.applyMistStance,
            undo:  ElementalDisciplineHelper.undoMistStance,
        },
        "RIDE THE WIND": {
            apply:  ElementalDisciplineHelper.applyRideTheWind,
            undo:  ElementalDisciplineHelper.undoRideTheWind,
        },
        "RIVER OF HUNGRY FLAME": {
            apply:  ElementalDisciplineHelper.applyRiverOfHungryFlame,
            undo:  ElementalDisciplineHelper.undoRiverOfHungryFlame,
        },
        "RUSH OF THE GALE SPIRITS": {
            apply:  ElementalDisciplineHelper.applyRushOfTheGaleSpirits,
            undo:  ElementalDisciplineHelper.undoRushOfTheGaleSpirits,
        },
        "SHAPE OF THE FLOWING RIVER": {
            apply:  ElementalDisciplineHelper.applyShapeOfTheFlowingRiver,
            undo:  ElementalDisciplineHelper.undoShapeOfTheFlowingRiver,
        },
        "SWEEPING CINDER STRIKE": {
            apply:  ElementalDisciplineHelper.applySweepingCinderStrike,
            undo:  ElementalDisciplineHelper.undoSweepingCinderStrike,
        },
        "WATER WHIP": {
            apply:  ElementalDisciplineHelper.applyWaterWhip,
            undo:  ElementalDisciplineHelper.undoWaterWhip,
        },
        "WAVE OF ROLLING EARTH": {
            apply:  ElementalDisciplineHelper.applyWaveOfRollingEarth,
            undo:  ElementalDisciplineHelper.undoWaveOfRollingEarth,
        }
    }
    static applyBreathOfWinter(pc: PlayerCharacter) { };
    static undoBreathOfWinter(pc: PlayerCharacter) { };
    static applyClenchOfTheNorthWind(pc: PlayerCharacter) { };
    static undoClenchOfTheNorthWind(pc: PlayerCharacter) { };
    static applyElementalAttunement(pc: PlayerCharacter) { };
    static undoElementalAttunement(pc: PlayerCharacter) { };
    static applyEternalMountainDefense(pc: PlayerCharacter) { };
    static undoEternalMountainDefense(pc: PlayerCharacter) { };
    static applyFangsOfTheFireSnake(pc: PlayerCharacter) { };
    static undoFangsOfTheFireSnake(pc: PlayerCharacter) { };
    static applyFistOfFourThunders(pc: PlayerCharacter) { };
    static undoFistOfFourThunders(pc: PlayerCharacter) { };
    static applyFistOfUnbrokenAir(pc: PlayerCharacter) { };
    static undoFistOfUnbrokenAir(pc: PlayerCharacter) { };
    static applyFlamesOfThePhoenix(pc: PlayerCharacter) { };
    static undoFlamesOfThePhoenix(pc: PlayerCharacter) { };
    static applyGongOfTheSummit(pc: PlayerCharacter) { };
    static undoGongOfTheSummit(pc: PlayerCharacter) { };
    static applyMistStance(pc: PlayerCharacter) { };
    static undoMistStance(pc: PlayerCharacter) { };
    static applyRideTheWind(pc: PlayerCharacter) { };
    static undoRideTheWind(pc: PlayerCharacter) { };
    static applyRiverOfHungryFlame(pc: PlayerCharacter) { };
    static undoRiverOfHungryFlame(pc: PlayerCharacter) { };
    static applyRushOfTheGaleSpirits(pc: PlayerCharacter) { };
    static undoRushOfTheGaleSpirits(pc: PlayerCharacter) { };
    static applyShapeOfTheFlowingRiver(pc: PlayerCharacter) { };
    static undoShapeOfTheFlowingRiver(pc: PlayerCharacter) { };
    static applySweepingCinderStrike(pc: PlayerCharacter) { };
    static undoSweepingCinderStrike(pc: PlayerCharacter) { };
    static applyWaterWhip(pc: PlayerCharacter) { };
    static undoWaterWhip(pc: PlayerCharacter) { };
    static applyWaveOfRollingEarth(pc: PlayerCharacter) { };
    static undoWaveOfRollingEarth(pc: PlayerCharacter) { };
  

 
  
      

}
