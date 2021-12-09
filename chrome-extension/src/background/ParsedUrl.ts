import { addTrailingSlash } from "../utility/addTrailingSlash";
import { ParsedPattern } from "./ParsedPattern";

export interface ParsedUrlSegments {
  subdomains: string[];
  domain: string;
  tld: string;
  paths: string[];
}

/**
 * Parses an url into segments and matches to patterns
 */
export class ParsedUrl {
  segments: ParsedUrlSegments;

  /**
   * Convert a string into an object of segments
   */
  static getSegments(url: string) {
    url = addTrailingSlash(url);

    const { hostname, pathname } = new URL(url);
    const [tld, domain, ...subdomains] = hostname.split(".").reverse();
    subdomains.reverse();

    return {
      subdomains,
      domain,
      tld,
      paths: pathname.split("/").filter(Boolean),
    };
  }

  /**
   * Match a string exactly to a pattern, or return true if pattern is '*'
   */
  static matchString(pattern: string, segment: string) {
    return pattern === "*" || pattern === segment;
  }

  /**
   * Match an array of strings to a pattern
   */
  static matchArray(patterns: string[], segments: string[]) {
    const p = [...patterns];
    const s = [...segments];

    let prevPattern = "";

    while (p.length || s.length) {
      let pattern = "";
      let segment = "";

      if (p.length) pattern = p.shift() || "";
      if (s.length) segment = s.shift() || "";

      if (!pattern && prevPattern === "*") pattern = "*";
      if (!ParsedUrl.matchString(pattern, segment)) return false;

      prevPattern = pattern;
    }

    return true;
  }

  /**
   * Constructor
   */
  constructor(url: string) {
    this.segments = ParsedUrl.getSegments(url);
  }

  /**
   * Return true if url matches any given pattern
   */
  matchAnyPattern(urlPatterns: ParsedPattern[]): boolean {
    return urlPatterns.some((pattern) => this.matchPattern(pattern));
  }

  /**
   * Return true if url matches pattern
   */
  matchPattern(parsedPattern: ParsedPattern): boolean {
    const pattern = parsedPattern.segments;
    const url = this.segments;

    // match subdomains
    if (!ParsedUrl.matchArray(pattern.subdomains, url.subdomains)) {
      return false;
    }

    // match domain
    if (!ParsedUrl.matchString(pattern.domain, url.domain)) {
      return false;
    }

    // match tld
    if (!ParsedUrl.matchString(pattern.tld, url.tld)) {
      return false;
    }

    // match paths
    if (!ParsedUrl.matchArray(pattern.paths, url.paths)) {
      return false;
    }

    return true;
  }
}
