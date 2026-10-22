# Live Portrait updates

Scene packs for Live Portrait frames. Frames download `catalog.json` from this site, check its signature against the public key they were shipped with, and install any new or newer scene in `packs/`.

To publish a scene: add it to `packs/` and `scenes.json`, run `node build-catalog.js` on the computer that holds the signing key, then commit and push. The signing key is never stored in this repository.
