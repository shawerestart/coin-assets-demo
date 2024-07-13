import { getCacheTime } from "@/utils/request";

describe("getCacheTime", () => {
  it("should return the correct config when cacheTime is greater than 0", () => {
    const cacheTime = 10;
    const expectedConfig = { next: { revalidate: cacheTime } };
    const result = getCacheTime(cacheTime);
    expect(result).toEqual(expectedConfig);
  });

  it("should return the correct config when cacheTime is less than or equal to 0", () => {
    const cacheTime = -1;
    const expectedConfig = { cache: "no-store" };
    const result = getCacheTime(cacheTime);
    expect(result).toEqual(expectedConfig);
  });

  it("should return the correct config when cacheTime is undefined", () => {
    const expectedConfig = { cache: "force-cache" };
    const result = getCacheTime();
    expect(result).toEqual(expectedConfig);
  });
});
