import './MaterialsInput.css';

export const BatchAndProcessing = ({
  batchSize,
  processingTime,
  costPerHour,
  testingCost,
  onBatchChange,
}) => {
  return (
    <div className="section">
      <h2>Batch & Processing</h2>
      <p className="section-description">Production parameters</p>

      <div className="form-row">
        <div className="form-group">
          <label>Batch Size (number of units) *</label>
          <input
            type="number"
            placeholder="e.g., 100"
            value={batchSize}
            onChange={(e) =>
              onBatchChange({
                batchSize: e.target.value,
                processingTime,
                costPerHour,
                testingCost,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Processing Time (hours per batch) *</label>
          <input
            type="number"
            step="0.5"
            placeholder="e.g., 2"
            value={processingTime}
            onChange={(e) =>
              onBatchChange({
                batchSize,
                processingTime: e.target.value,
                costPerHour,
                testingCost,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Cost per Processing Hour (₹) *</label>
          <input
            type="number"
            placeholder="e.g., 100"
            value={costPerHour}
            onChange={(e) =>
              onBatchChange({
                batchSize,
                processingTime,
                costPerHour: e.target.value,
                testingCost,
              })
            }
          />
        </div>
      </div>

      <div className="form-group">
        <label>Testing Cost per Batch (₹) - Optional</label>
        <input
          type="number"
          placeholder="e.g., 200"
          value={testingCost}
          onChange={(e) =>
            onBatchChange({
              batchSize,
              processingTime,
              costPerHour,
              testingCost: e.target.value,
            })
          }
        />
      </div>
    </div>
  );
};
