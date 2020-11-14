import { PlayerClass, LevelingParams } from "../PlayerClass";
import { PlayerCharacter } from "../../Base/PlayerCharacter";
import { ResourceTrait, ScalingTrait } from "../../Base/Interfaces";
import * as SpellList from "../../../Assets/SpellList.json";
import * as SpellcastingAbility from "../../../Assets/SpellcastingAbility.json";
import { DruidSubclass } from "./Subclasses/DruidSubclass";
import { SpellSlotFactory } from "../SpellSlotFactory";

export class Druid extends PlayerClass {
  constructor(
    multiclass: boolean,
    druidParams: LevelingParams,
    skillProficiencies?: string[],
    weapons?: string[],
    armor?: string[]
  ) {
    super(
      "Druid",
      [],
      [],
      [],
      ["Light", "Medium", "Shield"],
      [],
      [],
      [],
      [],
      [],
      druidParams,
      "d8",
      8,
      []
    );

    this.characterStart(multiclass, skillProficiencies, weapons, armor);

    for (let level in this.abilitiesAtLevels) {
      const func: Function = this.abilitiesAtLevels[level];
      this.abilitiesAtLevels[level] = func.bind(this);
    }
  }

  characterStart(multiclass: boolean, skillProficiencies: string[], weapons: string[], armor: string[], ){
    if(!multiclass) {  
      this.skillProficiencies = skillProficiencies;
      this.weaponProficiencies.push("Club", "Darts", "Javelin", "Mace", "Quarterstaff", "Scimitar", "Sickle", "Sling", "Spear");
      this.toolProficiencies.push("Herbalism Kit")
      this.weapons = weapons;
      this.armor = [...armor, "LEATHER"];
      this.equipmentPack = "EXPLORER";
      this.savingThrowProficiencies = ["intelligence", "wisdom"];
    }
  }
  
  terrain?: string | null = null;

  abilitiesAtLevels = {
    "1": this.level1,
    "2": this.level2,
    "3": this.level3,
    "4": this.level4,
    "5": this.level5,
    "6": this.level6,
    "7": this.level7,
    "8": this.level8,
    "9": this.level9,
    "10": this.level10,
    "11": this.level11,
    "12": this.level12,
    "13": this.level13,
    "14": this.level14,
    "15": this.level15,
    "16": this.level16,
    "17": this.level17,
    "18": this.level18,
    "19": this.level19,
    "20": this.level20,
  };

  private pushDruidFeatures(pc: PlayerCharacter, level: number) {
    this.pushClassFeatures(pc, level, "DRUID");
  }

  private handleDruidSpellSelections(
    pc: PlayerCharacter,
    params: LevelingParams
  ) {
    this.handleSpellSelections(pc, params, SpellcastingAbility["DRUID"]);
  }

  level1(pc: PlayerCharacter, params: LevelingParams): void {
    pc.addSpells(
      [...params.spellSelection, ...SpellList["Druid"][1]],
      SpellcastingAbility["DRUID"]
    );
    this.pushDruidFeatures(pc, 1);
    let druidPreparedSpells = {
      title: "Druid",
      level: this.level,
      modifier: pc.abilityScores.wisdom.modifier,
    };
    pc.preparedSpells
      ? pc.preparedSpells.push(druidPreparedSpells)
      : (pc.preparedSpells = [druidPreparedSpells]);
  }

  level2(pc: PlayerCharacter, params: LevelingParams): void {
    // druid circle
    
    // wild shape
    const wildShapeRes: ResourceTrait = {
      title: "Wild Shape",
      description: "Number of times you can Wild Shape",
      resourceMax: { value: 2 },
    };
    const wildShapeScale: ScalingTrait = {
      title: "Wild Shape",
      description:
        "Max challenge rating of beasts you can Wild Shape into (No flying or swimming speed).",
      challengeRating: 0.25,
    };
    pc.addResourceTraits(wildShapeRes);
    pc.addScalingTraits(wildShapeScale);

    this.subclass = params.archetypeSelection[0].archetype;
    DruidSubclass.subclassDictionary[this.subclass][2](pc, params);
    // terrain selection
    if (this.subclass == "LAND") {
      this.terrain = params.archetypeSelection[0].options[0];
    }

    pc.addSpells(
      [...SpellList["Druid"][2]],
      SpellcastingAbility["DRUID"]
    );

    this.pushDruidFeatures(pc, 2);
  }

