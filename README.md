# Gas Sense — project exhibit

A presentation website for the Gas Sense Computer Science thesis, built with Vite and Three.js. It includes a rotatable system model, animated exploded view, component exploration, an illustrative analytics demo, project app screenshots, and the original AVP.

## Local preview

```sh
npm install
npm run dev
```

Open http://localhost:4173. For a production build, run `npm run build`; the output is `dist`.

## Deploy to Vercel

Import this folder as a Vercel project (or set `gas-sense-site` as the root directory when importing its parent repository). The included `vercel.json` configures the Vite build and `dist` output. No environment variables or backend are required. The AVP is a local static asset of approximately 27 MB.

## Content and model provenance

The source references below describe the original local AVP archive. All assets required to run and deploy this site are already included in `public/assets`; the original archive is not required.

- `../AVP_Stylized_With_Assembly_80s/build_assembly.py`: original procedural assembly layout, reconstructed in Three.js in `src/scene.js`.
- `../AVP_Stylized_65s/build_stylized.py`: component descriptions and visual references.
- `../AVP_Stylized_With_Assembly_80s/CapCut_Import_Kit/04_Script_and_Timing/Design_and_Assumptions.txt`: the enclosure is a stylized concept; the four sensors sit beneath one plate; pressure and valve parts stay outside the enclosure; estimated LPG is derived from calibrated weight and tare.
- `../AVP_App_Walkthrough_40s/CapCut_Import_Kit/05_App_Screens`: original app screenshots.
- `../AVP_Full_3min/GAS_SENSE_Complete_AVP_3min.mp4`: the embedded original film.

No STL/GLB manufacturing model was present in the supplied project files. The 3D scene is a faithful conceptual reconstruction of the AVP layout, not a dimensionally accurate print file. Exact thresholds, performance measurements, and the deployed fusion algorithm were not available; the analytics section therefore uses clearly marked illustrative scenarios. The website is an educational exhibit and does not connect to or control the physical device.

## Verification

`node tests/smoke.mjs` checks the running local preview in the installed Microsoft Edge browser. It exercises model modes and selection, scenarios, app tabs, mobile navigation, media loading, and narrow-screen layout. Screenshots are saved in `test-results/`.
