import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <nav>
        <h1>Navbar Here</h1>
      </nav>

      <main>
        <Outlet /> {/* Child routes render here */}
      </main>

      <footer>{/* Footer content */}</footer>
    </div>
  );
};

export default Layout;
