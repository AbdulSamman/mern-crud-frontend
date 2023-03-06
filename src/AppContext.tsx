import { createContext } from "react";
import { useEffect, useState } from "react";
import {
  IAppContext,
  IAppProvider,
  IBook,
  IEditBook,
  blankNewBook,
} from "./interfaces";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
  const appTitle: string = "info site";
  const [books, setBooks] = useState<IBook[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newBook, setNewBook] = useState<IEditBook>(blankNewBook);
  const [password, setPassword] = useState("");
  const [adminIsLoggedIn, setAdminIsLoggedIn] = useState(false);

  // load newBooks after adding newBook

  const loadBooks = async () => {
    (async () => {
      const _books: IBook[] = [];
      const _rawBooks = (await axios.get(`${backendUrl}/books`)).data;
      _rawBooks.forEach((rawBook: any) => {
        const _newBook: IBook = {
          ...rawBook,
          isBeingEdited: false,
          originalEditFields: {
            title: rawBook.title,
            description: rawBook.description,
            language: rawBook.language,
          },
        };
        _books.push(_newBook);
      });
      setBooks(_books);
    })();
  };

  useEffect(() => {
    loadBooks();
  }, []);

  // data from backend with some adds
  useEffect(() => {
    (async () => {
      const _rawBooks = (await axios.get(`${backendUrl}/books`)).data;
      const _books: IBook[] = [];
      _rawBooks.forEach((rawBook: any) => {
        const book: IBook = {
          ...rawBook,
          isBeingEdited: false,
          originalEditFields: {
            title: rawBook.title,
            description: rawBook.description,
            language: rawBook.language,
          },
        };
        _books.push(book);
      });

      setBooks(_books);
    })();
  }, []);

  // edit btn
  const handleEditBook = (book: IBook) => {
    book.isBeingEdited = true;
    setBooks([...books]);
  };

  // cancel btn
  const handleCancelEditBook = (book: IBook) => {
    book.isBeingEdited = false;
    // to reset any values that were changed
    book.originalEditFields = {
      title: book.title,
      description: book.description,
      language: book.language,
    };
    setBooks([...books]);
  };

  // save btn
  const handleSaveEditBook = async (book: IBook) => {
    try {
      // save  in backend
      await axios.patch(
        `${backendUrl}/book/${book._id}`,
        {
          title: book.originalEditFields.title,
          description: book.originalEditFields.description,
          language: book.originalEditFields.language,
        },
        { withCredentials: true }
      );
      // if saved in backend, update in frontend
      book.title = book.originalEditFields.title;
      book.description = book.originalEditFields.description;
      book.language = book.originalEditFields.language;

      setBooks([...books]);
      book.isBeingEdited = false;
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  // inputs
  const handleChangeEditBook = (
    fieldIdCode: string,
    book: IBook,
    value: string
  ) => {
    book.originalEditFields[fieldIdCode as keyof IEditBook] = value;
    setBooks([...books]);
  };

  // delete BTN

  const handleDeleteBook = async (book: IBook) => {
    try {
      await axios.delete(`${backendUrl}/book/${book._id}`, {
        withCredentials: true,
      });
      const _books = books.filter((m: IBook) => m._id !== book._id);
      setBooks(_books);
    } catch (error) {}
  };

  // add BTN new Book
  const handleToggleAddBook = () => {
    setNewBook({ ...blankNewBook });
    setIsAdding(!isAdding);
  };

  // newBook inputs

  const handleAddBookFieldsChange = (
    fieldIdCode: string,
    newBook: IEditBook,
    value: string
  ) => {
    newBook[fieldIdCode as keyof IEditBook] = value;
    setNewBook({ ...newBook });
  };

  // post a newBook by click

  const handleSaveNewBook = async () => {
    try {
      await axios.post(
        `${backendUrl}/book`,
        {
          title: newBook.title,
          description: newBook.description,
          language: newBook.language,
          numberOfPages: 0,
          imageUrl:
            "https://edwardtanguay.vercel.app/share/images/books/no-image.jpg",
          buyUrl: "",
        },
        { withCredentials: true }
      );
      loadBooks();
      setIsAdding(false);
      setNewBook({ ...blankNewBook });
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const loginAsAdmin = async (onSuccess: () => void, onFailure: () => void) => {
    try {
      await axios.post(
        `${backendUrl}/login`,
        { password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setAdminIsLoggedIn(true);
      onSuccess();
    } catch (error: any) {
      switch (error.code) {
        case "ERR_BAD_REQUEST":
          onFailure();
          break;
        default:
          break;
      }
      setAdminIsLoggedIn(false);
    }
    setPassword("");
  };

  const logoutAsAdmin = () => {
    (async () => {
      try {
        setAdminIsLoggedIn(false);
        await axios.get(`${backendUrl}/logout`, { withCredentials: true });
      } catch (error) {
        console.log("GENERAL ERROR");
      }
    })();
  };

  return (
    <AppContext.Provider
      value={{
        books,
        appTitle,
        handleEditBook,
        handleCancelEditBook,
        handleSaveEditBook,
        handleChangeEditBook,
        handleToggleAddBook,
        isAdding,
        newBook,
        handleAddBookFieldsChange,
        handleSaveNewBook,
        handleDeleteBook,
        password,
        loginAsAdmin,
        adminIsLoggedIn,
        setPassword,
        logoutAsAdmin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
