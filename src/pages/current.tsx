import Album from "../components/Album";
import Navbar from "../components/Navbar";

import { trpc } from "../utils/trpc";

function Current() {
  let { data, isLoading } = trpc.useQuery(["album.updateCurrent"]);

  if (!data) {
    return (
      <div>
        <Navbar />
        There are no albums
      </div>
    );
  } else if (isLoading) {
    return (
      <div>
        <Navbar />
        Loading...
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="pt-20">
        <Album album={data.Album} />
      </div>
    </div>
  );
}

export default Current;
