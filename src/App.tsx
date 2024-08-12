import './App.css';
import { useTranslation } from 'react-i18next';
import AutomatonVisualization from './view/AutomatonVisualization';
import { Box, Grid } from '@mui/material';
import { useLayoutEffect, useRef, useState } from 'react';
import { useAnalysisViewModel } from './viewmodel/AnalysisViewModel';
import { AutomatonManipulation } from './view/AutomatonManipulation';
import UploadButton from './view/UploadButton.tsx';
import DownloadButton from './view/DownloadButton.tsx';
import ProcessSelection from './view/ProcessSelection.tsx';
import AutomatonDrawer from "./view/AutomationDrawer.tsx";
import {TimedAutomaton} from "./model/ta/timedAutomaton.ts";
import {OpenedProcesses, useOpenedProcesses} from "./viewmodel/OpenedProcesses.ts";
import {useOpenedSystems} from "./viewmodel/OpenedSystems.ts";

function App() {
  const viewModel = useAnalysisViewModel();
  const openedSystems= useOpenedSystems();
  //const openedProcesses = useOpenedProcesses();
  //TODO das hier nochmal richtig stellen. das ist glaube ich so noch fehlerhaft
  const currentProcesses = openedSystems.selectedSystem.processes;
  const { t } = useTranslation();

  // calculate size of content elements so that content always fits the window size
  const headerRef = useRef<HTMLHeadingElement>(null);
  const [contentHeight, setContentHeight] = useState(window.innerHeight);

  useLayoutEffect(() => {
    const updateContentHeight = () => {
      const headerEl = headerRef.current;
      if (headerEl) {
        const style = window.getComputedStyle(headerEl);
        const marginTop = parseInt(style.marginTop, 10);
        const marginBottom = parseInt(style.marginBottom, 10);
        const totalHeaderHeight = headerEl.offsetHeight + marginTop + marginBottom;
        setContentHeight(window.innerHeight - totalHeaderHeight);
      }
    };

    window.addEventListener('resize', updateContentHeight);
    updateContentHeight(); // Set initial height

    return () => window.removeEventListener('resize', updateContentHeight);
  }, []);

  return (
    <>
      <h1 style={{ paddingLeft: '16px' }} ref={headerRef}>
        ⏰ {t('app.title')}
      </h1>
      <AutomatonDrawer viewModel={viewModel} openedSystems={openedSystems}></AutomatonDrawer>
      <UploadButton viewModel={viewModel} openedProcesses={currentProcesses}></UploadButton>
      <DownloadButton viewModel={viewModel} openedProcesses={currentProcesses}></DownloadButton>
      <ProcessSelection viewModel={viewModel} openedProcesses={currentProcesses}></ProcessSelection>
      <Box sx={{ display: 'flex', height: `${contentHeight - 1}px`, overflow: 'hidden' }}>
        <Grid container sx={{ height: '100%' }}>
          <Grid
            item
            xs={12}
            sm={4}
            md={3}
            lg={3}
            sx={{ borderRight: '1px solid #ccc', paddingLeft: '16px', overflowY: 'auto', height: '100%' }}
          >
            <AutomatonManipulation viewModel={viewModel} />
          </Grid>
          <Grid item xs={12} sm={8} md={9} lg={9} sx={{ overflowY: 'hidden', height: '100%' }}>
            <AutomatonVisualization viewModel={viewModel} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default App;
