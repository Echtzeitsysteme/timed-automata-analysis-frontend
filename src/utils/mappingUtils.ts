import { Data, Edge, Node } from 'vis-network';
import { DataSet } from 'vis-data/peer';
import { TimedAutomaton } from '../model/ta/timedAutomaton';
import { useCallback } from 'react';
import { useFormattingUtils } from './formattingUtils';

interface MappingUtils {
  mapTaToVisDataModel(ta: TimedAutomaton): Data;
}

export function useMappingUtils(): MappingUtils {
  const { formatLocationLabelVisual, formatSwitchLabelVisual } = useFormattingUtils();

  const mapTaToVisDataModel = useCallback(
    (ta: TimedAutomaton) => {
      const nodes = new DataSet<Node>();
      const edges = new DataSet<Edge>();

      ta.locations.forEach((location) => {
        const newNode: Node = {
          id: `${location.name}`,
          label: formatLocationLabelVisual(location),
          x: location.xCoordinate,
          y: location.yCoordinate,
        };
        if (location.isInitial) {
          newNode.group = 'startGroup';
        }
        nodes.add(newNode);
      });

      ta.switches.forEach((sw, index) => {
        edges.add({
          id: index,
          from: `${sw.source.name}`,
          to: `${sw.target.name}`,
          label: formatSwitchLabelVisual(sw),
        });
      });

      return <Data>{
        nodes: nodes,
        edges: edges,
      };
    },
    [formatLocationLabelVisual, formatSwitchLabelVisual]
  );

  return { mapTaToVisDataModel: mapTaToVisDataModel };
}
