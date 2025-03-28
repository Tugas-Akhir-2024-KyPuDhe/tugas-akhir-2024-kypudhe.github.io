import { StaffDetail } from "../../../interface/staff.interface";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const exportToExcelDaftarPegawai = (
  data: StaffDetail[],
  TA: string
): void => {
  const fileName = `Daftar Pegawai - TA ${TA}.xlsx`;
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Data Pegawai");

  worksheet.mergeCells("A1", "I1");
  const titleRow1 = worksheet.getCell("A1");
  titleRow1.value = `Daftar Pegawai - TA ${TA}`;
  titleRow1.font = { size: 16, bold: true };
  titleRow1.alignment = { horizontal: "center" };

  worksheet.mergeCells("A2", "I2");
  const titleRow2 = worksheet.getCell("A2");
  titleRow2.value = `SMK Negeri 1 Lumban Julu`;
  titleRow2.font = { size: 14, bold: true };
  titleRow2.alignment = { horizontal: "center" };

  worksheet.addRow([]);
  //   worksheet.addRow([]);
  //   worksheet.addRow([]);
  //   worksheet.addRow([]);
  //   worksheet.addRow([]);

  const headers = [
    "No",
    "Nama Pegawai",
    "Status\nPegawai",
    "NIP",
    "JK",
    "No.Telp",
    "Email",
    "Mapel",
    "Jabatan",
  ];
  worksheet.addRow(headers);

  data.forEach((item: StaffDetail, index: number) => {
    worksheet.addRow([
      index + 1,
      item.name,
      item.type,
      item.nip,
      item.gender,
      item.phone,
      item.email,
      item.mapel.length > 0 ? item.mapel : "",
      item.position,
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
    { width: 30 },
    { width: 10 },
    { width: 30 },
    { width: 5 },
    { width: 15 },
    { width: 20 },
    { width: 20 },
    { width: 30 },
  ];

  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, fileName);
  });
};
