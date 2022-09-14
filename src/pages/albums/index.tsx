import Navbar from "../../components/Navbar";
import AlbumInList from "../../components/list/AlbumInList";

import { trpc } from "../../utils/trpc";

function AlbumList() {
  const { data, isLoading } = trpc.useQuery(["album.getAll"]);

  console.log(data);

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
      <div className="p-4">
        {data.map((album) => {
          return (
            <AlbumInList key={`${album.title} ${album.artist}`} album={album} />
          );
        })}
      </div>
    </div>
  );
}

export default AlbumList;
