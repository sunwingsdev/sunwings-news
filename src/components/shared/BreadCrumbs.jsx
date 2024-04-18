import { Link, useLocation } from "react-router-dom";

const BreadCrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((path) => path);
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb flex flex-row gap-1 capitalize">
        {pathnames.map((path, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return (
            <li
              key={index}
              className={`breadcrumbs flex flex-row ${isLast ? "active" : ""}`}
            >
              {isLast ? (
                <p className="text-black text-lg">{path}</p>
              ) : (
                <Link to={routeTo} className="text-blue-500 text-lg">
                  {path} /
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadCrumbs;
