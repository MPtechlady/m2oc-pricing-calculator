/**
 * M2OC Insights Engine
 * Generates founder-friendly insights based on calculation results
 */

export const generateInsights = (costs, positioning) => {
  const insights = [];

  // Margin-based insights
  if (costs.profitMargin < 30) {
    insights.push("⚠️ Risky margin — consider reducing costs or raising price");
  } else if (costs.profitMargin < 50) {
    insights.push("✓ Healthy margin — good baseline for sustainability");
  } else if (costs.profitMargin < 70) {
    insights.push("✓ Strong margin — good room for scaling & marketing");
  } else {
    insights.push("✓ Premium margin — strong for luxury positioning");
  }

  // Cost breakdown insights
  const totalCosts = 
    costs.rawMaterialCost +
    costs.processingCost +
    costs.testingCost +
    costs.logisticsCost +
    costs.shippingCost +
    costs.hiddenCost;

  const shippingPercent = (costs.shippingCost / totalCosts) * 100;
  if (shippingPercent > 15) {
    insights.push("📦 Shipping is a significant cost — consider local production");
  }

  const rawMaterialPercent = (costs.rawMaterialCost / totalCosts) * 100;
  if (rawMaterialPercent > 60) {
    insights.push("🔧 Formulation cost is high — bulk suppliers or reformulation may help");
  }

  const processingPercent = (costs.processingCost / totalCosts) * 100;
  if (processingPercent > 20) {
    insights.push("⚙️ Processing cost is high — automate or batch larger quantities");
  }

  const logisticsPercent = (costs.logisticsCost / totalCosts) * 100;
  if (logisticsPercent > 10) {
    insights.push("📋 Packaging cost is significant — optimize materials or design");
  }

  // Positioning insights
  if (positioning.recommended === "Basic" && costs.profitMargin > 40) {
    insights.push("💡 Your margin supports a premium price — consider repositioning");
  }

  if (positioning.recommended === "Exclusive" && costs.profitMargin < 40) {
    insights.push("💡 Exclusive pricing with lower margin — invest in branding");
  }

  // Batch size insights
  if (costs.profitMargin > 0) {
    insights.push("✓ Suitable for production — ready to scale");
  }

  return insights.slice(0, 5); // Return top 5 insights
};

export const getCostBreakdownPercentages = (costs) => {
  const total =
    costs.rawMaterialCost +
    costs.processingCost +
    costs.testingCost +
    costs.logisticsCost +
    costs.shippingCost +
    costs.hiddenCost;

  if (total === 0) {
    return {
      rawMaterial: 0,
      processing: 0,
      testing: 0,
      logistics: 0,
      shipping: 0,
      hidden: 0,
    };
  }

  return {
    rawMaterial: (costs.rawMaterialCost / total) * 100,
    processing: (costs.processingCost / total) * 100,
    testing: (costs.testingCost / total) * 100,
    logistics: (costs.logisticsCost / total) * 100,
    shipping: (costs.shippingCost / total) * 100,
    hidden: (costs.hiddenCost / total) * 100,
  };
};
