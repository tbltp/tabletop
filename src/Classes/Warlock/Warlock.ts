import { PlayerClass, LevelingParams } from "../PlayerClass";
import { PlayerCharacter } from "../../Base/PlayerCharacter";
import { ResourceTrait } from "../../Base/Interfaces";
import * as SpellcastingAbility from "../../../Assets/SpellcastingAbility.json";
import * as PactBoon from "../../../Assets/PactBoon.json";
import { WarlockSubclass } from "./Subclasses/WarlockSubclass";

export class Warlock extends PlayerClass {
  constructor(
    multiclass: boolean,
    params: WarlockLevelingParams,
    skillProficiencies?: string[],
    weapons?: string[],
    equipmentPack?: string
  ) {
    super(
      "Warlock",
      [],
      [],
      ["Simple"],
      ["Light"],
      [],
      [],
      [],
      [],
      [],
      params,
      "d8",
      8,
      []
    );

    this.characterStart(multiclass, skillProficiencies, weapons, equipmentPack);

    for (let level in this.abilitiesAtLevels) {
      const func: Function = this.abilitiesAtLevels[level];
      this.abilitiesAtLevels[level] = func.bind(this);
    }
  }

  characterStart(multiclass: boolean, skillProficiencies: string[], weapons: string[], equipmentPack: string){
    if(!multiclass){
      this.skillProficiencies = skillProficiencies;
      this.weapons = [...weapons, "DAGGER", "DAGGER"];
      this.armor = ["LEATHER"];
      this.equipmentPack = equipmentPack;
      this.savingThrowProficiencies = ["wisdom", "charisma"];
    }
  }

  /** TODO
   * ARCANE FOCUS / COMPONENT POUCH
   * ELDRITCH INVOCATIONS JSON
   * ELDRITCH INVOCATIONS FUNCTIONS FOR TRANSFORMATIONS
   * ELDRITCH INVOCATIONS REPLACEMENTS
   */


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

  pushWarlockFeatures(pc: PlayerCharacter, level: number) {
    this.pushClassFeatures(pc, level, "WARLOCK");
  }

  private handleWarlockSpellSelections(
    pc: PlayerCharacter,
    params: WarlockLevelingParams
  ): void {
    this.handleSpellSelections(pc, params, SpellcastingAbility["WARLOCK"]);
  }

  private pactBoonHandler(
    pc: PlayerCharacter,
    pactBoon: WarlockLevelingParams["pactBoon"]
  ) {
    switch (pactBoon.boon) {
      case "CHAIN":
        pc.addFeatures(PactBoon["CHAIN"]);
        pc.addSpells(["FIND FAMILIAR"], "charisma");
      case "BLADE":
        pc.addFeatures(PactBoon["BLADE"]);
      case "TOME":
        pc.addFeatures({ ...PactBoon["TOME"], choices: pactBoon.options });
        pc.addSpells(pactBoon.options, "charisma");
    }
  }

  level1(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    this.handleWarlockSpellSelections(pc, params);
    const pactMagic: PactMagicSlots = {
      title: "Pact Magic",
      description: "Number of spell slots you have for Warlock spells.",
      resourceMax: { value: 1 },
      level: 1,
    };
    pc.addResourceTraits(pactMagic);
    this.subclass = params.archetypeSelection[0].archetype;
    WarlockSubclass.subclassDictionary[this.subclass]["1"](pc, params);
  }

  level2(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    this.handleWarlockSpellSelections(pc, params);
    pc.findResourceTraitByName("Pact Magic").resourceMax.value++;
    // ELDRITCH INVOCATIONS HERE
  }

  level3(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    this.handleWarlockSpellSelections(pc, params);
    let pactMagicSlots: PactMagicSlots = pc.findResourceTraitByName(
      "Pact Magic"
    ) as PactMagicSlots;
    pactMagicSlots.level++;
    this.pactBoonHandler(pc, params.pactBoon);
  }

  level4(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    this.handleWarlockSpellSelections(pc, params);
    pc.improveAbilityScores(params.abilityScoreImprovement);
  }

  level5(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    this.handleWarlockSpellSelections(pc, params);
    let pactMagicSlots: PactMagicSlots = pc.findResourceTraitByName(
      "Pact Magic"
    ) as PactMagicSlots;
    pactMagicSlots.level++;
    // ELDRITCH INVOCATIONS HERE
  }

  level6(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    this.handleWarlockSpellSelections(pc, params);
    WarlockSubclass.subclassDictionary[this.subclass]["6"](pc, params);
  }

  level7(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    this.handleWarlockSpellSelections(pc, params);
    let pactMagicSlots: PactMagicSlots = pc.findResourceTraitByName(
      "Pact Magic"
    ) as PactMagicSlots;
    pactMagicSlots.level++;
    // ELDRITCH INVOCATIONS HERE
  }

  level8(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    this.handleWarlockSpellSelections(pc, params);
    pc.improveAbilityScores(params.abilityScoreImprovement);
  }

  level9(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    this.handleWarlockSpellSelections(pc, params);
    let pactMagicSlots: PactMagicSlots = pc.findResourceTraitByName(
      "Pact Magic"
    ) as PactMagicSlots;
    pactMagicSlots.level++;
    // ELDRITCH INVOCATIONS HERE
  }

  level10(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    this.handleWarlockSpellSelections(pc, params);
    WarlockSubclass.subclassDictionary[this.subclass]["10"](pc, params);
  }

  level11(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    this.handleWarlockSpellSelections(pc, params);
    pc.findResourceTraitByName("Pact Magic").resourceMax.value++;
    PlayerClass.pushCustomizedClassFeature(
      pc,
      11,
      "WARLOCK",
      "MYSTIC ARCANUM",
      [params.mysticArcanum]
    );
  }

  level12(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    pc.improveAbilityScores(params.abilityScoreImprovement);
    // ELDRITCH INVOCATIONS HERE
  }

  level13(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    this.handleWarlockSpellSelections(pc, params);
    pc.findFeatureTraitByName("MYSTIC ARCANUM").choices.push(
      params.mysticArcanum
    );
  }

  level14(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    WarlockSubclass.subclassDictionary[this.subclass]["14"](pc, params);
  }

  level15(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    this.handleWarlockSpellSelections(pc, params);
    pc.findFeatureTraitByName("MYSTIC ARCANUM").choices.push(
      params.mysticArcanum
    );
    // ELDRITCH INVOCATIONS HERE
  }

  level16(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    pc.improveAbilityScores(params.abilityScoreImprovement);
  }

  level17(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    this.handleWarlockSpellSelections(pc, params);
    pc.findResourceTraitByName("Pact Magic").resourceMax.value++;
    pc.findFeatureTraitByName("MYSTIC ARCANUM").choices.push(
      params.mysticArcanum
    );
  }

  level18(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    // ELDRITCH INVOCATIONS HERE
  }

  level19(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    pc.improveAbilityScores(params.abilityScoreImprovement);
    this.handleWarlockSpellSelections(pc, params);
  }

  level20(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    this.pushWarlockFeatures(pc, 20);
  }
}

interface PactMagicSlots extends ResourceTrait {
  level?: number;
}

interface WarlockLevelingParams extends LevelingParams {
  pactBoon: {
    boon: string;
    options?: [];
  };
  mysticArcanum: string;
}
