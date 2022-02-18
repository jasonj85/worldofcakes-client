import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { ButtonGroup } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

interface IProps {
  id: number;
  handleDelete: (id: number) => {};
}

export default function AdminControls({ id, handleDelete }: IProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteConfirmation = () => {
    setOpen(false);
    handleDelete(id);
  };

  return (
    <>
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical contained button group"
        variant="contained"
      >
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          component={Link}
          to={`/admin/cakes/${id}`}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={handleClickOpen}
        >
          Delete
        </Button>
      </ButtonGroup>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm deletion?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please confirm you want to delete, this operation can not be
            reversed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={deleteConfirmation}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
