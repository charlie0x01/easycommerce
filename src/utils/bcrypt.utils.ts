import bcrypt from "bcryptjs";

/**
 *
 * @param plainText accept plain password string
 * @returns promise with generated hash string
 */
export const generateHash = async (plainText: string): Promise<string> => {
  const hash = await bcrypt.hash(plainText, 10);
  return hash;
};

/**
 *
 * @param hash hash string that you want to compare
 * @param text plain text that you want to compare with hash
 * @returns promise with true of false
 */
export const compareHashWithText = async (
  hash: string,
  text: string,
): Promise<boolean> => {
  const isMatched = await bcrypt.compare(text, hash);
  return isMatched;
};
