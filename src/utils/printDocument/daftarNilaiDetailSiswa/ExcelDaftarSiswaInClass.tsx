import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { CourseInClass } from "../../../interface/courseInClass.interface";

export const exportToExcelDaftarNilaiDetailSiswa = (
  data: CourseInClass[],
  nis: string,
  nama: string,
  nilaiAkhir: string,
  nilaiAngka: string,
  kelas: string,
  jurusan: string,
  TA: string,
  waliKelas: string
) => {
  const fileName = `Daftar Nilai Siswa - TA ${TA}.xlsx`;
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Data Siswa");

  worksheet.mergeCells("A1", "K1");
  const titleRow1 = worksheet.getCell("A1");
  titleRow1.value = `Daftar Nilai Siswa TA ${TA}`;
  titleRow1.font = { size: 16, bold: true };
  titleRow1.alignment = { horizontal: "center" };

  worksheet.mergeCells("A2", "K2");
  const titleRow2 = worksheet.getCell("A2");
  titleRow2.value = `SMK Negeri 1 Lumban Julu`;
  titleRow2.font = { size: 14, bold: true };
  titleRow2.alignment = { horizontal: "center" };

  worksheet.addRow([]);
  worksheet.addRow([``, `Wali Kelas :`, waliKelas]);
  worksheet.addRow([``, `Nama Siswa :`, nama]);
  worksheet.addRow([``, `NIS Siswa :`, nis]);
  worksheet.addRow([``, `Kelas :`, kelas]);
  worksheet.addRow([``, `Jurusan :`, jurusan]);
  worksheet.addRow([]);

  const headers = [
    "No",
    "Mata Pelajaran",
    "Nilai\nTugas",
    "Nilai\nUH",
    "Nilai\nPTS",
    "Nilai\nPAS",
    "Nilai\nPortfolio",
    "Nilai\nProyek",
    "Nilai\nAkhir",
    "Nilai\nHuruf",
    "Keterangan",
  ];
  worksheet.addRow(headers);

  data.forEach((item: CourseInClass, index: number) => {
    worksheet.addRow([
      index + 1,
      item.courseDetail.name,
      (item.courseDetail.StudentsGrades![0] &&
        (item.courseDetail.StudentsGrades![0].task || "-")) ||
        "-",
      (item.courseDetail.StudentsGrades![0] &&
        (item.courseDetail.StudentsGrades![0].UH || "-")) ||
        "-",
      (item.courseDetail.StudentsGrades![0] &&
        (item.courseDetail.StudentsGrades![0].PTS || "-")) ||
        "-",
      (item.courseDetail.StudentsGrades![0] &&
        (item.courseDetail.StudentsGrades![0].PAS || "-")) ||
        "-",
      (item.courseDetail.StudentsGrades![0] &&
        (item.courseDetail.StudentsGrades![0].portofolio || "-")) ||
        "-",
      (item.courseDetail.StudentsGrades![0] &&
        (item.courseDetail.StudentsGrades![0].proyek || "-")) ||
        "-",
      nilaiAkhir,
      nilaiAngka,
      (item.courseDetail.StudentsGrades![0] &&
        (item.courseDetail.StudentsGrades![0].description || "-")) ||
        "-",
    ]);
  });

  worksheet.getRow(10).eachCell((cell) => {
    cell.font = { bold: true };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFD700" },
    };
    cell.alignment = {
      horizontal: "center",
      vertical: "middle",
      wrapText: true,
    };
    cell.border = {
      top: { style: "thin", color: { argb: "000000" } },
      left: { style: "thin", color: { argb: "000000" } },
      bottom: { style: "thin", color: { argb: "000000" } },
      right: { style: "thin", color: { argb: "000000" } },
    };
  });

  worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    if (rowNumber >= 10) {
      row.eachCell({ includeEmpty: true }, (cell) => {
        cell.border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };
      });
    }
  });

  worksheet.columns = [
    { width: 5 },
    { width: 30 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 30 },
  ];

  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, fileName);
  });
};
