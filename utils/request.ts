import type { Config, Method, Params, Props } from "@/types/request.types";
import queryString from "query-string";

const getCacheTime = (cacheTime?: number): Config => {
  if (cacheTime) {
    if (cacheTime > 0) {
      return { next: { revalidate: cacheTime } };
    } else {
      return { cache: "no-store" };
    }
  }
  // force cache to update api time
  return { cache: "force-cache" };
};

class Request {
  /**
   * 请求拦截器
   */
  interceptorsRequest({ url, method, params, cacheTime }: Props) {
    let queryParams = ""; //url参数
    let requestPayload = ""; //请求体数据
    //请求头
    const headers = {
      //   authorization: `Bearer ...`,
      "X-CoinAPI-Key": process.env.API_KEY,
    };

    const config: Config = getCacheTime(cacheTime);

    if (method === "GET" || method === "DELETE") {
      //fetch对GET请求等，不支持将参数传在body上，只能拼接url
      if (params) {
        queryParams = queryString.stringify(params);
        url = `${url}?${queryParams}`;
      }
    } else {
      //非form-data传输JSON数据格式
      if (
        !["[object FormData]", "[object URLSearchParams]"].includes(
          Object.prototype.toString.call(params)
        )
      ) {
        Object.assign(headers, { "Content-Type": "application/json" });
        requestPayload = JSON.stringify(params);
      }
    }
    const options = {
      method,
      headers,
      body:
        method !== "GET" && method !== "DELETE" ? requestPayload : undefined,
      ...config,
    } as RequestInit;
    return {
      url,
      options: options,
    };
  }

  /**
   * 响应拦截器
   */
  interceptorsResponse<T>(res: Response): Promise<T> {
    return new Promise((resolve, reject) => {
      const requestUrl = res.url;
      if (res.ok) {
        return resolve(res.json() as Promise<T>);
      } else {
        res
          .clone()
          .text()
          .then((text) => {
            try {
              const errorData = JSON.parse(text);
              return reject({
                message: errorData || "Interface Error",
                url: requestUrl,
              });
            } catch {
              return reject({ message: text, url: requestUrl });
            }
          });
      }
    });
  }

  async httpFactory<T>({ url = "", params = {}, method }: Props): Promise<T> {
    const req = this.interceptorsRequest({
      url: process.env.API_URL + url,
      method,
      params: params.params,
      cacheTime: params.cacheTime,
    });
    const res = await fetch(req.url, req.options);
    return this.interceptorsResponse<T>(res);
  }

  async request<T>(method: Method, url: string, params?: Params): Promise<T> {
    return this.httpFactory<T>({ url, params, method });
  }

  get<T>(url: string, params?: Params): Promise<T> {
    return this.request("GET", url, params);
  }

  post<T>(url: string, params?: Params): Promise<T> {
    return this.request("POST", url, params);
  }

  put<T>(url: string, params?: Params): Promise<T> {
    return this.request("PUT", url, params);
  }

  delete<T>(url: string, params?: Params): Promise<T> {
    return this.request("DELETE", url, params);
  }

  patch<T>(url: string, params?: Params): Promise<T> {
    return this.request("PATCH", url, params);
  }
}

const request = new Request();
export { getCacheTime, Request };
export default request;
