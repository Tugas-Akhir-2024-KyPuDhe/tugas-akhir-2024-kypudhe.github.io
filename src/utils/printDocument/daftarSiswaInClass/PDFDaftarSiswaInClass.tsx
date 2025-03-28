import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font, 
  pdf,
} from "@react-pdf/renderer";
import { StudentDetail } from "../../../interface/student.interface";
import { convertTextStatus } from "../../myFunctions";

export const exportToPDFDaftarSiswaInClass = async (
  siswa: StudentDetail[],
  kelas: string,
  jurusan: string,
  TA: string,
  waliKelas: string
) => {
  const MyDocument = (
    <PDFDaftarSiswa
      siswa={siswa}
      TA={TA}
      jurusan={jurusan}
      kelas={kelas}
      waliKelas={waliKelas}
    />
  );
  const blob = await pdf(MyDocument).toBlob();
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank");
};

// Font Styles
Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxP.ttf",
});

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 15,
    fontSize: 8,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "extrabold",
    letterSpacing: "2px",
  },
  info: {
    marginBottom: 10,
    fontSize: 12,
  },
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
  },
  row: {
    flexDirection: "row",
    // borderBottomWidth: 1,
    // borderColor: "#000",
  },
  header: {
    fontWeight: "bold",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    fontSize: 10,
  },
  bodyCell: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    fontSize: 9,
  },
  colNo: {
    width: "4%",
  },
  col1: {
    width: "5%",
  },
  col2: {
    width: "10%",
  },
  col3: {
    width: "15%",
  },
  col4: {
    width: "20%",
  },
  col5: {
    width: "25%",
  },
  colAuto: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "auto",
  },
  colFull: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "100%",
  },
  // Gaya warna tambahan
  textPrimary: {
    color: "#007bff",
  },
  textSuccess: {
    color: "#28a745",
  },
  textDanger: {
    color: "#dc3545",
  },
  textWarning: {
    color: "#ffc107",
  },
  textInfo: {
    color: "#17a2b8",
  },
  textDark: {
    color: "#343a40",
  },
  textLight: {
    color: "#f8f9fa",
  },
  // Utility alignment
  textLeft: {
    textAlign: "left",
  },
  textCenter: {
    textAlign: "center",
  },
  textRight: {
    textAlign: "right",
  },
  // Background color utility
  bgPrimary: {
    backgroundColor: "#007bff",
    color: "#fff",
  },
  bgSuccess: {
    backgroundColor: "#28a745",
    color: "#fff",
  },
  bgDanger: {
    backgroundColor: "#dc3545",
    color: "#fff",
  },
  bgWarning: {
    backgroundColor: "#ffc107",
    color: "#000",
  },
  bgInfo: {
    backgroundColor: "#17a2b8",
    color: "#fff",
  },
  bgLight: {
    backgroundColor: "#f8f9fa",
    color: "#000",
  },
  bgDark: {
    backgroundColor: "#343a40",
    color: "#fff",
  },
  // Padding utilities
  paddingSmall: {
    padding: 4,
  },
  paddingMedium: {
    padding: 8,
  },
  paddingLarge: {
    padding: 12,
  },
  // Margin utilities
  marginSmall: {
    margin: 4,
  },
  marginMedium: {
    margin: 8,
  },
  marginLarge: {
    margin: 12,
  },
  // Border utilities
  borderNone: {
    border: "none",
  },
  borderSolid: {
    border: "1px solid #000",
  },
  borderDashed: {
    border: "1px dashed #CCC",
  },
  borderDotted: {
    border: "1px dotted #AAA",
  },
});

interface PDFProps {
  waliKelas: string;
  kelas: string;
  jurusan: string;
  TA: string;
  siswa: StudentDetail[];
}

const PDFDaftarSiswa: React.FC<PDFProps> = ({
  waliKelas,
  kelas,
  jurusan,
  siswa,
  TA,
}) => (
  <Document>
    <Page size="A3" style={styles.page} orientation="landscape">
      {/* Title */}

      <Text style={styles.title}>Daftar Siswa - TA {TA}</Text>
      <Text style={styles.title}>SMK Negeri 1 Lumban Julu</Text>

      {/* Info */}
      <View style={[styles.row]}>
        <Text style={[styles.info, styles.col2]}>Wali Kelas</Text>
        <Text style={[styles.info, styles.colAuto]}> : {waliKelas}</Text>
      </View>
      <View style={[styles.row]}>
        <Text style={[styles.info, styles.col2]}>Kelas</Text>
        <Text style={[styles.info, styles.colAuto]}> : {kelas}</Text>
      </View>
      <View style={[styles.row]}>
        <Text style={[styles.info, styles.col2]}>Jurusan</Text>
        <Text style={[styles.info, styles.colAuto]}> : {jurusan}</Text>
      </View>

      {/* Table Header */}
      <View style={styles.table}>
        <View style={[styles.bgWarning, styles.row]}>
          <Text style={[styles.header, styles.colNo, styles.textCenter]}>
            No
          </Text>
          <Text style={[styles.header, styles.col4]}>Nama Siswa</Text>
          <Text style={[styles.header, styles.col2]}>NIS</Text>
          <Text style={[styles.header, styles.col2]}>NISN</Text>
          <Text style={[styles.header, styles.col1]}>JK</Text>
          <Text style={[styles.header, styles.col2]}>No.Telp</Text>
          <Text style={[styles.header, styles.col2]}>Tempat Tanggal Lahir</Text>
          <Text style={[styles.header, styles.col2]}>Alamat</Text>
          <Text style={[styles.header, styles.col2]}>Email</Text>
          <Text style={[styles.header, styles.col3]}>Nama Orang Tua/Wali</Text>
          <Text style={[styles.header, styles.col2]}>Nomor Orang Tua/Wali</Text>
          <Text style={[styles.header, styles.col2]}>Status</Text>
        </View>

        {/* Table Body */}
        {siswa.map((item, index) => (
          <View style={styles.row} key={index}>
            <Text style={[styles.bodyCell, styles.colNo, styles.textCenter]}>
              {index + 1}
            </Text>
            <Text style={[styles.bodyCell, styles.col4]}>{item.name}</Text>
            <Text style={[styles.bodyCell, styles.col2]}>{item.nis}</Text>
            <Text style={[styles.bodyCell, styles.col2]}>{item.nisn}</Text>
            <Text style={[styles.bodyCell, styles.col1, styles.textCenter]}>
              {item.gender}
            </Text>
            <Text style={[styles.bodyCell, styles.col2]}>{item.phone}</Text>
            <Text style={[styles.bodyCell, styles.col2]}>
              {item.birthPlace}
            </Text>
            <Text style={[styles.bodyCell, styles.col2]}>{item.address}</Text>
            <Text style={[styles.bodyCell, styles.col2]}>{item.email}</Text>
            <Text style={[styles.bodyCell, styles.col3]}>
              {/* {item.ParentOfStudent[0]?.fatherName ||
                item.ParentOfStudent[0]?.motherName ||
                "-"} */}
            </Text>
            <Text style={[styles.bodyCell, styles.col2]}>
              {/* {item.ParentOfStudent[0]?.phone || "-"} */}
            </Text>
            <Text style={[styles.bodyCell, styles.col2, styles.textCenter]}>
              {convertTextStatus(item.status)}
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default PDFDaftarSiswa;
