import { Background, BackgroundParams } from "./Background";

export class Sage extends Background {
  constructor(params: BackgroundParams) {
    super(
      "Sage",
      ["arcana", "history"],
      params.languages,
      [],
      ["INK (1 OUNCE BOTTLE)", "INK PEN", "CLOTHES, COMMON"],
      [],
      10,
      [
        {
          title: "Research",
          description:
            "When you attempt to learn or recall a piece of lore, if you do not know that information, you often know where and from whom you can obtain it. Usually, this information comes from a library, scriptorium, university, or a sage or other learned person or creature.",
        },
      ]
    );
  }
}

export class DSSage extends Sage {
  constructor() {
    super({});
  }
}
