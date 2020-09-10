import { PlayerCharacter } from "../Base/PlayerCharacter";
import { LevelingParams } from "./PlayerClass";
import { Trait } from "../Base/Interfaces";
import * as Archetypes from "../../Assets/Archetypes.json";
import * as Spells from "../../Assets/Spells.json";
import { Barbarian } from "./Barbarian";

abstract class Archetype {
    
    static archetypeHelper: {[key1: string]: {[key2: string]: (pc: PlayerCharacter, params: LevelingParams) => void }} = {};

    static getFeature(className: string, archetypeName: string, level: string, featureName: string) {
        return Archetypes[className][archetypeName]["features"][level][featureName];
    }
}

export class BarbarianArchetype extends Archetype {

    static archetypeHelper = {
        "BERSERKER": {
            "3": BarbarianArchetype.berserker3,
            "6": BarbarianArchetype.berserker6,
            "10": BarbarianArchetype.berserker10,
            "14": BarbarianArchetype.berserker14
        }, 
        "TOTEM WARRIOR":{
            "3": BarbarianArchetype.totemWarrior3, 
            "6": BarbarianArchetype.totemWarrior6,
            "10": BarbarianArchetype.totemWarrior10,
            "14": BarbarianArchetype.totemWarrior14
        } 
    }

    static getFeature(archetypeName: string, level: string, featureName: string) {
        return Archetype.getFeature("BARBARIAN", archetypeName, level, featureName);
    }
    
    static berserker3(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(BarbarianArchetype.getFeature("BERSERKER", "3", "FRENZY"));
    }

    static berserker6(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(BarbarianArchetype.getFeature("BERSERKER", "6", "MINDLESS RAGE"));
    }

    static berserker10(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(BarbarianArchetype.getFeature("BERSERKER", "10", "INTIMIDATING PRESENCE"));
    }

    static berserker14(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(BarbarianArchetype.getFeature("BERSERKER", "14", "RETALIATION"));
    }

    static totemWarrior3(pc: PlayerCharacter, params: LevelingParams){

        pc.addSpells(["BEAST SENSE", "SPEAK WITH ANIMALS"], "None");
        pc.addFeatures(
            BarbarianArchetype.getFeature("TOTEM WARRIOR", "3", "SPIRIT SEEKER"),
            BarbarianArchetype.getFeature("TOTEM WARRIOR", "3", params.archetypeSelection[0].options[0])
        );
    }

    static totemWarrior6(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(BarbarianArchetype.getFeature("TOTEM WARRIOR", "6", params.archetypeSelection[0].options[0]));
    }

    static totemWarrior10(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["COMMUNE WITH NATURE"], "None");
        pc.addFeatures(BarbarianArchetype.getFeature("TOTEM WARRIOR", "10", "SPIRIT WALKER"));
    }
    
    static totemWarrior14(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(BarbarianArchetype.getFeature("TOTEM WARRIOR", "14", params.archetypeSelection[0].options[0]));
    }
}

export class BardArchetype extends Archetype {
    
    static archetypeHelper = {
        "LORE": {
            "3": BardArchetype.lore3,
            "6": BardArchetype.lore6,
            "14": BardArchetype.lore14
        }, 
        "VALOR":{
            "3": BardArchetype.valor3, 
            "6": BardArchetype.valor6,
            "14": BardArchetype.valor14
        } 
    }

    static getFeature(archetypeName: string, level: string, featureName: string) {
        return Archetype.getFeature("BARD", archetypeName, level, featureName);
    }
    
    static lore3(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(BardArchetype.getFeature("LORE", "3", "CUTTING WORDS"));
    }

    static lore6(pc: PlayerCharacter, params: LevelingParams) {
        const lore6Trait: Trait = { 
            ...BardArchetype.getFeature("LORE", "6", "ADDITIONAL MAGICAL SECRETS"), 
            choices: params.archetypeSelection[0].options
        };
        pc.addSpells(params.archetypeSelection[0].options, "charisma")
        pc.addFeatures(lore6Trait);
    }

    static lore14(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(BardArchetype.getFeature("LORE", "14", "PEERLESS SKILL"));
    }

    static valor3(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(BardArchetype.getFeature("VALOR", "3", "COMBAT INSPIRATION"));
    }

    static valor6(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(BardArchetype.getFeature("VALOR", "6", "EXTRA ATTACK"));
    }

    static valor14(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(BardArchetype.getFeature("VALOR", "14", "BATTLE MAGIC"));
    }
}

export class ClericArchetype extends Archetype {

