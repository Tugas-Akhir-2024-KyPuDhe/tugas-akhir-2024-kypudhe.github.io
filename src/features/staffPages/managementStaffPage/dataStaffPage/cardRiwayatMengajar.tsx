import React from "react";
import { CourseInClass } from "../../../../interface/courseInClass.interface";
import DataTable from "react-data-table-component";

interface CardProps {
  data: CourseInClass[];
}

export const CardRiwayatMengajar: React.FC<CardProps> = ({ data }) => {
    const columns = [
        {
          name: "No",
          cell: (_row: CourseInClass, index: number) => index + 1,
          width: "50px",
        },
        {
          name: "Mata Pelajaran",
          cell: (row: CourseInClass) => row.courseDetail.name,
          selector: (row: CourseInClass) => row.courseDetail.name,
          sortable: true,
        },
        {
          name: "Kelas",
          selector: (row: CourseInClass) => row.class.name,
          cell: (row: CourseInClass) => row.class.name,
          sortable: true,
        },
        {
          name: "Tahun Ajaran",
          selector: (row: CourseInClass) => row.class.academicYear,
          cell: (row: CourseInClass) => row.class.academicYear,
          sortable: true,
        },
      ];
      
  return (
    <div>
      <div className="fw-bold fs-5 mb-4 text-dark-soft position-relative pb-2">
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "50px",
            height: "5px",
            backgroundColor: "var(--blue-color)",
          }}
        />
        Riwayat Mengejar Guru
      </div>
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        className="mt-3"
        customStyles={{
          rows: {
            style: {
              "&:hover": {
                backgroundColor: "#f5f5f5",
                color: "#007bff",
              },
            },
          },
          headCells: {
            style: {
              backgroundColor: "var(--blue-color)",
              color: "#ffffff",
              fontWeight: "bold",
              textAlign: "center",
              border: "0.1px solid #ddd",
            },
          },
        }}
      />
    </div>
  );
};
