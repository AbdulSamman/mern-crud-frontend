export interface IAppProvider {
  children: React.ReactNode;
}

export interface IAppContext {
  books: IBook[];
  appTitle: string;
  handleEditBook: (book: IBook) => void;
  handleCancelEditBook: (book: IBook) => void;
  handleSaveEditBook: (book: IBook) => void;
  handleChangeEditBook: (
    fieldIdCode: string,
    book: IBook,
    value: string
  ) => void;
  handleToggleAddBook: () => void;
  isAdding: boolean;
  newBook: IEditBook;
  handleAddBookFieldsChange: (
    fieldIdCode: string,
    newBook: IEditBook,
    value: string
  ) => void;
  handleSaveNewBook: () => void;
  handleDeleteBook: (book: IBook) => void;
  password: string;
  loginAsAdmin: (onSuccess: () => void, onFailure: () => void) => void;
  adminIsLoggedIn: boolean;
  setPassword: (password: string) => void;
  logoutAsAdmin: () => void;
}
export interface IBook {
  _id: string;
  title: string;
  description: string;
  numberOfPages: number;
  language: string;
  imageUrl: string;
  buyUrl: String;
  languageText: string;
  isBeingEdited: boolean;
  originalEditFields: IEditBook;
}

export interface IEditBook {
  title: string;
  description: string;
  language: string;
}

export const blankNewBook: IEditBook = {
  title: "",
  description: "",
  language: "",
};
