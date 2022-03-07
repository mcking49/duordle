export const KEYBOARD_KEY_ROW_1 = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
] as const;
export type KeyboardRow1Key = typeof KEYBOARD_KEY_ROW_1[number];

export const KEYBOARD_KEY_ROW_2 = [
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
] as const;
export type KeyboardRow2Key = typeof KEYBOARD_KEY_ROW_2[number];

export const KEYBOARD_KEY_ROW_3 = [
  "DELETE",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "ENTER",
] as const;
export type KeyboardRow3Key = typeof KEYBOARD_KEY_ROW_3[number];

export const KEYS_LIST = [...KEYBOARD_KEY_ROW_1, ...KEYBOARD_KEY_ROW_2, ...KEYBOARD_KEY_ROW_3] as const;
export type KeyboardKey = typeof KEYS_LIST[number];
