import * as DraconicAncestry from "../../../Assets/DraconicBloodline.json";
import * as languages from "../../../Assets/Languages.json";

import { Race, RaceParams } from "../Race";

import { PlayerCharacter } from "../../Base/PlayerCharacter";
import { ScalingTrait } from "../../Base/Interfaces";

export class Dragonborn extends Race {
  constructor(params: RaceParams) {
    super(
      `Dragonborn - ${params.draconicAncestry}`,
      "80 years", // Average Lifespan
      30, // Speed (Movement)
      "Medium", // Size
      [languages["Common"], languages["Draconic"]], // Languages
      [], // Racial Traits
      [], // Weapon Proficiencies
      [], // Armor Proficiencies
      [] // Tool Proficiences
    );

    this.draconicAncestry = params.draconicAncestry ?  DraconicAncestry[params.draconicAncestry] : {"Dragon": "", "Damage Type": "", "Breath Weapon": ""};
    this.traits.push(
      {
        title: "Draconic Ancestry",
        description: `You have draconic ancestry. Choose one type of dragon from the Draconic Ancestry table. Your breath weapon and damage resistance are determined by the dragon type, as shown in the table - ${params.draconicAncestry}`,
      },
      {
        title: "Breath Weapon",
        description: `You can use your action to exhale destructive energy. Your draconic ancestry determines the size, shape, and damage type of the exhalation. When you use your breath weapon, each creature in the area of the exhalation must make a saving throw, the type of which is determined by your draconic ancestry. The DC for this saving throw equals 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 damage on a failed save, and half as much damage on a successful one. [The damage increases to 3d6 at 6th level, 4d6 at 11th level, and 5d6 at 16th level. After you use your breath weapon, you can't use it again until you complete a short or long rest - ${this.draconicAncestry["Breath Weapon"]}, ${this.draconicAncestry["Damage Type"]} Damage.`,
      },
      {
        title: "Damage Resistance",
        description: `You have resistance to the damage type associated with your draconic ancestry - ${this.draconicAncestry["Damage Type"]}`,
      }
    );
  }

  abilitiesAtLevels = {
    "1": this.level1,
    "6": this.level6,
    "11": this.level11,
    "16": this.level16,
  };

  level1(pc: PlayerCharacter) {
    pc.pcHelper.addEffectsToFeature("Breath Weapon", {scaling: {dice: "2d6"}})
  }

  level6(pc: PlayerCharacter) {
    pc.pcHelper.findFeatureTraitByName("Breath Weapon Damage").scaling.dice = "3d6"
  }

  level11(pc: PlayerCharacter) {
    pc.pcHelper.findFeatureTraitByName("Breath Weapon Damage").scaling.dice = "4d6"
  }

  level16(pc: PlayerCharacter) {
    pc.pcHelper.findFeatureTraitByName("Breath Weapon Damage").scaling.dice = "5d6"
  }

  draconicAncestry: {};

  abilityIncrease(pc: PlayerCharacter): void {
    pc.abilityScores.strength.update(2);
    pc.abilityScores.charisma.update(1);
  }

  proficiencies(pc: PlayerCharacter): void {
    return;
  }
}

export class DSDragonborn extends Dragonborn {
  constructor(params: RaceParams){
    super(params);
  }
}
