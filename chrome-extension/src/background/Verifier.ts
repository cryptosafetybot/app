import memoize from "lodash.memoize";
import { Client } from "../client/Client";
import { ParsedPattern } from "./ParsedPattern";
import { ParsedUrl } from "./ParsedUrl";
import { SafetyRating } from "../types";

/**
 * Handle verification of urls
 */
export class Verifier {
  /**
   * Memoize frequently called functions for better performance
   */
  constructor(public client: Client) {
    this.getLists = memoize(this.getLists);
    this.getSafetyRating = memoize(this.getSafetyRating);
  }

  /**
   * Get the latest whitelist/blacklist
   */
  async getLists() {
    const [whitelist, blacklist] = await Promise.all([
      this.client.whitelist(),
      this.client.blacklist(),
    ]);

    const parseList = (list: string[]) =>
      list.map((pattern) => new ParsedPattern(pattern));

    console.info("[background] whitelist", whitelist);
    console.info("[background] blacklist", blacklist);

    return {
      whitelist: parseList(whitelist ?? []),
      blacklist: parseList(blacklist ?? []),
    };
  }

  /**
   * Calculate the safety rating of an url
   */
  async getSafetyRating(url: string): Promise<SafetyRating> {
    const parsedUrl = new ParsedUrl(url);
    const { whitelist, blacklist } = await this.getLists();

    // all whitelisted urls count as verified
    if (parsedUrl.matchAnyPattern(whitelist)) {
      console.info("[background] verified", url);
      return SafetyRating.Verified;
    }

    // all blacklisted urls count as blocked
    // we check the blacklist after the whitelist deliberately
    if (parsedUrl.matchAnyPattern(blacklist)) {
      console.info("[background] blocked", url);
      return SafetyRating.Blocked;
    }

    // no decision reached
    console.info("[background] unverified", url);
    return SafetyRating.Unverified;
  }
}
