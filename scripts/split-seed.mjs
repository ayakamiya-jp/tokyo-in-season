import { readFileSync, writeFileSync, rmSync, readdirSync } from 'fs';
import { join } from 'path';

const seed = JSON.parse(readFileSync('./experiences-seed.json', 'utf8'));
const outDir = './src/content/experiences';

// Remove existing files
for (const f of readdirSync(outDir)) {
  rmSync(join(outDir, f));
}

for (const exp of seed.experiences) {
  const { id, ...fields } = exp;
  writeFileSync(join(outDir, `${id}.json`), JSON.stringify(fields, null, 2), 'utf8');
}

console.log(`Written ${seed.experiences.length} experience files.`);
