import AlbumInList from "../../components/list/AlbumInList";

import { trpc } from "../../utils/trpc";

import React from "react";

enum SortMethod {
  recent,
  all,
}

const AlbumList = React.forwardRef(
  ({ sortMethod }: { sortMethod: SortMethod }) => {
    let query:
      | "album.getCurrent"
      | "album.getAll"
      | "album.getByNameAndArtist"
      | "album.updateCurrent"
      | "account.getCurrent"
      | "album.getRecent";

    if (sortMethod == 0) {
      query = "album.getRecent";
    } else if (sortMethod == 1) {
      query = "album.getAll";
    } else {
      return <div>Please Provide a Sort Method</div>;
    }

    const { data, isLoading } = trpc.useQuery([query]);

    if (data === null || data === undefined) {
      return <div>There are no albums</div>;
    } else if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <div className="p-4">
          {data.map((album) => {
            return (
              <AlbumInList
                key={`${album.title} ${album.artist}`}
                album={album}
              />
            );
          })}
        </div>
      </div>
    );
  }
);

AlbumList.displayName = "AlbumList";

export default AlbumList;
