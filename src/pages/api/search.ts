import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { getSearchResults, getNewAccessToken } from "../../utils/spotifyEndPoints";
import { prisma } from "../../server/db/client"
import { authOptions as nextAuthOptions } from "./auth/[...nextauth]";
import { isValidToken } from "../../utils/isValidToken";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, nextAuthOptions)

    if (session) {
        const account = await prisma.account.findMany({
            where: {
                userId: session.user?.id,
            }
        })

        let accessToken = account[0]?.access_token;

        if (!isValidToken(account[0]?.expires_at!)) {
            const result = await getNewAccessToken(account[0]!.refresh_token!);
    
            accessToken = result.access_token;
            const expires_at = Math.floor(Date.now()/1000) + result.expires_in;
    
            await prisma.account.update({
                where: {
                    id: account[0]!.id
                },
                data: {
                    access_token: accessToken,
                    expires_at: expires_at,
                }
            })
        }


        const query = req.query?.q;

        const response = await getSearchResults(
            `https://api.spotify.com/v1/search?q=${query}&type=album`, accessToken!);

        res.status(200).json(response);
    }

    else {
        res.status(403);
    }
}