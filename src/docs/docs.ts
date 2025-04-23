import * as commonmark from 'commonmark';
import { readFileSync } from 'fs';

const reader = new commonmark.Parser();
const writer = new commonmark.HtmlRenderer();

const markdown = readFileSync('./public/help.md', 'utf-8');
const parsed = reader.parse(markdown);
export const html = writer.render(parsed);