import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { StyleSheetManager } from "styled-components";
import { formatDateTime, showConfirmationDialog, Toast } from "../../../../utils/myFunctions";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { FaPen } from "react-icons/fa6";
import Select from "react-select";


const optionKelas = [
  { value: "X TKJ 1", label: "X TKJ 1" },
  { value: "XI TKJ 1", label: "XI TKJ 1" },
];

interface Siswa {
  name: string,
  tempat_lahir: string,
  tanggal_lahir: string,
  alamat: string,
  NIS: string,
  NISN: string,
  telepon: string,
  email: string,
  tahun_mulai: string,
  tahun_selesai: string,
  createdAt: string;
  photo?: string,
}

export const Table: React.FC = () => {
  const [data, setData] = useState<Siswa[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Add loading state

  const getData = async () => {
    try {
      // const response = await jurusanService.all();
      // setData(response.data);

      setData([
        {
          name: 'Rizky Fadillah',
          tempat_lahir: 'Medan',
          tanggal_lahir: '18 November 2002',
          alamat: 'Medan',
          NIS: '12345657',
          NISN: '123412341',
          telepon: '082222222222',
          email: 'rizky@mail.com',
          tahun_mulai: '2021',
          tahun_selesai: '2024',
          createdAt: new Date().toString(),
          photo: 'tes',
        },
        {
          name: 'Rizky Fadillah 2',
          tempat_lahir: 'Medan',
          tanggal_lahir: '18 November 2002',
          alamat: 'Medan',
          NIS: '12345657',
          NISN: '123412341',
          telepon: '082222222222',
          email: 'rizky@mail.com',
          tahun_mulai: '2021',
          tahun_selesai: '2024',
          createdAt: new Date().toString(),
          photo: 'tes',
        },
      ])
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (siswa: Siswa) => {
    const result = await showConfirmationDialog({
      title: "Ingin menghapus Siswa ini?",
      icon: "warning",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    console.log(siswa)

    if (result.isConfirmed) {
      setLoading(true); // Set loading to true when deletion starts
      try {
        // const response = await jurusanService.destroy(id);
        // if (response.status === 200) {
        //   getData();
          Toast.fire({
            icon: "success",
            title: "Siswa berhasil dihapus",
            timer: 4000,
          });
        // }
      } catch (error) {
        console.error("Error deleting Siswa:", error);
        Swal.fire("Gagal", "Terjadi kesalahan saat menghapus Siswa", "error");
      } finally {
        setLoading(false); // Set loading to false once the operation is complete
      }
    }
  };

  const columns = [
    {
      name: "No",
      cell: (_row: Siswa, index: number) => index + 1,
      width: "50px",
    },
    {
      name: "NIS",
      selector: (row: Siswa) => row.NIS,
    },
    {
      name: "NISN",
      selector: (row: Siswa) => row.NISN,
    },
    {
      name: "Nama",
      selector: (row: Siswa) => row.name,
    },
    {
      name: "Dibuat Pada",
      selector: (row: Siswa) => formatDateTime(row.createdAt),
      sortable: true,
    },
    {
      name: "Action",
      selector: (row: Siswa) => row.name,
      cell: (row: Siswa) => (
        <>
         
          <button
            className="btn btn-warning btn-sm text me-2 text-light"
            // onClick={() => navigate(`update/${row.id}`)}
            disabled={loading} 
          >
              <FaPen />
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(row)}
            disabled={loading} 
          >
              <FaTrash />
          </button>
        </>
      ),
    },
  ];

  const filteredData = data.filter((dt) =>
    dt.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getData();
  }, []);

  const handleSelectChange = (
    name: string,
    selectedOption: { value: string } | null
  ) => {
    console.log(name, selectedOption)
  };

  return (
    <div
      className="shadow p-4 m-1 m-lg-4 m-md-4 my-4 rounded"
      style={{ backgroundColor: "#fff", position: "relative" }}
    >
      {/* Show the loader overlay when loading */}
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      <div className="row d-flex justify-content-end">

        <div className="col-12 col-lg-4 col-md-3">
          <Select
            options={optionKelas}
            onChange={(option) => handleSelectChange("kelas", option)}
            placeholder="Pilih Kelas"
            className="form-control-lg px-0 pt-0"
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                fontSize: "0.955rem",
                borderRadius: "8px",
              }),
              option: (provided) => ({
                ...provided,
                fontSize: "0.955rem",
              }),
            }}
          />
        </div>

        <div className="col-12 col-lg-4 col-md-3">
          <input
            type="text"
            className="form-control border-dark"
            placeholder="Search.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ fontSize: "1.1em" }}
          />
        </div>
      </div>

      <StyleSheetManager>
        <DataTable
          columns={columns}
          data={searchTerm ? filteredData : data}
          pagination
          highlightOnHover
          customStyles={{
            rows: {
              style: {
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                  color: "#007bff",
                },
              },
            },
          }}
        />
      </StyleSheetManager>
    </div>
  );
};
