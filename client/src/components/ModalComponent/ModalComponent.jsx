import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import "./modal.css"
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ModalComponent({ title, message, onCancel, onSave, isModalOpen, onInputChange, loader }) {
  const classes = useStyles();

  return (
    <div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isModalOpen}
        onClose={onCancel}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isModalOpen}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">{title}</h2>
            <div className="modal-input">
              <TextField id="standard-basic" label="New Word" onChange={(e) => onInputChange(e)} />
            </div>
            <div className="modal-button">
              <button onClick={onCancel}>Cancel</button>
              {
                loader ?
                  <CircularProgress color="secondary" size="1.5rem"/>
                  :
                  <button onClick={onSave}>Save</button>
              }

            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}