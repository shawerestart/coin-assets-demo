export default class MockResponse {
  status: number;
  statusText: string;
  headers: Headers;
  url: string;

  constructor(
    bodyInit?: BodyInit | null,
    init?: { url?: string } & ResponseInit
  ) {
    this.status = init?.status ?? 200;
    this.statusText = init?.statusText ?? "OK";
    this.headers = new Headers(init?.headers);
    this.url = init?.url ?? "";
  }

  json(): Promise<any> {
    return Promise.resolve({});
  }

  text(): Promise<string> {
    return Promise.resolve("");
  }
}
