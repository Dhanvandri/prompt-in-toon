// TOON (Token-Oriented Object Notation) Prompt Compressor
// Ported from Python implementation

const PROTECT_RE = /```[\s\S]*?```|`[^`]*`|https?:\/\/\S+/g;

const PHRASES: Record<string, string> = {
  "in order to": "to",
  "due to the fact that": "because",
  "with regard to": "about",
  "in reference to": "about",
  "as soon as possible": "asap",
  "at this point in time": "now",
  "in the event that": "if",
  "for the purpose of": "for",
  "on a daily basis": "daily",
  "on a weekly basis": "weekly",
  "in a timely manner": "promptly",
  "take into consideration": "consider",
  "make a decision": "decide",
  "provide assistance": "help",
  "conduct an investigation": "investigate",
  "in most instances": "usually",
  "in the near future": "soon",
  "a large number of": "many",
  "a small number of": "few",
  "the majority of": "most",
  "the minority of": "few",
  "a number of": "some",
  "at the present time": "now",
  "in the process of": "currently",
  "on the occasion of": "when",
  "in the neighborhood of": "near",
  "in close proximity to": "near",
  "with the exception of": "except",
  "in spite of the fact that": "although",
  "in view of the fact that": "since",
};

const FILLER: string[] = [
  "\\bplease\\s+(?:help\\s+me\\s+)?(?:to\\s+)?",
  "\\bkindly\\s+",
  "\\bcould\\s+you\\s+(?:please\\s+)?",
  "\\bcan\\s+you\\s+(?:please\\s+)?",
  "\\bwould\\s+you\\s+(?:please\\s+)?",
  "\\bi\\s+want\\s+you\\s+to\\s+",
  "\\bi\\s+need\\s+you\\s+to\\s+",
  "\\bi\\s+would\\s+like\\s+(?:you\\s+)?to\\s+",
  "\\bmake\\s+sure\\s+(?:that\\s+)?",
  "\\bensure\\s+(?:that\\s+)?",
  "\\bjust\\s+",
  "\\breally\\s+",
  "\\bactually\\s+",
  "\\bbasically\\s+",
  "\\bsimply\\s+",
  "\\bvery\\s+",
];

const TELEGRAPHIC: string[] = [
  "\\b(?:i|you|we|they|he|she|it)\\b",
  "\\b(?:am|is|are|was|were|be|been|being)\\b",
  "\\b(?:a|an|the)\\b",
  "\\b(?:that|which)\\b",
];

const WORDS: Record<string, string> = {
  "utilize": "use",
  "utilizes": "uses",
  "utilizing": "using",
  "utilization": "use",
  "obtain": "get",
  "obtains": "gets",
  "obtaining": "getting",
  "purchase": "buy",
  "purchases": "buys",
  "purchasing": "buying",
  "assist": "help",
  "assists": "helps",
  "assisting": "helping",
  "assistance": "help",
  "demonstrate": "show",
  "demonstrates": "shows",
  "demonstrating": "showing",
  "approximately": "~",
  "commence": "start",
  "terminates": "ends",
  "terminate": "end",
  "prioritize": "rank",
  "additional": "extra",
  "frequently": "often",
  "immediately": "now",
  "currently": "now",
  "provide": "give",
  "provides": "gives",
  "providing": "giving",
  "require": "need",
  "requires": "needs",
  "requiring": "needing",
  "sufficient": "enough",
  "attempt": "try",
  "attempts": "tries",
  "attempting": "trying",
  "validate": "check",
  "validates": "checks",
  "validating": "checking",
  "and": "&",
  "or": "|",
  "with": "w/",
  "without": "w/o",
  "for": "4",
  "to": "2",
  "you": "u",
  "your": "ur",
  "are": "r",
  "python": "py",
  "function": "fn",
  "functions": "fns",
  "reads": "read",
  "writes": "write",
  "writing": "write",
  "calculates": "calc",
  "calculate": "calc",
  "calculating": "calc",
  "average": "avg",
  "column": "col",
  "columns": "cols",
  "handling": "handle",
  "handles": "handle",
  "missing": "NaN",
  "values": "vals",
  "value": "val",
  "efficient": "fast",
  "efficiency": "speed",
  "uses": "use",
  "using": "use",
  "large": "big",
  "small": "sm",
  "maximum": "max",
  "minimum": "min",
  "number": "num",
  "numbers": "nums",
  "parameter": "param",
  "parameters": "params",
  "argument": "arg",
  "arguments": "args",
  "library": "lib",
  "libraries": "libs",
  "package": "pkg",
  "packages": "pkgs",
  "directory": "dir",
  "directories": "dirs",
  "application": "app",
  "applications": "apps",
  "configuration": "cfg",
  "config": "cfg",
  "message": "msg",
  "messages": "msgs",
  "exception": "exc",
  "exceptions": "excs",
  "standard": "std",
  "input": "in",
  "output": "out",
  "information": "info",
  "description": "desc",
  "initialize": "init",
  "initializes": "init",
  "initialization": "init",
  "implement": "impl",
  "implements": "impl",
  "implementation": "impl",
  "generate": "gen",
  "generates": "gen",
  "generating": "gen",
  "convert": "conv",
  "converts": "conv",
  "conversion": "conv",
  "environment": "env",
  "variable": "var",
  "variables": "vars",
  "boolean": "bool",
  "integer": "int",
  "string": "str",
  "character": "char",
  "dictionary": "dict",
  "array": "arr",
  "arrays": "arrs",
  "dataframe": "df",
  "dataframes": "dfs",
  "series": "ser",
  "matrix": "mat",
  "database": "db",
  "databases": "dbs",
  "table": "tbl",
  "tables": "tbls",
  "record": "rec",
  "records": "recs",
  "user": "usr",
  "users": "usrs",
  "password": "pwd",
  "username": "uname",
  "system": "sys",
  "development": "dev",
  "production": "prod",
  "repository": "repo",
  "repositories": "repos",
  "dependency": "dep",
  "dependencies": "deps",
  "server": "srv",
  "client": "cli",
  "request": "req",
  "requests": "reqs",
  "response": "res",
  "responses": "ress",
  "query": "qry",
  "queries": "qrys",
  "document": "doc",
  "documents": "docs",
  "object": "obj",
  "objects": "objs",
  "property": "prop",
  "properties": "props",
  "attribute": "attr",
  "attributes": "attrs",
  "method": "meth",
  "methods": "meths",
  "class": "cls",
};

function replaceMapping(text: string, mapping: Record<string, string>): string {
  for (const [oldWord, newWord] of Object.entries(mapping)) {
    const regex = new RegExp(`\\b${escapeRegExp(oldWord)}\\b`, "gi");
    text = text.replace(regex, () => newWord);
  }
  return text;
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function compress(text: string): string {
  const parts: string[] = [];

  function stash(match: string): string {
    parts.push(match);
    return `\x00${parts.length - 1}\x00`;
  }

  // Protect code blocks, inline code, and URLs
  text = text.replace(PROTECT_RE, (m) => stash(m));

  // Replace verbose phrases
  text = replaceMapping(text, PHRASES);

  // Remove filler words
  for (const pattern of FILLER) {
    const regex = new RegExp(pattern, "gi");
    text = text.replace(regex, "");
  }

  // Remove telegraphic words
  for (const pattern of TELEGRAPHIC) {
    const regex = new RegExp(pattern, "gi");
    text = text.replace(regex, "");
  }

  // Replace individual words
  text = replaceMapping(text, WORDS);

  // Clean up whitespace
  text = text.replace(/\s+/g, " ").trim();
  // Remove space before punctuation
  text = text.replace(/\s+([,.!?;:])/g, "$1");
  // Collapse multiple periods
  text = text.replace(/\.{2,}/g, ".");

  // Restore protected parts
  text = text.replace(/\x00(\d+)\x00/g, (_m, idx) => parts[parseInt(idx)]);

  return text;
}

function toonValue(value: string): string {
  value = value.replace(/[\r\n\t]+/g, " ").trim();
  if (!value) return "";
  if (value.includes(";") || value.includes('"')) {
    const escaped = value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    return `"${escaped}"`;
  }
  return value;
}

function toon(pairs: [string, string][]): string {
  const items: string[] = [];
  for (const [key, value] of pairs) {
    const v = toonValue(value);
    if (v) {
      items.push(`${key}:${v}`);
    }
  }
  return items.join(";");
}

export function toToonPrompt(prompt: string): string {
  prompt = prompt.trim();
  if (!prompt) return "";

  const task = compress(prompt) || "do_task";

  const pairs: [string, string][] = [
    ["r", "exp"],
    ["t", task],
    ["c", "brief,no_yap,exact"],
  ];

  return toon(pairs);
}

export function countTokens(text: string): number {
  // Approximate token count (rough estimate: ~4 chars per token for English)
  return Math.ceil(text.length / 4);
}

export function getCompressionStats(original: string, compressed: string) {
  const origChars = original.length;
  const compChars = compressed.length;
  const reduction = origChars > 0 ? ((origChars - compChars) / origChars) * 100 : 0;
  const origTokens = countTokens(original);
  const compTokens = countTokens(compressed);
  const tokenSaving = origTokens > 0 ? ((origTokens - compTokens) / origTokens) * 100 : 0;

  return {
    originalChars: origChars,
    compressedChars: compChars,
    reduction: Math.round(reduction),
    originalTokens: origTokens,
    compressedTokens: compTokens,
    tokenSaving: Math.round(tokenSaving),
  };
}
