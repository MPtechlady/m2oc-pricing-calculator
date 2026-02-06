/**
 * M2OC Pricing Calculation Engine
 * Implements all formulas from the M2OC v1 specification
 */

export const calculateRawMaterialCost = (materials, formulation) => {
  let totalRawMaterialCostPerUnit = 0;

  materials.forEach((material) => {
    if (material.name && material.totalQuantity && material.totalCost) {
      const costPerUnit = material.totalCost / material.totalQuantity;
      const quantityUsed = formulation[material.id] || 0;
      const materialCost = costPerUnit * quantityUsed;
      totalRawMaterialCostPerUnit += materialCost;
    }
  });

  return totalRawMaterialCostPerUnit;
};

export const calculateProcessingCost = (
  processingTime,
  costPerHour,
  batchSize
) => {
  if (!processingTime || !costPerHour || !batchSize) return 0;
  return (processingTime * costPerHour) / batchSize;
};

export const calculateTestingCost = (testingCostPerBatch, batchSize) => {
  if (!testingCostPerBatch || !batchSize) return 0;
  return testingCostPerBatch / batchSize;
};

export const calculatePackagingCost = (packaging) => {
  if (!packaging) return 0;
  return (packaging.stickerCost || 0) + (packaging.labelCost || 0) + (packaging.boxCost || 0);
};

export const calculateLogisticsCost = (containerCost, packagingCost) => {
  return (containerCost || 0) + packagingCost;
};

export const calculateShippingCost = (shippingCostPerBatch, batchSize) => {
  if (!shippingCostPerBatch || !batchSize) return 0;
  return shippingCostPerBatch / batchSize;
};

export const calculateHiddenCost = (labor, energy, misc, batchSize) => {
  if (!batchSize) return 0;
  return ((labor || 0) + (energy || 0) + (misc || 0)) / batchSize;
};

export const calculateCostPrice = (
  rawMaterialCost,
  processingCost,
  testingCost,
  logisticsCost,
  shippingCost,
  hiddenCost
) => {
  return (
    rawMaterialCost +
    processingCost +
    testingCost +
    logisticsCost +
    shippingCost +
    hiddenCost
  );
};

export const calculateSellingPrice = (costPrice, profitMargin) => {
  if (!costPrice || !profitMargin) return 0;
  return costPrice * (1 + profitMargin / 100);
};

export const calculateMRP = (sellingPrice) => {
  return sellingPrice * 1.3;
};

export const calculateAllCosts = (data) => {
  const rawMaterialCost = calculateRawMaterialCost(
    data.materials,
    data.formulation
  );

  const processingCost = calculateProcessingCost(
    data.processingTime,
    data.costPerHour,
    data.batchSize
  );

  const testingCost = calculateTestingCost(
    data.testingCost,
    data.batchSize
  );

  const packagingCost = calculatePackagingCost(data.packaging);
  const logisticsCost = calculateLogisticsCost(
    data.containerCost,
    packagingCost
  );

  const shippingCost = calculateShippingCost(
    data.shippingCost,
    data.batchSize
  );

  const hiddenCost = calculateHiddenCost(
    data.laborCost,
    data.energyCost,
    data.miscCost,
    data.batchSize
  );

  const costPrice = calculateCostPrice(
    rawMaterialCost,
    processingCost,
    testingCost,
    logisticsCost,
    shippingCost,
    hiddenCost
  );

  const sellingPrice = calculateSellingPrice(costPrice, data.profitMargin);
  const mrp = calculateMRP(sellingPrice);

  return {
    rawMaterialCost,
    processingCost,
    testingCost,
    packagingCost,
    logisticsCost,
    shippingCost,
    hiddenCost,
    costPrice,
    sellingPrice,
    mrp,
    profitMargin: data.profitMargin,
  };
};
