import { useState } from 'react';
import { MaterialsInput } from './components/MaterialsInput';
import { ProductFormulation } from './components/ProductFormulation';
import { BatchAndProcessing } from './components/BatchAndProcessing';
import { PackagingAndLogistics } from './components/PackagingAndLogistics';
import { ShippingAndHidden } from './components/ShippingAndHidden';
import { ProfitMarginInput } from './components/ProfitMarginInput';
import { ResultsDisplay } from './components/ResultsDisplay';
import { calculateAllCosts } from './utils/calculationEngine';
import './App.css';

function App() {
  const [materials, setMaterials] = useState([
    {
      id: 1,
      name: '',
      unit: 'gm',
      totalQuantity: '',
      totalCost: '',
    },
  ]);

  const [formulation, setFormulation] = useState({
    productSize: '',
  });

  const [batch, setBatch] = useState({
    batchSize: '',
    processingTime: '',
    costPerHour: '',
    testingCost: '',
  });

  const [packaging, setPackaging] = useState({
    containerCost: '',
    packaging: {
      stickerCost: 0,
      labelCost: 0,
      boxCost: 0,
    },
  });

  const [shippingAndHidden, setShippingAndHidden] = useState({
    shippingCost: '',
    laborCost: '',
    energyCost: '',
    miscCost: '',
  });

  const [profitMargin, setProfitMargin] = useState('');

  // Calculate results
  const calculateResults = () => {
    const data = {
      materials,
      formulation,
      ...batch,
      ...packaging,
      ...shippingAndHidden,
      profitMargin: parseFloat(profitMargin) || 0,
      batchSize: parseFloat(batch.batchSize) || 0,
      processingTime: parseFloat(batch.processingTime) || 0,
      costPerHour: parseFloat(batch.costPerHour) || 0,
      testingCost: parseFloat(batch.testingCost) || 0,
      containerCost: parseFloat(packaging.containerCost) || 0,
      shippingCost: parseFloat(shippingAndHidden.shippingCost) || 0,
      laborCost: parseFloat(shippingAndHidden.laborCost) || 0,
      energyCost: parseFloat(shippingAndHidden.energyCost) || 0,
      miscCost: parseFloat(shippingAndHidden.miscCost) || 0,
    };

    return calculateAllCosts(data);
  };

  const costs = calculateResults();

  const handleReset = () => {
    setMaterials([
      {
        id: 1,
        name: '',
        unit: 'gm',
        totalQuantity: '',
        totalCost: '',
      },
    ]);
    setFormulation({ productSize: '' });
    setBatch({
      batchSize: '',
      processingTime: '',
      costPerHour: '',
      testingCost: '',
    });
    setPackaging({
      containerCost: '',
      packaging: {
        stickerCost: 0,
        labelCost: 0,
        boxCost: 0,
      },
    });
    setShippingAndHidden({
      shippingCost: '',
      laborCost: '',
      energyCost: '',
      miscCost: '',
    });
    setProfitMargin('');
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>M2OC</h1>
          <p>Pricing & Cost Intelligence Tool</p>
        </div>
      </header>

      <main className="app-main">
        <div className="form-container">
          <div className="form-section">
            <MaterialsInput
              materials={materials}
              onMaterialsChange={setMaterials}
            />

            <ProductFormulation
              materials={materials}
              formulation={formulation}
              onFormulationChange={setFormulation}
            />

            <BatchAndProcessing
              batchSize={batch.batchSize}
              processingTime={batch.processingTime}
              costPerHour={batch.costPerHour}
              testingCost={batch.testingCost}
              onBatchChange={setBatch}
            />

            <PackagingAndLogistics
              containerCost={packaging.containerCost}
              packaging={packaging.packaging}
              onPackagingChange={setPackaging}
            />

            <ShippingAndHidden
              shippingCost={shippingAndHidden.shippingCost}
              laborCost={shippingAndHidden.laborCost}
              energyCost={shippingAndHidden.energyCost}
              miscCost={shippingAndHidden.miscCost}
              onCostsChange={setShippingAndHidden}
            />

            <ProfitMarginInput
              profitMargin={profitMargin}
              onMarginChange={setProfitMargin}
            />

            <div className="form-actions">
              <button className="btn btn-secondary" onClick={handleReset}>
                Reset All
              </button>
            </div>
          </div>

          <div className="results-sidebar">
            <ResultsDisplay costs={costs} />
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>
          M2OC v1 • Think first, build next • All calculations are deterministic
          and offline-safe
        </p>
      </footer>
    </div>
  );
}

export default App;
