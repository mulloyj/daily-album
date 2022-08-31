import Album from "../../../components/Album";

import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";
import { ParsedUrlQuery } from "querystring";
import Navbar from "../../../components/Navbar";
import Link from "next/link";

type ExpectedQuery = {
  title: string;
  artist: string;
};

function isValidQuery(query: ParsedUrlQuery): query is ExpectedQuery {
  return typeof query.title === "string" && typeof query.artist === "string";
}

const AlbumByTitleAndArtist = () => {
  const router = useRouter();

  if (!isValidQuery(router.query)) {
    return null;
  }

  const { title, artist } = router.query;

  const { data, isLoading } = trpc.useQuery([
    "album.getByNameAndArtist",
    { title: title, artist: artist },
  ]);

  return (
    <>
      <Navbar />
      {data ? (
        <div className="pt-20">
          <Album album={data} />
        </div>
      ) : (
        <div className="flex flex-col flex-auto justify-center items-center">
          <div>{title} has no yet been added.</div>
          <Link href="/add">
            <button className="w-fit bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              Add an Album
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default AlbumByTitleAndArtist;
