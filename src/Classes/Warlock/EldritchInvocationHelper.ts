import { PlayerCharacter } from "Base/PlayerCharacter";
import * as Invocations from "./EldritchInvocations.json";

export class EldritchInvocationHelper {
    
    static invocationDict: { [key: string] : { apply(pc: PlayerCharacter) : void, undo(pc: PlayerCharacter):  void } } = {
        "AGONIZING BLAST": {
            apply: EldritchInvocationHelper.applyAgonizingBlast,
            undo: EldritchInvocationHelper.undoAgonizingBlast
        },
        "ARMOR OF SHADOWS": {
            apply: EldritchInvocationHelper.applyArmorOfShadows,
            undo: EldritchInvocationHelper.undoArmorOfShadows
        },
        "ASCENDANT STEP": {
            apply: EldritchInvocationHelper.applyAscendantStep,
            undo: EldritchInvocationHelper.undoAscendantStep,
        },
        "BEAST SPEECH": {
            apply: EldritchInvocationHelper.applyBeastSpeech,
            undo: EldritchInvocationHelper.undoBeastSpeech,
        },
        "BEGUILING INFLUENCE": {
            apply: EldritchInvocationHelper.applyBeguilingInfluence,
            undo: EldritchInvocationHelper.undoBeguilingInfluence,
        },
        "BEWITCHING WHISPERS": {
            apply: EldritchInvocationHelper.applyBewitchingWhispers,
            undo: EldritchInvocationHelper.undoBewitchingWhispers,
        },
        "BOOK OF ANCIENT SECRETS": {
            apply: EldritchInvocationHelper.applyBookOfAncientSecrets,
            undo: EldritchInvocationHelper.undoBookOfAncientSecrets,
        },
        "CHAINS OF CARCERI": {
            apply: EldritchInvocationHelper.applyChainsOfCarceri,
            undo: EldritchInvocationHelper.undoChainsOfCarceri,
        },
        "DEVIL'S SIGHT": {
            apply: EldritchInvocationHelper.applyDevilsSight,
            undo: EldritchInvocationHelper.undoDevilsSight,
        },
        "DREADFUL WORD": {
            apply: EldritchInvocationHelper.applyDreadfulWord,
            undo: EldritchInvocationHelper.undoDreadfulWord,
        },
        "ELDRITCH SIGHT": {
            apply: EldritchInvocationHelper.applyEldritchSight,
            undo: EldritchInvocationHelper.undoEldritchSight,
        },
        "ELDRITCH SPEAR": {
            apply: EldritchInvocationHelper.applyEldritchSpear,
            undo: EldritchInvocationHelper.undoEldritchSpear,
        },
        "EYES OF THE RUNE KEEPER": {
            apply: EldritchInvocationHelper.applyEyesOfTheRuneKeeper,
            undo: EldritchInvocationHelper.undoEyesOfTheRuneKeeper,
        },
        "FIENDISH VIGOR": {
            apply: EldritchInvocationHelper.applyFiendishVigor,
            undo: EldritchInvocationHelper.undoFiendishVigor,
        },
        "GAZE OF TWO MINDS": {
            apply: EldritchInvocationHelper.applyGazeOfTwoMinds,
            undo: EldritchInvocationHelper.undoGazeOfTwoMinds,
        },
        "LIFEDRINKER": {
            apply: EldritchInvocationHelper.applyLifeDrinker,
            undo: EldritchInvocationHelper.undoLifeDrinker,
        },
        "MASK OF MANY FACES": {
            apply: EldritchInvocationHelper.applyMaskOfManyFaces,
            undo: EldritchInvocationHelper.undoMaskOfManyFaces,
        },
        "MASTER OF MYRIAD FORMS": {
            apply: EldritchInvocationHelper.applyMasterOfMyriadForms,
            undo: EldritchInvocationHelper.undoMasterOfMyriadForms,
        },
        "MINIONS OF CHAOS": {
            apply: EldritchInvocationHelper.applyMinionsOfChaos,
            undo: EldritchInvocationHelper.undoMinionsOfChaos,
        },
        "MIRE THE MIND": {
            apply: EldritchInvocationHelper.applyMireTheMind,
            undo: EldritchInvocationHelper.undoMireTheMind,
        },
        "MISTY VISIONS": {
            apply: EldritchInvocationHelper.applyMistyVisions,
            undo: EldritchInvocationHelper.undoMistyVisions,
        },
        "ONE WITH SHADOWS": {
            apply: EldritchInvocationHelper.applyOneWithShadows,
            undo: EldritchInvocationHelper.undoOneWithShadows,
        },
        "OTHERWORLDLY LEAP": {
            apply: EldritchInvocationHelper.applyOtherwordlyLeap,
            undo: EldritchInvocationHelper.undoOtherwordlyLeap,
        },
        "REPELLING BLAST": {
            apply: EldritchInvocationHelper.applyRepellingBlast,
            undo: EldritchInvocationHelper.undoRepellingBlast,
        },
        "SCULPTOR OF FLESH": {
            apply: EldritchInvocationHelper.applySculptorOfFlesh,
            undo: EldritchInvocationHelper.undoSculptorOfFlesh,
        },
        "SIGN OF ILL OMEN": {
            apply: EldritchInvocationHelper.applySignOfIllOmen,
            undo: EldritchInvocationHelper.undoSignOfIllOmen,
        },
        "THIEF OF FIVE FATES": {
            apply: EldritchInvocationHelper.applyThiefOfFiveFates,
            undo: EldritchInvocationHelper.undoThiefOfFiveFates,
        },
        "THIRSTING BLADE": {
            apply: EldritchInvocationHelper.applyThirstingBlade,
            undo: EldritchInvocationHelper.undoThirstingBlade,
        },
        "VISIONS OF DISTANT REALMS": {
            apply: EldritchInvocationHelper.applyVisionsOfDistantRealms,
            undo: EldritchInvocationHelper.undoVisionsOfDistantRealms,
        },
        "VOICE OF THE CHAIN MASTER": {
            apply: EldritchInvocationHelper.applyVoiceOfTheChainMaster,
            undo: EldritchInvocationHelper.undoVoiceOfTheChainMaster,
        },
        "WHISPERS OF THE GRAVE": {
            apply: EldritchInvocationHelper.applyWhispersOfTheGrave,
            undo: EldritchInvocationHelper.undoWhispersOfTheGrave,
        },
        "WITCH SIGHT": {
            apply: EldritchInvocationHelper.applyWitchSight,
            undo: EldritchInvocationHelper.undoWitchSight,
        }
    }
    static applyAgonizingBlast(pc: PlayerCharacter) { };
    static undoAgonizingBlast(pc: PlayerCharacter) { };
    
