import { Option } from "./components/Options/optionsConfig";

export enum SafetyRating {
  "Verified" = "Verified",
  "Unverified" = "Unverified",
  "Blocked" = "Blocked",
}

export enum DOMMessageType {
  "UrlChange" = "UrlChange",
  "SafetyRating" = "SafetyRating",
  "UpdateOptions" = "UpdateOptions",
}

export interface UrlChangeDOMMessage {
  type: DOMMessageType.UrlChange;
  url: string;
}

export interface SafetyRatingDOMMessage {
  type: DOMMessageType.SafetyRating;
  safetyRating: SafetyRating;
}

export interface UpdateOptionsDOMMessage {
  type: DOMMessageType.UpdateOptions;
  options: Partial<Record<Option, string>>;
}

export type DOMMessage =
  | UrlChangeDOMMessage
  | SafetyRatingDOMMessage
  | UpdateOptionsDOMMessage;

export interface DOMMessageResponse {
  type: "example";
}
