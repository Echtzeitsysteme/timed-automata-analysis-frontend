import React, { useEffect, useRef } from 'react';
import { Data, Network, Options } from 'vis-network/peer';
import { AnalysisViewModel } from '../viewmodel/AnalysisViewModel';
import { useMappingUtils } from '../utils/mappingUtils';

interface VisualizationProps {
  viewModel: AnalysisViewModel;
}

const AutomatonVisualization: React.FC<VisualizationProps> = (props) => {
  const { viewModel } = props;
  const { ta, updateLocationCoordinates } = viewModel;
  const { locations } = ta;
  const { mapTaToVisDataModel } = useMappingUtils();
  const networkRef = useRef<HTMLDivElement>(null);

  let activatePhysics: boolean = true;
  locations.forEach((location) => {
    if (location.xCoordinate !== 0 || location.yCoordinate !== 0) {
      activatePhysics = false;
    }
  });

  useEffect(() => {
    if (!networkRef.current) {
      return;
    }

    const data: Data = mapTaToVisDataModel(ta);
    const options: Options = {
      groups: {
        startGroup: { color: { background: '#d3d3d3' }, borderWidth: 2 },
      },
      nodes: {
        shape: 'box',
        color: {
          background: 'white',
          border: 'black',
        },
        font: {
          size: 20,
        },
      },
      edges: {
        color: 'gray',
        arrows: {
          to: { enabled: true, type: 'arrow' },
        },
        font: {
          size: 20,
        },
      },
      physics: {
        enabled: false,
        forceAtlas2Based: {
          gravitationalConstant: -26,
          centralGravity: 0.005,
          springLength: 230,
          springConstant: 0.18,
          avoidOverlap: 1,
          theta: 0.1,
        },
        maxVelocity: 146,
        solver: 'forceAtlas2Based',
        stabilization: {
          enabled: true,
          iterations: 1000,
          updateInterval: 25,
        },
        timestep: 0.35,
      },
    };

    const network = new Network(networkRef.current, data, options);

    if (activatePhysics) {
      network.setOptions({
        physics: {
          enabled: true,
        },
      });
    }

    network.on('stabilizationIterationsDone', function () {
      const nodePositions = network.getPositions();
      locations.forEach((location) => {
        const locationName = location.name;
        location.xCoordinate = nodePositions[locationName].x;
        location.yCoordinate = nodePositions[locationName].y;
      });
      network.setOptions({ physics: false });
    });

    // Event listener for dragEnd event (update coordinates saved in locations if a location is moved)
    network.on('dragEnd', (params) => {
      const nodePositions = network.getPositions();
      locations.forEach((location) => {
        const locationName = location.name;
        location.xCoordinate = nodePositions[locationName].x;
        location.yCoordinate = nodePositions[locationName].y;
      });

      // Check if nodes are dragged
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0]; // Assuming single node drag (can be extended for multiple nodes)
        const nodePosition = network.getPositions([nodeId]);

        // Update TA model
        ta.locations.forEach((location) => {
          if (location.name === nodeId) {
            updateLocationCoordinates(viewModel, location.name, nodePosition[nodeId].x, nodePosition[nodeId].y);
          }
        });
      }
    });
  }, [ta, viewModel, updateLocationCoordinates, mapTaToVisDataModel, activatePhysics, locations]);

  return <div ref={networkRef} style={{ width: '100%', height: '100%' }} />;
};

export default AutomatonVisualization;
