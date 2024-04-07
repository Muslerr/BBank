import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';

const ErrorMessage = ({ message,num }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(true);
  }, [num]);
  
  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Collapse in={open}>
      <Alert
        severity="error"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Collapse>
  );
};

export default ErrorMessage;