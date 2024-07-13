import { Asset } from "@/types/coinApi.types";

export function mockFetch(data: any) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data,
    })
  );
}

export const mockDataAssetsRes: Asset[] = [
  {
    asset_id: "BTC",
    name: "Bitcoin",
    type_is_crypto: true,
    data_quote_start: "2023-01-01T00:00:00Z",
    data_quote_end: "2023-01-31T23:59:59Z",
    data_orderbook_start: "2023-01-01T00:00:00Z",
    data_orderbook_end: "2023-01-31T23:59:59Z",
    data_trade_start: "2023-01-01T00:00:00Z",
    data_trade_end: "2023-01-31T23:59:59Z",
    data_symbols_count: 100,
    volume_1hrs_usd: 1000000,
    volume_1day_usd: 10000000,
    volume_1mth_usd: 100000000,
    price_usd: 40000,
    id_icon: "icon-BTC",
    chain_addresses: [
      {
        chain_id: "bitcoin-mainnet",
        network_id: "mainnet",
        address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      },
      {
        chain_id: "bitcoin-testnet",
        network_id: "testnet",
        address:
          "tb1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3qzf4jry",
      },
    ],
    data_start: "2023-01-01T00:00:00Z",
    data_end: "2023-01-31T23:59:59Z",
  },
];
