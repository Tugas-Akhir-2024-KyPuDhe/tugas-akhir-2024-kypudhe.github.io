// import { FaCircle } from "react-icons/fa6";
import moment from "moment/min/moment-with-locales";
import Swal from "sweetalert2";
import "moment/locale/id";
moment.locale("id");

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
    html: title,
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

export const convertStatusHistory = (status: string): JSX.Element => {
  return status.toLocaleLowerCase() === "active" ? (
    <>
      <span className="badge bg-blue">Aktif</span>
    </>
  ) : status.toLocaleLowerCase() === "naik kelas" ? (
    <>
      <span className="badge text-bg-success">{status}</span>
    </>
  ) : status.toLocaleLowerCase() === "new" ? (
    <>
      <span className="badge bg-blue">{status}</span>
    </>
  ) : status.toLocaleLowerCase() === "lulus" ? (
    <>
      <span className="badge text-bg-success">{status}</span>
    </>
  ) : (
    <>
      <span className="badge text-bg-danger">{status}</span>
    </>
  );
};

export const convertStatus = (status: string): JSX.Element => {
  return status === "Active" ? (
    <>
      <span className="badge text-bg-success">Aktif</span>
    </>
  ) : (
    <>
      <span className="badge text-bg-danger">Non Aktif</span>
    </>
  );
};

export const convertTextStatus = (status: string): string => {
  return status === "Active" ? "Aktif" : "Non Aktif";
};

export const convertStatusBerita = (status: string): JSX.Element => {
  if (status === "PUBLISH") {
    return (
      <>
        <span className="badge text-bg-success">Aktif</span>
      </>
    );
  } else if (status === "DRAFT") {
    return (
      <>
        <span className="badge text-bg-warning">Draft</span>
      </>
    );
  } else {
    return (
      <>
        <span className="badge text-bg-danger">Non Aktif</span>
      </>
    );
  }
};

export const convertRole = (role: string): string => {
  return role === "STAFF" ? "Pegawai" : role == "TEACHER" ? "Guru" : "Siswa/i";
};

export const numberToRoman = (num: number): string => {
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

export const romanToNumber = (roman: string): number => {
  const romanToNum: { [key: string]: number } = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };

  let result = 0;
  let i = 0;

  while (i < roman.length) {
    // Cek apakah dua karakter saat ini ada dalam map (untuk kasus seperti CM, CD, XC, dll.)
    if (i + 1 < roman.length && romanToNum[roman.substring(i, i + 2)]) {
      result += romanToNum[roman.substring(i, i + 2)];
      i += 2;
    } else {
      // Jika tidak, ambil satu karakter saja
      result += romanToNum[roman[i]];
      i += 1;
    }
  }

  return result;
};

export const decodeToken = (token: string) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join("")
  );
  return JSON.parse(jsonPayload);
};

export const statusAttendance = (status: number, complate = 0): string => {
  return status === 1
    ? complate
      ? "Hadir"
      : "H"
    : status == 2
    ? complate
      ? "Izin"
      : "I"
    : status == 3
    ? complate
      ? "Sakit"
      : "S"
    : status == 4
    ? complate
      ? "Alpa"
      : "A"
    : "";
};

export const bgColorAttendance = (status: number): string => {
  return status === 1
    ? "bg-success"
    : status == 2
    ? "bg-warning"
    : status == 3
    ? "bg-warning"
    : status == 4
    ? "bg-danger"
    : "";
};

export const badgeStatusHistory = (data: string): string => {
  const lowerCaseData = data.toLocaleLowerCase();
  if (lowerCaseData === "aktif") {
    return "bg-blue";
  } else if (lowerCaseData === "lulus") {
    return "bg-blue";
  } else if (lowerCaseData === "naik kelas") {
    return "text-bg-success";
  } else {
    return "text-bg-danger";
  }
};

export const formatMonthAndYear = (dateString: string) => {
  return moment(dateString, "YYYY-MM").locale("id").format("MMMM YYYY");
};

