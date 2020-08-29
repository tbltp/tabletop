import { Feat } from './Feat';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import * as Feats from '../../Assets/Feats.json';
import * as Languages from '../../Assets/Languages.json';
import * as Spells from '../../Assets/Spells.json';
import { ResourceTrait, Spell, Trait } from '../Base/Interfaces';

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

    constructor(ability: string) {
        super();
        this.ability = ability;
    }

    private ability: string;
    trait = Feats['LIGHTLY ARMORED'];

    public apply(pc: PlayerCharacter) {
       
        pc.abilityScores[this.ability].update(1);
        pc.traits.armorProficiencies.push('Light');
        this.trait.description += `\n(${this.ability})`
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

    /**
     * TO DO: Fill this class in when:
     *      -spell lists are completed
     *      -spellcasting ability is represented (optional)
     */
    constructor(cantripChoices: string[], firstLevelChoice: string) {
        super();
        this.cantrips = [];
        this.trait = Feats['MAGIC INITIATE'];
        for(let ctrip of cantripChoices) {
            this.cantrips.push(Spells[ctrip]);
        }
        this.firstLevel = Spells[firstLevelChoice];
    }
    
    private cantrips: Spell[];
    private firstLevel: Spell;

    public apply(pc: PlayerCharacter) {
        
        pc.spells["0"].push(...this.cantrips);
        pc.spells["1"].push(this.firstLevel);
        this.trait.description += `\n(${this.cantrips[0].name}, ${this.cantrips[0].name}, ${this.firstLevel.name})`
        pc.traits.features.push(this.trait);
    }
}

export class MartialAdept extends Feat {

    /**
     * TO DO: Fill this class in when:
     *      -actions are represented 
     *      -classes are implemented
     *          -class-specific resources are known
     */
    constructor() {
        super();
        this.trait = Feats['MARTIAL ADEPT'];
    }

    public apply(pc: PlayerCharacter) {
        
        pc.traits.features.push(this.trait);
    }

}

export class MediumArmorMaster extends Feat {

    /**
     * TO DO: Fill this class in when:
     *      -stats are better represented
     *      -ability checks return a boolean
     */
    constructor() {
        super();
        this.trait = Feats['MEDIUM ARMOR MASTER'];
    }

    public apply(pc: PlayerCharacter) {

        if(!this.armorPrereqCheck(pc, 'Medium')) {
            throw Error('Requirement Not Met: Medium Armor Proficiency');
        }
        
        pc.traits.features.push(this.trait);
    }
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
        pc.traits.armorProficiencies.push('medium', 'shield');
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