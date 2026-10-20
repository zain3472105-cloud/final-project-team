
import { useEffect, useState } from "react";
import { Search, BookOpen, RefreshCw } from "lucide-react";
import PageLayout from "./PageLayout";
import "./BookCollection.css";

const API_URL = "https://openlibrary.org/search.json";

function BookCollection({ setCurrentPage }) {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);

  // Fetch books from Open Library
  async function fetchBooks(query = "fiction") {
    setLoading(true);
    setError("");
    setVisibleCount(10);

    try {
      const response = await fetch(
        `${API_URL}?q=${encodeURIComponent(query)}&limit=40`
      );

      if (!response.ok) {
        throw new Error("Unable to load books.");
      }

      const data = await response.json();

      const formattedBooks = (data.docs || []).map((book, index) => ({
        id: book.key || `book-${index}`,
        title: book.title || "Untitled",
        author: book.author_name?.[0] || "Unknown Author",
        year: book.first_publish_year || "Unknown",
        category: book.subject?.[0] || "General",
        image: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : "",
        status: "Available",
      }));

      setBooks(formattedBooks);
    } catch (err) {
      setError(
        "Books could not be loaded. Please check your internet connection and try again."
      );
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }

  // Load initial books
  useEffect(() => {
    fetchBooks("fiction");
  }, []);

  // Get unique categories
  const categories = [
    "All",
    ...new Set(books.map((book) => book.category)),
  ];

  // Filter books by title, author, and category
  const filteredBooks = books.filter((book) => {
    const searchText = search.trim().toLowerCase();

    const matchesSearch =
      book.title.toLowerCase().includes(searchText) ||
      book.author.toLowerCase().includes(searchText);

    const matchesCategory =
      category === "All" || book.category === category;

    return matchesSearch && matchesCategory;
  });

  // Search books
  function handleSearch(event) {
    event.preventDefault();

    const query = search.trim();

    setCategory("All");
    setVisibleCount(10);

    fetchBooks(query || "fiction");
  }

  // Refresh books
  function handleRefresh() {
    setVisibleCount(10);
    fetchBooks(search.trim() || "fiction");
  }

  // Change category
  function handleCategoryChange(event) {
    setCategory(event.target.value);
    setVisibleCount(10);
  }

  // Load more books
  function handleLoadMore() {
    setVisibleCount((count) => count + 10);
  }

  return (
    <PageLayout
      title="All Books"
      description="Explore, search, and discover books in your library."
      currentPage="books"
      setCurrentPage={setCurrentPage}
    >
      <div className="book-page">
        {/* Welcome Section */}
        <section className="book-welcome">
          <div className="book-welcome-icon">
            <BookOpen size={30} />
          </div>

          <div className="book-welcome-text">
            <h2>Discover Your Next Book</h2>
            <p>
              Explore books from different authors and subjects.
            </p>
          </div>
        </section>

        {/* Search and Filter Toolbar */}
        <section className="book-toolbar">
          <form className="book-search" onSubmit={handleSearch}>
            <Search size={19} aria-hidden="true" />

            <input
              type="search"
              placeholder="Search by title or author..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search books by title or author"
            />

            <button type="submit" disabled={loading}>
              Search
            </button>
          </form>

          <select
            className="book-category-filter"
            value={category}
            onChange={handleCategoryChange}
            aria-label="Filter books by category"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Categories" : item}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="book-refresh"
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw
              size={17}
              className={loading ? "refresh-spinning" : ""}
              aria-hidden="true"
            />
            <span>Refresh</span>
          </button>
        </section>

        {/* Book Collection */}
        <section className="book-section">
          <div className="book-section-heading">
            <div>
              <h2>Book Collection</h2>
              <p>
                Find your favorite books and explore new ideas.
              </p>
            </div>

            <span className="book-count">
              {filteredBooks.length} books
            </span>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="book-message" role="status">
              <RefreshCw size={22} className="refresh-spinning" />
              <p>Loading books...</p>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="book-message book-error" role="alert">
              <p>{error}</p>

              <button type="button" onClick={handleRefresh}>
                Try Again
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && filteredBooks.length === 0 && (
            <div className="book-message">
              <BookOpen size={32} />
              <h3>No books found</h3>
              <p>Try another title, author, or category.</p>
            </div>
          )}

          {/* Book Cards */}
          {!loading && !error && filteredBooks.length > 0 && (
            <>
              <div className="book-grid">
                {filteredBooks.slice(0, visibleCount).map((book) => (
                  <article className="book-card" key={book.id}>
                    <div className="book-image">
                      {book.image ? (
                        <img
                          src={book.image}
                          alt={`Cover of ${book.title}`}
                          loading="lazy"
                        />
                      ) : (
                        <div className="book-no-image">
                          <BookOpen size={38} />
                          <span>No cover available</span>
                        </div>
                      )}
                    </div>

                    <div className="book-card-content">
                      <span className="book-category">
                        {book.category}
                      </span>

                      <h3 className="book-title">{book.title}</h3>

                      <p className="book-author">
                        By {book.author}
                      </p>

                      <p className="book-year">
                        First published: {book.year}
                      </p>

                      <a
                        className="view-book-btn"
                        href={`https://openlibrary.org${book.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Book
                      </a>
                    </div>
                  </article>
                ))}
              </div>

              {/* Load More */}
              {visibleCount < filteredBooks.length && (
                <div className="book-load-more">
                  <button type="button" onClick={handleLoadMore}>
                    Load More Books
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {/* Books Table */}
        {!loading && !error && filteredBooks.length > 0 && (
          <section className="book-table-section">
            <div className="book-section-heading">
              <div>
                <h2>All Books</h2>
                <p>Browse book details in table format.</p>
              </div>
            </div>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Book Name</th>
                    <th>Category</th>
                    <th>Author</th>
                    <th>Status</th>
                    <th>Year</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredBooks
                    .slice(0, visibleCount)
                    .map((book) => (
                      <tr key={book.id}>
                        <td className="table-book">
                          {book.image ? (
                            <img
                              src={book.image}
                              alt=""
                              loading="lazy"
                            />
                          ) : (
                            <BookOpen size={22} />
                          )}

                          <span>{book.title}</span>
                        </td>

                        <td>{book.category}</td>
                        <td>{book.author}</td>

                        <td>
                          <span className="status available">
                            {book.status}
                          </span>
                        </td>

                        <td>{book.year}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </PageLayout>
  );
}

export default BookCollection;