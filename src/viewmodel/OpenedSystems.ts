import {AutomatonOptionType} from "./OpenedProcesses.ts";
import React, {useCallback, useState} from "react";
import {INIT_AUTOMATON} from "../utils/initAutomaton.ts";

export interface SystemOptionType {
    label: string;
    processes: AutomatonOptionType[];
}

export interface OpenedSystems {
    systemOptions : SystemOptionType[];
    selectedSystem: SystemOptionType;
    setSelectedSystem: (systemOption: SystemOptionType) => void;
    addSystemOption :(openedSystems: OpenedSystems, systemOption: SystemOptionType) => void;
    deleteSystemOption :(openedSystems: OpenedSystems, systemOption: SystemOptionType) => void;
    getLabels: (systemOptions: SystemOptionType[]) => string[];
}

export function useOpenedSystems(): OpenedSystems {

    const setSelectedSystem = useCallback(
        (systemOption: SystemOptionType) => {
            setSelectedOption(systemOption);
        },
        []
    );

    const addSystemOption = useCallback(
        (openedSystems: OpenedSystems, systemOption: SystemOptionType) => {
            const systemOptions = openedSystems.systemOptions;
            systemOptions.push(systemOption);
            setOpenedSystems({...openedSystems, openedSystems: openedSystems, systemOptions: systemOptions, selectedSystem: systemOption});
        },
        []
    );

    const deleteSystemOption = useCallback(
        (openedSystems: OpenedSystems, systemOption: SystemOptionType) => {
            const options = openedSystems.systemOptions;
            const newOptions = options.filter((option) => option !== systemOption);
            openedSystems.selectedSystem = newOptions[0];
            //oder so eine setSystemOptions Methode kreieren und dann hier openedSystems.setSystemsOptions(openedSystems, newOptions); ???
            setOpenedSystems({...openedSystems, openedSystems: openedSystems, systemOptions: newOptions});
        },
        []
    );

    const getLabels = useCallback(
        (systemOptions : SystemOptionType[]) => {
            const labels = systemOptions.map((option) => option.label);
            return labels;
        },
        []
    );

    const initialOption : SystemOptionType[] =
        [
            {label: 'init_System', processes: [{label:'init_Process' , automaton:INIT_AUTOMATON }]}
        ];
    const [selectedOption, setSelectedOption] = React.useState<SystemOptionType>(initialOption[0]);

    const [openedSystems, setOpenedSystems] = useState<OpenedSystems>({
        systemOptions: initialOption,
        selectedSystem: selectedOption,
        setSelectedSystem: setSelectedSystem,
        addSystemOption: addSystemOption,
        deleteSystemOption: deleteSystemOption,
        getLabels: getLabels,
    });

    return openedSystems;
}