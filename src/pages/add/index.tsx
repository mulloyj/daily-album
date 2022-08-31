import { useSession, signIn } from "next-auth/react";
import { FormEvent } from "react";
import { Album } from "@prisma/client";

import Navbar from "../../components/Navbar";
import Search from "../../components/add/Search";
import AlbumGridComponent from "../../components/add/AlbumGridComponent";
import { SearchContext } from "../../context/SearchContext";
import { useState } from "react";
import { ResultsContext } from "../../context/ResultsContext";
import { AlbumAddModal } from "../../components/add/AlbumAddModal";

function Add<FunctionComponent>() {
  const { data: session } = useSession();
  const [searchResult, setSearchResult] = useState([]);
  const [modalAlbum, setModalAlbum] = useState({
    title: "",
    artist: "",
    image: "",
    link: "",
  });
  const [showAddModal, setShowAddModal] = useState(false);

  const submitSearch = async (
    e: FormEvent<HTMLFormElement>,
    searchTerm: string
  ) => {
    const url = `/api/search?${new URLSearchParams({
      q: searchTerm,
    })}`;

    const result = await fetch(url).then((res) => res.json());

    setSearchResult(result.albums.items);
  };

  const handleShowModal = (album: Album) => {
    setModalAlbum(album);
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  if (session) {
    return (
      <>
        <div>
          <Navbar />
          <SearchContext.Provider value={{ submitSearch }}>
            <div className="pt-3 w-1/2 m-auto items-center jusify-center">
              <Search />
            </div>
          </SearchContext.Provider>
          <ResultsContext.Provider value={{ handleShowModal }}>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 p-3">
              {searchResult?.map((data: any) => {
                const album = {
                  title: data.name,
                  artist: data.artists[0].name,
                  image: data.images[0].url,
                  link: data.uri,
                };
                return <AlbumGridComponent key={data.id} album={album} />;
              })}
            </div>
          </ResultsContext.Provider>
        </div>
        <AlbumAddModal
          isOpen={showAddModal}
          onClose={handleCloseAddModal}
          album={modalAlbum}
        />
      </>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-auto flex-col items-center justify-center">
        You need to be logged in to add an Album
        <button
          className="w-fit bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={() => signIn("spotify")}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Add;
