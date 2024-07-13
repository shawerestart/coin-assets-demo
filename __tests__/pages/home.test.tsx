import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  cleanup,
  RenderResult,
} from "@testing-library/react";
import Home from "@/app/page";
import { mockDataAssetsRes, mockFetch } from "@/__mocks__/mockFetch";
import MarketAssets, { MarketAssetsRef } from "@/components/MarketAssets";

describe("Home component", () => {
  // Mock the MarketAssets component and its reload method
  const mockReload = jest.fn().mockImplementation(() => {
    return Promise.resolve(mockDataAssetsRes);
  });

  window.fetch = mockFetch(mockDataAssetsRes);

  jest.mock("@/components/MarketAssets", () => {
    return {
      MarketAssets: ({ ref }: { ref: any }) => {
        ref.current = { reload: mockReload };
        return <MarketAssets ref={ref} />;
      },
      MarketAssetsRef: jest.fn(),
    };
  });

  test("should reload successfully and show alert", async () => {
    // Render the Home component
    const { getByText, queryByText, unmount } = render(<Home />);

    // Click the Reload button
    const reloadButton = getByText("Reload");
    fireEvent.click(reloadButton);
    await waitFor(() => new Promise((resolve) => setTimeout(resolve, 0)));

    // Check if the alert is shown
    const alertText = getByText("Reload Successfully");
    expect(alertText).toBeVisible();

    // Click the close button on the alert
    const closeButton = document.querySelector("#closeBtn");
    if (closeButton) {
      fireEvent.click(closeButton);
      // Check if the alert is closed
      const ele = document.querySelector("#home-collapse");
      expect(ele).toBeFalsy();
    } else {
      throw new Error("Close button not found");
    }
  });
});
