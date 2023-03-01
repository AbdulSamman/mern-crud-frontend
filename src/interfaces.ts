export interface IAppProvider {
  children: React.ReactNode;
}

export interface IAppContext {
  books: IBook[];
  appTitle: string;
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
}
