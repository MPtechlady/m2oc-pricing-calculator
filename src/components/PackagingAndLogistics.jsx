import './MaterialsInput.css';

export const PackagingAndLogistics = ({
  containerCost,
  packaging,
  onPackagingChange,
}) => {
  const updatePackaging = (field, value) => {
    onPackagingChange({
      containerCost,
      packaging: {
        ...packaging,
        [field]: value ? parseFloat(value) : 0,
      },
    });
  };

  const updateContainerCost = (value) => {
    onPackagingChange({
      containerCost: value ? parseFloat(value) : 0,
      packaging,
    });
  };

  const totalPackagingCost =
    (packaging.stickerCost || 0) +
    (packaging.labelCost || 0) +
    (packaging.boxCost || 0);

  return (
    <div className="section">
      <h2>Packaging & Logistics</h2>
      <p className="section-description">Container and packaging costs per unit</p>

      <div className="form-group">
        <label>Container Cost (₹/unit) *</label>
        <input
          type="number"
          step="0.1"
          placeholder="e.g., 10"
          value={containerCost}
          onChange={(e) => updateContainerCost(e.target.value)}
        />
        <small>Bottle, jar, pouch, etc.</small>
      </div>

      <div className="form-group">
        <label>Sticker Cost (₹/unit)</label>
        <input
          type="number"
          step="0.1"
          placeholder="e.g., 1"
          value={packaging.stickerCost || ''}
          onChange={(e) => updatePackaging('stickerCost', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Label Cost (₹/unit)</label>
        <input
          type="number"
          step="0.1"
          placeholder="e.g., 2"
          value={packaging.labelCost || ''}
          onChange={(e) => updatePackaging('labelCost', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Box Cost (₹/unit)</label>
        <input
          type="number"
          step="0.1"
          placeholder="e.g., 5"
          value={packaging.boxCost || ''}
          onChange={(e) => updatePackaging('boxCost', e.target.value)}
        />
      </div>

      <div className="cost-summary">
        <strong>Total Packaging Cost: ₹{totalPackagingCost.toFixed(2)}</strong>
      </div>
    </div>
  );
};
