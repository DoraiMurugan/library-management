import { useEffect, useState } from "react";
import { getBooks } from "./services/api";
import BookForm from "./components/BookForm";
import BookTable from "./components/BookTable";
import "./index.css";

function App() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const res = await getBooks();
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="container">
      <h1>Library Book Management System</h1>
      <BookForm refresh={fetchBooks} />
      <BookTable books={books} refresh={fetchBooks} />
    </div>
  );
}

export default App;
