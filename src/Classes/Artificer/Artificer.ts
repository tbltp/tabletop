import { PlayerClass, LevelingParams, ClassCreationParams } from "../PlayerClass";
import { ResourceTrait, Trait, ScalingTrait } from "../../Base/Interfaces";
import * as ArtificerClassTraits from "./Artificer.json"
import * as Infusions from "./Infusions.json"
import * as SpellList from "../../../Assets/SpellList.json"
import { PlayerCharacter } from "../../Base/PlayerCharacter";
import { ArtificerSubclass } from "./Subclasses/ArtificerSubclass";

export class Artificer extends PlayerClass {
  constructor(params: ClassCreationParams) {
    super(
      "Artificer",
      [],
      [],
      [],
      ["Light", "Medium", "Shield"],
      ["Thieves' tools", "Tinker's tools"],
      [],
      [],
      [],
      [],
      "d8",
      8,
      []
    );

    this.characterStart(params.multiclass, params.skillProficiencies, params.toolProficiencies, params.weapons, params.armor);

    for (let level in this.abilitiesAtLevels) {
      const func: Function = this.abilitiesAtLevels[level];
      this.abilitiesAtLevels[level] = func.bind(this);
    }
  }

  characterStart(multiclass: boolean, skillProficiencies: string[], toolProficiencies: string[], weapons: string[], armor: string[]){
    if(!multiclass){
      this.skillProficiencies.push(...skillProficiencies)
      this.toolProficiencies.push(...toolProficiencies)
      this.weapons.push(...weapons, "CROSSBOW, LIGHT");
      this.armor.push(...armor);
      this.toolKits.push("THIEVES' TOOLS");
      this.equipmentPack = "DUNGEONEER";
      this.savingThrowProficiencies = ["constitution", "intelligence"];
    }
  }

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

  private pushArtificerFeatures(pc: PlayerCharacter, level: number) {
    this.pushClassFeatures(pc, level, ArtificerClassTraits);
  }
  private handleInfusionSelections(
    pc: PlayerCharacter,
    params: ArtificerLevelingParams
  ) {
    
    if(params.infusions) {
      this.processInfusions(params.infusions.add, pc);
      
      if (params.infusions.remove) {
        this.removeInfusion(params.infusions.remove, pc);
      }
    }
  }

  level1(pc: PlayerCharacter, params: ArtificerLevelingParams): void {
    this.pushArtificerFeatures(pc, 1);
    pc.pcHelper.addSpells([...SpellList["Artificer"]["1"], ...params.spellSelections.add], "intelligence");
    this.addSpellcasting(pc, "ARTIFICER");
  }

  level2(pc: PlayerCharacter, params: ArtificerLevelingParams): void {
    this.pushArtificerFeatures(pc, 2);
    this.handleInfusionSelections(pc, params);
    pc.pcHelper.addResourceTraits({title: "Infused Items", description: "Number of items you can infuse with magic.", resourceMax: {value: 2}});
  }

  level3(pc: PlayerCharacter, params: ArtificerLevelingParams): void {
    this.subclass = new ArtificerSubclass(params.subclassParams);
    this.subclassDriver(pc, "3", params);
  }

  level4(pc: PlayerCharacter, params: ArtificerLevelingParams): void {
  }

  level5(pc: PlayerCharacter, params: ArtificerLevelingParams): void {
    this.subclassDriver(pc,"5",params);
    pc.pcHelper.addSpells(SpellList["Artificer"]["2"], "intelligence");
  }

  level6(pc: PlayerCharacter, params: ArtificerLevelingParams): void {
    this.subclassDriver(pc, "6", params);
    this.handleInfusionSelections(pc, params);
    pc.pcHelper.findResourceTraitByName("Infused Items").resourceMax.value++;
  }

  level7(pc: PlayerCharacter, params: ArtificerLevelingParams): void {
    this.pushArtificerFeatures(pc, 7);
  }

  level8(pc: PlayerCharacter, params: ArtificerLevelingParams): void {
    this.pushArtificerFeatures(pc, 8);
  }

  level9(pc: PlayerCharacter, params: ArtificerLevelingParams): void {
    this.subclassDriver(pc, "9", params);
    pc.pcHelper.addSpells(SpellList["Artificer"]["3"], "intelligence");
  }

  level10(pc: PlayerCharacter, params: ArtificerLevelingParams): void {
    this.handleInfusionSelections(pc, params);
    this.pushArtificerFeatures(pc, 10);
    pc.pcHelper.findResourceTraitByName("Infused Items").resourceMax.value++;
    pc.pcHelper.addSpells(params.spellSelections.add, "intelligence")
  }

  level11(pc: PlayerCharacter, params: ArtificerLevelingParams): void {
    this.pushArtificerFeatures(pc, 11);
  }

  level12(pc: PlayerCharacter, params: ArtificerLevelingParams): void {
  }

  level13(pc: PlayerCharacter, params: ArtificerLevelingParams): void {
    pc.pcHelper.addSpells(SpellList["Artificer"]["4"], "intelligence");
    this.subclassDriver(pc, "13", params);
  }

  level14(pc: PlayerCharacter, params: ArtificerLevelingParams): void {
    this.handleInfusionSelections(pc, params);
    pc.pcHelper.findResourceTraitByName("Infused Items").resourceMax.value++;
    this.pushArtificerFeatures(pc, 14);
    pc.pcHelper.addSpells(params.spellSelections.add, "intelligence")
  }

  level15(pc: PlayerCharacter, params: ArtificerLevelingParams): void {
    this.subclassDriver(pc,"15",params);
  }

  level16(pc: PlayerCharacter, params: ArtificerLevelingParams): void {
  }

  level17(pc: PlayerCharacter, params: ArtificerLevelingParams): void {
    pc.pcHelper.addSpells(SpellList["Artificer"]["5"], "intelligence");
    this.subclassDriver(pc, "17", params);
  }

  level18(pc: PlayerCharacter, params: ArtificerLevelingParams): void {
    this.pushArtificerFeatures(pc, 18);
    pc.pcHelper.findResourceTraitByName("Infused Items").resourceMax.value++;
  }

  level19(pc: PlayerCharacter, params: ArtificerLevelingParams): void {
  }

  level20(pc: PlayerCharacter, params: ArtificerLevelingParams): void {
    this.pushArtificerFeatures(pc, 20);
  }

  private processInfusions(infusions: string[], pc: PlayerCharacter){
    const infs: Trait[] = infusions.map((inf) => Infusions[inf]);
    infs.forEach((inf) => {
    pc.pcHelper.addFeatures(inf);
    });
  }
  private removeInfusion(infusion: string, pc: PlayerCharacter): void {
    pc.pcHelper.removeFeatures(infusion);
  }
}




export interface ArtificerLevelingParams extends LevelingParams {
  infusions?: {
    add: string[];
    remove?: string;
  };
}

export class DSArtificer extends Artificer {
  constructor(){
    super({multiclass: true});
  }
}
