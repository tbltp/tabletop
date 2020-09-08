import { PlayerClass, levelingParams } from './PlayerClass';
import { PlayerCharacter } from '../Base/PlayerCharacter';
import {ISpell, Spell} from '../Base/Interfaces';
import * as ClassTraits from '../../Assets/ClassTraits.json';
import * as Spells from '../../Assets/Spells.json';

export class Druid extends PlayerClass {


    abilitiesAtLevels = {};
    features = [];
}