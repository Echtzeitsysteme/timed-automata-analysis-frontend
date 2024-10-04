import React, { useEffect, useMemo, useState } from 'react';
import { Autocomplete, Box, TextField } from '@mui/material';
import { AnalysisViewModel } from '../viewmodel/AnalysisViewModel.ts';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { AutomatonOptionType, OpenedProcesses } from '../viewmodel/OpenedProcesses.ts';
import { OpenedSystems } from '../viewmodel/OpenedSystems.ts';
import { Location } from '../model/ta/location.ts';
import { TimedAutomaton } from '../model/ta/timedAutomaton.ts';

export interface ProcessSelectionProps {
  viewModel: AnalysisViewModel;
  openedProcesses: OpenedProcesses;
  openedSystems: OpenedSystems;
}

const ProcessSelection: React.FC<ProcessSelectionProps> = (props) => {
  const { viewModel, openedProcesses, openedSystems } = props;
  const options = openedProcesses.automatonOptions;
  let value = openedProcesses.selectedOption;
  let optionLabels = openedProcesses.getLabels(openedProcesses.automatonOptions);

  const [newProcessName, setNewProcessName] = useState('');
  const [nameIsEmpty, setNameIsEmpty] = useState(false);
  const [nameIsDuplicate, setNameIsDuplicate] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState('');

  const addProcess = () => {
    const isExisting = options.some((option) => newProcessName === option.label);
    if (!isExisting && newProcessName.length > 0) {
      const startLoc: Location = {
        name: 'start',
        isInitial: true,
        xCoordinate: -100,
        yCoordinate: 100,
      };
      const newTA: TimedAutomaton = { locations: [startLoc], clocks: [], switches: [] };
      const newOption: AutomatonOptionType = { label: newProcessName.trim(), automaton: newTA };
      openedProcesses.selectedOption.automaton = viewModel.ta;
      openedProcesses.addAutomatonOption(openedProcesses, newOption);
      //console.log('newProcessOptions:', openedProcesses.automatonOptions);
      openedSystems.selectedSystem.processes = openedProcesses.automatonOptions;
      viewModel.setAutomaton(viewModel, newOption.automaton);
      //console.log('automaton set!!!');
      optionLabels = openedProcesses.getLabels(openedProcesses.automatonOptions);

      setNewProcessName('');
    }
  };

  const deleteProcess = () => {
    if (options.length > 1) {
      openedProcesses.deleteAutomatonOption(openedProcesses, openedProcesses.selectedOption);
      //console.log('options', options);
      value = openedProcesses.selectedOption;
      openedSystems.selectedSystem.processes = openedProcesses.automatonOptions;
      //console.log('value', value);
      viewModel.setAutomaton(viewModel, openedProcesses.selectedOption.automaton);
    }
  };

  useEffect(() => {
    setNameIsEmpty(newProcessName.trim() === '');
    setNameIsDuplicate(options.some((option) => option.label.toLowerCase() === newProcessName.trim().toLowerCase()));

    nameIsEmpty && setNameErrorMsg('Name darf nicht leer sein');
    nameIsDuplicate && setNameErrorMsg('Prozess existiert bereits');
  }, [nameIsDuplicate, nameIsEmpty, newProcessName, options]);

  const validationError: boolean = useMemo(() => nameIsEmpty || nameIsDuplicate, [nameIsDuplicate, nameIsEmpty]);

  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
        <TextField
          sx={{ width: 200, mr: 0.5 }}
          margin="dense"
          label={'Enter New Process'}
          type="text"
          fullWidth
          variant="outlined"
          value={newProcessName}
          onChange={(e) => setNewProcessName(e.target.value)}
          error={validationError}
          helperText={validationError ? nameErrorMsg : ' '}
          data-testid={'input-process-name'}
        />
        <Button variant="contained" disabled={validationError} onClick={addProcess} sx={{mb: 2}}>
          <AddIcon/>
          Add Process
        </Button>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.3 }}>
        <Autocomplete
          sx={{ width: 200, mr: 0.5 }}
          id="select-automaton"
          freeSolo
          selectOnFocus
          handleHomeEndKeys
          disableClearable
          value={value}
          onChange={(event, newValue) => {
            //console.log('Optionen:', options);

            //set value and automaton to existing option
            options.forEach((option) => {
              if (option.label === newValue) {
                value.automaton = viewModel.ta;
                //console.log('new Value:', newValue);
                openedProcesses.selectedOption = option;
                viewModel.setAutomaton(viewModel, option.automaton);
                //console.log('automaton set!!!');
              }
            });
          }}
          options={optionLabels}
          renderInput={(params) => <TextField {...params} label="Select Process" />}
        />
        <Button variant="contained" disabled={options.length === 1} onClick={deleteProcess}>
          <DeleteIcon/>
          Discard Process
        </Button>
      </Box>
    </Box>
  );
};

export default ProcessSelection;
