export interface TokenResponse {
  readonly access: string;
  readonly refresh: string;
}

export interface TokenBody {
  readonly token_type: string,
  readonly exp: number,
  readonly iat: number,
  readonly jti: string,
  readonly user_id: number,
}

export interface RefreshTokenPayload extends Pick<TokenResponse, 'refresh'> {}

export interface VerifyTokenPayload {
  readonly token: string;
}
