import { Subclass } from "../../Subclass";
import { DraconicAncestry } from "./DraconicAncestry/DraconicAncestry";
import { WildMagic } from "./WildMagic/WildMagic";
import { StormSorcery } from "./StormSorcery/StormSorcery";

export class SorcererSubclass extends Subclass {
  constructor(subclass: string){
    super(subclass);
  }

  subclassDictionary = {
    "DRACONIC ANCESTRY": {
      "1": DraconicAncestry.draconicAncestry1,
      "2": DraconicAncestry.draconicResilienceHpBonus,
      "3": DraconicAncestry.draconicResilienceHpBonus,
      "4": DraconicAncestry.draconicResilienceHpBonus,
      "5": DraconicAncestry.draconicResilienceHpBonus,
      "6": DraconicAncestry.draconicAncestry6,
      "7": DraconicAncestry.draconicResilienceHpBonus,
      "8": DraconicAncestry.draconicResilienceHpBonus,
      "9": DraconicAncestry.draconicResilienceHpBonus,
      "10": DraconicAncestry.draconicResilienceHpBonus,
      "11": DraconicAncestry.draconicResilienceHpBonus,
      "12": DraconicAncestry.draconicResilienceHpBonus,
      "13": DraconicAncestry.draconicResilienceHpBonus,
      "14": DraconicAncestry.draconicAncestry14,
      "15": DraconicAncestry.draconicResilienceHpBonus,
      "16": DraconicAncestry.draconicResilienceHpBonus,
      "17": DraconicAncestry.draconicResilienceHpBonus,
      "18": DraconicAncestry.draconicAncestry18,
      "19": DraconicAncestry.draconicResilienceHpBonus,
      "20": DraconicAncestry.draconicResilienceHpBonus,
    },
    "STORM SORCERY": {
      "1": StormSorcery.stormSorcery1,
      "6": StormSorcery.stormSorcery6,
      "8": StormSorcery.upHeart,
      "10": StormSorcery.upHeart,
      "12": StormSorcery.upHeart,
      "14": StormSorcery.stormSorcery14,
      "15": StormSorcery.upFury,
      "16": StormSorcery.upBoth,
      "17": StormSorcery.upFury,
      "18": StormSorcery.stormSorcery18,
      "19": StormSorcery.upFury,
      "20": StormSorcery.upBoth,
    },
    "WILD MAGIC": {
      "1": WildMagic.wildMagic1,
      "6": WildMagic.wildMagic6,
      "14": WildMagic.wildMagic14,
      "18": WildMagic.wildMagic18,
    },
  };
}