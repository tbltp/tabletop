import { Sailor } from "./Sailor";

export class Pirate extends Sailor {
    constructor() {
      super();
      this.name = "Pirate";
      this.features = [
        {
          title: "Bad Reputation",
          description:
            "No matter where you go, people are afraid of you due to your reputation. When you are in a civilized settlement, you can get away with minor criminal offenses, such as refusing to pay for food at a tavern or breaking down doors at a local shop, since most people will not report your activity to the authorities.",
        },
      ];
    }
  }