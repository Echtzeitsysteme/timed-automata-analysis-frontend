import {AutomatonOptionType} from "./OpenedProcesses.ts";
import React, {useCallback, useState} from "react";
import {INIT_AUTOMATON} from "../utils/initAutomaton.ts";
import {Integer} from "../model/ta/integer.ts";

export interface SystemOptionType {
    label: string;
    processes: AutomatonOptionType[];
    integers: Integer[];
}

export interface OpenedSystems {
    systemOptions : SystemOptionType[];
    selectedSystem: SystemOptionType;
    setSelectedSystem: (systemOption: SystemOptionType) => void;
    addSystemOption :(openedSystems: OpenedSystems, systemOption: SystemOptionType) => void;
    deleteSystemOption :(openedSystems: OpenedSystems, systemOption: SystemOptionType) => void;
    getLabels: (systemOptions: SystemOptionType[]) => string[];
    addInteger: (openedSystems: OpenedSystems, name: string, size: number, min: number, max: number, init: number) => void;
    editInteger: (openedSystems: OpenedSystems, name: string, prevName: string, size: number, min: number, max: number, init: number) => void;
    removeInteger: (openedSystems: OpenedSystems, name: string) => void;
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


    // ===== manipulate Integers ===================================================
    const addInteger = useCallback((openedSystems: OpenedSystems, name: string, size: number, min: number, max: number, init: number) => {
        const system = openedSystems.selectedSystem;
        const integers = system.integers;
        const newInteger: Integer = {name: name, size: size, min: min, max: max, init: init};
        const updatedIntegers = [...integers, newInteger];
        const updatedSystem = {...system, integers: updatedIntegers};
        setOpenedSystems({...openedSystems, selectedSystem: updatedSystem});
        },
        []
    );

    const editInteger = useCallback((openedSystems: OpenedSystems, name: string, prevName: string, size: number, min: number, max: number, init: number) => {
        const system = openedSystems.selectedSystem;
        const integers = [...system.integers];
        const integerToEdit = integers.filter((int) => int.name === prevName)[0];
        integerToEdit.name = name;
        integerToEdit.size = size;
        integerToEdit.min = min;
        integerToEdit.max = max;
        integerToEdit.init = init;
        const updatedSystem = {...system, integers: integers};
        setOpenedSystems({...openedSystems, selectedSystem: updatedSystem});
        },
        []
    );

    const removeInteger = useCallback((openedSystems: OpenedSystems, name: string) => {
        const system = openedSystems.selectedSystem;
        const integers = system.integers;
        const updatedIntegers = integers.filter((int) => int.name !== name);
        const updatedSystem = {...system, integers: updatedIntegers};
        setOpenedSystems({...openedSystems, selectedSystem: updatedSystem});
        },
        []
    );

    const initialOption : SystemOptionType[] =
        [
            {label: 'init_System', processes: [{label:'init_Process' , automaton:INIT_AUTOMATON }], integers: []}
        ];
    const [selectedOption, setSelectedOption] = React.useState<SystemOptionType>(initialOption[0]);

    const [openedSystems, setOpenedSystems] = useState<OpenedSystems>({
        systemOptions: initialOption,
        selectedSystem: selectedOption,
        setSelectedSystem: setSelectedSystem,
        addSystemOption: addSystemOption,
        deleteSystemOption: deleteSystemOption,
        getLabels: getLabels,
        addInteger: addInteger,
        editInteger: editInteger,
        removeInteger: removeInteger,
    });

    return openedSystems;
}