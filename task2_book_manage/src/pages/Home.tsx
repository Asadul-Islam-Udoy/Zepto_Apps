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
  const [genreFilter, setGenreFilter] = useState<string>("All Genres");

  // Extract all unique genres from books for dropdown options
  const genres = React.useMemo(() => {
    const allSubjects = books.flatMap((b) => b.subjects || []);
    const uniqueSubjects = Array.from(new Set(allSubjects));
    uniqueSubjects.sort();
    return ["All Genres", ...uniqueSubjects];
  }, [books]);

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
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
        setLoading(false);
      }
    }
    fetchBooks();
  }, [page, search]);

  // Filter books by genreFilter before rendering
  const filteredBooks =
    genreFilter === "All Genres"
      ? books
      : books.filter((book) =>
          book.subjects?.some((subject) => subject === genreFilter)
        );

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
  <h1 className="text-3xl font-extrabold mb-6 text-indigo-700 text-center md:text-left">
    Explore Books
  </h1>

  <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-8">
    {/* Search */}
    <input
      type="search"
      value={search}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(1);
      }}
      placeholder="Search books by title..."
      className="w-full md:w-1/2 p-3 mb-4 md:mb-0 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 shadow-sm transition"
    />

    {/* Genre dropdown */}
    <select
      value={genreFilter}
      onChange={(e) => {
        setGenreFilter(e.target.value);
        setPage(1);
      }}
      className="w-full md:w-1/2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 shadow-sm transition"
    >
      {genres.map((genre) => (
        <option key={genre} value={genre}>
          {genre}
        </option>
      ))}
    </select>
  </div>

  {/* Content Grid */}
  {loading ? (
    <LoadingSpinner />
  ) : filteredBooks.length === 0 ? (
    <p className="text-center text-gray-500 mt-20 text-lg font-medium">No books found.</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {filteredBooks.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          isWishlisted={wishlist.some((b) => b.id === book.id)}
          toggleWishlist={toggleWishlist}
        />
      ))}
    </div>
  )}

  {/* Pagination */}
  <div className="mt-12 flex justify-center">
    <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
  </div>
</div>
  );
};

export default Home;
