import { PlayerCharacter } from '../src/Base/PlayerCharacter';
import { HalfElf } from '../src/Races/HalfElf';
import { Druid } from '../src/Classes/Druid';
import { Criminal } from '../src/Backgrounds/Background';
import { Jsonify } from './Jsonify';

let pc: PlayerCharacter = new PlayerCharacter(8, 14, 12, 10, 15, 13);

const prace = new HalfElf("Elvish", ["wisdom", "charisma"], ["Persuasion", "Investigation"]);
const pclass = new Druid(["Insight", "Perception"], ["SCIMITAR"], ["SHIELD"], {isNoInput: false, spellSelection: ["POISON SPRAY", "PRODUCE FLAME"]});
const pbackground = new Criminal("Playing Card Set");

prace.apply(pc);
pclass.apply(pc);
pbackground.apply(pc);

Jsonify.dumpToJSON(pc, "Maple");