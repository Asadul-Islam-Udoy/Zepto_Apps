import React, { useEffect, useState } from "react";
import { Book } from "../types/Book";
import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/LoadingSpinner";

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [wishlist, setWishlist] = useState<Book[]>(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true); // start loading
      try {
        const res = await fetch(
          `https://gutendex.com/books?page=${page}&search=${encodeURIComponent(
            search
          )}`
        );
        const data = await res.json();
        setBooks(data.results);
      } catch {
        setBooks([]);
      } finally {
        setLoading(false); // stop loading
      }
    }
    fetchBooks();
  }, [page, search]);

  const toggleWishlist = (book: Book) => {
    const exists = wishlist.find((b) => b.id === book.id);
    const updated = exists
      ? wishlist.filter((b) => b.id !== book.id)
      : [...wishlist, book];
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <input
        type="search"
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        placeholder="Search books by title..."
        className="w-full mb-8 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
      />

      {loading ? (
        <LoadingSpinner />
      ) : books.length === 0 ? (
        <p className="text-center text-gray-500 mt-20">No books found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              isWishlisted={wishlist.some((b) => b.id === book.id)}
              toggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      )}
      <div>
        <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
      </div>
    </div>
  );
};

export default Home;
