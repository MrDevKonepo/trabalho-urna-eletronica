import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";
//import produce from "immer";

export default function FormDialog(props) {
  const [editValues, setEditValues] = useState({
    idvoto: props.idvoto,
    eleitor: props.eleitor,
    senador: props.senador,
    presidente: props.presidente,
  });

  const handleChangeValues = (values) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [values.target.id]: values.target.value,
    }));
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleEditVoto = () => {
    Axios.put("http://localhost:3001/edit", {
      idvoto: editValues.idvoto,
      eleitor: editValues.eleitor,
      senador: editValues.senador,
      presidente: editValues.presidente,
    }).then(() => {
      props.setListCard(
        props.listCard.map((value) => {
          return value.idvoto === editValues.idvoto // ==
            ? {
                idvoto: editValues.idvoto,
                eleitor: editValues.eleitor,
                senador: editValues.senador,
                presidente: editValues.presidente,
              }
            : value;
        })
      );
    });
    handleClose();
  };

  const handleDeleteVoto = () => {
    Axios.delete(`http://localhost:3001/delete/${editValues.idvoto}`).then(() => {
      props.setListCard(
        props.listCard.filter((value) => {
          return value.idvoto !== editValues.idvoto; // !=
        })
      );
    });
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editar</DialogTitle>
        <DialogContent>
          <TextField
            disabled
            margin="dense"
            id="idvoto"
            label="idvoto"
            defaultValue={props.idvoto}
            type="number"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="eleitor"
            label="Eleitor"
            defaultValue={props.eleitor}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="senador"
            label="Senador"
            defaultValue={props.senador}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="presidente"
            label="Presidente"
            defaultValue={props.presidente}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button color="primary" onClick={() => handleDeleteVoto()}>
            Excluir
          </Button>
          <Button color="primary" onClick={() => handleEditVoto()}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}