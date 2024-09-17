import { FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Tooltip } from '@mui/material';
import React, { useMemo } from 'react';
import { useButtonUtils } from '../utils/buttonUtils.ts';
import DeleteIcon from '@mui/icons-material/Delete';
import { SyncViewModel } from '../viewmodel/SyncConstraintViewModel.ts';
import { AutomatonOptionType } from '../viewmodel/OpenedProcesses.ts';

interface SyncsManipulationProps {
  viewModel: SyncViewModel;
  processes: AutomatonOptionType[];
}

export const SyncsManipulation: React.FC<SyncsManipulationProps> = (props) => {
  const { viewModel, processes } = props;
  const { syncs, deleteSync, changeSync } = viewModel;

  //const { t } = useTranslation();
  const { executeOnKeyboardClick } = useButtonUtils();

  const processDropdownItems = useMemo(
    () =>
      processes.map((process) => (
        <MenuItem key={process.label} value={process.label} data-testid={'menu-item-proc-' + process.label}>
          {process.label}
        </MenuItem>
      )),
    [processes]
  );

  return (
    <>
      {syncs.map((row) => (
        <Grid key={row.id} container spacing={2} alignItems="center">
          <Grid item xs={1}>
            <IconButton
              disabled={syncs.length <= 0}
              onMouseDown={() => deleteSync(viewModel, row.id)}
              onKeyDown={(e) => executeOnKeyboardClick(e.key, () => deleteSync(viewModel, row.id))}
              data-testid={'button-delete-sync-row-' + row.id}
            >
              <Tooltip title={'Sync löschen' /*t('clauses.delete')*/}>
                <DeleteIcon />
              </Tooltip>
            </IconButton>
          </Grid>
          <Grid item xs={5}>
            <FormControl fullWidth>
              <InputLabel>{'Prozess' /*t('clauses.input.clock')*/}</InputLabel>
              <Select
                value={row.processValue}
                label="Process"
                onChange={(e) => changeSync(viewModel, row.id, 'processValue', e.target.value)}
                error={row.isProcessInvalid}
                data-testid={'select-process-row'}
              >
                {processDropdownItems}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              margin="dense"
              label={'Aktion' /*t('clauses.input.value')*/}
              fullWidth
              variant="outlined"
              value={row.actionValue}
              onChange={(e) => changeSync(viewModel, row.id, 'actionValue', e.target.value)}
              InputProps={{ inputProps: { min: 1 } }}
              data-testid={'enter-action-row'}
            />
          </Grid>
        </Grid>
      ))}
    </>
  );
};
