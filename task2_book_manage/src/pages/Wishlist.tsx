import { useState, useEffect } from "react";
import { Book } from "../types/Book";
import BookCard from "../components/BookCard";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<Book[]>([]);

  useEffect(() => {
    setWishlist(JSON.parse(localStorage.getItem("wishlist") || "[]"));
  }, []);

  const toggleWishlist = (book: Book) => {
    const updated = wishlist.filter((b) => b.id !== book.id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-extrabold mb-8 text-indigo-700">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-500 text-center mt-20">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlist.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              isWishlisted={true}
              toggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
