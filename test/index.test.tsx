import { handle } from '../';
import fs from 'fs';

test('adds 1 + 2 to equal 3', () => {
  const source = fs.readFileSync('./properties.ts').toString();
  const afterParse = handle(source);
  console.log(afterParse);
});