export function isValidToken(expires_at: number) {
    if (Date.now() > expires_at * 1000) return false;

    return true;
}