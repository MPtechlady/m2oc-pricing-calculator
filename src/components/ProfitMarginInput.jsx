import './MaterialsInput.css';

export const ProfitMarginInput = ({ profitMargin, onMarginChange }) => {
  return (
    <div className="section">
      <h2>Profit Margin</h2>
      <p className="section-description">Your desired profit margin</p>

      <div className="form-group">
        <label>Desired Profit Margin (%) *</label>
        <input
          type="number"
          min="0"
          max="100"
          placeholder="e.g., 40"
          value={profitMargin}
          onChange={(e) => onMarginChange(e.target.value)}
        />
      </div>

      <div className="margin-guide">
        <p>
          <strong>30-50%:</strong> Healthy
        </p>
        <p>
          <strong>50-70%:</strong> Strong
        </p>
        <p>
          <strong>&gt;70%:</strong> Brand / Luxury
        </p>
      </div>
    </div>
  );
};
