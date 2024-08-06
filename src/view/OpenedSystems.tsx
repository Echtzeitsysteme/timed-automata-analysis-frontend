import {useOpenedProcesses} from "./OpenedProcesses.tsx";
import React, {useCallback, useState} from "react";
import {SystemOptionType} from "./SystemSelection.tsx";

export interface OpenedSystems {
    systemOptions : SystemOptionType[];
    selectedProcess: SystemOptionType;
    addSystemOption :(openedSystems: OpenedSystems, systemOption: SystemOptionType) => void;
    deleteSystemOption :(openedSystems: OpenedSystems, systemOption: SystemOptionType) => void;
    getLabels: (systemOptions: SystemOptionType[]) => string[];
}

export function useOpenedSystems(): OpenedSystems {
    const { automatonOptions } = useOpenedProcesses();

    const addSystemOption = useCallback(
        (openedSystems: OpenedSystems, systemOption: SystemOptionType) => {

        },
        []
    );

    const deleteSystemOption = useCallback(
        (openedSystems: OpenedSystems, systemOption: SystemOptionType) => {

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
            {label: 'init_System', process: automatonOptions}
        ];
    const [selectedOption, setSelectedOption] = React.useState<SystemOptionType>(initialOption[0]);

    const [openedSystems, setOpenedSystems] = useState<OpenedSystems>({
        systemOptions: initialOption,
        selectedProcess: selectedOption,
        addSystemOption: addSystemOption,
        deleteSystemOption: deleteSystemOption,
        getLabels: getLabels,
    });

    return openedSystems;
}