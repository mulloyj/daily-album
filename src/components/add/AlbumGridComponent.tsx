import { Album as AlbumType } from "@prisma/client";
import { useContext } from "react";
import Album from "../Album";
import { ResultsContext } from "../../context/ResultsContext";

const AlbumGridComponent = ({ album }: { album: AlbumType }) => {
  const { handleShowModal } = useContext(ResultsContext);

  return (
    <div className="border border-2 shadow-lg flex flex-col">
      <Album album={album} />
      <button
        className="pt-2 bg-lime-500 hover:bg-lime-700 text-white font-bold py-2"
        onClick={() => handleShowModal(album)}
      >
        Add
      </button>
    </div>
  );
};

export default AlbumGridComponent;
