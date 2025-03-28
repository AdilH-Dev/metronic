const Navbar = ({
  children
}) => {
  return <div className="flex flex-wrap items-center lg:items-end justify-between border-b border-b-gray-200 gap-5 pt-3 mb-5 lg:mb-7.5">
      {children}
    </div>;
};
export { Navbar };