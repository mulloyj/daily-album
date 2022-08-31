import { Dialog } from "@headlessui/react";
import Album from "../Album";
import { Album as AlbumType } from "@prisma/client";
import { trpc } from "../../utils/trpc";
import { useCallback } from "react";

interface Props {
  isOpen: boolean | undefined;
  onClose: () => void;
  album: AlbumType;
}

export const AlbumAddModal = ({ isOpen, onClose, album }: Props) => {
  const addMutation = trpc.useMutation(["album.addAlbum"]);

  const addAlbum = useCallback(() => {
    if (
      album.title === "" ||
      album.artist === "" ||
      album.image === "" ||
      album.link === ""
    )
      return;

    addMutation.mutate({
      title: album.title,
      artist: album.artist,
      image: album.image,
      link: album.link,
    });

    onClose();
  }, [album, addMutation]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded bg-white p-5">
          <Album album={album} />
          <div className="w-full h-full p-4 flex items-center justify-center">
            <button
              className="p-2 bg-lime-500 hover:bg-lime-700 text-white font-bold rounded"
              onClick={addAlbum}
            >
              Add this Album
            </button>
            <button
              className="ml-3 p-2 bg-lime-600 hover:bg-lime-700 text-white font-bold rounded"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
