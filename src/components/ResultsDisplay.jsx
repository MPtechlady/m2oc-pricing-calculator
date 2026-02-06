import {
  getCostBreakdownPercentages,
  generateInsights,
} from '../utils/insightsEngine';
import { getPositioning, getPositioningColor } from '../utils/positioningLogic';
import './ResultsDisplay.css';

export const ResultsDisplay = ({ costs }) => {
  if (!costs || costs.costPrice === 0) {
    return (
      <div className="results-empty">
        <p>Fill in all required fields to see results</p>
      </div>
    );
  }

  const positioning = getPositioning(costs.sellingPrice, costs.profitMargin);
  const breakdownPercentages = getCostBreakdownPercentages(costs);
  const insights = generateInsights(costs, positioning);
  const positioningColor = getPositioningColor(positioning);

  return (
    <div className="results-container">
      {/* Pricing Summary */}
      <div className="results-section pricing-summary">
        <h2>Pricing Summary</h2>

        <div className="price-cards">
          <div className="price-card">
            <div className="price-label">Cost Price</div>
            <div className="price-value">₹{costs.costPrice.toFixed(2)}</div>
          </div>

          <div className="price-card">
            <div className="price-label">Selling Price</div>
            <div className="price-value primary">
              ₹{costs.sellingPrice.toFixed(2)}
            </div>
          </div>

          <div className="price-card">
            <div className="price-label">MRP (30% Buffer)</div>
            <div className="price-value">₹{costs.mrp.toFixed(2)}</div>
          </div>

          <div className="price-card">
            <div className="price-label">Profit Margin</div>
            <div className="price-value accent">{costs.profitMargin}%</div>
          </div>
        </div>
      </div>

      {/* Positioning */}
      <div className="results-section positioning-section">
        <h2>Market Positioning</h2>

        <div className="positioning-box" style={{ borderColor: positioningColor }}>
          <div className="positioning-content">
            <div className="positioning-primary">{positioning.recommended}</div>
            <div className="positioning-details">
              <p>
                <strong>Price Category:</strong> {positioning.priceCategory}
              </p>
              <p>
                <strong>Margin Signal:</strong> {positioning.marginSignal}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="results-section cost-breakdown">
        <h2>Cost Breakdown</h2>

        <div className="breakdown-list">
          {costs.rawMaterialCost > 0 && (
            <div className="breakdown-item">
              <span className="cost-label">Raw Materials</span>
              <span className="cost-value">
                ₹{costs.rawMaterialCost.toFixed(2)} (
                {breakdownPercentages.rawMaterial.toFixed(1)}%)
              </span>
            </div>
          )}

          {costs.processingCost > 0 && (
            <div className="breakdown-item">
              <span className="cost-label">Processing</span>
              <span className="cost-value">
                ₹{costs.processingCost.toFixed(2)} (
                {breakdownPercentages.processing.toFixed(1)}%)
              </span>
            </div>
          )}

          {costs.testingCost > 0 && (
            <div className="breakdown-item">
              <span className="cost-label">Testing</span>
              <span className="cost-value">
                ₹{costs.testingCost.toFixed(2)} (
                {breakdownPercentages.testing.toFixed(1)}%)
              </span>
            </div>
          )}

          {costs.logisticsCost > 0 && (
            <div className="breakdown-item">
              <span className="cost-label">Logistics & Packaging</span>
              <span className="cost-value">
                ₹{costs.logisticsCost.toFixed(2)} (
                {breakdownPercentages.logistics.toFixed(1)}%)
              </span>
            </div>
          )}

          {costs.shippingCost > 0 && (
            <div className="breakdown-item">
              <span className="cost-label">Shipping</span>
              <span className="cost-value">
                ₹{costs.shippingCost.toFixed(2)} (
                {breakdownPercentages.shipping.toFixed(1)}%)
              </span>
            </div>
          )}

          {costs.hiddenCost > 0 && (
            <div className="breakdown-item">
              <span className="cost-label">Hidden Costs</span>
              <span className="cost-value">
                ₹{costs.hiddenCost.toFixed(2)} (
                {breakdownPercentages.hidden.toFixed(1)}%)
              </span>
            </div>
          )}

          <div className="breakdown-total">
            <span className="cost-label">
              <strong>Total Cost Per Unit</strong>
            </span>
            <span className="cost-value">
              <strong>₹{costs.costPrice.toFixed(2)}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Insights */}
      {insights.length > 0 && (
        <div className="results-section insights-section">
          <h2>Founder Insights</h2>

          <div className="insights-list">
            {insights.map((insight, idx) => (
              <div key={idx} className="insight-item">
                {insight}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
