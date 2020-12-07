import { Subclass } from "../../Subclass";
import { CollegeOfGlamour } from "./Glamour/CollegeOfGlamour";
import { CollegeOfLore } from "./Lore/CollegeOfLore";
import { CollegeOfValor } from "./Valor/CollegeOfValor";

export class BardSubclass extends Subclass {

  constructor(subclass: string){
    super(subclass);
  }

  subclassDictionary = {
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
    GLAMOUR: {
      "3": CollegeOfGlamour.glamour3,
      "5": CollegeOfGlamour.upMantle,
      "6": CollegeOfGlamour.glamour6,
      "10": CollegeOfGlamour.upMantle,
      "14": CollegeOfGlamour.glamour14,
      "15": CollegeOfGlamour.upMantle,
    }
  };
}