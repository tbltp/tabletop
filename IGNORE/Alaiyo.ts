import { PlayerCharacter } from '../src/Base/PlayerCharacter';
import { Tiefling } from '../src/Races/Tiefling';
import { Sage } from '../src/Backgrounds/Background';
import { Bard } from '../src/Classes/Bard';
import { Ranger } from '../src/Classes/Ranger';

import {Jsonify} from './Jsonify';

let pc: PlayerCharacter = new PlayerCharacter(14, 17, 10, 11, 15, 18);
const race = new Tiefling();
const background = new Sage(["Gnomish", "Elvish"]);
//const pclass;
//race.apply(pc)
//background.apply(pc)
// pclass.apply(pc)

//Jsonify.dumpToJSON(pc, "Bunsen");
