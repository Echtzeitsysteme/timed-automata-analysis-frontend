import React from 'react';
import { Autocomplete, Box, FormControl, FormHelperText, Input, InputLabel, TextField } from '@mui/material';
import { AnalysisViewModel } from '../viewmodel/AnalysisViewModel.ts';
import { INIT_AUTOMATON } from '../utils/initAutomaton.ts';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {AutomatonOptionType, OpenedProcesses} from '../viewmodel/OpenedProcesses.ts';

export interface ProcessSelectionProps {
  viewModel: AnalysisViewModel;
  openedProcesses: OpenedProcesses;
}

const ProcessSelection: React.FC<ProcessSelectionProps> = (props) => {
  const { viewModel, openedProcesses } = props;
  const options = openedProcesses.automatonOptions;
  let value = openedProcesses.selectedOption;
  let optionLabels = openedProcesses.getLabels(openedProcesses.automatonOptions);

  let newProcessName: string = '';
  const addProcess = () => {
    const isExisting = options.some((option) => newProcessName === option.label);
    if (!isExisting && newProcessName.length > 0) {
      const newOption: AutomatonOptionType = { label: newProcessName, automaton: INIT_AUTOMATON };
      openedProcesses.selectedOption.automaton = viewModel.ta;
      openedProcesses.addAutomatonOption(openedProcesses, newOption);
      console.log('new Value:', newProcessName);
      value = newOption;
      viewModel.setAutomaton(viewModel, newOption.automaton);
      console.log('automaton set!!!');
      optionLabels = openedProcesses.getLabels(openedProcesses.automatonOptions);
    }
  };
  const handleInput = (inputEvent) => {
    newProcessName = inputEvent.target.value as string;
  };

  const deleteProcess = () => {
    if (options.length > 1) {
      openedProcesses.deleteAutomatonOption(openedProcesses, openedProcesses.selectedOption);
      console.log('options', options);
      value = openedProcesses.selectedOption;
      console.log('value', value);
      viewModel.setAutomaton(viewModel, openedProcesses.selectedOption.automaton);
    }
  };

  return (
    <Box sx={{ display: 'inline-flex' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <FormControl sx={{ width: 200, mr: 0.2 }} id="enter-name-field" label="Model Name">
          <InputLabel htmlFor="my-input">Enter New Process</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" onChange={handleInput} sx={{ ml: 0.5 }} />
          <FormHelperText id="my-helper-text">Names can't be duplicates.</FormHelperText>
        </FormControl>
        <Button variant="contained" onClick={addProcess} sx={{ mb: 1 }}>
          <AddIcon></AddIcon>
          Add Process
        </Button>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
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
                value.automaton = viewModel.ta;
                console.log('new Value:', newValue);
                openedProcesses.selectedOption = option;
                viewModel.setAutomaton(viewModel, option.automaton);
                console.log('automaton set!!!');
              }
            });
          }}
          options={optionLabels}
          renderInput={(params) => <TextField {...params} label="Select Process" />}
        ></Autocomplete>
        <Button variant="contained" onClick={deleteProcess}>
          <DeleteIcon></DeleteIcon>
          Discard Process
        </Button>
      </Box>
    </Box>
  );
};

export default ProcessSelection;
