(() => {
  "use strict";

  const SORT = "VIEWER_COUNT";
  // Confirmed in Twitch's BrowseSort and DirectoryChannelSort components.
  const SORT_CONTROL = 'button#browse-sort-drop-down, [role="combobox"]#browse-sort-drop-down';

  const targetURL = (href, hasSortControl = false) => {
    const url = new URL(href);
    if (url.protocol !== "https:" || !["www.twitch.tv", "twitch.tv"].includes(url.hostname)) {
      return null;
    }
    const path = url.pathname.replace(/\/+$/, "");
    // These use a different sort (views / date), not live viewer count.
    if (/(?:^|\/)(?:videos|clips)(?:\/|$)/.test(path)) return null;

    const knownDirectory = /^\/directory(?:\/all(?:\/tags\/[^/]+)?|\/category\/[^/]+)?$/.test(path);
    if (!knownDirectory && !hasSortControl) return null;
    const sorts = url.searchParams.getAll("sort");
    if (sorts.length === 1 && sorts[0] === SORT) return null;
    url.searchParams.set("sort", SORT);
    return url.href;
  };

  const start = (win, doc) => {
    let pending = false;
    let lastHref = win.location.href;
    let previousControl = null;
    let staleControl = null;
    let scheduled = false;

    const check = () => {
      scheduled = false;
      if (pending) return;
      const href = win.location.href;
      if (href !== lastHref) {
        // React may briefly leave the previous page's control in the DOM.
        staleControl = previousControl;
        lastHref = href;
      }
      const control = doc.querySelector(SORT_CONTROL);
      const hasControl = control !== null && control !== staleControl &&
        control.getClientRects().length > 0;
      previousControl = control;
      const target = targetURL(href, hasControl);
      if (target) {
        pending = true;
        // A real navigation makes Twitch refetch the sorted results. Merely
        // calling history.replaceState would only change the address bar.
        // replace avoids adding an unwanted entry to the Back button history.
        win.location.replace(target);
      }
    };

    const schedule = () => {
      if (scheduled || pending) return;
      scheduled = true;
      win.setTimeout(check, 100);
    };

    const observer = new win.MutationObserver(schedule);
    observer.observe(doc, { childList: true, subtree: true, attributes: true,
      attributeFilter: ["id", "hidden", "style", "aria-hidden"] });
    win.addEventListener("popstate", schedule);
    win.addEventListener("pageshow", () => { pending = false; schedule(); });
    // pushState is not observable from the isolated content-script world.
    // This also catches URL-only SPA transitions without any DOM mutations.
    win.setInterval(() => {
      if (win.location.href !== lastHref) schedule();
    }, 500);
    check();
  };

  start(window, document);
})();
