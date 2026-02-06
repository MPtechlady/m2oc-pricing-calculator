import './MaterialsInput.css';

export const ShippingAndHidden = ({
  shippingCost,
  laborCost,
  energyCost,
  miscCost,
  onCostsChange,
}) => {
  const handleChange = (field, value) => {
    onCostsChange({
      shippingCost: field === 'shipping' ? value : shippingCost,
      laborCost: field === 'labor' ? value : laborCost,
      energyCost: field === 'energy' ? value : energyCost,
      miscCost: field === 'misc' ? value : miscCost,
    });
  };

  return (
    <div className="section">
      <h2>Shipping & Hidden Costs</h2>
      <p className="section-description">Per batch costs</p>

      <h3 className="subsection-title">Shipping</h3>
      <div className="form-group">
        <label>Shipping Cost per Batch (₹)</label>
        <input
          type="number"
          placeholder="e.g., 500"
          value={shippingCost}
          onChange={(e) => handleChange('shipping', e.target.value)}
        />
      </div>

      <h3 className="subsection-title">Hidden Costs</h3>
      <p className="section-description">Distributed per unit</p>

      <div className="form-row">
        <div className="form-group">
          <label>Labor (₹/batch)</label>
          <input
            type="number"
            placeholder="e.g., 1000"
            value={laborCost}
            onChange={(e) => handleChange('labor', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Energy (₹/batch)</label>
          <input
            type="number"
            placeholder="e.g., 200"
            value={energyCost}
            onChange={(e) => handleChange('energy', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Miscellaneous (₹/batch)</label>
          <input
            type="number"
            placeholder="e.g., 100"
            value={miscCost}
            onChange={(e) => handleChange('misc', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
