import { Feat } from './Feat';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import * as Feats from '../Assets/Feats.json';
import * as Languages from '../Assets/Languages.json';
import * as Spells from '../Assets/Spells.json';
import { ResourceTrait, Spell, Trait } from '../Base/Interfaces';

export class InspiringLeader extends Feat {

    constructor() {
        super();
        this.trait = Feats['INSPIRING LEADER'];
    }

    public apply(pc: PlayerCharacter) {

        if(!this.abilityPrereqCheck(pc, 'charisma', 13)) {
            throw Error('requirement not met: charisma minimum score of 13')
        }
        pc.traits.features.push(this.trait);
    }
}

export class KeenMind extends Feat {

    constructor() {
        super();
        this.trait = Feats['KEEN MIND'];
    }
    
    public apply(pc: PlayerCharacter) {
        
        pc.abilityScores['intelligence'].update(1);
        pc.traits.features.push(this.trait);
    }
}

export class LightlyArmored extends Feat {

    constructor(ability: string) {
        super();
        this.trait = Feats['LIGHTLY ARMORED'];
        this.ability = ability;
    }

    private ability: string;

    public apply(pc: PlayerCharacter) {
       
        pc.abilityScores[this.ability].update(1);
        pc.traits.armorProficiencies.push('light');
        this.trait.description += `\n(${this.ability})`
        pc.traits.features.push(this.trait);
    }
}

export class Linguist extends Feat {

    constructor (languageChoices: string[]) {
        super();
        this.trait = Feats['LINGUIST'];
        this.languageChoices = [];
        for(let lang of languageChoices) {
            this.languageChoices.push(Languages[lang])
        } 
    }

    private languageChoices: Trait[];

    public apply(pc: PlayerCharacter) {
 
        pc.abilityScores['intelligence'].update(1);
        pc.traits.languages.push(...this.languageChoices);
        this.trait.description += `\n(${this.languageChoices[0].title}, ${this.languageChoices[1].title}, ${this.languageChoices[2].title})`
        pc.traits.features.push(this.trait);
    }
}

export class Lucky extends Feat {

    constructor() {
        super();
        this.trait = Feats['LUCKY'];
        this.luckyResource = {
            ...this.trait,
            resourceMax: 3
        };
    }

    private luckyResource: ResourceTrait;

    public apply(pc: PlayerCharacter) {
        
        pc.traits.resources.push(this.luckyResource);
        pc.traits.features.push(this.trait);
    }
}

export class MageSlayer extends Feat {

    constructor() {
        super();
        this.trait = Feats['MAGE SLAYER'];
    }

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

        if(!this.armorPrereqCheck(pc, 'medium')) {
            throw Error('requirement not met: medium armor proficiency');
        }
        pc.traits.features.push(this.trait);
    }
}

export class Mobile extends Feat {
    
    constructor() {
        super();
        this.trait = Feats['MOBILE'];
    }

    public apply(pc: PlayerCharacter) {
        
        pc.speed += 10;
        pc.traits.features.push(this.trait);
    }
}

export class ModeratelyArmored extends Feat {

    constructor(ability: string) {
        super();
        this.trait = Feats['MODERATELY ARMORED'];
        this.ability = ability;
    }

    private ability: string;

    public apply(pc: PlayerCharacter) {

        if(!this.armorPrereqCheck(pc, 'light')) {
            throw Error('requirement not met: light armor proficiency');
        }

        pc.abilityScores[this.ability].update(1);
        pc.traits.armorProficiencies.push('medium', 'shield');
        this.trait.description += `\n(${this.ability})`
        pc.traits.features.push(this.trait);
    }
}

export class MountedCombatant extends Feat {

    constructor() {
        super();
        this.trait = Feats['MOUNTED COMBATANT'];
    }

    public apply(pc: PlayerCharacter) {
        
        pc.traits.features.push(this.trait);
    }
}

export class Observant extends Feat {

    constructor(ability: string) {
        super();
        this.trait = Feats['OBSERVANT'];
        this.ability = ability;
    }

    private ability: string;

    public apply(pc: PlayerCharacter) {
       
        pc.abilityScores[this.ability].update(1);
        pc.skills['Perception'].modifier += 5;
        pc.skills['Investigation'].modifier += 5;
        this.trait.description += `\n(${this.ability})`
        pc.traits.features.push(this.trait);
    }
}