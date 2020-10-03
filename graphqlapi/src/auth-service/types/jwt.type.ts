import { IJWTPayload } from '../interfaces/jwtPayload-type.interface';

export class JWTpayload implements IJWTPayload {
  id: string;
  email: string;
  iat: string;
  exp: string;
}
