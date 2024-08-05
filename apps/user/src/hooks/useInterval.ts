/**
 * 지정된 간격으로 반복적으로 호출되는 함수를 생성하기 위한 커스텀 훅입니다.
 *
 * @param callback - 지정된 간격으로 반복적으로 호출될 함수입니다.
 * @param delay - 각 콜백 호출 사이의 지연 시간(밀리초)입니다.
 */
import { useEffect, useRef } from 'react';

export default function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}
