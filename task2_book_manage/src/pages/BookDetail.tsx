import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

interface Author {
  name: string;
}

interface Book {
  id: number;
  title: string;
  authors?: Author[];
  subjects?: string[];
  languages?: string[];
  download_count?: number;
  bookshelves?: string[];
  formats: Record<string, string>;
}

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetch(`https://gutendex.com/books/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data: Book) => {
        console.log("Fetched book data:", data); // Debug: check data structure
        setBook(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setBook(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-500 text-lg font-medium">
        Loading book details...
      </p>
    );
  }

  if (!book) {
    return (
      <div className="text-center mt-20">
        <p className="text-red-500 text-xl font-semibold mb-4">Book not found.</p>
        <Link to="/" className="text-indigo-600 hover:underline font-semibold">
          ← Back to book list
        </Link>
      </div>
    );
  }

  // Safely get the cover image URL, fallback to placeholder
  const coverImage =
    book.formats && typeof book.formats === "object" && book.formats["image/jpeg"]
      ? book.formats["image/jpeg"]
      : "https://via.placeholder.com/300x400?text=No+Image";

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-12 bg-white rounded-3xl shadow-lg flex flex-col md:flex-row gap-10">
      {/* Cover Image */}
      <div className="flex-shrink-0">
        <img
          src={coverImage}
          alt={book.title}
          className="rounded-3xl shadow-lg max-w-full h-auto object-cover"
          loading="lazy"
          draggable={false}
        />
      </div>

      {/* Book Info */}
      <div className="flex flex-col flex-grow text-gray-900">
        <h1
          className="text-4xl font-extrabold mb-6 text-indigo-700 leading-tight"
          title={book.title}
        >
          {book.title}
        </h1>

        <p className="text-lg mb-3">
          <span className="font-semibold">Author:</span>{" "}
          {book.authors && Array.isArray(book.authors) && book.authors.length > 0
            ? book.authors.map((a) => a.name).join(", ")
            : "Unknown"}
        </p>

        <p className="text-lg mb-3">
          <span className="font-semibold">Genre:</span>{" "}
          {book.subjects && Array.isArray(book.subjects) && book.subjects.length > 0
            ? book.subjects.join(", ")
            : "Unknown"}
        </p>

        {book.languages && Array.isArray(book.languages) && book.languages.length > 0 && (
          <p className="text-md mb-3 italic text-gray-600">
            Languages: {book.languages.join(", ").toUpperCase()}
          </p>
        )}

        <p className="text-md mb-6">
          <span className="font-semibold">Download Count:</span>{" "}
          {typeof book.download_count === "number"
            ? book.download_count.toLocaleString()
            : "N/A"}
        </p>

        {book.bookshelves && Array.isArray(book.bookshelves) && book.bookshelves.length > 0 && (
          <p className="mb-6 text-gray-700">
            <span className="font-semibold">Bookshelves:</span>{" "}
            {book.bookshelves.join(", ")}
          </p>
        )}

        <Link
          to="/"
          className="mt-auto inline-block text-indigo-600 hover:underline font-semibold"
        >
          ← Back to book list
        </Link>
      </div>
    </div>
  );
};

export default BookDetail;
