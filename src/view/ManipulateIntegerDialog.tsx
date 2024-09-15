import { Integer } from '../model/ta/integer.ts';
import React, { useEffect, useMemo, useState } from 'react';
import { useButtonUtils } from '../utils/buttonUtils.ts';
import { useTranslation } from 'react-i18next';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ManipulateIntegerDialog {
  open: boolean;
  integers: Integer[];
  intPrevVersion?: Integer;
  handleClose: () => void;
  handleSubmit: (
    name: string,
    size: string,
    min: string,
    max: string,
    init: string,
    prevIntegerName?: string // only for editing (not for adding)
  ) => void;
}

export const ManipulateIntegerDialog: React.FC<ManipulateIntegerDialog> = (props) => {
  const { open, integers, intPrevVersion, handleClose, handleSubmit } = props;
  const { t } = useTranslation();
  const { executeOnKeyboardClick } = useButtonUtils();

  const [justOpened, setJustOpened] = useState(true);
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [init, setInit] = useState('');
  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [isNameDuplicate, setIsNameDuplicate] = useState(false);
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [isSizeEmpty, setIsSizeEmpty] = useState(false);
  const [isMinEmpty, setIsMinEmpty] = useState(false);
  const [isMaxEmpty, setIsMaxEmpty] = useState(false);
  const [isMinBiggerThanMax, setIsMinBiggerThanMax] = useState(false);
  const [minErrorMessage, setMinErrorMessage] = useState('');
  const [maxErrorMessage, setMaxErrorMessage] = useState('');
  const [isSizeInvalid, setIsSizeInvalid] = useState(false);
  const [sizeErrorMessage, setSizeErrorMessage] = useState('');
  const [initOutsideIntervall, setInitOutsideIntervall] = useState(false);
  const [isInitEmpty, setIsInitEmpty] = useState(false);
  const [initErrorMessage, setInitErrorMessage] = useState('');

  // effect for setting initial values upon opening the dialog
  useEffect(() => {
    // include "open" to ensure that values in dialog are correctly loaded upon opening
    if (!open || !justOpened) {
      return;
    }
    if (intPrevVersion !== undefined) {
      // load existing integer if editing (for adding, "if" prevents entering this)
      setName(intPrevVersion.name);
      setSize(intPrevVersion.size.toString());
      setMin(intPrevVersion.min.toString());
      setMax(intPrevVersion.max.toString());
      setInit(intPrevVersion.init.toString());
    }
    setJustOpened(false);
  }, [open, justOpened, intPrevVersion]);

  // effect to update validation checks
  useEffect(() => {
    // check validity of name field
    setIsNameEmpty(name.trim() === '');
    setIsSizeEmpty(size.trim() === '');
    setIsMinEmpty(min.trim() === '');
    setIsMaxEmpty(max.trim() === '');
    setIsInitEmpty(init.trim() === '');
    setIsMinBiggerThanMax(min > max);
    setInitOutsideIntervall(init > max || init < min);
    setIsSizeInvalid( parseInt(size) < 1);
    if (intPrevVersion) {
      // previous name is allowed
      const prevName = intPrevVersion.name;
      setIsNameDuplicate(
        integers.filter((int) => int.name !== prevName).some((int) => int.name.toLowerCase() === name.toLowerCase())
      );
    } else {
      setIsNameDuplicate(integers.some((int) => int.name.toLowerCase() === name.toLowerCase()));
    }
    isNameEmpty && setNameErrorMessage('Name darf nicht leer sein' /*t('locDialog.errorNameEmpty')*/);
    isNameDuplicate && setNameErrorMessage('Name wird bereits verwendet' /*t('locDialog.errorNameExists')*/);
    isMinBiggerThanMax && setMinErrorMessage('Min muss kleiner als Max sein');
    isMinBiggerThanMax && setMaxErrorMessage('Max muss größer als Min sein');
    initOutsideIntervall && setInitErrorMessage('Init muss im Intervall liegen');
    isSizeInvalid && setSizeErrorMessage('Size must be at least 1');

  }, [name, integers, isNameEmpty, isNameDuplicate, intPrevVersion, size, min, max, init, isMinBiggerThanMax, initOutsideIntervall, isSizeInvalid]);

  const isValidationError: boolean = useMemo(
      () => isNameEmpty || isNameDuplicate || isInitEmpty || isMinEmpty || isMaxEmpty || isSizeEmpty
          || isMinBiggerThanMax || initOutsideIntervall || isSizeInvalid,
      [isNameEmpty, isNameDuplicate, isInitEmpty, isMinEmpty, isMaxEmpty, isSizeEmpty, isMinBiggerThanMax, initOutsideIntervall, isSizeInvalid]);

  const handleCloseDialog = () => {
    // reset entries when dialog is closed
    setName('');
    setSize('');
    setMin('');
    setMax('');
    setInit('');
    setJustOpened(true); // for next opening of the dialog
    handleClose();
  };

  const handleFormSubmit = () => {
    if (isValidationError) {
      return;
    }
    if (intPrevVersion) {
      handleSubmit(name, size, min, max, init, intPrevVersion.name);
      // value reset not needed for editing because values are loaded from existing version
    } else {
      handleSubmit(name, size, min, max, init);
      // reset values for next opening of dialog
      setName('');
      setSize('');
      setMin('');
      setMax('');
      setInit('');
    }
    setJustOpened(true); // for next opening of dialog
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog}>
      <DialogTitle>
        {
          intPrevVersion
            ? 'Integer bearbeiten' /*t('locDialog.editLoc')*/
            : 'Integer hinzufügen' /*t('locDialog.addLoc')*/
        }
        <IconButton
          onMouseDown={handleCloseDialog}
          onKeyDown={(e) => executeOnKeyboardClick(e.key, handleCloseDialog)}
          sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label={'Name'}
          type="text"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={isNameEmpty || isNameDuplicate}
          helperText={isNameEmpty || isNameDuplicate ? nameErrorMessage : ''}
          data-testid={'input-integer-name'}
        />
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label={'Min' /*t('clauses.input.value')*/}
              type="number"
              fullWidth
              variant="outlined"
              value={min}
              onChange={(e) => parseInt(e.target.value) < 0 ? setMin('0') : setMin(e.target.value)}
              InputProps={{ inputProps: { min: 0 } }}
              error={isMinEmpty || isMinBiggerThanMax}
              helperText={isMinBiggerThanMax && !isMinEmpty ? minErrorMessage : ''}
              data-testid={'select-integer-min'}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label={'Max' /*t('clauses.input.value')*/}
              type="number"
              fullWidth
              variant="outlined"
              value={max}
              onChange={(e) => parseInt(e.target.value) < 0 ? setMax('0') : setMax(e.target.value)}
              InputProps={{ inputProps: { min: 0 } }}
              error={isMaxEmpty || isMinBiggerThanMax}
              helperText={isMinBiggerThanMax && !isMaxEmpty ? maxErrorMessage : ''}
              data-testid={'select-integer-max'}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label={'Size' /*t('clauses.input.value')*/}
              type="number"
              fullWidth
              variant="outlined"
              value={size}
              onChange={(e) => parseInt(e.target.value) < 0 ? setSize('0') : setSize(e.target.value)}
              InputProps={{ inputProps: { min: 0 } }}
              error={isSizeEmpty || isSizeInvalid}
              helperText={isSizeInvalid ? sizeErrorMessage : ''}
              data-testid={'select-integer-min'}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label={'Init' /*t('clauses.input.value')*/}
              type="number"
              fullWidth
              variant="outlined"
              value={init}
              onChange={(e) => parseInt(e.target.value) < 0 ? setInit('0') : setInit(e.target.value)}
              InputProps={{ inputProps: { min: 0 } }}
              error={isInitEmpty || initOutsideIntervall}
              helperText={initOutsideIntervall && !isInitEmpty ? initErrorMessage : ''}
              data-testid={'select-integer-max'}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onMouseDown={handleCloseDialog}
          onKeyDown={(e) => executeOnKeyboardClick(e.key, handleCloseDialog)}
          variant="contained"
          color="error"
        >
          {'Abbrechen' /*t('locDialog.button.cancel')*/}
        </Button>
        <Button
          onMouseDown={handleFormSubmit}
          onKeyDown={(e) => executeOnKeyboardClick(e.key, handleFormSubmit)}
          variant="contained"
          color="primary"
          disabled={isValidationError}
          data-testid={'button-add-integer-ok'}
        >
          {intPrevVersion ? 'Speichern' /*t('locDialog.button.edit')*/ : 'Hinzufügen'/*t('locDialog.button.add')*/}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ManipulateIntegerDialog;
