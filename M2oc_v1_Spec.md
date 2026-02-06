# M2OC v1 — Pricing & Cost Intelligence Tool

**Full Name:** M2OC (Margin-to-Operational Cost)

**Public Name:** M2OC — Pricing & Cost Intelligence Tool

**Version:** v1 (Public / Free)

**GitHub Repo:** m2oc-pricing-calculator

---

## 1. Purpose

M2OC is a **spec-driven pricing calculator** designed for product founders, small manufacturers, and solo entrepreneurs.

Its goal is to:

* Remove guesswork from product pricing
* Break down true manufacturing cost
* Help founders position products correctly (Basic → Premium → Luxe → Exclusive)
* Save time, money, and mental load

M2OC v1 is **deterministic, offline-safe, and rule-based** — no live internet data.

---

## 2. Target Users

* Indie founders
* Home-based manufacturers
* Beauty / FMCG / handmade product creators
* Early-stage startups
* Portfolio reviewers (GitHub / LinkedIn)

---

## 3. Core Philosophy

* **Think first, build next**
* Fixed formulas > fluctuating data
* Transparency over “magic pricing”
* Founder-first decision support

---

## 4. Scope (v1)

### Included

* Raw material cost intelligence
* Product formulation costing
* Batch-level cost breakdown
* Pricing calculation
* Positioning logic
* Insight-based output

### Excluded (Future / TRC)

* Live market scraping
* GST/tax automation
* Multi-currency
* Vendor integrations
* User accounts

---

## 5. Input Constraints (Locked)

### 5.1 Raw Materials (Inventory Definition)

**Maximum:** 12 materials

Each raw material represents a **purchased inventory item**, not per-product usage.

**Inputs per material:**

* Material name
* Unit type: `gm` or `ml`
* Total quantity purchased
* Total purchase cost (₹)

**Derived (system-calculated):**

```
CostPerUnit = TotalPurchaseCost ÷ TotalQuantityPurchased
```

⚠️ Users must **not** manually enter cost per unit.

---

### 5.2 Product Formulation

Defines how raw materials are used in **one product unit**.

**Inputs:**

* Product size (e.g., 4g / 10g / 50g)
* Quantity of each raw material used per product

---

### 5.3 Batch & Processing

**Inputs:**

* Batch size (number of product units)
* Processing time (hours per batch)
* Cost per processing hour
* Optional testing cost (per batch)

---

### 5.4 Packaging & Logistics

**Constraints:**

* Maximum container options: 5
* Select **one container per product**

**Inputs:**

* Container cost (per unit)
* Sticker cost (per unit)
* Label cost (per unit)
* Box cost (per unit)

---

### 5.5 Shipping & Hidden Costs

**Shipping:**

* Shipping cost (per batch)

**Hidden costs (batch-based):**

* Labor
* Energy
* Miscellaneous

---

### 5.6 Profit

* Desired profit margin (%)

---

## 6. Pricing Formulas (Authoritative)

### 6.1 Raw Material Cost — Per Product

For each material `i`:

```
CostPerUnit_i = TotalPurchaseCost_i ÷ TotalQuantityPurchased_i
MaterialCost_i = CostPerUnit_i × QuantityUsedPerProduct_i
```

```
TotalRawMaterialCostPerUnit = Σ MaterialCost_i
```

---

### 6.2 Raw Material Cost — Batch Level

```
TotalRawMaterialCostBatch =
TotalRawMaterialCostPerUnit × BatchSize
```

---

### 6.3 Processing Cost

```
ProcessingCostPerUnit =
(ProcessingTime × CostPerHour) ÷ BatchSize
```

---

### 6.4 Testing Cost (Optional)

```
TestingCostPerUnit =
TestingCostPerBatch ÷ BatchSize
```

---

### 6.5 Packaging & Logistics Cost

```
PackagingCostPerUnit =
StickerCost + LabelCost + BoxCost
```

```
TotalLogisticsCostPerUnit =
ContainerCost + PackagingCostPerUnit
```

---

### 6.6 Shipping Cost

```
ShippingCostPerUnit =
ShippingCostPerBatch ÷ BatchSize
```

---

### 6.7 Hidden Cost

```
HiddenCostPerUnit =
(Labor + Energy + Misc) ÷ BatchSize
```

---

### 6.8 Cost Price (CP)

```
CostPricePerUnit =
TotalRawMaterialCostPerUnit
+ ProcessingCostPerUnit
+ TestingCostPerUnit
+ TotalLogisticsCostPerUnit
+ ShippingCostPerUnit
+ HiddenCostPerUnit
```

---

### 6.9 Selling Price (SP)

```
SellingPrice =
CostPricePerUnit × (1 + ProfitMargin / 100)
```

---

### 6.10 MRP (Safe Buffer v1)

```
MRP = SellingPrice × 1.3
```

---

## 7. Positioning Rules

### 7.1 Price-Based Category

| Category  | Selling Price |
| --------- | ------------- |
| Basic     | ≤ ₹299        |
| Premium   | ₹300 – ₹999   |
| Luxe      | ₹1000 – ₹2999 |
| Exclusive | ≥ ₹3000       |

---

### 7.2 Margin-Based Signal

| Margin % | Meaning        |
| -------- | -------------- |
| < 30%    | Risky          |
| 30–50%   | Healthy        |
| 50–70%   | Strong         |
| > 70%    | Brand / Luxury |

---

### 7.3 Final Positioning Logic

```
FinalPosition = max(PriceCategory, MarginSignal)
```

---

## 8. Output Summary (v1)

M2OC must display:

* Cost Price per unit
* Selling Price
* MRP
* Profit margin
* Cost breakup (visual)
* Final positioning label

### Founder Insights (Auto-generated)

Examples:

* “Suitable for mass production”
* “Premium pricing justified by margin”
* “Shipping-heavy product”
* “Formulation cost high — branding critical”

---

## 9. UI / UX Direction

* Luxe, calm, professional
* Neutral charcoal base
* One accent color (purple / muted red-green)
* Minimal inputs per screen
* Clear separation: **Materials → Product → Batch → Result**

---

## 10. Tech Direction (Suggested)

* React (JavaScript)
* Local state only (no auth)
* Deterministic calculations
* Offline-safe
* Exportable results (future)

---

## 11. Success Criteria

* Founder can price a product in < 10 minutes
* Results feel logical and explainable
* Useful even without market data
* Strong portfolio-level project

---

## 12. Future (TRC Exclusive)

* Saved material libraries
* Live market benchmarks
* Multi-product comparison
* GST & compliance
* Team access

---

**M2OC v1 is a thinking tool first, calculator second.**
