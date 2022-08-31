import { Account } from "@prisma/client";
import { env } from "../server/env.mjs";

const basic = Buffer.from(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`).toString('base64');

const refreshURL = 'https://accounts.spotify.com/api/token';

export async function getSearchResults(query: string, access_token: string) {
    const res = await fetch(query, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        }
    }).then((res) => res.json());

    return res;
}

export async function getNewAccessToken(refresh_token: string) {
    const res = await fetch(refreshURL, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refresh_token!,
        })
    }).then((res) => res.json());

    return res;
}