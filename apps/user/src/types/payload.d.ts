import * as jwt from 'jose';

declare module 'jose' {
  export interface JWTPayload extends jwt.JWTPayload {
    azp: string;
    hd: string;
    email: string;
    email_verified: boolean;
    name: string;
    picture: string;
    given_name: string;
    family_name: string;
  }
}
