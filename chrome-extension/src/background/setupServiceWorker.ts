import { Client } from "../client/Client";
import { DOMMessage } from "../types";
import { handleMessage } from "./handleMessage";
import { handleUrlChange } from "./handleUrlChange";
import { Verifier } from "./Verifier";

/**
 * Set up service worker
 */
export function setupServiceWorker(): void {
  // ensure env variables are present
  const { REACT_APP_API_BASE_URL } = process.env;

  if (!REACT_APP_API_BASE_URL) {
    throw new TypeError(`REACT_APP_API_BASE_URL must be defined in .env`);
  }

  // connect to cryptosafetyapp api
  const client = new Client({
    baseUrl: REACT_APP_API_BASE_URL,
  });

  // set up verification
  const verifier = new Verifier(client);

  // attach handleActivatedTab listener
  chrome.tabs?.onActivated.addListener(() => {
    handleUrlChange(verifier);

    // must return false or chrome will wait for a response
    return false;
  });

  // attach handleMessage listener
  chrome.runtime?.onMessage.addListener((msg: DOMMessage) => {
    handleMessage(msg, verifier);

    // must return false or chrome will wait for a response
    return false;
  });
}
