import React, {useCallback, useState} from 'react';
import {
    Autocomplete,
    Box,
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
import {OpenedProcesses} from "./OpenedProcesses.tsx";

export interface ProcessSelectionProps {
    viewModel: AnalysisViewModel;
    openedProcesses: OpenedProcesses;
}

export interface AutomatonOptionType {
    label: string;
    automaton: TimedAutomaton;
}

const ProcessSelection: React.FC<ProcessSelectionProps> = (props) => {
    const { viewModel, openedProcesses } = props;
    const automaton = viewModel.ta;
    const options = openedProcesses.automatonOptions;
    let value = openedProcesses.selectedOption;
    /**
    const [options, setOptions] = React.useState<AutomatonOptionType[]>([
        { label: 'init_Automaton', automaton: automaton },
    ]);
        **/
    let optionLabels = openedProcesses.getLabels(openedProcesses.automatonOptions);
    //const [value, setValue] = React.useState<AutomatonOptionType>(options[0]);

    let newModelName: string = '';
    const addModel = () => {
        const isExisting = options.some((option) => newModelName === option.label);
        if (!isExisting && newModelName.length > 0) {
            const newOption: AutomatonOptionType = { label: newModelName, automaton: INIT_AUTOMATON };
            openedProcesses.addAutomatonOption(openedProcesses, newOption);
            console.log("value", value);
            //value.automaton = viewModel.ta;
            console.log('new Value:', newModelName);
            openedProcesses.setSelectedAutomaton(newOption);
            value = newOption;
            //setValue(newOption);
            //viewModel.setAutomaton(viewModel, newOption.automaton);
            console.log('automaton set!!!');
            optionLabels = openedProcesses.getLabels(openedProcesses.automatonOptions);
        }
    };
    const handleInput = (inputEvent) => {
        newModelName = inputEvent.target.value as string;
    };

    const deleteModel = () => {
        if (options.length > 1) {
            openedProcesses.deleteAutomatonOption(openedProcesses, openedProcesses.selectedOption);
            //value.automaton = viewModel.ta;
            //openedProcesses.selectedOption = openedProcesses.
            console.log("options", options);
            value = openedProcesses.selectedOption;
            console.log("value", value);
            //openedProcesses.selectedOption = openedProcesses.automatonOptions[0];
            //setValue(newOptions[0]);
            viewModel.setAutomaton(viewModel, openedProcesses.selectedOption.automaton);
        }
    };

    return (
        <Box sx={{ display: 'inline-flex'}}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }} >
                <FormControl sx={{ width: 200, mr:0.2}} id="enter-name-field" label="Model Name">
                    <InputLabel htmlFor="my-input">Enter New Process</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" onChange={handleInput} sx={{ml: 0.5}}/>
                    <FormHelperText id="my-helper-text">Names can't be duplicates.</FormHelperText>
                </FormControl>
                <Button variant="contained" onClick={addModel} sx={{mb: 1}}>
                    <AddIcon></AddIcon>
                    Add Process
                </Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>

                <Autocomplete
                    sx={{ width: 200, mr: 0.2}}
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
                                openedProcesses.selectedOption = option;
                                //setValue(option);
                                viewModel.setAutomaton(viewModel, option.automaton);
                                console.log('automaton set!!!');
                            }
                        });

                    }}

                    options={optionLabels}

                    renderInput={(params) => <TextField {...params} label="Select Process" />}
                ></Autocomplete>
                <Button variant="contained" onClick={deleteModel}>
                    <DeleteIcon></DeleteIcon>
                    Discard Process
                </Button>
            </Box>
        </Box>
    );
};

export default ProcessSelection;
