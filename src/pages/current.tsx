import Album from "../components/Album";
import Navbar from "../components/Navbar";

import { trpc } from "../utils/trpc";

function Current() {
  const { data, isLoading } = trpc.useQuery(["album.getCurrent"]);

  if (data === null || data === undefined) {
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
      <div className="flex flex-auto flex-col items-center justify-center pt-20">
        <Album album={data} />
      </div>
    </div>
  );
}

export default Current;
