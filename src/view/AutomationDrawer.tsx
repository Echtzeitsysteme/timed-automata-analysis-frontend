import React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import {AnalysisViewModel} from "../viewmodel/AnalysisViewModel.ts";
import {TimedAutomaton} from "../model/ta/timedAutomaton.ts";
import SystemSelection from "./SystemSelection.tsx";
import {OpenedSystems, useOpenedSystems} from "./OpenedSystems.tsx";

const drawerWidth = 240;

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export interface AutomatonDrawerProps {
    viewModel: AnalysisViewModel;
    openedSystems: OpenedSystems;
}

const AutomatonDrawer: React.FC<AutomatonDrawerProps> = (props) => {
    const { viewModel, openedSystems } = props;
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [openedAutomata, setOpenedAutomata] = React.useState<TimedAutomaton[]>([viewModel.ta]);
    const [currentAutomaton, setCurrentAutomaton] = React.useState<TimedAutomaton>(openedAutomata[0]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleClick = () => {
        console.log("peepeepoopoo");
    }

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ml: 1, mr: 1, ...(open && {display: 'none'})}}
            >
                <MenuIcon/>
            </IconButton>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    Select or Add System
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <SystemSelection viewModel={viewModel} openedSystems={openedSystems}></SystemSelection>
            </Drawer>
        </Box>
    );
}

export default AutomatonDrawer;