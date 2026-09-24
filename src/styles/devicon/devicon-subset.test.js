// @vitest-environment node
import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import { findUsedDeviconClasses, OUT_CSS } from '../../../scripts/subset-devicon.mjs';

describe('devicon subset', () => {
  it('has a glyph for every devicon class used in src (run `pnpm icons` if this fails)', async () => {
    const css = await readFile(OUT_CSS, 'utf8');
    const used = await findUsedDeviconClasses();

    expect(used.size).toBeGreaterThan(0);
    [...used].forEach((name) => expect(css).toContain(`.${name}:before{`));
  });
});
