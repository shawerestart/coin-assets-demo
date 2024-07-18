export type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface Params {
  cacheTime?: number; //缓存时间，单位为s。默认强缓存，0为不缓存
  params?: Record<string, any>;
}

export interface Props extends Params {
  url: string;
  method: Method;
}

export type Config =
  | { next: { revalidate: number } }
  | { cache: "no-store" }
  | { cache: "force-cache" };

export interface APIResponse<T> {
  code: number;
  data: T;
  msg: string;
  success: boolean;
}
