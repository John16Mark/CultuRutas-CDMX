import { useState, forwardRef, useImperativeHandle } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ThemeMaterialUI from './../ThemeMaterialUI';
import { ThemeProvider } from '@mui/material/styles';
import ButtonsMod from "./../ButtonsMod";

const Alerta = forwardRef(({ titulo, mensaje, imagen, boton1, boton2, onConfirm, onCloseAction }, ref) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    handleClickOpen() {
      setOpen(true);
    }
  }));

  const handleClose = () => {
    setOpen(false);
    if (onCloseAction) {
      onCloseAction(); // Ejecuta acción personalizada al cerrar
    }
  };

  const handleConfirm = () => {
    handleClose();
    if (onConfirm) {
      onConfirm();
    }
  };

  return (
    <ThemeProvider theme={ThemeMaterialUI}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
        fullWidth
        PaperProps={{
          style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
      >
        <DialogTitle sx={{color: '#415b2a', fontWeight: 'bold'}}>{titulo}</DialogTitle>
        <DialogContent>
          {imagen && (
            <img src={imagen} alt="imagen" style={{ width: 'auto', height: '20vh', display: 'block', margin: '0 auto'}} />
          )}
          <DialogContentText id="alert-dialog-description" style={{ textAlign: 'center', color: '#4F4F4F' }}>
            {mensaje}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center'}}>
            <ButtonsMod
              variant='secundario'
              textCont={boton2}
              width='auto'
              height='2rem'
              clickEvent={handleClose} 
            />
          {boton1 && (
            <ButtonsMod
              variant='principal'
              textCont={boton1}
              width='auto'
              height='2rem'
              clickEvent={handleConfirm}
            />
          )}
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
});

export default Alerta;