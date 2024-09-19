import React, { useEffect, useMemo, useState } from 'react';
import { Autocomplete, Box, TextField } from '@mui/material';
import { AnalysisViewModel } from '../viewmodel/AnalysisViewModel.ts';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { OpenedSystems, SystemOptionType } from '../viewmodel/OpenedSystems.ts';
import { OpenedProcesses } from '../viewmodel/OpenedProcesses.ts';
import { TimedAutomaton } from '../model/ta/timedAutomaton.ts';
import { Location } from '../model/ta/location.ts';

export interface SystemSelectionProps {
  viewModel: AnalysisViewModel;
  openedSystems: OpenedSystems;
  openedProcesses: OpenedProcesses;
}

const SystemSelection: React.FC<SystemSelectionProps> = (props) => {
  const { viewModel, openedSystems, openedProcesses } = props;
  const options = openedSystems.systemOptions;
  let value = openedSystems.selectedSystem;
  let optionLabels = openedSystems.getLabels(openedSystems.systemOptions);

  const [newSystemName, setNewSystemName] = useState('');
  const [nameIsEmpty, setNameIsEmpty] = useState(false);
  const [nameIsDuplicate, setNameIsDuplicate] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState('');

  const addSystem = () => {
    const isExisting = options.some((option) => newSystemName === option.label);
    if (!isExisting && newSystemName.length > 0) {
      const startLoc: Location = {
        name: 'start',
        isInitial: true,
        xCoordinate: -100,
        yCoordinate: 100,
      };
      const newTA: TimedAutomaton = { locations: [startLoc], clocks: [], switches: [] };
      const newOption: SystemOptionType = {
        label: newSystemName.trim(),
        processes: [{ label: 'init_Process', automaton: newTA }],
        integers: [],
        synchronizations: [],
      };
      openedProcesses.selectedOption.automaton = viewModel.ta;
      openedSystems.selectedSystem.processes = openedProcesses.automatonOptions;
      openedSystems.addSystemOption(openedSystems, newOption);
      value = newOption;
      openedProcesses.setAutomatonOptions(openedProcesses, value.processes);
      viewModel.setAutomaton(viewModel, value.processes[0].automaton);
      optionLabels = openedSystems.getLabels(openedSystems.systemOptions);
      console.log('system after addition', openedSystems);

      setNewSystemName('');
    }
  };

  const deleteSystem = () => {
    if (options.length > 1) {
      openedSystems.deleteSystemOption(openedSystems, openedSystems.selectedSystem);
      value = openedSystems.selectedSystem;
      openedProcesses.setAutomatonOptions(openedProcesses, value.processes);
      viewModel.setAutomaton(viewModel, value.processes[0].automaton);
    }
  };

  useEffect(() => {
    setNameIsEmpty(newSystemName.trim() === '');
    setNameIsDuplicate(options.some((option) => option.label.toLowerCase() === newSystemName.trim().toLowerCase()));

    nameIsEmpty && setNameErrorMsg('Name darf nicht leer sein');
    nameIsDuplicate && setNameErrorMsg('System existiert bereits');
  }, [nameIsDuplicate, nameIsEmpty, newSystemName, options]);

  const validationError: boolean = useMemo(() => nameIsEmpty || nameIsDuplicate, [nameIsDuplicate, nameIsEmpty]);

  return (
    <Box sx={{ ml: 0.2 }}>
      <Box sx={{ alignItems: 'center', mb: 0.2 }}>
        <TextField
          sx={{ width: 200, mr: 0.2 }}
          margin="dense"
          label={'Enter New System'}
          type="text"
          fullWidth
          variant="outlined"
          value={newSystemName}
          onChange={(e) => setNewSystemName(e.target.value)}
          error={validationError}
          helperText={validationError ? nameErrorMsg : ''}
          data-testid={'input-system-name'}
        />
        <Button variant="contained" disabled={validationError} onClick={addSystem} sx={{ mb: 1 }}>
          <AddIcon></AddIcon>
          Add System
        </Button>
      </Box>
      <Box sx={{ alignItems: 'center', mb: 1, mt: 2 }}>
        <Autocomplete
          sx={{ width: 200, mr: 0.2 }}
          id="select-automaton"
          freeSolo
          selectOnFocus
          handleHomeEndKeys
          disableClearable
          value={value}
          onChange={(event, newValue) => {
            console.log(event);
            console.log('Optionen:', options);

            //set value and automaton to existing option
            options.forEach((option) => {
              if (option.label === newValue) {
                openedProcesses.selectedOption.automaton = viewModel.ta;
                console.log('processOptions:', openedProcesses.automatonOptions);
                value.processes = openedProcesses.automatonOptions;
                openedSystems.selectedSystem = option;
                //setValue(option);
                openedSystems.setSelectedSystem(option);
                openedProcesses.setAutomatonOptions(openedProcesses, openedSystems.selectedSystem.processes);
                viewModel.setAutomaton(viewModel, option.processes[0].automaton);
                //console.log("openedSystems after change:",openedSystems);
                //console.log("openedProcesses after change:", openedProcesses);
              }
            });
          }}
          options={optionLabels}
          renderInput={(params) => <TextField {...params} label="Select System" />}
        ></Autocomplete>
        <Button variant="contained" disabled={options.length === 1} onClick={deleteSystem} sx={{ mt: 0.2 }}>
          <DeleteIcon></DeleteIcon>
          Discard System
        </Button>
      </Box>
    </Box>
  );
};

export default SystemSelection;
