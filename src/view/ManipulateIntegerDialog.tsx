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
    size: number,
    min: number,
    max: number,
    init: number,
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

  // effect for setting initial values upon opening the dialog
  useEffect(() => {
    // include "open" to ensure that values in dialog are correctly loaded upon opening
    if (!open || !justOpened) {
      return;
    }
    if (intPrevVersion !== undefined) {
      // load existing location if editing (for adding, "if" prevents entering this)
      setName(intPrevVersion.name);
    }
    setJustOpened(false);
  }, [open, justOpened, intPrevVersion]);

  // effect to update validation checks
  useEffect(() => {
    // check validity of name field
    setIsNameEmpty(name.trim() === '');
    if (intPrevVersion) {
      // previous name is allowed
      const prevName = intPrevVersion.name;
      setIsNameDuplicate(
        integers.filter((int) => int.name !== prevName).some((int) => int.name.toLowerCase() === name.toLowerCase())
      );
    } else {
      setIsNameDuplicate(integers.some((int) => int.name.toLowerCase() === name.toLowerCase()));
    }
    isNameEmpty && setNameErrorMessage('bottom text' /*t('locDialog.errorNameEmpty')*/);
    isNameDuplicate && setNameErrorMessage('bottom text' /*t('locDialog.errorNameExists')*/);
  }, [name, integers, isNameEmpty, isNameDuplicate, intPrevVersion]);

  const isValidationError: boolean = useMemo(() => isNameEmpty || isNameDuplicate, [isNameEmpty, isNameDuplicate]);

  const handleCloseDialog = () => {
    // reset entries when dialog is closed
    setName('');
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
          data-testid={'input-location-name'}
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
              onChange={(e) => setMin(e.target.value)}
              InputProps={{ inputProps: { min: 0 } }}
              error={min.length < 1}
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
              onChange={(e) => setMax(e.target.value)}
              InputProps={{ inputProps: { min: 0 } }}
              error={max.length < 1}
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
              onChange={(e) => setSize(e.target.value)}
              InputProps={{ inputProps: { min: 0 } }}
              error={size.length < 1}
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
              onChange={(e) => setInit(e.target.value)}
              InputProps={{ inputProps: { min: 0 } }}
              error={init.length < 1}
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
          {t('locDialog.button.cancel')}
        </Button>
        <Button
          onMouseDown={handleFormSubmit}
          onKeyDown={(e) => executeOnKeyboardClick(e.key, handleFormSubmit)}
          variant="contained"
          color="primary"
          disabled={isValidationError}
          data-testid={'button-add-location-ok'}
        >
          {intPrevVersion ? t('locDialog.button.edit') : t('locDialog.button.add')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ManipulateIntegerDialog;
