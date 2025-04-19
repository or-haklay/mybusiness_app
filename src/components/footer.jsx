import Logo from "./common/logo";

function Footer() {
  return (
    <footer className="footer mt-auto py-2 bg-success text-white text-center ">
      <div className="container text-center"></div>
      <div className="container text-center">
        <Logo />
        <span className=""> &copy; 2025</span>
      </div>
    </footer>
  );
}

export default Footer;
