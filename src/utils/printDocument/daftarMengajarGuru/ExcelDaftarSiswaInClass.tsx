import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { CourseInClass } from "../../../interface/courseInClass.interface";

export const exportToExcelDaftarMengajarGuru = (
  data: CourseInClass[],
  TA: string,
  guru: string
) => {
  const fileName = `Jadwal Mengejar Guru - TA ${TA}.xlsx`;
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Data Siswa");

  worksheet.mergeCells("A1", "H1");
  const titleRow1 = worksheet.getCell("A1");
  titleRow1.value = `Jadwal Mengejar Guru - ${TA}`;
  titleRow1.font = { size: 16, bold: true };
  titleRow1.alignment = { horizontal: "center" };

  worksheet.mergeCells("A2", "H2");
  const titleRow2 = worksheet.getCell("A2");
  titleRow2.value = `SMK Negeri 1 Lumban Julu`;
  titleRow2.font = { size: 14, bold: true };
  titleRow2.alignment = { horizontal: "center" };

  worksheet.addRow([``, `Guru :`, guru]);

  const headers = [
    "No",
    "TA",
    "Kelas",
    "Mata Pelajaran",
    "Hari",
    "Mulai",
    "Selesai",
    "Total\nSiswa",
  ];
  worksheet.addRow(headers);

  data.forEach((item: CourseInClass, index: number) => {
    worksheet.addRow([
      index + 1,
      TA,
      item.class.name,
      item.courseDetail.name,
      item.day,
      item.timeStart,
      item.timeEnd,
      item.class.mainStudent.length,
    ]);
  });

  worksheet.getRow(4).eachCell((cell) => {
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
    if (rowNumber >= 5) {
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
    { width: 15 },
    { width: 15 },
    { width: 40 },
    { width: 15 },
    { width: 10 },
    { width: 10 },
    { width: 10 },
  ];

  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, fileName);
  });
};
