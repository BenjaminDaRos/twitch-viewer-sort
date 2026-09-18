# Publishing on Firefox Add-ons

## Prepare and submit

1. Keep the versions in `manifest.json` and `package.json` aligned. Increment
   both for releases after the first submission.
2. Keep the Gecko extension ID stable after publication. Its email-like syntax
   does not require a real mailbox.
3. Run `npm run build` to create the upload archive.
4. Use `icons/icon-128.png` as the store listing icon. The extension already
   includes the icon sizes declared in its manifest. Optionally add screenshots.
5. Sign in to the [Mozilla Add-ons Developer Hub](https://addons.mozilla.org/developers/)
   and submit a new add-on for listing **On this site**.
6. Upload the generated ZIP, resolve validator findings, and fill in the listing.
   Use the public repository and its issues page for
   support links once the repository exists. The listing URL must be available.

The extension is readable JavaScript. The build step only packages files;
it does not transform the code. Follow Mozilla's source submission instructions
if requested. Signing and publication depend on Mozilla's validation and review.

Official reference: [Submitting an add-on](https://extensionworkshop.com/documentation/publish/submitting-an-add-on/).

## Suggested listing copy

**Name:** Viewer Sort for Twitch

**Summary:** Automatically sort Twitch categories and live channels by viewer
count, highest first.

**Description:**

Prefer browsing Twitch from the most-watched streams down? Viewer Sort for
Twitch automatically selects “Viewers (High to Low)” on supported directory
pages, including categories and live channels.

It works during internal navigation and keeps your existing filters. When the
sort order needs correcting, it reloads the page with Twitch's viewer-count
sort parameter. Clips and videos are excluded. To choose another sort order,
disable the extension.

No configuration, analytics, or data collection. This is an independent
extension, not affiliated with or endorsed by Twitch.

**Privacy policy:** Use the contents of `PRIVACY.md`.

## Notes for reviewers

The content script runs at document start on the two specified Twitch hosts.
It sets `sort=VIEWER_COUNT` using `location.replace` on known directory URLs or
pages with Twitch's shared viewer sort control. It watches DOM mutations and
URL changes to support Twitch's client-side navigation. It excludes clip and
video paths and does not redirect already normalized URLs.

There is no remote code, telemetry, storage, background process, or privileged
extension API. The archive includes the complete readable runtime source.

Test by visiting `https://www.twitch.tv/directory/category/just-chatting`
without a sort parameter, then navigating to another category.
