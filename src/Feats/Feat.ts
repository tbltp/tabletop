import { PlayerCharacter } from '../Base/PlayerCharacter';
import { ResourceTrait, ISpell, Spell, Trait } from '../Base/Interfaces';
import * as Feats from '../../Assets/Feats.json';
import * as Languages from '../../Assets/Languages.json';
import * as Spells from '../../Assets/Spells.json';
import * as SpellcastingAbility from '../../Assets/SpellcastingAbility.json';

export abstract class Feat {
    
    trait: Trait;  // Description of Feat inside of Trait list inside PC
    abilitiesAtLevels: {[key: string]: (pc: PlayerCharacter) => void; } = {};

    public abstract apply(pc: PlayerCharacter);

    abilityPrereqCheck(pc: PlayerCharacter, skill: string, target: number): boolean {
        return (pc.abilityScores[skill].score < target) ? false : true;
    }

    armorPrereqCheck(pc: PlayerCharacter, skill: string) {
        return (pc.traits.armorProficiencies.indexOf(skill) === -1) ? false : true;
    }

    spellcasterPrereqCheck(pc: PlayerCharacter) {
        return (!pc.isSpellcaster()) ? false : true;
    }
}

export class Alert extends Feat {
    constructor(){
        super();
    }

    trait = Feats["ALERT"];

    apply(pc: PlayerCharacter) {

        pc.baseStats["initiativeBonus"].bonus += 5;
        pc.traits.features.push(this.trait);
    }
}

export class Athlete extends Feat {
    constructor(abilityScore: string){
        super();
        this.abilityScore = abilityScore;
    }

    trait = Feats["ATHLETE"];
    private abilityScore: string;

    apply(pc: PlayerCharacter) {

        pc.abilityScores[this.abilityScore].update(1);
        pc.traits.features.push(this.trait);
    }
}

export class Actor extends Feat {
    constructor(){
        super();
    }

    trait = Feats["ACTOR"];

    apply(pc: PlayerCharacter) {

        pc.abilityScores.charisma.update(1);
        pc.traits.features.push(this.trait);
    }
}

export class Charger extends Feat {
    constructor(){
        super();
    }

    trait = Feats["CHARGER"];

    apply(pc: PlayerCharacter) {

        pc.traits.features.push(this.trait);
    }
}

export class CrossbowExpert extends Feat {
    constructor(){
        super();
    }

    trait = Feats["CROSSBOW EXPERT"];

    apply(pc: PlayerCharacter) {

        pc.traits.features.push(this.trait);
    }
}

export class DefensiveDuelist extends Feat {
    constructor(){
        super();
    }

    trait = Feats["DEFENSIVE DUELIST"];

    apply(pc: PlayerCharacter) {

        if(!this.abilityPrereqCheck(pc, "dexterity", 13)) {
            throw Error('Requirement Not Met: 13 Dex');
        }

        pc.traits.features.push(this.trait);
    }
}

export class DualWielder extends Feat {
    constructor(){
        super();
    }

    trait = Feats["DUAL WIELDER"];

    apply(pc: PlayerCharacter) {

        pc.traits.features.push(this.trait);
    }
}

export class DungeonDelver extends Feat {
    constructor(){
        super();
    }

    trait = Feats["DUNGEON DELVER"];

    apply(pc: PlayerCharacter) {

        pc.traits.features.push(this.trait);
    }
}

export class Durable extends Feat {
    constructor(abilityScore: string){
        super();
        this.abilityScore = abilityScore;
    }

    trait = Feats["DURABLE"];
    private abilityScore: string;

    apply(pc: PlayerCharacter) {

        pc.abilityScores[this.abilityScore].update(1);
        pc.traits.features.push(this.trait);
    }
}

export class ElementalAdept extends Feat {
    constructor(element: string){
        super();
        this.element = element;
    }

    trait = Feats["ELEMENTAL ADEPT"];
    private element: string;

    apply(pc: PlayerCharacter) {

        this.trait.description += `(${this.element})`
        pc.traits.features.push(this.trait);
    }
}

export class Grappler extends Feat {
    constructor(){
        super();
    }

    trait = Feats["GRAPPLER"];

    apply(pc: PlayerCharacter) {

        if(!this.abilityPrereqCheck(pc, "strength", 13)) {
            throw Error('Requirement Not Met: 13 Str');
        }

        pc.traits.features.push(this.trait);
    }
}

export class GreatWeaponMaster extends Feat {
    constructor(){
        super();
    }

    trait = Feats["GREAT WEAPON MASTER"];

    apply(pc: PlayerCharacter) {

        pc.traits.features.push(this.trait);
    }
}

