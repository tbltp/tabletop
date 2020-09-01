import { Feat } from './Feat';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import * as Feats from '../../Assets/Feats.json';
import * as Languages from '../../Assets/Languages.json';
import * as Spells from '../../Assets/Spells.json';
import * as SpellcastingAbility from '../../Assets/SpellcastingAbility.json';
import { ResourceTrait, ISpell, Spell, Trait } from '../Base/Interfaces';

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