    static applyArmorOfShadows(pc: PlayerCharacter) { };
    static undoArmorOfShadows(pc: PlayerCharacter) { };
    
    static applyAscendantStep(pc: PlayerCharacter) { };
    static undoAscendantStep(pc: PlayerCharacter) { };
    
    static applyBeastSpeech(pc: PlayerCharacter) { };
    static undoBeastSpeech(pc: PlayerCharacter) { };
    
    static applyBeguilingInfluence(pc: PlayerCharacter) { };
    static undoBeguilingInfluence(pc: PlayerCharacter) { };
    
    static applyBewitchingWhispers(pc: PlayerCharacter) { };
    static undoBewitchingWhispers(pc: PlayerCharacter) { };
    
    static applyBookOfAncientSecrets(pc: PlayerCharacter) { };
    static undoBookOfAncientSecrets(pc: PlayerCharacter) { };
    
    static applyChainsOfCarceri(pc: PlayerCharacter) { };
    static undoChainsOfCarceri(pc: PlayerCharacter) { };
    
    static applyDevilsSight(pc: PlayerCharacter) { };
    static undoDevilsSight(pc: PlayerCharacter) { };
    
    static applyDreadfulWord(pc: PlayerCharacter) { };
    static undoDreadfulWord(pc: PlayerCharacter) { };
    
    static applyEldritchSight(pc: PlayerCharacter) { };
    static undoEldritchSight(pc: PlayerCharacter) { };
    
    static applyEldritchSpear(pc: PlayerCharacter) { };
    static undoEldritchSpear(pc: PlayerCharacter) { };
    
    static applyEyesOfTheRuneKeeper(pc: PlayerCharacter){ };
    static undoEyesOfTheRuneKeeper(pc: PlayerCharacter){ };
    
    static applyFiendishVigor(pc: PlayerCharacter){ };
    static undoFiendishVigor(pc: PlayerCharacter){ };
    
    static applyGazeOfTwoMinds(pc: PlayerCharacter){ };
    static undoGazeOfTwoMinds(pc: PlayerCharacter){ };
    
    static applyLifeDrinker(pc: PlayerCharacter){ };
    static undoLifeDrinker(pc: PlayerCharacter){ };
    
    static applyMaskOfManyFaces(pc: PlayerCharacter){ };
    static undoMaskOfManyFaces(pc: PlayerCharacter){ };
    
    static applyMasterOfMyriadForms(pc: PlayerCharacter){ };
    static undoMasterOfMyriadForms(pc: PlayerCharacter){ };
    
    static applyMinionsOfChaos(pc: PlayerCharacter){ };
    static undoMinionsOfChaos(pc: PlayerCharacter){ };
    
    static applyMireTheMind(pc: PlayerCharacter){ };
    static undoMireTheMind(pc: PlayerCharacter){ };
    
    static applyMistyVisions(pc: PlayerCharacter){ };
    static undoMistyVisions(pc: PlayerCharacter){ };
    
    static applyOneWithShadows(pc: PlayerCharacter){ };
    static undoOneWithShadows(pc: PlayerCharacter){ };
    
    static applyOtherwordlyLeap(pc: PlayerCharacter){ };
    static undoOtherwordlyLeap(pc: PlayerCharacter){ };
    
    static applyRepellingBlast(pc: PlayerCharacter){ };
    static undoRepellingBlast(pc: PlayerCharacter){ };
    
    static applySculptorOfFlesh(pc: PlayerCharacter){ };
    static undoSculptorOfFlesh(pc: PlayerCharacter){ };
    
    static applySignOfIllOmen(pc: PlayerCharacter){ };
    static undoSignOfIllOmen(pc: PlayerCharacter){ };
    
    static applyThiefOfFiveFates(pc: PlayerCharacter){ };
    static undoThiefOfFiveFates(pc: PlayerCharacter){ };
    
    static applyThirstingBlade(pc: PlayerCharacter){ };
    static undoThirstingBlade(pc: PlayerCharacter){ };
    
    static applyVisionsOfDistantRealms(pc: PlayerCharacter){ };
    static undoVisionsOfDistantRealms(pc: PlayerCharacter){ };
    
    static applyVoiceOfTheChainMaster(pc: PlayerCharacter){ };
    static undoVoiceOfTheChainMaster(pc: PlayerCharacter){ };
    
    static applyWhispersOfTheGrave(pc: PlayerCharacter){ };
    static undoWhispersOfTheGrave(pc: PlayerCharacter){ };
    
    static applyWitchSight(pc: PlayerCharacter){ };
    static undoWitchSight(pc: PlayerCharacter){ };


 


}
