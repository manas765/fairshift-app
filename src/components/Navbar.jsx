
function Navbar() {
  function scrollToDashboard() {
    document
      .getElementById("dashboard")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <nav className="navbar">
      <a className="logo" href="#home">
        Fair<span>Shift</span>
      </a>

      <div className="nav-links">
        <a href="#features">Features</a>
        <a href="#dashboard">Dashboard</a>
      </div>

      <button className="nav-button" onClick={scrollToDashboard}>
        Get started
      </button>
    </nav>
  );
}

export default Navbar;
