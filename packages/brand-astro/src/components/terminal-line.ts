/** One line of a terminal: a command, a # note, a ▸ step with its answer, a ✓ result, or a key and value. */
export type TerminalLineData =
  | ["cmd", string]
  | ["note", string]
  | ["step", string, string?]
  | ["ok", string]
  | ["kv", string, string];
