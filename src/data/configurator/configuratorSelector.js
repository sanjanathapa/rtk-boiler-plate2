import cloneDeep from "lodash/cloneDeep";
import { createSelector } from "reselect";

const getlockedConditions = (index, type, confData) => {
  const cloneConfData = cloneDeep(confData);
  const lockedDataLength = cloneConfData.filter((data) => data.locked).length;

  switch (true) {
    case lockedDataLength === 0:
      for (let init = 0; init < index + 1; init++) {
        cloneConfData[init][type] = true;
      }
      break;
    case lockedDataLength > index + 1:
      for (let greater = lockedDataLength - 1; greater > index; greater--) {
        cloneConfData[greater][type] = false;
      }
      break;
    case lockedDataLength === index + 1:
      for (let equal = 0; equal < index + 1; equal++) {
        cloneConfData[equal][type] = false;
      }
      break;
    case lockedDataLength < index + 1:
      for (let lesser = 0; lesser < index + 1; lesser++) {
        cloneConfData[lesser][type] = true;
      }
      break;
    default:
      break;
  }

  return cloneConfData;
};

export const handleConfigurationChange = createSelector(
  [(state) => state.index, (state) => state.type, (state) => state.confData],
  (index, type, confData) => {
    let cloneConfData = cloneDeep(confData);

    if (type === "locked") {
      cloneConfData = getlockedConditions(index, type, cloneConfData);
    } else {
      cloneConfData[index][type] = !cloneConfData[index][type];
    }

    return cloneConfData;
  }
);

export const handleConfiguratorDragEnd = createSelector(
  [(state) => state.result, (state) => state.columns],
  (result, columns) => {
    if (!result.destination) {
      return columns;
    }

    const allColumns = Array.from(columns);
    const [reorderedItem] = allColumns.splice(result.source.index, 1);
    allColumns.splice(result.destination.index, 0, reorderedItem);

    return allColumns;
  }
);

