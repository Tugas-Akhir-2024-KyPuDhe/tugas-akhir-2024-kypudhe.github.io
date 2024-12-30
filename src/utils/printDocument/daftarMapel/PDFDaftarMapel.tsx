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
import { Course } from "../../../interface/course.interface";
import { convertTextStatus } from "../../myFunctions";

export const exportToPDFDaftarMapel = async (data: Course[], TA: string) => {
  const MyDocument = <PDFDaftarMapel data={data} TA={TA} />;
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
    fontSize: 30,
    fontWeight: "bold",
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
    fontSize: 16,
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
  col6: {
    width: "30%",
  },
  col7: {
    width: "35%",
  },
  col8: {
    width: "40%",
  },
  col9: {
    width: "45%",
  },
  col10: {
    width: "50%",
  },
  col11: {
    width: "50%",
  },
  col12: {
    width: "60%",
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
    color: "#5CB338",
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
    backgroundColor: "#5CB338",
    color: "#000",
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
  data: Course[];
  TA: string;
}

const PDFDaftarMapel: React.FC<PDFProps> = ({ data, TA }) => (
  <Document>
    <Page size="A3" style={styles.page} orientation="landscape">
      {/* Title */}

      <Text style={styles.title}>Daftar Mapel - TA {TA}</Text>
      <Text style={[styles.title, { marginBottom: "10px" }]}>
        SMK Negeri 1 Lumban Julu
      </Text>

      {/* Table Header */}
      <View style={styles.table}>
        <View style={[styles.bgSuccess, styles.row]}>
          <Text style={[styles.header, styles.colNo, styles.textCenter]}>
            No
          </Text>
          <Text style={[styles.header, styles.col3]}>Kode Mapel</Text>
          <Text style={[styles.header, styles.colAuto]}>Nama Mapel</Text>
          <Text style={[styles.header, styles.col2]}>Tingkat</Text>
          <Text style={[styles.header, styles.col2]}>status</Text>
        </View>

        {/* Table Body */}
        {data.map((item, index) => (
          <View style={styles.row} key={index}>
            <Text style={[styles.bodyCell, styles.colNo, styles.textCenter]}>
              {index + 1}
            </Text>
            <Text style={[styles.bodyCell, styles.col3, styles.textCenter]}>
              {item.code}
            </Text>
            <Text style={[styles.bodyCell, styles.colAuto]}>{item.name}</Text>
            <Text style={[styles.bodyCell, styles.col2, styles.textCenter]}>
              {item.grade}
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

export default PDFDaftarMapel;