export const formatTanggal = (inputDate: string) => {
  const tanggal = moment(inputDate);
  const formattedDate = tanggal.format("dddd, DD MMM YYYY");
  return formattedDate;
};

export const getDayNow = () => {
  const hariIni = moment().format("dddd");
  return hariIni;
};

export const getDayMonth = () => {
  const hariIni = moment().format("MMMM");
  return hariIni;
};

export const toolbarOptions = [
  [{ header: "1" }, { header: "2" }, { font: [] }],
  [{ size: ["small", false, "large", "huge"] }],
  ["bold", "italic", "underline", "strike", "blockquote"],
  [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
  ["link", "image", "video"],
  [{ align: [] }, { color: [] }, { background: [] }],
  ["clean"],
];

export const convertToPercentage = (value: string) => {
  const floatValue = parseFloat(value);
  if (isNaN(floatValue)) return "0%";
  return `${(floatValue * 100).toFixed(0)}%`;
};

export const convertStatusProblem = (status: string): JSX.Element => {
  switch (status.toLowerCase()) {
    case "baru":
      return <span className="badge text-bg-secondary">Baru</span>;
    case "pending":
      return <span className="badge text-bg-warning text-light">Pending</span>;
    case "perbaikan":
      return <span className="badge text-bg-info text-light">Perbaikan</span>;
    case "selesai":
      return <span className="badge text-bg-success">Selesai</span>;
    case "ditolak":
      return <span className="badge text-bg-danger">Ditolak</span>;
    default:
      return <span className="badge text-bg-light">Unknown</span>;
  }
};

export const convertStatusStudyTracer = (status: string): JSX.Element => {
  switch (status.toLowerCase()) {
    case "pending":
      return <span className="badge text-bg-warning text-light">Pending</span>;
    case "disetujui":
      return (
        <span className="badge text-bg-success text-light">Disetujui</span>
      );
    case "ditolak":
      return <span className="badge text-bg-danger">Ditolak</span>;
    default:
      return <span className="badge text-bg-light">Unknown</span>;
  }
};

export function getWeekDateRange(date: Date | string = new Date()) {
  const referenceDate = typeof date === "string" ? new Date(date) : date;

  const dayOfWeek = referenceDate.getDay(); // 0 (Minggu) sampai 6 (Sabtu)
  const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const monday = new Date(referenceDate);
  monday.setDate(referenceDate.getDate() - diffToMonday);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  // Format tanggal ke YYYY-MM-DD
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return {
    startDate: formatDate(monday),
    endDate: formatDate(sunday),
  };
}

// Mendapatkan rentang tanggal minggu ini (Senin-Minggu)
export function getCurrentWeekDateRange() {
  return getWeekDateRange(new Date());
}

// Mendapatkan rentang tanggal minggu berikutnya atau sebelumnya
export function getNextWeekDateRange(
  currentStartDate: string,
  direction: number = 1
) {
  const monday = new Date(currentStartDate);
  monday.setDate(monday.getDate() + direction * 7);

  return getWeekDateRange(monday);
}

export const getDayFromNo = (no: number, full: boolean = false) => {
  switch (no) {
    case 1:
      return `${full ? "Senin" : "S"} `;
    case 2:
      return `${full ? "Selasa" : "S"} `;
    case 3:
      return `${full ? "Rabu" : "R"} `;
    case 4:
      return `${full ? "Kamis" : "K"} `;
    case 5:
      return `${full ? "Jumat" : "J"} `;
    case 6:
      return `${full ? "Sabtu" : "S"} `;
    case 7:
      return `${full ? "Minggu" : "M"} `;
    default:
      return "Tidak Diketahui";
  }
};

export const convertStatusClass = (status: number): JSX.Element => {
  switch (status) {
    case 1:
      return <span className="badge bg-blue text-light">Aktif</span>;
    case 2:
      return <span className="badge text-bg-success text-light">Selesai</span>;
    default:
      return <span className="badge text-bg-light">Unknown</span>;
  }
};