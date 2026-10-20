
import { useState, useEffect } from "react";

import "./App.css";

import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Account from "./Account";
import BookCollection from "./BookCollection";
import BorrowedBooks from "./BorrowedBook";
import DueBook from "./DueBook";
import FindBook from "./findBook";
import FindLibrary from "./findLibrary";
import Categories from "./categories";
import FavoriteBook from "./favoriteBook";
import Members from "./members";
import Setting from "./Setting";
import Auth from "./Auth";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };
  if (!isLoggedIn) {
    return <Auth onLogin={() => setIsLoggedIn(true)} />;
  }
  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return (
          <Dashboard
            toggleSidebar={toggleSidebar}
            sidebarOpen={sidebarOpen}
            setCurrentPage={setCurrentPage}
          />
        );

      case "account":
        return (
          <Account
            toggleSidebar={toggleSidebar}
            sidebarOpen={sidebarOpen}
            setCurrentPage={setCurrentPage}
          />
        );

      case "books":
        return <BookCollection setCurrentPage={setCurrentPage} />;

      case "borrowed":
        return <BorrowedBooks setCurrentPage={setCurrentPage} />;

      case "findBook":
        return <FindBook setCurrentPage={setCurrentPage} />;

      case "due":
        return <DueBook setCurrentPage={setCurrentPage} />;

      case "findLibrary":
        return <FindLibrary setCurrentPage={setCurrentPage} />;

      case "categories":
        return <Categories setCurrentPage={setCurrentPage} />;

      case "members":
        return <Members setCurrentPage={setCurrentPage} />;

      case "favorite":
        return <FavoriteBook setCurrentPage={setCurrentPage} />;

      case "settings":
        return <Setting setCurrentPage={setCurrentPage} />;

      default:
        return (
          <Dashboard
            toggleSidebar={toggleSidebar}
            sidebarOpen={sidebarOpen}
            setCurrentPage={setCurrentPage}
          />
        );
    }
  };

  return (
    <div className="app">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <main
        className={`app-content ${
          sidebarOpen ? "sidebar-is-open" : "sidebar-is-closed"
        }`}
      >
        <button
          type="button"
          className="global-menu-toggle"
          onClick={toggleSidebar}
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          aria-expanded={sidebarOpen}
        >
          ☰
        </button>
        <div className="page-content">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default App;