export class Healer extends Feat {
    constructor(){
        super();
    }

    trait = Feats["HEALER"];

    apply(pc: PlayerCharacter) {

        pc.traits.features.push(this.trait);
    }
}

export class HeavilyArmored extends Feat {
    constructor(){
        super();
    }

    trait = Feats["HEAVILY ARMORED"];

    apply(pc: PlayerCharacter) {

        if(!this.armorPrereqCheck(pc, "Medium")){
            throw Error("Requirement Not Met: Medium Armor Proficiency")
        }

        pc.abilityScores.strength.update(1);
        pc.traits.armorProficiencies.push("Heavy");
        pc.traits.features.push(this.trait);
    }
}

export class HeavyArmorMaster extends Feat {
    constructor(){
        super();
    }

    trait = Feats["HEAVY ARMOR MASTER"];

    apply(pc: PlayerCharacter) {

        if(!this.armorPrereqCheck(pc, "Heavy")){
            throw Error("Requirement Not Met: Heavy Armor Proficiency")
        }

        pc.abilityScores.strength.update(1);
        pc.traits.features.push(this.trait);
    }
}

export class InspiringLeader extends Feat {
    constructor() {
        super();
    }
    
    trait = Feats['INSPIRING LEADER'];

    public apply(pc: PlayerCharacter) {

        if(!this.abilityPrereqCheck(pc, 'charisma', 13)) {
            throw Error('Requirement Not Met: 13 Cha')
        }

        pc.traits.features.push(this.trait);
    }
}

export class KeenMind extends Feat {
    constructor() {
        super();
    }

    trait = Feats['KEEN MIND'];
    
    public apply(pc: PlayerCharacter) {
        
        pc.abilityScores['intelligence'].update(1);
        pc.traits.features.push(this.trait);
    }
}

export class LightlyArmored extends Feat {
    constructor(abilityScore: string) {
        super();
        this.abilityScore = abilityScore;
    }

    trait = Feats['LIGHTLY ARMORED'];
    private abilityScore: string;

    public apply(pc: PlayerCharacter) {
       
        pc.abilityScores[this.abilityScore].update(1);
        pc.traits.armorProficiencies.push('Light');
        this.trait.description += `\n(${this.abilityScore})`
        pc.traits.features.push(this.trait);
    }
}

export class Linguist extends Feat {
    constructor (languages: string[]) {
        super();
        this.languages = languages;
    }

    trait = Feats['LINGUIST'];
    private languages: string[];

    public apply(pc: PlayerCharacter) {
 
        pc.abilityScores['intelligence'].update(1);
        for(let lang of this.languages) {pc.traits.languages.push(Languages[lang]) }
        this.trait.description += `\n(${this.languages[0]}, ${this.languages[1]}, ${this.languages[2]})`
        pc.traits.features.push(this.trait);
    }
}

export class Lucky extends Feat {
    constructor() {
        super();
        this.luckyResource = {
            ...this.trait,
            resourceMax: 3
        };
    }

    trait = Feats['LUCKY'];
    private luckyResource: ResourceTrait;

    public apply(pc: PlayerCharacter) {
        
        pc.traits.resources.push(this.luckyResource);
        pc.traits.features.push(this.trait);
    }
}

export class MageSlayer extends Feat {
    constructor() {
        super();
    }
    
    trait = Feats['MAGE SLAYER'];

    public apply(pc: PlayerCharacter) {
        
        pc.traits.features.push(this.trait);
    }
}

export class MagicInitiate extends Feat {
    constructor(spellClass: string, cantrips: string[], firstLevelSpell: string) {
        super();
        this.spellClass = spellClass;
        this.cantrips = cantrips;
        this.firstLevelSpell = firstLevelSpell;
    }
    
    trait = Feats['MAGIC INITIATE'];
    private spellClass: string;
    private cantrips: string[];
    private firstLevelSpell: string;

    public apply(pc: PlayerCharacter) {
        
        for(const spellName of this.cantrips) {
            const ispell: ISpell = Spells[spellName];
            const spell: Spell = {...ispell, spellcastingAbility: SpellcastingAbility[this.spellClass] };
            pc.spells[0].push(spell);
        }

        const ispell: ISpell = Spells[this.firstLevelSpell];
        const spell: Spell = {...ispell, spellcastingAbility: SpellcastingAbility[this.spellClass]};
        pc.spells[1].push(spell);

        this.trait.description += `\n(${this.cantrips[0]}, ${this.cantrips[0]}, ${this.firstLevelSpell})`;
        pc.traits.features.push(this.trait);
    }
}

export class MartialAdept extends Feat {
    /**
     * TO DO: Fill this class in when:
     * actions are represented 
     * classes are implemented
     * class-specific resources are known
     */

