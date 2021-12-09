/**
 * Redirect user away from a dangerous page
 */
export function escapeDanger(): void {
  // prevent events from interrupting our escape
  const preventListenersFromFiring = (e: Event) => e.stopImmediatePropagation();
  const eventNamesToDisable = ["mousemove", "beforeunload", "unload"];

  eventNamesToDisable.forEach((eventName) =>
    window.addEventListener(eventName, preventListenersFromFiring, {
      capture: true,
    })
  );

  // hide dangerous content from users
  document.body.innerHTML = "";
  document.head.innerHTML = `<title>Redirecting...</title>`;

  // redirect to a safe place
  window.location.assign("https://cryptosafety.app/blocked/");
}
