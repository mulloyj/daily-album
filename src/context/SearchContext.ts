import { createContext, FormEvent } from "react";

export const SearchContext = createContext({
    submitSearch: (e: FormEvent<HTMLFormElement>, searchTerm: string) => { }
});