# Douglas Lab website

This is an html+css+js website. It does not require any static site generators.

## Bulma Customizations

The site uses a slightly customized version of the [Bulma](https://bulma.io/) CSS framework. To use the css styles directly, you can just copy the `css/bulma.css` file. Modifications should be made in `douglaslab.scss` and rebuilt using npm. The build command is defined in the `package.json` file.

 npm install
 npm run build

We override the "primary" color variable and set the max container width to 960px:

 $primary: hsl(217, 71%, 53%)
 $widescreen: $desktop
 $fullhd: $desktop


## Gelbox releases

The published site is on `gh-pages`. Gelbox's existing page is `/gelbox/`;
its browser app is a static build at `/gelbox/app/` using hash routes, so it
requires no server rewrites or special headers. Serve the site over HTTPS
for WebGPU; WebGL2 is the fallback. `.nojekyll` keeps the static assets intact.

To update the web app from a clean source checkout (Node 22 and its npm
dependencies installed):

```sh
python3 scripts/update-gelbox-web.py /path/to/gel
```

This runs the full unit and production suites, builds the app, replaces only
`gelbox/app`, and records source revision plus file hashes in `release.json`.
The checked-in build can be served directly; the website's Sass build is
not required to update Gelbox. Keep the native page and press kit in place.

Native 1.0.1 is an Apple Silicon build with real bundled assets. Its source
archive, disk image and checksums are in `gelbox/files`; configuration,
source/Cinder revisions, file hashes and signing status are recorded in
`gelbox/releases/1.0.1.json`. The original Intel 1.0 download is retained.
The current 1.0.1 package is ad-hoc signed and **not notarized**. Developer ID
signing and Apple notarization are needed for a normally trusted public download.

Preview all routes locally:

```sh
python3 -m http.server 8766 --bind 127.0.0.1
# http://127.0.0.1:8766/gelbox/
# http://127.0.0.1:8766/gelbox/app/
```

Publishing is a separate step: review the changes, then update `gh-pages`.
Do not run `npm run deploy` expecting an upload; that command only rebuilds CSS.
