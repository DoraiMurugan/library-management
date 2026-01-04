import { deleteBook } from "../services/api";

function BookTable({ books, refresh }) {
  const remove = async (id, copies) => {
    if (copies <= 1) {
      alert("Cannot delete book with available copies");
      return;
    }
    await deleteBook(id);
    refresh();
  };

  return (
    <div className="card">
      <h3>Available Books</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Year</th>
            <th>Copies</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>{book.publishedYear}</td>
              <td>{book.availableCopies}</td>
              <td>
                <button className="delete-btn"
                  onClick={() => remove(book.id, book.availableCopies)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookTable;
