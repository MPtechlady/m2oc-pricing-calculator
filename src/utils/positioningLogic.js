/**
 * M2OC Positioning Logic
 * Based on price-category and margin-based signals
 */

export const getPriceCategory = (sellingPrice) => {
  if (sellingPrice <= 299) return { category: 'Basic', letter: 'B' };
  if (sellingPrice <= 999) return { category: 'Premium', letter: 'P' };
  if (sellingPrice <= 2999) return { category: 'Luxe', letter: 'L' };
  return { category: 'Exclusive', letter: 'E' };
};

export const getMarginSignal = (margin) => {
  if (margin < 30) return { signal: 'Risky', level: 1 };
  if (margin <= 50) return { signal: 'Healthy', level: 2 };
  if (margin <= 70) return { signal: 'Strong', level: 3 };
  return { signal: 'Brand / Luxury', level: 4 };
};

export const getPositioning = (sellingPrice, margin) => {
  const priceInfo = getPriceCategory(sellingPrice);
  const marginInfo = getMarginSignal(margin);

  // Return both for user understanding
  return {
    priceCategory: priceInfo.category,
    marginSignal: marginInfo.signal,
    recommended: marginInfo.level >= 2 ? priceInfo.category : marginInfo.signal,
  };
};

export const getPositioningColor = (positioning) => {
  const rec = positioning.recommended;
  switch (rec) {
    case 'Basic':
      return '#8B7D6B'; // Charcoal
    case 'Premium':
      return '#6B5B95'; // Purple
    case 'Luxe':
      return '#A4161A'; // Muted red
    case 'Exclusive':
      return '#2D5016'; // Muted green
    default:
      return '#666';
  }
};
