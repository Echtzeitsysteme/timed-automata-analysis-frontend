import {OpenedProcesses, useOpenedProcesses} from "./OpenedProcesses.ts";
import React, {useCallback, useState} from "react";

export interface SystemOptionType {
    label: string;
    processes: OpenedProcesses;
}

export interface OpenedSystems {
    systemOptions : SystemOptionType[];
    selectedSystem: SystemOptionType;
    addSystemOption :(openedSystems: OpenedSystems, systemOption: SystemOptionType) => void;
    deleteSystemOption :(openedSystems: OpenedSystems, systemOption: SystemOptionType) => void;
    getLabels: (systemOptions: SystemOptionType[]) => string[];
}

export function useOpenedSystems(): OpenedSystems {
    const automatonOptions = useOpenedProcesses();

    const addSystemOption = useCallback(
        (openedSystems: OpenedSystems, systemOption: SystemOptionType) => {
            const systemOptions = openedSystems.systemOptions;
            systemOptions.push(systemOption);
            setOpenedSystems({...openedSystems, openedSystems: openedSystems, systemOptions: systemOptions});
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
            {label: 'init_System', processes: automatonOptions}
        ];
    const [selectedOption, setSelectedOption] = React.useState<SystemOptionType>(initialOption[0]);

    const [openedSystems, setOpenedSystems] = useState<OpenedSystems>({
        systemOptions: initialOption,
        selectedSystem: selectedOption,
        addSystemOption: addSystemOption,
        deleteSystemOption: deleteSystemOption,
        getLabels: getLabels,
    });

    return openedSystems;
}