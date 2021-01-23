import { Background } from "./Background";

export class Urchin extends Background {
    constructor() {
      super(
        "Urchin",
        ["sleight of hand", "stealth"],
        [],
        ["Disguise Kit", "Thieves' Tools"],
        ["CLOTHES, COMMON"],
        [],
        10,
        [
          {
            title: "City Secrets",
            description:
              "You know the secret patterns and flow to cities and can find passages through the urban sprawl that other would miss. When you are not in combat, you (and companions you lead) can travel between any two locations in the city twice as fast as your speed would normally allow.",
          },
        ]
      );
    }
  }
  