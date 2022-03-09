import { Flex, Modal, ModalBody, ModalContent, ModalOverlay, Spinner } from "@chakra-ui/react";
import { FC } from "react";

export interface SpinnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SpinnerModal: FC<SpinnerModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnEsc={false} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent width="auto">
        <ModalBody padding={6}>
          <Flex alignItems="center" justifyContent="center">
            <Spinner color="blue.400" size="xl" />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SpinnerModal;
