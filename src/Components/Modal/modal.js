import { useEffect, useState } from "react";

function Modal({ children, open }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <>
      {isOpen && (
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.5) ",
            backdropFilter: "blur(3px)",
          }}
          className={"absolute top-0 left-0 w-[100vw] h-[100vh] z-50 "}
        >
          {children}
        </div>
      )}
    </>
  );
}

export default Modal;