    static archetypeHelper = {
        "KNOWLEDGE": {
            "1": ClericArchetype.knowledge1,
            "2": ClericArchetype.knowledge2,
            "3": ClericArchetype.knowledge3,
            "5": ClericArchetype.knowledge5,
            "6": ClericArchetype.knowledge6,
            "7": ClericArchetype.knowledge7,
            "8": ClericArchetype.knowledge8,
            "9": ClericArchetype.knowledge9,
            "17": ClericArchetype.knowledge17
        }, 
        "LIFE":{
            "1": ClericArchetype.life1,
            "2": ClericArchetype.life2,
            "3": ClericArchetype.life3,
            "5": ClericArchetype.life5,
            "6": ClericArchetype.life6,
            "7": ClericArchetype.life7,
            "8": ClericArchetype.life8,
            "9": ClericArchetype.life9,
            "17": ClericArchetype.life17
        },
        "LIGHT":{
            "1": ClericArchetype.light1,
            "2": ClericArchetype.light2,
            "3": ClericArchetype.light3,
            "5": ClericArchetype.light5,
            "6": ClericArchetype.light6,
            "7": ClericArchetype.light7,
            "8": ClericArchetype.light8,
            "9": ClericArchetype.light9,
            "17": ClericArchetype.light17
        },
        "NATURE":{
            "1": ClericArchetype.nature1,
            "2": ClericArchetype.nature2,
            "3": ClericArchetype.nature3,
            "5": ClericArchetype.nature5,
            "6": ClericArchetype.nature6,
            "7": ClericArchetype.nature7,
            "8": ClericArchetype.nature8,
            "9": ClericArchetype.nature9,
            "17": ClericArchetype.nature17
        },
        "TEMPEST":{
            "1": ClericArchetype.tempest1,
            "2": ClericArchetype.tempest2,
            "3": ClericArchetype.tempest3,
            "5": ClericArchetype.tempest5,
            "6": ClericArchetype.tempest6,
            "7": ClericArchetype.tempest7,
            "8": ClericArchetype.tempest8,
            "9": ClericArchetype.tempest9,
            "17": ClericArchetype.tempest17
        },
        "TRICKERY":{
            "1": ClericArchetype.trickery1,
            "2": ClericArchetype.trickery2,
            "3": ClericArchetype.trickery3,
            "5": ClericArchetype.trickery5,
            "6": ClericArchetype.trickery6,
            "7": ClericArchetype.trickery7,
            "8": ClericArchetype.trickery8,
            "9": ClericArchetype.trickery9,
            "17": ClericArchetype.trickery17
        },
        "WAR":{
            "1": ClericArchetype.war1,
            "2": ClericArchetype.war2,
            "3": ClericArchetype.war3,
            "5": ClericArchetype.war5,
            "6": ClericArchetype.war6,
            "7": ClericArchetype.war7,
            "8": ClericArchetype.war8,
            "9": ClericArchetype.war9,
            "17": ClericArchetype.war17
        }
    }

    static getFeature(archetypeName: string, level: string, featureName: string) {
        return Archetype.getFeature("CLERIC", archetypeName, level, featureName);
    }
    
    static knowledge1(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["COMMAND", "IDENTIFY"], "wisdom");
        pc.addFeatures(ClericArchetype.getFeature("KNOWLEDGE","1", "BLESSINGS OF KNOWLEDGE"));
        
        // Blessings of Knowledge
        pc.traits.languages.push()  // Languages, How do we pass this?

