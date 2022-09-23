import { useEffect } from "react";
import { Box, ButtonGroup, Overlay } from "./Dialog.styled";
import { disablePageScroll, enablePageScroll } from "../../browser-utils";
const Dialog = ({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) => {
  useEffect(() => {
    disablePageScroll();
    return () => {
      enablePageScroll();
    };
  });

  return (
    <Overlay
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onCancel();
        }
      }}>
      <Box>
        Confirmer l'action ?
        <ButtonGroup>
          <button onClick={onConfirm}>Confirmer</button>
          <button onClick={onCancel}>Annuler</button>
        </ButtonGroup>
      </Box>
    </Overlay>
  );
};

export default Dialog;
