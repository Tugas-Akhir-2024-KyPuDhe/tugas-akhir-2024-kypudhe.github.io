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
import { CourseInClass } from "../../../interface/courseInClass.interface";

export const exportToPDFDaftarMengajarGuru = async (
  data: CourseInClass[],
  TA: string,
  guru: string
) => {
  const MyDocument = <PDFDaftarMengajarGuru data={data} TA={TA} guru={guru} />;
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
    fontSize: 16,
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
    fontSize: 17,
  },
  bodyCell: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    fontSize: 16,
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
  guru: string;
  TA: string;
  data: CourseInClass[];
}

const PDFDaftarMengajarGuru: React.FC<PDFProps> = ({ guru, TA, data }) => (
  <Document>
    <Page size="A3" style={styles.page} orientation="landscape">
      {/* Title */}

      <Text style={styles.title}>Jadwal Mengejar Guru - TA {TA}</Text>
      <Text style={styles.title}>SMK Negeri 1 Lumban Julu</Text>

      {/* Info */}
      <View style={[styles.row]}>
        <Text style={[styles.info, styles.col2]}>Guru</Text>
        <Text style={[styles.info, styles.colAuto]}> : {guru}</Text>
      </View>

      {/* Table Header */}
      <View style={styles.table}>
        <View style={[styles.bgWarning, styles.row]}>
          <Text style={[styles.header, styles.colNo, styles.textCenter]}>
            No
          </Text>
          <Text style={[styles.header, styles.col2]}>TA</Text>
          <Text style={[styles.header, styles.col2]}>Kelas</Text>
          <Text style={[styles.header, styles.colAuto]}>Mata Pelajaran</Text>
          <Text style={[styles.header, styles.col2]}>Hari</Text>
          <Text style={[styles.header, styles.col2]}>Mulai</Text>
          <Text style={[styles.header, styles.col2]}>Selesai</Text>
          <Text style={[styles.header, styles.col2]}>Total Siswa</Text>
        </View>

        {/* Table Body */}
        {data.map((item, index) => (
          <View style={styles.row} key={index}>
            <Text style={[styles.bodyCell, styles.colNo, styles.textCenter]}>
              {index + 1}
            </Text>
            <Text style={[styles.bodyCell, styles.col2]}>{TA}</Text>
            <Text style={[styles.bodyCell, styles.col2, styles.textCenter]}>
              {item.class.name}
            </Text>
            <Text style={[styles.bodyCell, styles.colAuto]}>
              {item.courseDetail.name}
            </Text>
            <Text style={[styles.bodyCell, styles.col2, styles.textCenter]}>
              {item.day}
            </Text>
            <Text style={[styles.bodyCell, styles.col2, styles.textCenter]}>
              {item.timeStart}
            </Text>
            <Text style={[styles.bodyCell, styles.col2, styles.textCenter]}>
              {item.timeEnd}
            </Text>
            <Text style={[styles.bodyCell, styles.col2, styles.textCenter]}>
              {item.class.student.length}
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default PDFDaftarMengajarGuru;
