import { SignJWT, generateSecret } from 'jose';

const secretKey = generateSecret('HS256'); // HS256 암호화 알고리즘 사용

export async function createJwt(googleUserInfo: TokenInfo): Promise<string> {
  const { email, verified_email, picture, hd, id } = googleUserInfo;
  return new SignJWT({
    hd: hd,
    email: email,
    email_verified: verified_email,
    picture: picture,
    id: id,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer('https://forif.org')
    .setAudience('urn:example:audience')
    .setExpirationTime('2h')
    .sign(await secretKey);
}
