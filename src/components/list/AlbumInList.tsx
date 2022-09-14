import { Album as AlbumType } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";

import Album from "../Album";

const AlbumInList = React.forwardRef(({ album }: { album: AlbumType }) => {
  const [showAlbum, setShowAlbum] = useState(false);

  const onMouseEnter = () => {
    setShowAlbum(true);
  };

  const onMouseLeave = () => {
    setShowAlbum(false);
  };

  return (
    <Link
      href={`/albums/${encodeURIComponent(album.artist)}/${encodeURIComponent(
        album.title
      )}`}
    >
      <div
        className="pt-1"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="grid gap-1 border rounded">
          {showAlbum ? (
            <div className="flex w-full max-w-md p-5">
              <Album album={album} />
            </div>
          ) : (
            <div className="pl-5">
              <div className="text-3xl">{album.title}</div>
              <div className="text-2xl p-1">{album.artist}</div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
});

AlbumInList.displayName = "AlbumInList";

export default AlbumInList;
