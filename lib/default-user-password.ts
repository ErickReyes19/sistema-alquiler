import { randomBytes } from "crypto"

const PASSWORD_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789@$!%*?&"
const PASSWORD_LENGTH = 12

export function generateTemporaryPassword(length = PASSWORD_LENGTH) {
  const bytes = randomBytes(length)

  return Array.from(bytes, (byte) => PASSWORD_ALPHABET[byte % PASSWORD_ALPHABET.length]).join("")
}

export function buildTemporaryPasswordMessage(password: string) {
  return `Contraseña temporal: ${password}`
}
