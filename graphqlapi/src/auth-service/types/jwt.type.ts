import { IJWTPayload } from '../interfaces/jwtPayload-type.interface';

export class JWTpayload implements IJWTPayload {
  email: string;
  id: string;
  iat: string;
}
