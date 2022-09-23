import { Box, ButtonGroup, Overlay } from "./Dialog.styled";

const Dialog = ({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) => {
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
