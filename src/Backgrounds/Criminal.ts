import { Background } from "./Background";

export class Criminal extends Background {
    constructor(gamingSet: string) {
      super(
        "Criminal",
        ["deception", "stealth"],
        [],
        ["Thieves' Tools", gamingSet],
        ["CROWBAR", "CLOTHES, COMMON"],
        [],
        15,
        [
          {
            title: "Criminal Contact",
            description:
              "You have a reliable and trustworthy contact who act as your liaison to a network of other criminals. You know how to get messages to and from your contact, even over great distances; specifically, you know the local messengers, corrupt caravan masters, and seedy sailors who can deliver messages for you.",
          },
        ]
      );
    }
  }