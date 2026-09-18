<h1><img src="icons/icon-128.png" alt="" width="40" height="40" align="absmiddle"> Viewer Sort for Twitch</h1>

A lightweight Firefox extension that automatically sorts Twitch categories and
live channels by **viewers, highest first**.

No configuration, runtime dependencies, analytics, or data collection.
An independent project, not affiliated with or endorsed by Twitch.

## Features

- Automatically applies viewer-count sorting to categories, all live channels,
  individual categories, and live channels filtered by tag.
- Detects Twitch's shared viewer sort control on other pages, regardless of
  interface language.
- Handles internal navigation, Back navigation, and controls loaded later.
- Preserves other URL parameters, filters, and fragments.
- Excludes clips and videos, which have a different sorting system.

When a correction is needed, the extension reloads the page with the correct
sort parameter so Twitch fetches the sorted results. It replaces the current
history entry. Pages already sorted correctly are not reloaded.

Selecting another sort order manually triggers automatic correction.
Disable the extension in about:addons to use another sort order.

## Install locally

Requires Firefox 140 or newer. The extension is not yet published on Firefox
Add-ons.

1. Download or clone this repository.
2. Open about:debugging#/runtime/this-firefox in Firefox.
3. Click **Load Temporary Add-on…** and select manifest.json.
4. Reload existing Twitch tabs.

Temporary installations last until Firefox closes. Permanent installation in
standard Firefox requires a Mozilla-signed release. See Mozilla's
[temporary installation guide](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/).

## Privacy and permissions

The content script runs only on https://www.twitch.tv/ and https://twitch.tv/.
It also loads on channel pages to detect later internal navigation to a
directory. It reads the current URL and looks for Twitch's sort control.
It does not read cookies, store data, or contact external services.
See [PRIVACY.md](PRIVACY.md).

## Development

Use a current Node.js version and the system zip command (included with macOS;
available on Linux). No npm install is needed.

- Create the archive: npm run build

The unsigned dist/twitch-viewer-sort-1.0.0.zip archive contains only
manifest.json, content.js, and the PNG icons. The build script is JavaScript;
there is no bundling, transpilation, or minification.

The editable icon source is icons/icon.svg. PNG versions from 16 to 128 pixels
are included for Firefox; icons/icon-128.png can also be uploaded to the store
listing. No icon generation tool is needed to package the extension.

This optional command only prepares the ZIP to upload to Firefox Add-ons.
It is not needed to load the extension locally. Node.js is only used for this
packaging step; Firefox runs the extension independently.

The build script uses ES modules and standard imports. Firefox loads content.js
as a classic content script through the manifest, so that file has no module
imports or exports. All functions use arrow syntax; no CommonJS is used.

The private flag in package.json prevents accidental publishing to npm. It does
not restrict Git repository visibility or Firefox Add-ons publication.

## Limitations

Twitch's public client code was inspected on September 18, 2026. Its category
and live channel sort components accept VIEWER_COUNT in the sort URL parameter
and share the browse-sort-drop-down identifier. Changes to either may require
an update. Other pages are covered when they reuse this control; different
controls are not guaranteed. Twitch's own ordering, including promotional
placements, still applies.

## Publishing and contributing

See [docs/PUBLISHING.md](docs/PUBLISHING.md) for Firefox Add-ons submission
instructions and English listing copy. No release has been submitted yet.

Bug reports and pull requests are welcome. Include the affected Twitch URL,
Firefox version, interface language, and reproduction steps.
