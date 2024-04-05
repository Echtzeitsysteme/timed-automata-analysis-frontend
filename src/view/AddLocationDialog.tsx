import React, { useMemo, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  FormControlLabel,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { Clock } from '../model/ta/clock';
import { Location } from '../model/ta/location';
import { ClockComparator } from '../model/ta/clockComparator';

export interface AddLocationDialogProps {
  open: boolean;
  locations: Location[];
  clocks: Clock[];
  handleClose: () => void;
  handleSubmit: () => void;
}

export interface RowData {
  id: number;
  clockValue: string;
  comparisonValue: string;
  numberInput: number;
}

export const AddLocationDialog: React.FC<AddLocationDialogProps> = (props) => {
  const { open, clocks, handleClose, handleSubmit } = props;
  const [name, setName] = useState('');
  const [isNameError, setIsNameError] = useState(false);
  const [initialLocationChecked, setInitialLocationChecked] = useState(false);
  const [invariantChecked, setInvariantChecked] = useState(false);
  const [rows, setRows] = useState<RowData[]>([
    { id: Date.now(), clockValue: '', comparisonValue: '', numberInput: 0 },
  ]);

  const handleAddClause = () => {
    setRows([...rows, { id: Date.now(), clockValue: '', comparisonValue: '', numberInput: 0 }]);
  };

  const handleDeleteClause = (id: number) => {
    if (rows.length > 1) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleClauseChange = (id: number, field: keyof RowData, value: string | number) => {
    setRows(rows.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  };

  const handleFormSubmit = () => {
    if (name.trim() === '') {
      setIsNameError(true);
      return;
    }
    handleSubmit(); // TODO adjust what is submitted
  };

  const clockDropdownItems = useMemo(
    () =>
      clocks.map((c) => (
        <MenuItem key={c.name} value={c.name}>
          {c.name}
        </MenuItem>
      )),
    [clocks]
  );

  const comparisonDropdownItems = useMemo(
    () =>
      Object.values(ClockComparator).map((v) => (
        <MenuItem key={v} value={v}>
          {v}
        </MenuItem>
      )),
    []
  );

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        Add Location
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={isNameError}
          helperText={isNameError && 'Name cannot be empty'}
        />
        <FormControlLabel
          control={
            <Checkbox checked={initialLocationChecked} onChange={(e) => setInitialLocationChecked(e.target.checked)} />
          }
          label="Initial Location"
        />
        <FormControlLabel
          control={<Checkbox checked={invariantChecked} onChange={(e) => setInvariantChecked(e.target.checked)} />}
          label="Add Invariant"
        />
        {invariantChecked &&
          rows.map((row) => (
            <Grid key={row.id} container spacing={2} alignItems="center">
              <Grid item xs={1}>
                <IconButton disabled={rows.length <= 1} onClick={() => handleDeleteClause(row.id)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel>Clock</InputLabel>
                  <Select
                    value={row.clockValue}
                    label="Clock"
                    onChange={(e) => handleClauseChange(row.id, 'clockValue', e.target.value)}
                  >
                    {clockDropdownItems}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel>Comparison</InputLabel>
                  <Select
                    value={row.comparisonValue}
                    label="Comparison"
                    onChange={(e) => handleClauseChange(row.id, 'comparisonValue', e.target.value)}
                  >
                    {comparisonDropdownItems}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  margin="dense"
                  label="Value"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={row.numberInput}
                  onChange={(e) => handleClauseChange(row.id, 'numberInput', Math.max(0, parseInt(e.target.value, 10)))}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>
            </Grid>
          ))}
        {invariantChecked && (
          <Button variant="outlined" onClick={handleAddClause} sx={{ marginTop: 2 }}>
            Add Clause
          </Button>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="error">
          Cancel
        </Button>
        <Button onClick={handleFormSubmit} variant="contained" disabled={isNameError}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddLocationDialog;
