import { FaCircle } from "react-icons/fa6";
import Swal from "sweetalert2";

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1100,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

interface ConfirmationDialogOptions {
  title: string;
  icon: "success" | "error" | "warning" | "info" | "question";
  confirmButtonText: string;
  cancelButtonText: string;
}

export const showConfirmationDialog = async ({
  title,
  icon,
  confirmButtonText,
  cancelButtonText,
}: ConfirmationDialogOptions) => {
  return Swal.fire({
    text: title,
    icon,
    showCancelButton: true,
    confirmButtonColor: "#1D7DC1",
    cancelButtonColor: "#DC3545",
    confirmButtonText,
    cancelButtonText,
  });
};

export const formatDate = (dateString: Date) => {
  const date = new Date(dateString);
  const options = new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  return options.format(date);
};

export const formatTime = (isoString: Date): string => {
  const date = new Date(isoString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const formatDateTime = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const formattedDate = date
    .toLocaleDateString("id-ID", options)
    .replace(/,/, "");
  const formattedTime = `${hours}:${minutes}`;
  return `${formattedDate} ${formattedTime} WIB`;
};

export const formatGender = (gender: string): string => {
  if (gender === "L") {
    return "Laki-laki";
  } else if (gender === "P") {
    return "Perempuan";
  } else {
    return "";
  }
};

export const convertStartEndYear = (startYear: Date): string => {
  const date = new Date(startYear);
  return date.toISOString().split("T")[0];
};

export const convertStatus = (status: string): JSX.Element => {
  return status === "Active" ? (
    <>
      <FaCircle className="text-success me-2" style={{ fontSize: "0.5rem" }} />
      Aktif
    </>
  ) : (
    <>
      <FaCircle className="text-danger me-2" style={{ fontSize: "0.5rem" }} />
      Non Aktif
    </>
  );
};

export const convertRole = (role: string): string => {
  return role === "STAFF" ? "Pegawai" : role == "TEACHER" ? "Guru" : "Siswa/i";
};

export const convertToRoman = (num: number): string => {
  if (num < 1 || num > 3999) {
    throw new Error("Angka harus berada antara 1 dan 3999");
  }

  const romanNumerals: [number, string][] = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  let result = "";
  for (const [value, symbol] of romanNumerals) {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }
  return result;
};

// Contoh penggunaan fungsi
const angka = 2024;
console.log(`Angka ${angka} dalam Romawi adalah: ${convertToRoman(angka)}`);
