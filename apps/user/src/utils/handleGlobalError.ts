// errorHandler.ts
import useToastStore from '@stores/toast.store';
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
    showToast({
      message: errorMessage,
      severity: 'error',
    });
  } else if (error instanceof Error) {
    showToast({
      message: error.message,
      severity: 'error',
    });
  } else {
    showToast({
      message: '알 수 없는 오류가 발생했습니다.',
      severity: 'error',
    });
  }

  throw error;
};
