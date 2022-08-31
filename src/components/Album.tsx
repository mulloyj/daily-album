import Image from "next/image";
import Link from "next/link";

import React from "react";

import { Album } from "@prisma/client";

const Album = React.forwardRef(({ album }: { album: Album }) => {
  return (
    <div className="flex flex-auto flex-col items-center justify-center">
      <h1 className="text-3xl">{album.title}</h1>
      <h2 className="text-2xl p-1">{album.artist}</h2>
      <Link href={album.link}>
        <Image src={album.image} height={640} width={640} />
      </Link>
    </div>
  );
});

export default Album;
