import { useState } from "react";
import { addBook } from "../services/api";

function BookForm({ refresh }) {
  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    publishedYear: "",
    availableCopies: ""
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    if (!book.title || !book.author) return alert("Fill all fields");

    await addBook({
      ...book,
      publishedYear: Number(book.publishedYear),
      availableCopies: Number(book.availableCopies)
    });

    setBook({
      title: "",
      author: "",
      category: "",
      publishedYear: "",
      availableCopies: ""
    });

    refresh();
  };

  return (
    <div className="card">
      <h3>Add New Book</h3>
      <input name="title" placeholder="Title" value={book.title} onChange={handleChange} />
      <input name="author" placeholder="Author" value={book.author} onChange={handleChange} />
      <input name="category" placeholder="Category" value={book.category} onChange={handleChange} />
      <input name="publishedYear" placeholder="Year" type='number' value={book.publishedYear} onChange={handleChange} />
      <input name="availableCopies" type='number' placeholder="Copies" value={book.availableCopies} onChange={handleChange} />
      <br />
      <button onClick={submit}>Add Book</button>
    </div>
  );
}

export default BookForm;
