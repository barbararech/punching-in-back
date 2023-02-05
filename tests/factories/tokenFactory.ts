import jwt from 'jsonwebtoken';

export default async function tokenFactory(userId: number) {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET as string);
  return token;
}
