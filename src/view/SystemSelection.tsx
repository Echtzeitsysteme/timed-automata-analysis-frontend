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
import { AnalysisViewModel } from '../viewmodel/AnalysisViewModel.ts';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {OpenedSystems, SystemOptionType} from "../viewmodel/OpenedSystems.ts";
import {AutomatonOptionType, useOpenedProcesses} from "../viewmodel/OpenedProcesses.ts";
import {INIT_AUTOMATON} from "../utils/initAutomaton.ts";


export interface SystemSelectionProps {
    viewModel: AnalysisViewModel;
    openedSystems: OpenedSystems;
}

const SystemSelection: React.FC<SystemSelectionProps> = (props) => {
    const { viewModel, openedSystems } = props;
    const options = openedSystems.systemOptions;
    let value = openedSystems.selectedSystem;
    let optionLabels = openedSystems.getLabels(openedSystems.systemOptions)

    const initialProcess = useOpenedProcesses();
    console.log(initialProcess);
    let newSystemName: string = '';
    const addSystem = () => {
        const isExisting = options.some((option) => newSystemName === option.label);
        if (!isExisting && newSystemName.length > 0) {
            const newProcess = initialProcess;
            const newOption : SystemOptionType = {label: newSystemName, processes: newProcess};
            openedSystems.addSystemOption(openedSystems, newOption);
            newProcess.setSelectedAutomaton(newProcess.selectedOption);
            value = newOption;
            optionLabels = openedSystems.getLabels(openedSystems.systemOptions);
        }
    };
    const handleInput = (inputEvent) => {
        newSystemName = inputEvent.target.value as string;
    };

    const deleteSystem = () => {
        if (options.length > 1) {
            openedSystems.deleteSystemOption(openedSystems, openedSystems.selectedSystem);
            value = openedSystems.selectedSystem;
            viewModel.setAutomaton(viewModel, openedSystems.selectedSystem.processes.selectedOption.automaton);
        }
    };

    return (
        <Box>
            <Box sx={{alignItems: 'center', mb: 1 }} >
                <FormControl sx={{ width: 200, mr:0.2}} id="enter-name-field" label="Model Name">
                    <InputLabel htmlFor="my-input">Enter New System</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" onChange={handleInput} sx={{ml: 0.5}}/>
                    <FormHelperText id="my-helper-text">Names can't be duplicates.</FormHelperText>
                </FormControl>
                <Button variant="contained" onClick={addSystem} sx={{mb: 1}}>
                    <AddIcon></AddIcon>
                    Add System
                </Button>
            </Box>
            <Box sx={{alignItems: 'center', mb: 1 }}>

                <Autocomplete
                    sx={{ width: 200, mr: 0.2}}
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
                                value.processes.selectedOption.automaton = viewModel.ta;
                                openedSystems.selectedSystem = option;
                                //setValue(option);
                                openedSystems.selectedSystem.processes.setAutomatonOptions(openedSystems.selectedSystem.processes, openedSystems.selectedSystem.processes.automatonOptions);
                                viewModel.setAutomaton(viewModel, option.processes.selectedOption.automaton);
                                console.log("openedSystems after change:",openedSystems);
                            }
                        });
                    }}
                    options={optionLabels}
                    renderInput={(params) => <TextField {...params} label="Select System" />}
                ></Autocomplete>
                <Button variant="contained" onClick={deleteSystem}>
                    <DeleteIcon></DeleteIcon>
                    Discard System
                </Button>
            </Box>
        </Box>
    );
};

export default SystemSelection;
