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
  return date.toISOString().split('T')[0];
};

export const convertStatus = (status: string): string => {
  return status === "Active" ? "Aktif" : "Non Aktif";
};

