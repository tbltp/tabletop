import { Background, BackgroundParams } from "./Background";

export class Soldier extends Background {
    constructor(params: BackgroundParams) {
      super(
        "Soldier",
        ["athletics", "intimidation"],
        [],
        ["Vehicles, land", params.gamingSet],
        ["CLOTHES, COMMON"],
        [],
        10,
        [
          {
            title: "Military Rank",
            description:
              "You have a military rank from your career as a soldier. Soldiers loyal to your former military organization still recognize your authority and influence. and they defer to you if they are of a lower rank. You can invoke your rank to exert influence over other soldiers and requisition simple equipment or horses for temporary use. You can also usually gain access to friendly military encampments and fortresses where your rank is recognized.",
          },
        ]
      );
    }
  }