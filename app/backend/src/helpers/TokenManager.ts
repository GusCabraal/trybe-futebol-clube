import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret = process.env.JWT_SECRET || ('secret' as jwt.Secret);

export default class TokenManager {
  static makeToken = (payload: unknown) => {
    const jwtConfig: jwt.SignOptions = {
      expiresIn: '1h',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: payload }, secret, jwtConfig);
    return token;
  };

  static decodeToken = async (token: string) => {
    try {
      const { data } = await jwt.verify(token, secret) as jwt.JwtPayload;
      return data;
    } catch (error) {
      return null;
    }
  };
}
