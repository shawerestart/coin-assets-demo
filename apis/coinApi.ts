import { Asset, fetchMarketDataRequest } from "@/types/coinApi.types";
import { APIResponse } from "@/types/request.types";
import request from "@/utils/request";

export const fetchMarketData = (params: fetchMarketDataRequest) => {
  return request.request<APIResponse<{ assets: Asset[] }>>(
    "GET",
    "/coin-assets/assets",
    {
      params,
      cacheTime: 1800, // seconds
    }
  );
};