  level3(pc: PlayerCharacter, params: LevelingParams): void {
    // terrain spells
    if (this.subclass == "LAND") {
      DruidSubclass.subclassDictionary[this.subclass][3];
      DruidSubclass.subclassSpells[this.subclass](pc, this.terrain, "7");
    }
  }

  level4(pc: PlayerCharacter, params: LevelingParams): void {
    this.handleDruidSpellSelections(pc, params);
    pc.improveAbilityScores(params.abilityScoreImprovement);
    // wild shape
    const wildShapeScale: ScalingTrait = pc.findScalingTraitByName(
      "Wild Shape"
    );
    wildShapeScale.challengeRating = 0.5;
    wildShapeScale.description =
      "Max challenge rating of beasts you can Wild Shape into (No flying speed).";
  }

  level5(pc: PlayerCharacter, params: LevelingParams): void {
    // terrain spells
    if (this.subclass == "LAND") {
      DruidSubclass.subclassSpells[this.subclass](pc, this.terrain, "7");
    }
  }

  level6(pc: PlayerCharacter, params: LevelingParams): void {
    // druid circle
    DruidSubclass.subclassDictionary[this.subclass][6](pc, params);
  }

  level7(pc: PlayerCharacter, params: LevelingParams): void {
    // terrain spells
    if (this.subclass == "LAND") {
      DruidSubclass.subclassSpells[this.subclass](pc, this.terrain, "7");
    }
  }

  level8(pc: PlayerCharacter, params: LevelingParams): void {
    pc.improveAbilityScores(params.abilityScoreImprovement);
    // wild shape
    const wildShapeScale: ScalingTrait = pc.findScalingTraitByName(
      "Wild Shape"
    );
    wildShapeScale.challengeRating = 1;
    wildShapeScale.description =
      "Max challenge rating of beasts you can Wild Shape into.";
  }

  level9(pc: PlayerCharacter, params: LevelingParams): void {
    // terrain spells
    if (this.subclass == "LAND") {
      DruidSubclass.subclassSpells[this.subclass](pc, this.terrain, "7");
    }
  }

  level10(pc: PlayerCharacter, params: LevelingParams): void {
    // druid circle
    DruidSubclass.subclassDictionary[this.subclass][10](pc, params);
  }

  level11(pc: PlayerCharacter, params: LevelingParams): void {
  }

  level12(pc: PlayerCharacter, params: LevelingParams): void {
    pc.improveAbilityScores(params.abilityScoreImprovement);
  }

  level13(pc: PlayerCharacter, params: LevelingParams): void {
  }

  level14(pc: PlayerCharacter, params: LevelingParams): void {
    // druid circle
    DruidSubclass.subclassDictionary[this.subclass][14](pc, params);
  }

  level15(pc: PlayerCharacter, params: LevelingParams): void {
  }

  level16(pc: PlayerCharacter, params: LevelingParams): void {
    pc.improveAbilityScores(params.abilityScoreImprovement);
  }

  level17(pc: PlayerCharacter, params: LevelingParams): void {
  }

  level18(pc: PlayerCharacter, params: LevelingParams): void {
  }

  level19(pc: PlayerCharacter, params: LevelingParams): void {
    pc.improveAbilityScores(params.abilityScoreImprovement);
  }

  level20(pc: PlayerCharacter, params: LevelingParams): void {
    // archdruid
    pc.findResourceTraitByName("Wild Shape").resourceMax.value = Infinity;
    this.pushDruidFeatures(pc, 20);
  }
}
