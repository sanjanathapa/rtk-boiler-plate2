
import { handleConfigurationChange, handleConfiguratorDragEnd } from 'data/utils/configuratorSelector'
// handleConfigurationChange(index, type, confData)
describe('#handleConfigurationChange: This function returns array with lock & check colum', () => {
  const confData = [
    { "checked": false, "locked": false },
    { "checked": false, "locked": false }
  ]

  it('should return a array with values', () => {
    expect(handleConfigurationChange({ index: 0, type: 'checked', confData })).toEqual([{ "checked": true, "locked": false }, { "checked": false, "locked": false }])
    expect(handleConfigurationChange({ index: 1, type: 'checked', confData })).toEqual([{ "checked": false, "locked": false }, { "checked": true, "locked": false }])
    expect(handleConfigurationChange({ index: 1, type: 'all', confData })).toEqual([{ "checked": true, "locked": false }, { "checked": true, "locked": false }])
    expect(handleConfigurationChange({ index: 0, type: 'locked', confData })).toEqual([{ "checked": false, "locked": true }, { "checked": false, "locked": false }])
    expect(handleConfigurationChange({ index: 1, type: 'locked', confData })).toEqual([{ "checked": false, "locked": true }, { "checked": false, "locked": true }])
  })

  describe('#handleConfiguratorDragEnd: This function returns array', () => {

    it('should return of tags', () => {
      const result = {
        "draggableId": "s2",
        "type": "DEFAULT",
        "source": {
          "index": 2,
          "droppableId": "upper-section"
        },
        "reason": "DROP",
        "mode": "FLUID",
        "destination": {
          "droppableId": "upper-section",
          "index": 1
        },
        "combine": null
      }
      const columns = [
        {
          "label": "Customer",
          "position": 0,
          "tableLabel": "Customer"
        },
        {
          "label": "Account Number",
          "position": 1,
          "tableLabel": "Account Number"
        },
        {
          "label": "Invoice #",
          "position": 2,
          "tableLabel": "Invoice #"
        }];

      const outputColumns = [
        {
          "label": "Customer",
          "position": 0,
          "tableLabel": "Customer"
        },
        {
          "label": "Invoice #",
          "position": 2,
          "tableLabel": "Invoice #"
        },
        {
          "label": "Account Number",
          "position": 1,
          "tableLabel": "Account Number"
        }
      ]

      expect(handleConfiguratorDragEnd({ result, columns })).toEqual(outputColumns)
    })
  })
})
