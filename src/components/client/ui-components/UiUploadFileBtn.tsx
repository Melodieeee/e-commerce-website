import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface InputFileUploadProps {
  onFilesSelected: (files: FileList) => void;
  buttonText: string;
  disabled: boolean;
}

const InputFileUpload: React.FC<InputFileUploadProps> = ({ onFilesSelected, buttonText, disabled }) => {
  const handleFilesSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFilesSelected(files);
    }
  };

  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      disabled={disabled}
      sx={{ textTransform: 'none', fontFamily: 'inherit' }}
    >
      {buttonText}
      <VisuallyHiddenInput type="file" accept="image/*" multiple onChange={handleFilesSelected} />
    </Button>
  );
};

export default InputFileUpload;
