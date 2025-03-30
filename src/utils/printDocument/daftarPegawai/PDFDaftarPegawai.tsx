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
import { StaffDetail } from "../../../interface/staff.interface";
import { Course } from "../../../interface/course.interface";

export const exportToPDFDaftarPegawai = async (
  data: StaffDetail[],
  allCourse: Course[]
) => {
  const MyDocument = (
    <PDFDaftarPegawai data={data} TA={"2024/2025"} allCourse={allCourse} />
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
  data: StaffDetail[];
  allCourse: Course[];
  TA: string;
}

const PDFDaftarPegawai: React.FC<PDFProps> = ({ data, TA, allCourse }) => {
  let rowCounter = 0;

  return (
    <Document>
      <Page size="A3" style={styles.page} orientation="landscape">
        <Text style={styles.title}>Daftar Pegawai - TA {TA}</Text>
        <Text style={[styles.title, { marginBottom: "10px" }]}>
          SMK Negeri 1 Lumban Julu
        </Text>

        <View style={styles.table}>
          <View style={[styles.bgSuccess, styles.row]}>
            <Text style={[styles.header, styles.colNo, styles.textCenter]}>No</Text>
            <Text style={[styles.header, styles.col4]}>Nama Pegawai</Text>
            <Text style={[styles.header, styles.col1]}>Status Pegawai</Text>
            <Text style={[styles.header, styles.col4]}>NIP</Text>
            <Text style={[styles.header, styles.col1]}>JK</Text>
            <Text style={[styles.header, styles.col2]}>No.Telp</Text>
            <Text style={[styles.header, styles.col3]}>Email</Text>
            <Text style={[styles.header, styles.col3]}>Mapel</Text>
            <Text style={[styles.header, styles.col2]}>Jabatan</Text>
          </View>

          {data.map((item) => {
            rowCounter++; // Increment counter untuk setiap staff

            // Handle staff tanpa mapel
            if (!item.mapel || item.mapel.length === 0) {
              return (
                <View style={styles.row} key={`${item.nip}-no-course`}>
                  <Text style={[styles.bodyCell, styles.bgSuccess, styles.colNo, styles.textCenter]}>
                    {rowCounter}
                  </Text>
                  <Text style={[styles.bodyCell, styles.col4]}>{item.name}</Text>
                  <Text style={[styles.bodyCell, styles.col1, styles.textCenter]}>{item.type}</Text>
                  <Text style={[styles.bodyCell, styles.col4]}>{item.nip}</Text>
                  <Text style={[styles.bodyCell, styles.col1, styles.textCenter]}>{item.gender}</Text>
                  <Text style={[styles.bodyCell, styles.col2, styles.textCenter]}>{item.phone}</Text>
                  <Text style={[styles.bodyCell, styles.col3, styles.textCenter]}>{item.email}</Text>
                  <Text style={[styles.bodyCell, styles.col3]}>-</Text>
                  <Text style={[styles.bodyCell, styles.col2]}>{item.position}</Text>
                </View>
              );
            }

            // Handle staff dengan mapel
            return item.mapel.map((mapelCode, courseIndex) => {
              const course = allCourse.find(c => c.code === mapelCode);
              
              return (
                <View style={styles.row} key={`${item.nip}-${mapelCode}-${courseIndex}`}>
                  {courseIndex === 0 ? (
                    <>
                      <Text style={[styles.bodyCell, styles.bgSuccess, styles.colNo, styles.textCenter]}>
                        {rowCounter}
                      </Text>
                      <Text style={[styles.bodyCell, styles.col4]}>{item.name}</Text>
                      <Text style={[styles.bodyCell, styles.col1, styles.textCenter]}>{item.type}</Text>
                      <Text style={[styles.bodyCell, styles.col4]}>{item.nip}</Text>
                      <Text style={[styles.bodyCell, styles.col1, styles.textCenter]}>{item.gender}</Text>
                      <Text style={[styles.bodyCell, styles.col2, styles.textCenter]}>{item.phone}</Text>
                      <Text style={[styles.bodyCell, styles.col3, styles.textCenter]}>{item.email}</Text>
                    </>
                  ) : (
                    <>
                      <Text style={[styles.bodyCell, styles.colNo, styles.bgSuccess]}></Text>
                      <Text style={[styles.bodyCell, styles.col4]}></Text>
                      <Text style={[styles.bodyCell, styles.col1]}></Text>
                      <Text style={[styles.bodyCell, styles.col4]}></Text>
                      <Text style={[styles.bodyCell, styles.col1]}></Text>
                      <Text style={[styles.bodyCell, styles.col2]}></Text>
                      <Text style={[styles.bodyCell, styles.col3]}></Text>
                    </>
                  )}
                  
                  <Text style={[styles.bodyCell, styles.col3]}>
                    {course ? `${course.name} (${course.grade})` : ``}
                  </Text>
                  
                  {courseIndex === 0 ? (
                    <Text style={[styles.bodyCell, styles.col2]}>{item.position}</Text>
                  ) : (
                    <Text style={[styles.bodyCell, styles.col2]}></Text>
                  )}
                </View>
              );
            });
          })}
        </View>
      </Page>
    </Document>
  );
};

export default PDFDaftarPegawai;
