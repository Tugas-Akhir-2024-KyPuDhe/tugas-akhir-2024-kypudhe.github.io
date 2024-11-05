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
    icon: 'success' | 'error' | 'warning' | 'info' | 'question';
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
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText,
      cancelButtonText,
    });
  };

  export const formatDateTime = (dateString: Date) => {
    const date = new Date(dateString);
    const options = new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });
    return options.format(date);
  }