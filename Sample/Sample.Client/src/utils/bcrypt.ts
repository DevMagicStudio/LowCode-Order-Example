import bcrypt from 'bcryptjs'
export function Bcrypt(
  orginalData: string,
  salt = '$2a$11$ZiayRTzfBcagiKgIT8NaSO'
) {
  // const salt = bcrypt.genSaltSync(rounds);
  const hash = bcrypt.hashSync(orginalData, salt)
  return hash
}
