module.exports = {
  verbose: true,
  roots: ["./tests"],
  testMatch: ["**/?(*.)test.+(ts|tsx)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
