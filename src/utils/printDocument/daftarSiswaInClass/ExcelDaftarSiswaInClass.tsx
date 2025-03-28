import { StudentDetail } from "../../../interface/student.interface";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { convertTextStatus } from "../../myFunctions";

export const exportToExcelDaftarSiswaInClass = (
  siswa: StudentDetail[],
  kelas: string,
  jurusan: string,
  TA: string,
  waliKelas: string
) => {
  const fileName = `Daftar Siswa Kelas ${kelas} - TA ${TA}.xlsx`;
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Data Siswa");

  worksheet.mergeCells("A1", "K1");
  const titleRow1 = worksheet.getCell("A1");
  titleRow1.value = `Daftar Siswa Kelas ${kelas} TA ${TA}`;
  titleRow1.font = { size: 16, bold: true };
  titleRow1.alignment = { horizontal: "center" };

  worksheet.mergeCells("A2", "K2");
  const titleRow2 = worksheet.getCell("A2");
  titleRow2.value = `SMK Negeri 1 Lumban Julu`;
  titleRow2.font = { size: 14, bold: true };
  titleRow2.alignment = { horizontal: "center" };

  worksheet.addRow([]);
  worksheet.addRow([``, `Wali Kelas :`, waliKelas]);
  worksheet.addRow([``, `Kelas :`, kelas]);
  worksheet.addRow([``, `jurusan :`, jurusan]);
  worksheet.addRow([]);

  const headers = [
    "No",
    "Nama Siswa",
    "NIS",
    "NISN",
    "Kelas",
    "JK",
    "No.Telp",
    "Tempat\nTanggal Lahir",
    "Alamat",
    "Email",
    "Nama Orang\nTua/Wali",
    "Nomor Orang\nTua/Wali",
    "Status",
  ];
  worksheet.addRow(headers);

  siswa.forEach((item: StudentDetail, index: number) => {
    worksheet.addRow([
      index + 1,
      item.name,
      item.nis,
      item.nisn,
      kelas,
      item.gender,
      item.phone,
      item.birthPlace,
      item.address,
      item.email,
      item.ParentOfStudent[0]?.fatherName ||
        item.ParentOfStudent[0]?.motherName ||
        "-",
      item.ParentOfStudent[0]?.phone || "-",
      convertTextStatus(item.status),
    ]);
  });

  worksheet.getRow(8).eachCell((cell) => {
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
    if (rowNumber >= 8) {
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
    { width: 25 },
    { width: 15 },
    { width: 15 },
    { width: 10 },
    { width: 5 },
    { width: 15 },
    { width: 25 },
    { width: 25 },
    { width: 25 },
    { width: 25 },
    { width: 15 },
  ];

  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, fileName);
  });
};
