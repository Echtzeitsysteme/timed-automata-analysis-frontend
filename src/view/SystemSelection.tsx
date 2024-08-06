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
import {AutomatonOptionType} from "./ProcessSelection.tsx";
import {useOpenedProcesses} from "./OpenedProcesses.tsx";
import {OpenedSystems} from "./OpenedSystems.tsx";

export interface SystemSelectionProps {
    viewModel: AnalysisViewModel;
    openedSystems: OpenedSystems;
}

export interface SystemOptionType {
    label: string;
    process: AutomatonOptionType[];
}

const SystemSelection: React.FC<SystemSelectionProps> = (props) => {
    const { viewModel, openedSystems } = props;
    const options = openedSystems.systemOptions;
    let value = openedSystems.selectedProcess;
    let optionLabels = openedSystems.getLabels(openedSystems.systemOptions)

    let newSystemName: string = '';
    const addSystem = () => {
        const isExisting = options.some((option) => newSystemName === option.label);
        if (!isExisting && newSystemName.length > 0) {
            //TODO
        }
    };
    const handleInput = (inputEvent) => {
        newSystemName = inputEvent.target.value as string;
    };

    const deleteSystem = () => {
        if (options.length > 1) {
            //TODO
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
                    value={value}
                    onChange={(event, newValue) => {
                        console.log(event);
                        console.log('Optionen:', options);

                        //set value and automaton to existing option
                        options.forEach((option) => {
                            if (option.label === newValue) {
                                //TODO
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
