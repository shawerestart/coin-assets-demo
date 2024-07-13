// MarketAssets.test.tsx
import React from "react";
import { render, waitFor } from "@testing-library/react";
import MarketAssets, { MarketAssetsRef } from "@/components/MarketAssets";
import { fetchMarketData } from "@/apis/coinApi";
import { Asset } from "@/types/coinApi.types";
import { mockDataAssetsRes } from "@/__mocks__/mockFetch";

jest.mock("@/apis/coinApi", () => ({
  fetchMarketData: jest.fn(),
}));

describe("MarketAssets Component", () => {
  it("loads data correctly", async () => {
    const mockData: Asset[] = mockDataAssetsRes;

    (fetchMarketData as jest.Mock).mockResolvedValue(mockData);

    const { getByText } = render(<MarketAssets />);

    // Wait for the component to load data
    await waitFor(() => expect(fetchMarketData).toHaveBeenCalled());

    // Check if the data is rendered correctly
    const card = getByText("Bitcoin");
    expect(card).toBeInTheDocument();
  });
});
