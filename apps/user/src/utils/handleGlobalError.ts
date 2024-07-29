// errorHandler.ts
import useToastStore from '@store/toast.store';
import { AxiosError } from 'axios';

export const handleGlobalError = (error: unknown) => {
  const showToast = useToastStore.getState().showToast;

  if (error instanceof AxiosError) {
    let errorMessage = '오류 발생: ';
    if (error.response) {
      errorMessage += error.response.data?.message || error.response.statusText;
    } else {
      errorMessage += error.message;
    }
    showToast(errorMessage, 'error');
  } else if (error instanceof Error) {
    showToast(error.message, 'error');
  } else {
    showToast('An unknown error occurred', 'error');
  }

  throw error;
};
