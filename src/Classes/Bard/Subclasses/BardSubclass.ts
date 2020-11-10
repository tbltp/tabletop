import { Subclass } from "../../Subclass";
import { CollegeOfLore } from "./Lore/CollegeOfLore";
import { CollegeOfValor } from "./Valor/CollegeOfValor";

export class BardSubclass extends Subclass {

  static subclassDictionary = {
    LORE: {
      "3": CollegeOfLore.lore3,
      "6": CollegeOfLore.lore6,
      "14": CollegeOfLore.lore14,
    },
    VALOR: {
      "3": CollegeOfValor.valor3,
      "6": CollegeOfValor.valor6,
      "14": CollegeOfValor.valor14,
    },
  };
}