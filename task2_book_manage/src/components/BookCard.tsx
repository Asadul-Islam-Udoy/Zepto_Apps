import { Book } from "../types/Book";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface Props {
  book: Book;
  isWishlisted: boolean;
  toggleWishlist: (book: Book) => void;
  animationDelay?: number; // optional stagger delay in ms
}

const BookCard = ({ book, isWishlisted, toggleWishlist, animationDelay = 0 }: Props) => {
  const coverImage =
    book.formats["image/jpeg"] || "https://via.placeholder.com/150x220?text=No+Cover";

  const [isVisible, setIsVisible] = useState(false);
  const [heartPop, setHeartPop] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), animationDelay);
    return () => clearTimeout(timeout);
  }, [animationDelay]);

  // Animate heart pop on toggle
  const onHeartClick = () => {
    setHeartPop(true);
    toggleWishlist(book);
    setTimeout(() => setHeartPop(false), 300);
  };

  return (
    <div
      className={`
        bg-white rounded-2xl shadow-lg overflow-hidden
        transform transition-all duration-500
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        hover:shadow-2xl hover:-translate-y-1 cursor-pointer
        flex flex-col
      `}
      style={{ willChange: "transform, opacity" }}
    >
      <Link to={`/book/${book.id}`} className="block overflow-hidden rounded-t-2xl">
        <img
          src={coverImage}
          alt={book.title}
          className="h-56 w-full object-cover
                     transition-transform duration-500 ease-in-out
                     hover:scale-105 hover:brightness-110"
          loading="lazy"
        />
      </Link>
      <div className="p-6 flex flex-col flex-grow">
        <h3
          className="text-lg font-semibold text-gray-900 truncate"
          title={book.title}
        >
          {book.title}
        </h3>
        <p
          className="mt-1 text-sm text-gray-600 truncate"
          title={book.authors?.[0]?.name || "Unknown Author"}
        >
          Author: {book.authors?.[0]?.name || "Unknown"}
        </p>
        <p
          className="mt-1 text-xs uppercase tracking-wide font-semibold text-indigo-600 truncate"
          title={book.subjects?.[0] || "Unknown Genre"}
        >
          {book.subjects?.[0] || "Unknown Genre"}
        </p>

        <div className="mt-auto flex justify-between items-center pt-5">
          <Link
            to={`/book/${book.id}`}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Details
          </Link>

          <button
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            onClick={onHeartClick}
            className="relative text-3xl select-none focus:outline-none"
          >
            <span
              className={`absolute inset-0 flex justify-center items-center
                transform transition-transform duration-300
                ${heartPop ? "scale-125" : "scale-100"}
                ${isWishlisted ? "opacity-100 text-red-500" : "opacity-0"}
              `}
            >
              ❤️
            </span>
            <span
              className={`relative transition-colors duration-300
                ${isWishlisted ? "opacity-0" : "opacity-100 text-gray-300 hover:text-red-400"}
              `}
            >
              🤍
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
