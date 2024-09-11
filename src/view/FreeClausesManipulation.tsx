import { Grid, IconButton, FormControl, InputLabel, Select, TextField, Tooltip, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { ClockComparator } from '../model/ta/clockComparator';
import { Clock } from '../model/ta/clock';
import { useButtonUtils } from '../utils/buttonUtils';
import {FreeClausesViewModel} from "../viewmodel/FreeClausesViewModel.ts";

interface FreeClausesManipulationProps {
    viewModel: FreeClausesViewModel;
}

export const FreeClausesManipulation: React.FC<FreeClausesManipulationProps> = (props) => {
    const { viewModel} = props;
    const { freeClauses, deleteFreeClause, changeFreeClause } = viewModel;
    const { t } = useTranslation();
    const { executeOnKeyboardClick } = useButtonUtils();

    return (
        <>
            {freeClauses.map((row) => (
                <Grid key={row.id} container spacing={2} alignItems="center">
                    <Grid item xs={1}>
                        <IconButton
                            disabled={freeClauses.length <= 0}
                            onMouseDown={() => deleteFreeClause(viewModel, row.id)}
                            onKeyDown={(e) => executeOnKeyboardClick(e.key, () => deleteFreeClause(viewModel, row.id))}
                            data-testid={'button-delete-freeClause-row-' + row.id}
                        >
                            <Tooltip title={'Klausel löschen' /*t('clauses.delete')*/}>
                                <DeleteIcon />
                            </Tooltip>
                        </IconButton>
                    </Grid>
                    <Grid item xs={11}>
                        <TextField
                            margin="dense"
                            label={'Freie Klausel' /*t('clauses.input.value')*/}
                            fullWidth
                            variant="outlined"
                            value={row.term}
                            onChange={(e) => changeFreeClause(viewModel, row.id, 'freeInput', e.target.value)}
                            InputProps={{ inputProps: { min: 1 } }}
                            data-testid={'enter-freeClause-row'}
                        />
                    </Grid>
                </Grid>
            ))}
        </>
    );
};
