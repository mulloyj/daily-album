import { Album } from "@prisma/client";
import { createContext } from "react";

export const ResultsContext = createContext({
    handleShowModal: (album: Album) => { }
});