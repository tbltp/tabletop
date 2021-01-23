import { Background } from "./Background";

export class Sailor extends Background {
  constructor() {
    super(
      "Sailor",
      ["athletics", "perception"],
      [],
      ["Navigator's tools, Vehicles, water"],
      ["ROPE, SILK (50 FEET)", "CLOTHES, COMMON"],
      [],
      10,
      [
        {
          title: "Ship's Passage",
          description:
            "When you need to, you can secure free passage on a sailing ship for yourself and your adventuring companions. You might sail on the ship you served on, or another ship you have good relations with (perhaps one captained by former crewmate). Because you're calling in a favor, you can't be certain of a schedule or route that will meet your every need. In return for your free passage, you and your companions are expected to assist the crew during voyage.",
        },
      ]
    );
  }
}
