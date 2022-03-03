import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import constants from './constants';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function NestedModal () {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    constants.miArray=[];
    setOpen(false);
  };

  return (
    <div>
      <br></br>
      <Button onClick={handleOpen} variant="contained"> SUBMIT VOTES</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">VOTES SUBMITTES</h2>
          <h6 >Your Votes</h6>
          {constants.miArray.map((row, j) => {
              return (
                <p key={j}>{row}</p>
                );
                            
          })}
         
          <Button onClick={handleClose}>CLOSE</Button>
        </Box>
      </Modal>
    </div>
  );
}