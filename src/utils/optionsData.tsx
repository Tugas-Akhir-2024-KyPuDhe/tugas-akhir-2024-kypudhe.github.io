export const optionsStatus = [
  { value: "Active", label: "Aktif" },
  { value: "NonActive", label: "Non Aktif" },
];

export const optionsGrade = [
  { value: "X", label: "X" },
  { value: "XI", label: "XI" },
  { value: "XII", label: "XII" },
];

export const optionsStatusArticle = [
  { value: "PUBLISH", label: "PUBLISH" },
  { value: "DRAFT", label: "DRAFT" },
];

export const optionsPrioritas = Array.from({ length: 20 }, (_, index) => ({
  value: (index + 1).toString(),
  label: (index + 1).toString(),
}));

export const optionsGender = [
  { value: "L", label: "Laki-laki" },
  { value: "P", label: "Perempuan" },
];

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
const currentDay = String(currentDate.getDate()).padStart(2, "0");

export const optionsStartYear = Array.from({ length: 11 }, (_, index) => {
  const year = currentYear - 5 + index;
  const value = `${year}-${currentMonth}-${currentDay}`;
  return {
    value: value,
    label: year.toString(),
  };
});

export const optionsStatusPegawai = [
  { value: "ASN", label: "ASN" },
  { value: "P3K", label: "P3K" },
  { value: "GTT", label: "GTT" },
  { value: "GH", label: "GH" },
  { value: "PH", label: "PH" },
];

export const optionsRole = [
  { value: "TEACHER", label: "Guru" },
  { value: "STAFF", label: "Pegawai" },
];
