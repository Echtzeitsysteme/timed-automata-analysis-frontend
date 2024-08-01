import React from 'react';
import { Autocomplete, createFilterOptions, TextField } from '@mui/material';
import { TimedAutomaton } from '../model/ta/timedAutomaton.ts';
import { AnalysisViewModel } from '../viewmodel/AnalysisViewModel.ts';
import { INIT_AUTOMATON } from '../utils/initAutomaton.ts';

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

  return (
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
        const isExisting = options.some((option) => inputValue === option.label);
        if (addNewVal && !isExisting) {
          setOptions((prev) => [...prev, { label: inputValue, automaton: INIT_AUTOMATON }]);
          addNewVal = false;
        }
        //oberen Code woanders hinpacken
        options.forEach((option) => {
          if (option.label === newValue) {
            value.automaton = viewModel.ta;
            console.log('new Value:', newValue);
            setValue(option);
            viewModel.setAutomaton(viewModel, option.automaton);
            console.log('automaton set!!!');
          }
        });
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
  );
};

export default AutomatonSelection;
