import React, { useCallback, useEffect, useRef } from "react";

export const DissmissableOverlay: React.FC<{ onClose: any }> = ({
  onClose,
  children,
}) => {
  const ref = useRef(null);

  const clickListener = useCallback(
    (e: MouseEvent) => {
      if (!(ref.current! as any).contains(e.target)) {
        onClose?.();
      }
    },
    // eslint-disable-next-line
    [ref.current]
  );
  useEffect(() => {
    document.addEventListener("click", clickListener);
    return () => {
      document.removeEventListener("click", clickListener);
    };
    // eslint-disable-next-line
  }, []);
  return <div ref={ref}>{children}</div>;
};
