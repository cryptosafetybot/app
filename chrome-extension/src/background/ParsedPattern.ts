import { addTrailingSlash } from "../utility/addTrailingSlash";

export interface ParsedPatternSegments {
  subdomains: string[];
  domain: string;
  tld: string;
  paths: string[];
}

/**
 * Parses a pattern into segments
 */
export class ParsedPattern {
  segments: ParsedPatternSegments;

  /**
   * Convert a string into an object of segments
   */
  static getSegments(pattern: string) {
    pattern = addTrailingSlash(pattern);

    const pathname = "/" + pattern.replace(/(.*?)\//, "");
    const hostname = pattern.replace(pathname, "");
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
   * Constructor
   */
  constructor(pattern: string) {
    this.segments = ParsedPattern.getSegments(pattern);
  }
}
