import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { Course } from "../../../interface/course.interface";
import { convertTextStatus } from "../../myFunctions";

export const exportToExcelDaftarMapel = (data: Course[], TA: string): void => {
  const fileName = `Daftar Mapel - TA ${TA}.xlsx`;
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Data Mapel");

  worksheet.mergeCells("A1", "E1");
  const titleRow1 = worksheet.getCell("A1");
  titleRow1.value = `Daftar Mapel - TA ${TA}`;
  titleRow1.font = { size: 16, bold: true };
  titleRow1.alignment = { horizontal: "center" };

  worksheet.mergeCells("A2", "E2");
  const titleRow2 = worksheet.getCell("A2");
  titleRow2.value = `SMK Negeri 1 Lumban Julu`;
  titleRow2.font = { size: 14, bold: true };
  titleRow2.alignment = { horizontal: "center" };

  worksheet.addRow([]);
  //   worksheet.addRow([]);
  //   worksheet.addRow([]);
  //   worksheet.addRow([]);
  //   worksheet.addRow([]);

  const headers = ["No", "Kode\nMapel", "Nama Mapel", "Tingkat", "Status"];
  worksheet.addRow(headers);

  data.forEach((item: Course, index: number) => {
    worksheet.addRow([
      index + 1,
      item.code,
      item.name,
      item.grade,
      convertTextStatus(item.status),
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
    if (rowNumber >= 4) {
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
    { width: 50 },
    { width: 7 },
    { width: 7 },
  ];

  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, fileName);
  });
};
