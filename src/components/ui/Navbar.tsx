interface Props {
  children: React.ReactNode;
}

const Navbar = ({ children }: Props) => {
  return <nav className="nav-bar">{children}</nav>;
};

export default Navbar;
