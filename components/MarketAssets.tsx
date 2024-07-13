"use client";
import { fetchMarketData } from "@/apis/coinApi";
import { Asset } from "@/types/coinApi.types";
import { COIN_LIST } from "@/utils/constants";
import { Card, Grid } from "@mui/material";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import currency from "currency.js";
import { getImageByImageId } from "@/utils/image";

export interface MarketAssetsRef {
  reload: Function;
}

const MarketAssets = forwardRef((props, ref) => {
  const [list, setList] = useState<Asset[]>([]);

  const getMarketAssets = async () => {
    const res = await fetchMarketData({
      filter_asset_id: COIN_LIST.join(";"),
    });
    if (res && res.length > 0) {
      setList(res);
    }
  };

  useEffect(() => {
    getMarketAssets();
  }, []);

  useImperativeHandle(ref, (): MarketAssetsRef => {
    return {
      reload: async () => {
        await getMarketAssets();
      },
    };
  });

  return (
    <Grid container>
      {list.map((asset) => {
        return (
          <Grid key={asset.asset_id} xs={12} sm={6} md={6} lg={4} item={true}>
            <Card className="bg-white p-4 m-4" variant="outlined">
              <div className="text-3xl font-semibold">
                <img
                  className="size-12 mb-4"
                  src={getImageByImageId(asset.id_icon)}
                  alt={asset.name}
                  onError={() => {}}
                />
                <span>{asset.name}</span>
              </div>
              <div className="text-xl text-yellow-400">
                <span>
                  {currency(asset.price_usd, {
                    precision: 6,
                  }).format()}
                </span>
              </div>
              <div className="text-gray-400">
                <span>volume:</span>
                <span>{asset.volume_1day_usd}</span>
              </div>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
});

export default MarketAssets;
