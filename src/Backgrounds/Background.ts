import { PlayerCharacter } from "../Base/PlayerCharacter";
import { Trait } from "../Base/Interfaces";
import * as Languages from "../../Assets/Languages.json";
import * as Gear from "../../Assets/Gear.json";
import * as ToolKits from "../../Assets/Tools.json";

export abstract class Background {
  constructor(
    name: string,
    skillProficiencies: string[],
    languages: string[],
    toolProficiencies: string[],
    equipment: string[],
    toolKits: string[],
    gp: number,
    features: Trait[]
  ) {
    this.name = name;
    this.skillProficiencies = skillProficiencies;
    this.languages = languages;
    this.toolProficiencies = toolProficiencies;
    this.equipment = equipment;
    this.toolKits = toolKits;
    this.gp = gp;
    this.features = features;
  }

  name: string;
  skillProficiencies: string[];
  languages: string[];
  toolProficiencies: string[];
  equipment: string[];
  toolKits: string[];
  gp: number;
  features: Trait[];

  apply(pc: PlayerCharacter): void {
    for (const skill of this.skillProficiencies) {
      pc.skills[skill].proficient = true;
    }
    for (const language of this.languages) {
      pc.traits.languages.push(Languages[language]);
    }
    for (const toolProficiency of this.toolProficiencies) {
      pc.traits.toolProficiencies.add(toolProficiency);
    }
    for (const item of this.equipment) {
      pc.inventory.gear.push(Gear[item]);
    }
    for (const tool of this.toolKits) {
      pc.inventory.toolKits.push(ToolKits[tool]);
    }
    for (const trait of this.features) {
      pc.traits.features.push(trait);
    }
    pc.inventory.gp += this.gp;
  }
}

export class DSBackground extends Background {
  constructor() {
    super("", [], [], [], [], [], -1, []);
  }
}

export interface BackgroundParams {
  languages?: string[];
  holySymbol?: string;
  gamingSet?: string;
  toolProficiencies?: string[];
  instrument?: string;
  toolKit?: string;
}
