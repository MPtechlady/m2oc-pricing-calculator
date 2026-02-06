import './MaterialsInput.css';

export const ProductFormulation = ({ materials, formulation, onFormulationChange }) => {
  const updateFormulation = (materialId, quantity) => {
    onFormulationChange({
      ...formulation,
      [materialId]: quantity ? parseFloat(quantity) : 0,
    });
  };

  return (
    <div className="section">
      <h2>Product Formulation</h2>
      <p className="section-description">How much of each material per product unit</p>

      <div className="form-group">
        <label>Product Size (e.g., 50g, 100ml) *</label>
        <input
          type="text"
          placeholder="e.g., 50g or 100ml"
          value={formulation.productSize || ''}
          onChange={(e) =>
            onFormulationChange({
              ...formulation,
              productSize: e.target.value,
            })
          }
        />
      </div>

      {materials.length === 0 ? (
        <p className="empty-state">Add materials first</p>
      ) : (
        <div className="formulation-grid">
          {materials.map((material) => (
            <div key={material.id} className="form-group">
              <label>
                {material.name || 'Material'} used ({material.unit})
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="0"
                value={formulation[material.id] || ''}
                onChange={(e) =>
                  updateFormulation(material.id, e.target.value)
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
