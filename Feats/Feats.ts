import { PlayerCharacter } from '../Base/PlayerCharacter';
import {Trait} from '../Base/Interfaces';

export abstract class Feat {
    
    trait: Trait;  // Description of Feat inside of Trait list inside PC

    abstract apply(pc: PlayerCharacter);

    abilityPrereqCheck(pc: PlayerCharacter, skill: string, target: number){
        if (pc.abilityScores[skill].score < target) { throw Error("Haha Fuck U Get Rekt Scrub"); }
    }

    armorPrereqCheck(pc: PlayerCharacter, skill: string){
        if(pc.traits.armorProficiencies.indexOf(skill) === -1) { throw Error("Haha Fuck U Get Rekt Scrub"); }
    }

    spellcasterPrereqCheck(pc: PlayerCharacter) {
        if(!pc.isSpellcaster()) { throw Error("Haha Fuck U Get Rekt Scrub"); }
    }
}