    constructor() {
        super();
    };

    apply(pc: PlayerCharacter) {}

}

export class MediumArmorMaster extends Feat {
    /**
     * TO DO: Fill this class in when:
     * stats are better represented
     * ability checks return a boolean
     */

    constructor() {
        super();
    };

    apply(pc: PlayerCharacter) {}
}

export class Mobile extends Feat {
    constructor() {
        super();
    }
    
    trait = Feats['MOBILE'];

    public apply(pc: PlayerCharacter) {
        
        pc.speed += 10;
        pc.traits.features.push(this.trait);
    }
}

export class ModeratelyArmored extends Feat {
    constructor(abilityScore: string) {
        super();
        this.abilityScore = abilityScore;
    }

    trait = Feats['MODERATELY ARMORED'];
    private abilityScore: string;

    public apply(pc: PlayerCharacter) {

        if(!this.armorPrereqCheck(pc, 'Light')) {
            throw Error('Requirement Not Met: Light Armor Proficiency');
        }

        pc.abilityScores[this.abilityScore].update(1);
        pc.traits.armorProficiencies.push('Medium', 'Shield');
        this.trait.description += `\n(${this.abilityScore})`
        pc.traits.features.push(this.trait);
    }
}

export class MountedCombatant extends Feat {
    constructor() {
        super();
    }

    trait = Feats['MOUNTED COMBATANT'];

    public apply(pc: PlayerCharacter) {
        pc.traits.features.push(this.trait);
    }
}

export class Observant extends Feat {
    constructor(abilityScore: string) {
        super();
        this.abilityScore = abilityScore;
    }

    trait = Feats['OBSERVANT'];
    private abilityScore: string;

    public apply(pc: PlayerCharacter) {
       
        pc.abilityScores[this.abilityScore].update(1);
        pc.baseStats['passivePerception'].bonus += 5;
        pc.baseStats['passiveInvestigation'].bonus += 5;
        this.trait.description += `\n(${this.abilityScore})`
        pc.traits.features.push(this.trait);
    }
}

export class PolearmMaster extends Feat {
    constructor(){
        super();
    }

    trait = Feats["POLEARM MASTER"];

    apply(pc: PlayerCharacter) {

        pc.traits.features.push(this.trait);
    }
}

export class Resilient extends Feat {
    constructor(abilityScore: string){
        super();
        this.abilityScore = abilityScore;
    }

    trait = Feats["RESILIENT"];
    private abilityScore: string;

    apply(pc: PlayerCharacter) {

        pc.abilityScores[this.abilityScore].update(1);
        pc.abilityScores[this.abilityScore].savingThrowProficiency = true;
        this.trait.description += `(${this.abilityScore})`;
        pc.traits.features.push(this.trait);
    }
}

export class RitualCaster extends Feat {  // THIS IS VERY COMPLEX - NOT DONE
    constructor(spellClass: string, spells: string[]){
        super();
        this.spellClass = spellClass;
        this.spells = spells;
    }
    
    trait = Feats["RITUAL CASTER"];
    private spellClass: string;
    private spells: string[];

    apply(pc: PlayerCharacter) {

        for(const spellName of this.spells) {
            const ispell: ISpell = Spells[spellName];
            const spell: Spell = {...ispell, spellcastingAbility: SpellcastingAbility[this.spellClass]};
            pc.spells["1"].push(spell);
        }

        pc.traits.features.push(this.trait);
    }
}

export class SavageAttacker extends Feat {
    constructor(){
        super();
    }

    trait = Feats["SAVAGE ATTACKER"];

    apply(pc: PlayerCharacter) {

        pc.traits.features.push(this.trait);
    }
}

export class Sentinel extends Feat {
    constructor(){
        super();
    }

    trait = Feats["SENTINEL"];

    apply(pc: PlayerCharacter) {

        pc.traits.features.push(this.trait);
    }
}

export class Sharpshooter extends Feat {
    constructor(){
        super();
    }

    trait = Feats["SHARPSHOOTER"];

    apply(pc: PlayerCharacter) {

        pc.traits.features.push(this.trait);
    }
}

export class ShieldMaster extends Feat {
    constructor(){
        super();
    }

    trait = Feats["SHIELD MASTER"];

    apply(pc: PlayerCharacter) {

        pc.traits.features.push(this.trait);
    }
}

export class Skilled extends Feat {
    constructor(skills: string[], tools: string[]){
        super();
        this.skillProficiencies = skills;
        this.toolProficiencies = tools;
    }

    trait = Feats["SKILLED"];
    private skillProficiencies: string[];
    private toolProficiencies: string[];

