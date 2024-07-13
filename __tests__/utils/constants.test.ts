import { EXCHANGE_ID, COIN_LIST } from "@/utils/constants";

describe("EXCHANGE_ID", () => {
  it('should be equal to "BINANCE"', () => {
    expect(EXCHANGE_ID).toBe("BINANCE");
  });
});

describe("COIN_LIST", () => {
  it("should be an array of coins", () => {
    expect(COIN_LIST).toEqual([
      "BTC",
      "ETH",
      "LTC",
      "XMR",
      "XRP",
      "DOGE",
      "DASH",
    ]);
  });
});
