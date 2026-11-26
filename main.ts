// NusaData Atlas hand-in program (Node 22, standard library only).
// Copies the static site in app/ and its screenshots/ beside this file into
// the output directory, then writes dossier.json there with the vendored
// make.fun library so the scorer can rebuild the same bytes.

import { cpSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoDir = dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

function copyTree(name: string): void {
  cpSync(join(repoDir, name), join(outputDir, name), { recursive: true });
}

mkdirSync(outputDir, { recursive: true });
copyTree('app');
copyTree('screenshots');

const dossierBytes = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(outputDir, 'dossier.json'), dossierBytes);