    apply(pc: PlayerCharacter) {
        
        const allProficiencies = this.skillProficiencies.concat(this.toolProficiencies);
        for(let skill of this.skillProficiencies){ pc.skills[skill].proficient = true; }
        for(let tool of this.toolProficiencies){ pc.traits.toolProficiencies.push(tool); }
        this.trait.description += `(${allProficiencies[0]}, ${allProficiencies[1]}, ${allProficiencies[2]})`
        pc.traits.features.push(this.trait);
    }
}

export class Skulker extends Feat {
    constructor(){
        super();
    }

    trait = Feats["SKULKER"];

    apply(pc: PlayerCharacter) {

        if(!this.abilityPrereqCheck(pc, "dexterity", 13)) {
            throw Error('Requirement Not Met: 13 Dex');
        }
        
        pc.traits.features.push(this.trait);
    }
}

export class SpellSniper extends Feat {
    constructor(spellClass: string, cantrip: string){
        super();
        this.cantrip = cantrip;
        this.spellClass = spellClass;
    }

    trait = Feats["SPELL SNIPER"];
    private spellClass: string;
    private cantrip: string;

    apply(pc: PlayerCharacter) {

        if(!this.spellcasterPrereqCheck(pc)) { 
            throw Error('Requirement Not Met: Spellcaster');    
        }
        
        const ispell: ISpell = Spells[this.cantrip]
        const spell: Spell = {...ispell, spellcastingAbility: SpellcastingAbility[this.spellClass] }
        pc.spells["0"].push(spell)
        this.trait.description += `(${this.cantrip})`;
        pc.traits.features.push(this.trait);
    }
}

export class TavernBrawler extends Feat {
    constructor(abilityScore: string) {

        super();
        this.abilityScore = abilityScore;
    }

    trait = Feats["TAVERN BRAWLER"];
    private abilityScore: string;

    apply(pc: PlayerCharacter) {

        pc.abilityScores[this.abilityScore].update(1);
        pc.traits.weaponProficiencies.push("Unarmed Strike", "Improvised Weapons");
        this.trait.description += `(${this.abilityScore})`;
        pc.traits.features.push(this.trait);
    }
}

export class Tough extends Feat {  // THIS IMPROVES AT LEVEL - NOT DONE
    constructor(){
        super();
    }

    trait = Feats["TOUGH"];
    abilitiesAtLevels = {
        "0": this.plusTwoHealth,
        "1": this.plusTwoHealth,
        "2": this.plusTwoHealth,
        "3": this.plusTwoHealth,
        "4": this.plusTwoHealth,
        "5": this.plusTwoHealth,
        "6": this.plusTwoHealth,
        "7": this.plusTwoHealth,
        "8": this.plusTwoHealth,
        "9": this.plusTwoHealth,
        "10": this.plusTwoHealth,
        "11": this.plusTwoHealth,
        "12": this.plusTwoHealth,
        "13": this.plusTwoHealth,
        "14": this.plusTwoHealth,
        "15": this.plusTwoHealth,
        "16": this.plusTwoHealth,
        "17": this.plusTwoHealth,
        "18": this.plusTwoHealth,
        "19": this.plusTwoHealth,
        "20": this.plusTwoHealth
    }

    plusTwoHealth(pc: PlayerCharacter) {
        pc.baseStats["hpMax"].bonus += 2;
    }

    apply(pc: PlayerCharacter) {

        pc.baseStats['hpMax'].bonus += 2 * pc.totalLevel;
        pc.traits.features.push(this.trait);
    }
}

export class WarCaster extends Feat {
    constructor(){
        super();
    }

    trait = Feats["WAR CASTER"];

    apply(pc: PlayerCharacter) {

        if(this.spellcasterPrereqCheck(pc)) {  
            throw Error('Requirement Not Met: Spellcaster');
        }

        pc.traits.features.push(this.trait);
    }
}

export class WeaponMaster extends Feat {
    constructor(abilityScore: string, weaponProficiencies: string[]){
        super();
        this.abilityScore = abilityScore;
        this.weaponProficiencies = weaponProficiencies;
    }

    trait = Feats["WEAPON MASTER"];
    private abilityScore: string;
    private weaponProficiencies: string[];

    apply(pc: PlayerCharacter) {

        pc.abilityScores[this.abilityScore].update(1);
        for(let weapon of this.weaponProficiencies) { pc.traits.weaponProficiencies.push(weapon); }
        this.trait.description += `(${this.abilityScore}, ${this.weaponProficiencies[0]}, ${this.weaponProficiencies[1]}, ${this.weaponProficiencies[2]}, ${this.weaponProficiencies[3]})`
        pc.traits.features.push(this.trait);
    }
}