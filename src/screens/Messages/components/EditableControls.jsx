import { Box, ButtonGroup, Flex, IconButton, Tooltip, useEditableControls, useEditableState } from '@chakra-ui/react';
import { PropTypes } from 'prop-types';
import { FiCheck, FiEdit3, FiX } from 'react-icons/fi';
import { MdDeleteForever } from 'react-icons/md';

function EditableControls({ deleteMessage, isLoading, editMessage }) {
  const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } = useEditableControls();
  const { onSubmit, onCancel } = useEditableState();
  const handleSubmit = async () => {
    console.log('sss');
    try {
      await editMessage();
      onSubmit();
    } catch (error) {
      onCancel();
    }
  };
  return isEditing ? (
    <>
      <Box flexBasis="100%" />
      <ButtonGroup justifyContent="end" size="sm" w="full" spacing={2} mt={2}>
        <IconButton isLoading={isLoading} icon={<FiCheck />} {...getSubmitButtonProps()} onClick={handleSubmit} />
        <IconButton isLoading={isLoading} icon={<FiX boxSize={3} />} {...getCancelButtonProps()} />
      </ButtonGroup>
    </>
  ) : (
    <Flex>
      <Tooltip label="Edit Message">
        <IconButton isLoading={isLoading} size="sm" icon={<FiEdit3 />} {...getEditButtonProps()} />
      </Tooltip>
      <Tooltip label="Delete Message">
        <IconButton
          size="sm"
          onClick={deleteMessage}
          marginLeft={1}
          colorScheme="red"
          icon={<MdDeleteForever />}
          isLoading={isLoading}
        />
      </Tooltip>
    </Flex>
  );
}

EditableControls.propTypes = {
  deleteMessage: PropTypes.any,
  editMessage: PropTypes.any,
  isLoading: PropTypes.any,
};

export default EditableControls;