        for(const skill  of params.proficiencySelection){
            // Skill  Proficiencies / Expertise
            pc.skills[skill].proficient = true;
            pc.skills[skill].expertise = true;
        } 
    }

    static knowledge2(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(ClericArchetype.getFeature("KNOWLEDGE", "2", "CHANNEL DIVINITY: KNOWLEDGE OF THE AGES"))
    }

    static knowledge3(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["AUGURY", "SUGGESTION"], "wisdom");
    }

    static knowledge5(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["NONDETECTION", "SPEAK WITH DEAD"], "wisdom");
    }

    static knowledge6(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(ClericArchetype.getFeature("KNOWLEDGE", "6", "CHANNEL DIVINITY: READ THOUGHTS"))
    }

    static knowledge7(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["ARCANE EYE", "CONFUSION"], "wisdom");
    }

    static knowledge8(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(ClericArchetype.getFeature("KNOWLEDGE", "8", "POTENT SPELLCASTING"))
    }

    static knowledge9(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["LEGEND LORE", "SCRYING"], "wisdom");
    }
    
    static knowledge17(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(ClericArchetype.getFeature("KNOWLEDGE", "17", "VISION OF THE PAST"))
    }

    static life1(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["BLESS","CURE WOUNDS"], "wisdom");
        pc.addFeatures(ClericArchetype.getFeature("LIFE", "1", "DISCIPLE OF LIFE"))
        pc.traits.armorProficiencies.push("Heavy");
    }

    static life2(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(ClericArchetype.getFeature("LIFE", "2", "CHANNEL DIVINITY: PRESERVE LIFE"))
    }

    static life3(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["LESSER RESTORATION","SPIRITUAL WEAPON"], "wisdom");
    }

    static life5(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["BEACON OF HOPE","REVIVIFY"], "wisdom");
    }

    static life6(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(ClericArchetype.getFeature("LIFE", "6", "BLESSED HEALER"))
    }

    static life7(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["DEATH WARD","GUARDIAN OF FAITH"], "wisdom");
    }
    
    static life8(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(ClericArchetype.getFeature("LIFE", "8", "DIVINE STRIKE"))
    }

    static life9(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["MASS CURE WOUNDS","RAISE DEAD"], "wisdom");
    }

    static life17(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(ClericArchetype.getFeature("LIFE", "17", "SUPREME HEALING"))
    }

    static light1(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["BURNING HANDS","FAERIE FIRE", "LIGHT"], "wisdom")
        pc.addFeatures(ClericArchetype.getFeature("LIGHT", "1", "WARDING FLARE"))
    }

    static light2(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(ClericArchetype.getFeature("LIGHT", "2", "CHANNEL DIVINITY: RADIANCE OF THE DAWN"))
    }

    static light3(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["FLAMING SPHERE","SCORCHING RAY"], "wisdom");
    }

    static light5(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["DAYLIGHT","FIREBALL"], "wisdom");
    }

    static light6(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(ClericArchetype.getFeature("LIGHT", "6", "IMPROVED FLARE"))
    }

    static light7(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["GUARDIAN OF FAITH","WALL OF FIRE"], "wisdom");
    }
    
    static light8(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(ClericArchetype.getFeature("LIGHT", "8", "POTENT SPELLCASTING"))
    }

    static light9(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["FLAME STRIKE","SCRYING"], "wisdom");
    }

    static light17(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(ClericArchetype.getFeature("LIGHT", "17", "CORONA OF LIGHT"))
    }

    static nature1(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(ClericArchetype.getFeature("NATURE", "1", "ACOLYTE OF NATURE"));
        pc.addSpells([...params.spellSelection, "ANIMAL FRIENDSHIP", "SPEAK WITH ANIMALS"], "wisdom");
        pc.traits.armorProficiencies.push("Heavy");
    }

    static nature2(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(ClericArchetype.getFeature("NATURE", "2", "CHANNEL DIVINITY: CHARM ANIMALS AND PLANTS"))
    }

    static nature3(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["BARKSKIN","SPIKE GROWTH"], "wisdom");
    }

    static nature5(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["PLANT GROWTH","WIND WALL"], "wisdom");
    }

    static nature6(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(ClericArchetype.getFeature("NATURE", "6", "DAMPEN ELEMENTS"))
    }

    static nature7(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["DOMINATE BEAST","GRASPING VINE"], "wisdom");
    }
    
    static nature8(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(ClericArchetype.getFeature("NATURE", "8", "DIVINE STRIKE"))
    }

    static nature9(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["INSECT PLAGUE","TREE STRIDE"], "wisdom");
    }

    static nature17(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(ClericArchetype.getFeature("NATURE", "17", "MASTER OF NATURE"))
    }
    
    static tempest1(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["FOG CLOUD","THUNDERWAVE"], "wisdom")
        pc.addFeatures(ClericArchetype.getFeature("TEMPEST", "1", "WRATH OF THE STORM"))
        pc.traits.armorProficiencies.push("Heavy");
    }

    static tempest2(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(ClericArchetype.getFeature("TEMPEST", "2", "CHANNEL DIVINITY: DESTRUCTIVE WRATH"))
    }

    static tempest3(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["GUST OF WIND","SHATTER"], "wisdom");
    }

    static tempest5(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["CALL LIGHTNING","SLEET STORM"], "wisdom");
    }

    static tempest6(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(ClericArchetype.getFeature("TEMPEST", "6", "THUNDERBOLT STRIKE"))
    }

    static tempest7(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["CONTROL WATER","ICE STORM"], "wisdom");
    }
    
    static tempest8(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(ClericArchetype.getFeature("TEMPEST", "8", "DIVINE STRIKE"))
    }

    static tempest9(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["DESTRUCTIVE WAVE","INSECT PLAGUE"], "wisdom");
    }

    static tempest17(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(ClericArchetype.getFeature("TEMPEST", "17", "STORMBORN"))
    }

    static trickery1(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["CHARM PERSON","DISGUISE SELF"], "wisdom")
        pc.addFeatures(ClericArchetype.getFeature("TRICKERY", "1", "BLESSING OF THE TRICKSTER"))
    }

    static trickery2(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(ClericArchetype.getFeature("TRICKERY", "2", "CHANNEL DIVINITY: INVOKE DUPLICITY"))
    }

    static trickery3(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["MIRROR IMAGE","PASS WITHOUT TRACE"], "wisdom");
    }

    static trickery5(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["BLINK","DISPEL MAGIC"], "wisdom");
    }

    static trickery6(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(ClericArchetype.getFeature("TRICKERY", "6", "CHANNEL DIVINITY: CLOAK OF SHADOWS"))
    }

    static trickery7(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["DIMENSION DOOR","POLYMOPRH"], "wisdom");
    }
    
    static trickery8(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(ClericArchetype.getFeature("TRICKERY", "8", "DIVINE STRIKE"))
    }

    static trickery9(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["DOMINATE PERSON","MODIFY MEMORY"], "wisdom");
    }

    static trickery17(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(ClericArchetype.getFeature("TRICKERY", "17", "IMPROVED DUPLICITY"))
    }

    static war1(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["DIVINE FAVOR","SHIELD OF FAITH"], "wisdom")
        pc.addFeatures(ClericArchetype.getFeature("WAR", "1", "WAR PRIEST"))
        pc.traits.weaponProficiencies.push("Martial");
        pc.traits.armorProficiencies.push("Heavy");
    }

    static war2(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(ClericArchetype.getFeature("WAR", "2", "CHANNEL DIVINITY: GUIDED STRIKE"))
    }

    static war3(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["MAGIC WEAPON","SPIRITUAL WEAPON"], "wisdom");
    }

    static war5(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["CRUSADER'S MANTLE","SPIRIT GUARDIAN"], "wisdom");
    }

    static war6(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(ClericArchetype.getFeature("WAR", "6", "CHANNEL DIVINITY: WAR GOD'S BLESSING"))
    }

    static war7(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["FREEDOM OF MOVEMENT","STONESKIN"], "wisdom");
    }
    
    static war8(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(ClericArchetype.getFeature("WAR", "8", "DIVINE STRIKE"))
    }

    static war9(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(["FLAME STRIKE","HOLD MONSTER"], "wisdom");
    }

    static war17(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(ClericArchetype.getFeature("WAR", "17", "AVATAR OF BATTLE"))
    }

}

