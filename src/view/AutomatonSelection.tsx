import React from 'react';
import {
    Autocomplete, Chip,
    createFilterOptions,
    TextField
} from "@mui/material";
import {TimedAutomaton} from "../model/ta/timedAutomaton.ts";
import {AnalysisViewModel} from "../viewmodel/AnalysisViewModel.ts";
import {INIT_AUTOMATON} from "../utils/initAutomaton.ts";


export interface AutomatonSelectionProps {
    viewModel: AnalysisViewModel;
    activeAutomatons: TimedAutomaton[];
}

interface AutomatonOptionType{
    label: string;
    automaton: TimedAutomaton;
}

const AutomatonSelection: React.FC<AutomatonSelectionProps> = (props) => {
    const {viewModel, activeAutomatons} = props; //für so ein viewModel.setAutomaton
    const automaton = viewModel.ta;
    const [options, setOptions] = React.useState<AutomatonOptionType[]>([
        {label: 'init_Automaton', automaton: automaton},
        {label: 'second_Automaton', automaton: automaton},
        {label: 'third_Automaton', automaton: automaton}
    ]);
    const [value, setValue] = React.useState<AutomatonOptionType>(options[0]);
    const [inputValue, setInputValue] = React.useState('');

    const filter = createFilterOptions<AutomatonOptionType>();


    return (
        <Autocomplete
            sx={{width: 200}}
            id="select-automaton"
            freeSolo
            value={value}
            onChange={(event, newValue : string) => {
                options.forEach((option) => {
                    if(option.label === newValue){
                        value.automaton = viewModel.ta;
                        console.log("new Value:", newValue);
                        setValue(option);
                        viewModel.setAutomaton(viewModel, option.automaton);
                        console.log("automaton set!!!");
                    }});
            }}
            options={options.map((option) => option.label)}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) =>
                <TextField {...params} label="Select Model" />
            }
            >
        </Autocomplete>

);
}

export default AutomatonSelection;
