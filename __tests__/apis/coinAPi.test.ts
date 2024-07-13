import { Asset, fetchMarketDataRequest } from "@/types/coinApi.types";
import request from "@/utils/request";
import { fetchMarketData } from "@/apis/coinApi";
import { mockDataAssetsRes } from "@/__mocks__/mockFetch";

describe("fetchMarketData", () => {
  it("should make a GET request to fetch market data", async () => {
    const mockParams: fetchMarketDataRequest = {
      // ... your mock params here
    };

    jest.spyOn(request, "request").mockResolvedValue(mockDataAssetsRes);

    const result = await fetchMarketData(mockParams);

    expect(request.request).toHaveBeenCalledWith("GET", "v1/assets", {
      params: mockParams,
      cacheTime: 1800,
    });
    expect(result).toEqual(mockDataAssetsRes);
  });
});
