export function randomId(length = 4): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  const randomCharIndex = () => Math.floor(Math.random() * chars.length);

  for (let i = 0; i < length; i++) {
    result += chars.charAt(randomCharIndex());
  }

  return result;
}
