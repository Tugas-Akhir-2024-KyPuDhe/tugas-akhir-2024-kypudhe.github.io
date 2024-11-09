import React, { useEffect, useState } from "react";
import { Artikel } from "../../interface/artikel.interface";
import ArtikelService from "../../services/artikelService";
import { CardBerita } from "../../components/cardBerita";
import { CardBeritaSkeleton } from "../../components/cardBeritaSkeleton";
import { HeaderArticle } from "../../features/articlePage/headerArticle";
import { showConfirmationDialog, Toast } from "../../utils/myFunctions";
import Swal from "sweetalert2";

export const ArticlePage: React.FC = () => {
  const articleService = ArtikelService();
  const [dataArtikel, setDataArtikel] = useState<Artikel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [keyword, setKeyword] = useState("");
  const itemsPerPage = 16;

  const getAllArtikel = async (page: number, keyword = "") => {
    setLoading(true);
    try {
      const response = await articleService.getAllArtikels(
        page,
        itemsPerPage,
        keyword
      );
      setDataArtikel(response.data);
      setTotalPages(response.last_page);
      setNoResults(response.data.length === 0);

      if (response.data.length > 0) {
        const totalData = response.total;
        setTotalPages(Math.ceil(totalData / itemsPerPage));
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const [loadingDeleteBerita, setLoadingDeleteBerita] = useState(false);
  const handleDeleteBerita = async (idArtikel: number) => {
    const result = await showConfirmationDialog({
      title: "Ingin menghapus Berita ini?",
      icon: "warning",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      setLoadingDeleteBerita(true);
      try {
        const response = await articleService.deleteArtikel(idArtikel);
        if (response.status === 200) {
          getAllArtikel(1);
          Toast.fire({
            icon: "success",
            title: "Berita/Artikel berhasil dihapus",
            timer: 4000,
          });
        }
      } catch (error) {
        console.error("Error deleting banner:", error);
        Swal.fire("Gagal", "Terjadi kesalahan saat menghapus banner", "error");
      } finally {
        setLoadingDeleteBerita(false);
      }
    }
  };

  const handleSearch = (keyword: string) => {
    setCurrentPage(1); // Reset ke halaman pertama saat pencarian
    getAllArtikel(1, keyword);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    getAllArtikel(page, keyword); // Pertahankan keyword saat mengganti halaman
  };

  useEffect(() => {
    getAllArtikel(currentPage, keyword); // Ambil artikel saat halaman berubah
  }, [currentPage]);

  return (
    <div className="m-1 m-lg-4 m-md-4 my-4">
      <HeaderArticle
        onSearch={handleSearch}
        keyword={keyword}
        setKeyword={setKeyword}
      />
      <section>
        <div className="container-fluid px-0">
          <div className="row g-3 d-flex" style={{ minHeight: "63vh" }}>
            {loading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <CardBeritaSkeleton key={index} />
                ))
              : dataArtikel.length > 0
              ? dataArtikel.map((data, index) => (
                  <div className="col-12 col-lg-3 col-md-6" key={index}>
                    <CardBerita
                      idArtikel={data.id}
                      uuidArtikel={data.uuid}
                      imageArtikel={
                        data.banner?.url ||
                        "https://plus.unsplash.com/premium_photo-1661772661721-b16346fe5b0f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVzc2luZXNzfGVufDB8fDB8fHww"
                      }
                      tipeArtikel={data.type}
                      dateArtikel={data.createdAt}
                      statusArtikel={data.status}
                      titleArtikel={data.title}
                      descArtikel={data.description}
                      handleDeleteBerita={handleDeleteBerita}
                      loadingDeleteBerita={loadingDeleteBerita}
                    />
                  </div>
                ))
              : !loading &&
                noResults && (
                  <div className="text-center my-4 d-flex align-items-center justify-content-center">
                    <p className="fs-4">Artikel tidak ditemukan.</p>
                  </div>
                )}
          </div>
          {dataArtikel.length > 0 && (
            <nav aria-label="Page navigation example" className="mt-4">
              <ul className="pagination justify-content-center">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Back
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                  <li
                    key={index + 1}
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </section>
    </div>
  );
};
