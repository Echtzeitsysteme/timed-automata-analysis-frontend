import React from 'react';
import {
  Autocomplete,
  Box,
  createFilterOptions,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  TextField,
} from '@mui/material';
import { TimedAutomaton } from '../model/ta/timedAutomaton.ts';
import { AnalysisViewModel } from '../viewmodel/AnalysisViewModel.ts';
import { INIT_AUTOMATON } from '../utils/initAutomaton.ts';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export interface AutomatonSelectionProps {
  viewModel: AnalysisViewModel;
}

interface AutomatonOptionType {
  label: string;
  automaton: TimedAutomaton;
  inputValue?: string;
}

const filter = createFilterOptions<AutomatonOptionType>();

const AutomatonSelection: React.FC<AutomatonSelectionProps> = (props) => {
  const { viewModel } = props; //für so ein viewModel.setAutomaton
  const automaton = viewModel.ta;
  const [options, setOptions] = React.useState<AutomatonOptionType[]>([
    { label: 'init_Automaton', automaton: automaton },
    { label: 'second_Automaton', automaton: automaton },
    { label: 'third_Automaton', automaton: automaton },
  ]);
  const [value, setValue] = React.useState<AutomatonOptionType>(options[0]);
  const [inputValue, setInputValue] = React.useState('');
  let addNewVal = false;

  let newModelName: string = '';
  const addModel = () => {
    const isExisting = options.some((option) => newModelName === option.label);
    if (!isExisting && newModelName.length > 0) {
      const newOption: AutomatonOptionType = { label: newModelName, automaton: INIT_AUTOMATON };
      setOptions((prev) => [...prev, newOption]);
      value.automaton = viewModel.ta;
      console.log('new Value:', newModelName);
      setValue(newOption);
      viewModel.setAutomaton(viewModel, newOption.automaton);
      console.log('automaton set!!!');
    }
  };
  const handleInput = (inputEvent) => {
    newModelName = inputEvent.target.value as string;
  };

  const deleteModel = () => {
    if (options.length > 1) {
      const newOptions = options.filter((option) => option !== value);
      setOptions(newOptions);
      value.automaton = viewModel.ta;
      setValue(newOptions[0]);
      viewModel.setAutomaton(viewModel, newOptions[0].automaton);
    }
  };

  return (
    <Box>
      <FormControl sx={{ width: 200 }} id="enter-name-field" label="Model Name">
        <InputLabel htmlFor="my-input">Model Name</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" onChange={handleInput} />
        <FormHelperText id="my-helper-text">Names can't be duplicates.</FormHelperText>
      </FormControl>
      <Button variant="contained" onClick={addModel}>
        <AddIcon></AddIcon>
        Add Model
      </Button>
      <Autocomplete
        sx={{ width: 200 }}
        id="select-automaton"
        freeSolo
        selectOnFocus
        handleHomeEndKeys
        value={value}
        onChange={(event, newValue) => {
          console.log(event);
          console.log('Optionen:', options);

          //set value and automaton to existing option
          options.forEach((option) => {
            if (option.label === newValue) {
              value.automaton = viewModel.ta;
              console.log('new Value:', newValue);
              setValue(option);
              viewModel.setAutomaton(viewModel, option.automaton);
              console.log('automaton set!!!');
            }
          });

          //add new option
          const isExisting = options.some((option) => inputValue === option.label);
          if (addNewVal && !isExisting) {
            const newOption: AutomatonOptionType = { label: inputValue, automaton: INIT_AUTOMATON };
            setOptions((prev) => [...prev, newOption]);
            value.automaton = viewModel.ta;
            console.log('new Value:', newValue);
            setValue(newOption);
            viewModel.setAutomaton(viewModel, newOption.automaton);
            console.log('automaton set!!!');
            addNewVal = false;
          }
        }}
        filterOptions={(options: AutomatonOptionType[], params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some((option) => inputValue === option.label);
          if (inputValue.length !== 0 && !isExisting) {
            filtered.push({ inputValue: inputValue, label: `New Model:"${inputValue}"`, automaton: INIT_AUTOMATON });
            addNewVal = true;
          }

          return filtered;
        }}
        options={options.map((option) => option.label)}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => <TextField {...params} label="Select Model" />}
      ></Autocomplete>
      <Button variant="contained" onClick={deleteModel}>
        <DeleteIcon></DeleteIcon>
        Discard Current Model
      </Button>
    </Box>
  );
};

export default AutomatonSelection;
