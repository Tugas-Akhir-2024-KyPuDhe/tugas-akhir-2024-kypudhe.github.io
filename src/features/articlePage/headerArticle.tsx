import React from "react";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import useCookie from "react-use-cookie";

interface HeaderArticleProps {
  onSearch: (keyword: string) => void;
  keyword: string;
  setKeyword: (keyword: string) => void;
}

export const HeaderArticle: React.FC<HeaderArticleProps> = ({
  onSearch,
  keyword,
  setKeyword,
}) => {
  const [cookieLogin] = useCookie("userLoginCookie");
  const userLoginCookie = cookieLogin ? JSON.parse(cookieLogin) : null;

  const handleSearchClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onSearch(keyword);
  };

  return (
    <div className="row g-4 d-flex justify-content-between mb-3">
      <div className="col-12 col-lg-6 col-md-6">
        <div className="row d-flex">
          {userLoginCookie.role === "STAFF" && (
            <div className="col-auto">
              <Link to="/tambah-berita" className="btn btn-primary border-0 bg-blue">
                <MdAdd className="display-6" />
              </Link>
            </div>
          )}

          <div className="col">
            <div className="">
              <div className="fw-bold fs-5 text-dark-soft">Berita/Artikel</div>
              <div className="">Berita dan artikel SMKN 1 Lumban Julu</div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-6 col-md-6">
        <form onSubmit={handleSearchClick}>
          <div className="input-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Cari Berita atau Artikel Disini.."
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)} 
            />
            <button type="submit" className="btn btn-primary border-0 bg-blue">
              Cari
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
