import { crossFetch } from "../utility/crossFetch";

export interface ClientConfig {
  baseUrl: string;
}

export type Whitelist = string[];
export type Blacklist = string[];

/**
 * Connect to the CryptoSafetyApp API
 */
export class Client {
  constructor(public config: ClientConfig) {}

  /**
   * Make a GET request to the api
   */
  async get<T extends {}>(path: string): Promise<T> {
    const url = `${this.config.baseUrl}${path}`;
    const response = await crossFetch(url);
    const result = await response.json();

    return result as T;
  }

  async whitelist(): Promise<Whitelist> {
    return await this.get<Whitelist>("/whitelist");
  }

  async blacklist(): Promise<Blacklist> {
    return await this.get<Blacklist>("/blacklist");
  }
}
