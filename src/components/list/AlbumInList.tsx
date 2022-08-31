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
    <Link href={`/albums/${album.artist}/${album.title}`}>
      <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {album.title}
        {showAlbum ? <Album album={album} /> : ""}
      </div>
    </Link>
  );
});

export default AlbumInList;
