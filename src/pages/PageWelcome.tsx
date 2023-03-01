import { useContext } from "react";
import { AppContext } from "../AppContext";
import { Helmet } from "react-helmet";

export const PageWelcome = () => {
  const { appTitle, books } = useContext(AppContext);
  console.log(books);

  return (
    <div className="pageWelcome">
      <Helmet>
        <title>{appTitle} - Welcome</title>
      </Helmet>

      <p>There are {books.length} books.</p>
      <button className="addBtn">Add book</button>

      <div className="books">
        {books.map((book) => {
          return (
            <div className="book" key={book._id}>
              <div className="image">
                <img src={book.imageUrl} />
              </div>
              <div className="row">
                <div className="title">
                  <a href={book.buyUrl.toString()} target="_blank">
                    {book.title}
                  </a>
                </div>
                <p className="description">{book.description}</p>
                <span>{book.languageText}</span>
                <div className="button">
                  <button>Delete</button>
                  <button>Edit</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