export class DruidArchetype extends Archetype {
    static archetypeHelper = {
        "LAND": {
            "2": DruidArchetype.land2,
            "3": DruidArchetype.land3,
            "5": DruidArchetype.land5,
            "6": DruidArchetype.land6,
            "7": DruidArchetype.land7,
            "9": DruidArchetype.land9,
            "10": DruidArchetype.land10,
            "14": DruidArchetype.land14
        }, 
        "MOON":{
            "2": DruidArchetype.moon2,
            "6": DruidArchetype.moon6,
            "10": DruidArchetype.moon10,
            "14": DruidArchetype.moon14
        }
    }

    static getFeature(archetypeName: string, level: string, featureName: string) {
        return Archetype.getFeature("DRUID", archetypeName, level, featureName);
    }

    static land2(pc: PlayerCharacter, params: LevelingParams) {
        pc.addSpells(params.spellSelection, "wisdom");
        pc.addFeatures(DruidArchetype.getFeature("LAND", "2", "NATURAL RECOVERY"))   
    }

    static land3(pc: PlayerCharacter, params: LevelingParams) { 
        // pc.addSpells(params.spellSelection, "wisdom");
        pc.addFeatures(DruidArchetype.getFeature("LAND", "3", "CIRCLE SPELLS")) 
    }

    static land5(pc: PlayerCharacter, params: LevelingParams) {
       // pc.addSpells(params.spellSelection, "wisdom");    
    }

    static land6(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(DruidArchetype.getFeature("LAND", "6", "LAND'S STRIDE"))  
    }

    static land7(pc: PlayerCharacter, params: LevelingParams) {   
        // SPELLS   
    }

    static land9(pc: PlayerCharacter, params: LevelingParams) {
        // SPELLS   
    }

    static land10(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(DruidArchetype.getFeature("LAND", "10", "NATURE'S WARD"))   
    }

    static land14(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(DruidArchetype.getFeature("LAND", "2", "NATURE SANCTUARY"))   
    }

    static moon2(pc: PlayerCharacter, params: LevelingParams) { 
        pc.addFeatures(DruidArchetype.getFeature("MOON", "2", "COMBAT WILD SHAPE"))  
    }

    static moon6(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(DruidArchetype.getFeature("MOON", "6", "PRIMAL STRIKE"))   
    }

    static moon10(pc: PlayerCharacter, params: LevelingParams) {  
        pc.addFeatures(DruidArchetype.getFeature("MOON", "10", "ELEMENTAL WILD SHAPE")) 
    }

    static moon14(pc: PlayerCharacter, params: LevelingParams) {
        pc.addFeatures(DruidArchetype.getFeature("MOON", "14", "THOUSAND FORMS"))   
    }
}