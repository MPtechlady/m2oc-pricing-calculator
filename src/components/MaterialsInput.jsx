import { useState } from 'react';
import './MaterialsInput.css';

export const MaterialsInput = ({ materials, onMaterialsChange }) => {
  const addMaterial = () => {
    if (materials.length < 12) {
      const newMaterial = {
        id: Date.now(),
        name: '',
        unit: 'gm',
        totalQuantity: '',
        totalCost: '',
      };
      onMaterialsChange([...materials, newMaterial]);
    }
  };

  const removeMaterial = (id) => {
    onMaterialsChange(materials.filter((m) => m.id !== id));
  };

  const updateMaterial = (id, field, value) => {
    onMaterialsChange(
      materials.map((m) =>
        m.id === id ? { ...m, [field]: value } : m
      )
    );
  };

  const costPerUnit = (material) => {
    if (material.totalQuantity && material.totalCost) {
      return (material.totalCost / material.totalQuantity).toFixed(2);
    }
    return '0.00';
  };

  return (
    <div className="section materials-section">
      <h2>Raw Materials</h2>
      <p className="section-description">Define your material inventory (max 12)</p>

      <div className="materials-list">
        {materials.map((material, index) => (
          <div key={material.id} className="material-card">
            <div className="material-header">
              <span className="material-number">#{index + 1}</span>
              {materials.length > 1 && (
                <button
                  className="btn-remove"
                  onClick={() => removeMaterial(material.id)}
                  title="Remove material"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="form-group">
              <label>Material Name *</label>
              <input
                type="text"
                placeholder="e.g., Shea Butter"
                value={material.name}
                onChange={(e) =>
                  updateMaterial(material.id, 'name', e.target.value)
                }
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Unit Type *</label>
                <select
                  value={material.unit}
                  onChange={(e) =>
                    updateMaterial(material.id, 'unit', e.target.value)
                  }
                >
                  <option value="gm">Grams (gm)</option>
                  <option value="ml">Milliliters (ml)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Total Quantity Purchased ({material.unit}) *</label>
                <input
                  type="number"
                  placeholder="e.g., 1000"
                  value={material.totalQuantity}
                  onChange={(e) =>
                    updateMaterial(material.id, 'totalQuantity', e.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label>Total Purchase Cost (₹) *</label>
                <input
                  type="number"
                  placeholder="e.g., 500"
                  value={material.totalCost}
                  onChange={(e) =>
                    updateMaterial(material.id, 'totalCost', e.target.value)
                  }
                />
              </div>
            </div>

            {material.totalQuantity && material.totalCost && (
              <div className="cost-per-unit">
                <strong>Cost per {material.unit}:</strong> ₹{costPerUnit(material)}
              </div>
            )}
          </div>
        ))}
      </div>

      {materials.length < 12 && (
        <button className="btn btn-secondary" onClick={addMaterial}>
          + Add Material
        </button>
      )}
    </div>
  );
};
