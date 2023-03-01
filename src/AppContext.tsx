import { createContext } from "react";
import { useEffect, useState } from "react";
import { IAppContext, IAppProvider, IBook } from "./interfaces";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
  const [books, setBooks] = useState<IBook[]>([]);

  useEffect(() => {
    (async () => {
      const _books = (await axios.get(`${backendUrl}/books`)).data;
      setBooks(_books);
    })();
  }, []);

  const appTitle: string = "info site";
  return (
    <AppContext.Provider
      value={{
        books,
        appTitle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
