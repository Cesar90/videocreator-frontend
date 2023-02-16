import { toast } from 'material-react-toastify'

export const notify = (message: string | undefined) => {
  toast.dark(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
}

export const notifySuccess = (message: string | undefined) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
}
