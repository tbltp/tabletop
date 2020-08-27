import { Feat } from './Feats';
import * as Feats from '../Assets/Feats.json';
import { PlayerCharacter } from '../Base/PlayerCharacter';

export class PolearmMaster extends Feat {
    constructor(){
        super();
    }

    trait = Feats["POLEARM MASTER"];

    apply(pc: PlayerCharacter){
        pc.traits.features.push(this.trait);
    }
}

export class Resilient extends Feat {
    constructor(abilityScore: string){
        super();
        this.abilityScore = abilityScore;
    }

    abilityScore: string;
    trait = Feats["RESILIENT"];

    apply(pc: PlayerCharacter){
        pc.abilityScores[this.abilityScore].update(1);
        pc.abilityScores[this.abilityScore].savingThrowProficiency = true;
        pc.traits.features.push(this.trait);
    }
}