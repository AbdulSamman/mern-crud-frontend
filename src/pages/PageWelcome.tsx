import { useContext } from "react";
import { AppContext } from "../AppContext";
import { Helmet } from "react-helmet";

export const PageWelcome = () => {
  const {
    appTitle,
    books,
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
  } = useContext(AppContext);

  return (
    <div className="pageWelcome">
      <Helmet>
        <title>{appTitle} - Welcome</title>
      </Helmet>

      <p>There are {books.length} books.</p>
      {!isAdding ? (
        <button className="addBtn" type="button" onClick={handleToggleAddBook}>
          Add book
        </button>
      ) : (
        <form className="addedArea">
          <div className="column">
            <label>Title:</label>
            <input
              value={newBook.title}
              type="text"
              name="title"
              onChange={(e) =>
                handleAddBookFieldsChange("title", newBook, e.target.value)
              }
            />
          </div>
          <div className="column">
            <label>Description:</label>
            <textarea
              value={newBook.description}
              name="description"
              onChange={(e) =>
                handleAddBookFieldsChange(
                  "description",
                  newBook,
                  e.target.value
                )
              }
            />
          </div>
          <div className="column">
            <label> NumberOfPage: </label>
            <input
              type="text"
              name="numberOfPage"
              onChange={(e) =>
                handleAddBookFieldsChange(
                  "numberOfPage",
                  newBook,
                  e.target.value
                )
              }
            />
          </div>
          <div className="column">
            <label> Language: </label>
            <input
              value={newBook.language}
              type="text"
              name="language"
              onChange={(e) =>
                handleAddBookFieldsChange("language", newBook, e.target.value)
              }
            />
          </div>
          <div className="column">
            <label> Image URL: </label>
            <input
              type="text"
              name="imageUrl"
              onChange={(e) =>
                handleAddBookFieldsChange("imageUrl", newBook, e.target.value)
              }
            />
          </div>
          <div className="column">
            <label> Buy URL: </label>
            <input
              type="text"
              name="buyUrl"
              onChange={(e) =>
                handleAddBookFieldsChange("buyUrl", newBook, e.target.value)
              }
            />
          </div>
          <div className="buttons">
            <button type="button" onClick={handleToggleAddBook}>
              Cancel
            </button>
            <button type="button" onClick={handleSaveNewBook}>
              Save
            </button>
          </div>
        </form>
      )}

      <div className="books">
        {books.map((book) => {
          return (
            <div className="book" key={book._id}>
              <div className="image">
                <img src={book.imageUrl} />
              </div>
              {!book.isBeingEdited ? (
                <div className="showData">
                  <div className="title">
                    <a href={book.buyUrl.toString()} target="_blank">
                      {book.title}
                    </a>
                  </div>
                  <p className="description">{book.description}</p>
                  <span>{book.languageText}</span>
                  <div className="buttons">
                    <button
                      type="button"
                      onClick={() => handleDeleteBook(book)}
                    >
                      Delete
                    </button>
                    <button type="button" onClick={() => handleEditBook(book)}>
                      Edit
                    </button>
                  </div>
                </div>
              ) : (
                <form className="editArea">
                  <div className="row">
                    <label>title:</label>
                    <input
                      type="text"
                      value={book.originalEditFields.title}
                      name="title"
                      onChange={(e) =>
                        handleChangeEditBook("title", book, e.target.value)
                      }
                    />
                  </div>
                  <div className="row">
                    <label> description: </label>
                    <textarea
                      value={book.originalEditFields.description}
                      name="description"
                      onChange={(e) =>
                        handleChangeEditBook(
                          "description",
                          book,
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="row">
                    <label> language: </label>
                    <input
                      type="text"
                      value={book.originalEditFields.language}
                      name="language"
                      onChange={(e) =>
                        handleChangeEditBook("language", book, e.target.value)
                      }
                    />
                  </div>
                  <div className="buttons">
                    <button
                      type="button"
                      onClick={() => handleCancelEditBook(book)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveEditBook(book)}
                    >
                      Save
                    </button>
                  </div>
                </form>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
