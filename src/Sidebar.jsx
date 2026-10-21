
import { BookOpen } from "lucide-react";
import "./Sidebar.css";

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  currentPage,
  setCurrentPage,
}) {
  const menuItems = [
    { id: "dashboard", icon: "🏠", label: "Dashboard" },
    { id: "findBook", icon: "🔍", label: "Find Book" },
    { id: "findLibrary", icon: "🏢", label: "Find Library" },
    { id: "books", icon: "📚", label: "All Books" },
    { id: "categories", icon: "🗂️", label: "Categories" },
    { id: "members", icon: "👥", label: "Members" },
    { id: "borrowed", icon: "📖", label: "Borrowed Books" },
    { id: "due", icon: "🕐", label: "Due Books" },
    { id: "favorite", icon: "❤️", label: "Favorite Books" },
    { id: "account", icon: "👤", label: "My Account" },
    { id: "settings", icon: "⚙️", label: "Settings" },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);

    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
 return (
    <>
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside
        id="library-sidebar"
        className={`sidebar ${sidebarOpen ? "open" : "closed"}`}
        aria-label="Library sidebar"
      >
<div className="sidebar-header">
  <div className="logo-container">
    <div className="logo-icon">
      <BookOpen size={28} strokeWidth={2.2} />
    </div>
    <span className="logo-text">My Library</span>
  </div>

  <button
    type="button"
    className="close-sidebar"
    onClick={() => setSidebarOpen(false)}
    aria-label="Close sidebar"
  >
  </button>
</div>
        <nav aria-label="Main navigation">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={currentPage === item.id ? "active" : ""}
              aria-current={
                currentPage === item.id ? "page" : undefined
              }
              onClick={(event) => {
                event.preventDefault();
                handlePageChange(item.id);
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="help">
          <b>?</b>
          <span>Need Help?</span>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;