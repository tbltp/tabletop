import { PlayerClass, LevelingParams } from "../PlayerClass";
import { PlayerCharacter } from "../../Base/PlayerCharacter";
import {
  AttachedFeature,
  ResourceTrait,
  Spell,
  Trait,
} from "../../Base/Interfaces";
import * as SpellcastingAbility from "../../../Assets/SpellcastingAbility.json";
import * as Spells from "../../../Assets/Spells.json";
import * as PactBoon from "./PactBoon.json";
import * as WarlockClassTraits from "./Warlock.json";
import * as Invocations from "./EldritchInvocations.json";
import { WarlockSubclass } from "./Subclasses/WarlockSubclass";

export class Warlock extends PlayerClass {
  constructor(
    multiclass: boolean,
    firstLevelParams: WarlockLevelingParams,
    skillProficiencies?: string[],
    weapons?: string[],
    equipmentPack?: string,
    arcaneFocus?: string
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
      firstLevelParams,
      "d8",
      8,
      []
    );

    this.characterStart(
      multiclass,
      skillProficiencies,
      weapons,
      equipmentPack,
      arcaneFocus
    );

    for (let level in this.abilitiesAtLevels) {
      const func: Function = this.abilitiesAtLevels[level];
      this.abilitiesAtLevels[level] = func.bind(this);
    }
  }

  characterStart(
    multiclass: boolean,
    skillProficiencies: string[],
    weapons: string[],
    equipmentPack: string,
    arcaneFocus: string
  ) {
    if (!multiclass) {
      this.skillProficiencies = skillProficiencies;
      this.weapons = [...weapons, "DAGGER", "DAGGER"];
      this.armor = ["LEATHER"];
      this.equipmentPack = equipmentPack;
      this.equipment = [arcaneFocus]; //POUCH is also a focus
      this.savingThrowProficiencies = ["wisdom", "charisma"];
    }
  }

  /** TODO
   * Handle Prequisites for each invocation
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
    this.pushClassFeatures(pc, level, WarlockClassTraits);
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
        const chain: AttachedFeature = {
          title: "Pact of the Chain (Ritual)",
          description:
            "Your otherworldly patron bestows upon you the Find Familiar spell.",
        };
        pc.pcHelper.addFeatures(PactBoon["CHAIN"]);
        pc.pcHelper.addSpells(["FIND FAMILIAR"], "charisma", chain);
        return;
      case "BLADE":
        pc.pcHelper.addFeatures(PactBoon["BLADE"]);
        return;
      case "TOME":
        const tome: AttachedFeature = {
          title: "Book of Shadows",
          description:
            "This grimoire from your patron allows you to learn three cantrips from any class's spell list.",
        };
        pc.pcHelper.addFeatures({
          ...PactBoon["TOME"],
          choices: pactBoon.options,
        });
        pc.pcHelper.addSpells(pactBoon.options, "charisma", tome);
        return;
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
    pc.pcHelper.addResourceTraits(pactMagic);
    this.subclass = new WarlockSubclass(params.subclassSelection);
    this.subclassDriver(pc, "1", params);

    this.addSpellcasting(pc, "WARLOCK");
  }

  level2(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    this.handleWarlockSpellSelections(pc, params);
    pc.pcHelper.findResourceTraitByName("Pact Magic").resourceMax.value++;
    this.handleInvocationSelections(pc, params);
  }

  level3(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    this.handleWarlockSpellSelections(pc, params);
    let pactMagicSlots: PactMagicSlots = pc.pcHelper.findResourceTraitByName(
      "Pact Magic"
    ) as PactMagicSlots;
    pactMagicSlots.level++;
    this.pactBoonHandler(pc, params.pactBoon);
    this.handleInvocationSelections(pc, params);
  }

  level4(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    this.handleWarlockSpellSelections(pc, params);
    pc.pcHelper.improveAbilityScores(params.abilityScoreImprovement);
  }

  level5(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    this.handleWarlockSpellSelections(pc, params);
    let pactMagicSlots: PactMagicSlots = pc.pcHelper.findResourceTraitByName(
      "Pact Magic"
    ) as PactMagicSlots;
    pactMagicSlots.level++;
    this.handleInvocationSelections(pc, params);
  }

  level6(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    this.handleWarlockSpellSelections(pc, params);
    this.subclassDriver(pc, "6", params);
    this.handleInvocationSelections(pc, params);
  }

  level7(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    this.handleWarlockSpellSelections(pc, params);
    let pactMagicSlots: PactMagicSlots = pc.pcHelper.findResourceTraitByName(
      "Pact Magic"
    ) as PactMagicSlots;
    pactMagicSlots.level++;
    this.handleInvocationSelections(pc, params);
  }

  level8(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    this.handleWarlockSpellSelections(pc, params);
    pc.pcHelper.improveAbilityScores(params.abilityScoreImprovement);
    this.handleInvocationSelections(pc, params);
  }

  level9(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    this.handleWarlockSpellSelections(pc, params);
    let pactMagicSlots: PactMagicSlots = pc.pcHelper.findResourceTraitByName(
      "Pact Magic"
    ) as PactMagicSlots;
    pactMagicSlots.level++;
    this.handleInvocationSelections(pc, params);
  }

  level10(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    this.handleWarlockSpellSelections(pc, params);
    this.subclassDriver(pc, "10", params);
    this.handleInvocationSelections(pc, params);
  }

  level11(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    this.handleWarlockSpellSelections(pc, params);
    pc.pcHelper.findResourceTraitByName("Pact Magic").resourceMax.value++;
    PlayerClass.pushCustomizedClassFeature(
      pc,
      11,
      WarlockClassTraits,
      "MYSTIC ARCANUM",
      [params.mysticArcanum]
    );
    this.handleInvocationSelections(pc, params);
  }

  level12(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    pc.pcHelper.improveAbilityScores(params.abilityScoreImprovement);
    this.handleInvocationSelections(pc, params);
  }

  level13(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    this.handleWarlockSpellSelections(pc, params);
    pc.pcHelper
      .findFeatureTraitByName("MYSTIC ARCANUM")
      .choices.push(params.mysticArcanum);
      this.handleInvocationSelections(pc, params);
  }

  level14(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    this.subclassDriver(pc, "14", params);
    this.handleInvocationSelections(pc, params);
  }

  level15(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    this.handleWarlockSpellSelections(pc, params);
    pc.pcHelper
      .findFeatureTraitByName("MYSTIC ARCANUM")
      .choices.push(params.mysticArcanum);
    this.handleInvocationSelections(pc, params);
  }

  level16(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    pc.pcHelper.improveAbilityScores(params.abilityScoreImprovement);
    this.handleInvocationSelections(pc, params);
  }

  level17(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    this.handleWarlockSpellSelections(pc, params);
    pc.pcHelper.findResourceTraitByName("Pact Magic").resourceMax.value++;
    pc.pcHelper
      .findFeatureTraitByName("MYSTIC ARCANUM")
      .choices.push(params.mysticArcanum);
    this.handleInvocationSelections(pc, params);
  }

  level18(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    this.handleInvocationSelections(pc, params);
  }

  level19(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    pc.pcHelper.improveAbilityScores(params.abilityScoreImprovement);
    this.handleWarlockSpellSelections(pc, params);
    this.handleInvocationSelections(pc, params);
  }

  level20(pc: PlayerCharacter, params: WarlockLevelingParams): void {
    this.pushWarlockFeatures(pc, 20);
    this.handleInvocationSelections(pc, params);
  }

  private handleInvocationSelections(
    pc: PlayerCharacter,
    params: WarlockLevelingParams
  ) {
    
    if(params.invocations) {
      this.processInvocations(params.invocations.add, pc);
      
      if (params.invocations.remove) {
        this.removeInvocation(params.invocations.remove, pc);
      }
    }
  }

  private processInvocations(invocations: string[], pc: PlayerCharacter): void {
    const invs: Trait[] = invocations.map((inv) => Invocations[inv]);
    invs.forEach((inv) => {
      //prequisite check goes here
      if(inv.spellAdded) {
        this.addInvocationSpell(inv, pc);
      }
      if (inv.title == "Beguiling Influence") {
        this.applyBeguilingInfluence(inv, pc);
      } else {
        pc.pcHelper.addFeatures(inv);
      }
    });
  }

  private removeInvocation(invocation: string, pc: PlayerCharacter): void {
    const oldInv: Trait = pc.pcHelper.findFeatureTraitByName(invocation);
    if (oldInv.title == "Beguiling Influence") {
      this.removeBeguilingInfluence(oldInv, pc);
    }
    if (oldInv.spellAdded) {
      pc.pcHelper.removeSpells(oldInv.spellAdded);
    }
    pc.pcHelper.removeFeatures(invocation);
  }

  private addInvocationSpell(inv: Trait, pc: PlayerCharacter): void {
    if (inv.spellAdded) {
      pc.pcHelper.addSpells([inv.spellAdded], "charisma", inv);
    }
  }

  private applyBeguilingInfluence(inv: Trait, pc: PlayerCharacter): void {
    //determine proficiencies
    if (!pc.skills["deception"].proficient) {
      pc.skills["deception"].proficient = true;
      inv.choices.push("deception");
    }
    if (!pc.skills["persuasion"].proficient) {
      pc.skills["persuasion"].proficient = true;
      inv.choices.push("persuasion");
    }
    pc.pcHelper.addFeatures(inv);
  }

  private removeBeguilingInfluence(inv: Trait, pc: PlayerCharacter): void {
    //remove proficiencies
    if (inv.choices.length > 0) {
      inv.choices.forEach((skill) => {
        pc.skills[skill].proficient = false;
      });
    }
  }
}

export class DSWarlock extends Warlock {
  constructor() {
    super(true, { isNoInput: true });
  }
}

interface PactMagicSlots extends ResourceTrait {
  level?: number;
}

export interface WarlockLevelingParams extends LevelingParams {
  pactBoon?: {
    boon: string;
    options?: [];
  };
  mysticArcanum?: string;
  invocations?: {
    add: string[];
    remove?: string;
  };
}
