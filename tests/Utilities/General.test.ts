import { searchInDictionary } from "../../src/Utilities/General";

describe("searchInDictionary", () => {
    it.each([
        {
            key: "foo",
            value: 1,
        },
        {
            key: "bar",
            value: "pancakes",
        },
        {
            key: "baz",
            value: {
                a: 1,
                b: 2,
            },
        },
        {
            key: "bat",
            value: false,
        },
    ])(
        "pulls value $value from object when the search key is $key",
        ({ key, value }) => {
            const dict = {
                foo: 1,
                bar: "pancakes",
                baz: {
                    a: 1,
                    b: 2,
                },
                bat: false,
                bad: 333,
            };
            expect(searchInDictionary(key, dict)).toEqual(value);
        }
    );
    it("returns undefined when the key is not found", () => {
        const dict = {
            foo: "bar",
        };
        expect(searchInDictionary("flea", dict)).toEqual(undefined);
    });
});
