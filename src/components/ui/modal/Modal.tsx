import { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Content, StyledBackdrop, StyledModal } from "./Modal.styles";

const Backdrop = ({ onClose }: { onClose: () => void }) => {
  return <StyledBackdrop onClick={onClose} />;
};

const ModalOverlay = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledModal>
      <Content>{children}</Content>
    </StyledModal>
  );
};

const Modal = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) => {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalElement(document.getElementById("overlays"));
  }, []);

  if (!portalElement) return null;
  return (
    <Fragment>
      {portalElement &&
        ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {portalElement &&
        ReactDOM.createPortal(
          <ModalOverlay>{children}</ModalOverlay>,
          portalElement
        )}
    </Fragment>
  );
};

export default Modal;
