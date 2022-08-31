import { Album as AlbumType } from "@prisma/client";
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
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {album.title}
      {showAlbum ? <Album album={album} /> : ""}
    </div>
  );
});

export default AlbumInList;
