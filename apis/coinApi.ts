import { Asset, fetchMarketDataRequest } from "@/types/coinApi.types";
import request from "@/utils/request";

export const fetchMarketData = (params: fetchMarketDataRequest) => {
  return request.request<Asset[]>("GET", "v1/assets", {
    params,
    cacheTime: 1800, // seconds
  });
};
