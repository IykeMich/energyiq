import {
  AlertCircle,
  BarChart3,
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Eye,
  FileText,
  Layers,
  Package,
  Plus,
  Trash2,
  Truck,
  Users,
  Warehouse,
} from "lucide-react";
import { useState } from "react";

const EnergyProductCreation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Step 1: Product Master Data
    productName: "",
    productCode: "",
    productCategory: "",
    productType: "single", // single or variant
    baseUnit: "",
    alternateUnits: [],
    hsnCode: "",
    description: "",
    specifications: {
      density: "",
      viscosity: "",
      flashPoint: "",
      sulfurContent: "",
    },

    // Step 2: Variants (if applicable)
    variants: [],

    // Step 3: Pricing Structure
    costPrice: "",
    sellingPrice: "",
    currency: "NGN",
    priceType: "fixed", // fixed, variable, contract
    marginPercentage: "",
    taxConfiguration: {
      taxable: true,
      taxRate: "",
      taxType: "VAT",
    },
    pricingTiers: [],

    // Step 4: Warehouse Allocation & Inventory
    warehouseAllocations: [],
    globalInventoryTracking: true,
    reorderPolicy: "manual", // manual, automatic

    // Step 5: Trading & Compliance
    minOrderQty: "",
    maxOrderQty: "",
    orderIncrements: "",
    deliveryMethods: [],
    leadTime: "",
    qualityCertificates: [],
    regulatoryCompliance: {
      dprApproved: false,
      sonCertified: false,
      nimdaCertified: false,
    },

    // Step 6: Distribution & Access
    distributionChannels: [],
    distributorAccess: "all",
    approvalWorkflow: "auto",
  });

  const steps = [
    {
      id: 0,
      title: "Product Master",
      icon: Package,
      description: "Core product data",
    },
    {
      id: 1,
      title: "Variants & Specs",
      icon: Layers,
      description: "Product variations",
    },
    {
      id: 2,
      title: "Pricing & Margin",
      icon: DollarSign,
      description: "Cost & selling price",
    },
    {
      id: 3,
      title: "Warehouse & Stock",
      icon: Warehouse,
      description: "Multi-location inventory",
    },
    {
      id: 4,
      title: "Trading Rules",
      icon: Truck,
      description: "Order & compliance",
    },
    {
      id: 5,
      title: "Distribution",
      icon: Users,
      description: "Channel management",
    },
    {
      id: 6,
      title: "Review & Publish",
      icon: Eye,
      description: "Final verification",
    },
  ];

  const productCategories = [
    "Automotive Gas Oil (AGO/Diesel)",
    "Premium Motor Spirit (PMS/Petrol)",
    "Dual Purpose Kerosene (DPK)",
    "Liquefied Petroleum Gas (LPG)",
    "Liquefied Natural Gas (LNG)",
    "Aviation Turbine Kerosene (ATK/Jet A1)",
    "Low Pour Fuel Oil (LPFO)",
    "High Pour Fuel Oil (HPFO)",
    "Base Oil",
    "Lubricants",
  ];

  const warehouses = [
    {
      id: "WH001",
      name: "Lagos Main Depot",
      location: "Apapa, Lagos",
      capacity: 50000000,
    },
    {
      id: "WH002",
      name: "Port Harcourt Terminal",
      location: "Rivers State",
      capacity: 30000000,
    },
    {
      id: "WH003",
      name: "Warri Depot",
      location: "Delta State",
      capacity: 25000000,
    },
    {
      id: "WH004",
      name: "Calabar Storage",
      location: "Cross River",
      capacity: 15000000,
    },
    {
      id: "WH005",
      name: "Abuja Distribution Center",
      location: "FCT",
      capacity: 20000000,
    },
  ];

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateNestedField = (parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value },
    }));
  };

  const addVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          id: Date.now(),
          name: "",
          sku: "",
          attributes: {},
          costPrice: "",
          sellingPrice: "",
          active: true,
        },
      ],
    }));
  };

  const removeVariant = (id) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.filter((v) => v.id !== id),
    }));
  };

  const updateVariant = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((v) =>
        v.id === id ? { ...v, [field]: value } : v
      ),
    }));
  };

  const addWarehouseAllocation = () => {
    setFormData((prev) => ({
      ...prev,
      warehouseAllocations: [
        ...prev.warehouseAllocations,
        {
          id: Date.now(),
          warehouseId: "",
          initialStock: "",
          reorderPoint: "",
          maxStockLevel: "",
          currentStock: "",
          reservedStock: "",
          availableStock: "",
          storageLocation: "",
        },
      ],
    }));
  };

  const removeWarehouseAllocation = (id) => {
    setFormData((prev) => ({
      ...prev,
      warehouseAllocations: prev.warehouseAllocations.filter(
        (w) => w.id !== id
      ),
    }));
  };

  const updateWarehouseAllocation = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      warehouseAllocations: prev.warehouseAllocations.map((w) => {
        if (w.id === id) {
          const updated = { ...w, [field]: value };
          // Auto-calculate available stock
          if (field === "currentStock" || field === "reservedStock") {
            const current =
              field === "currentStock"
                ? parseFloat(value) || 0
                : parseFloat(w.currentStock) || 0;
            const reserved =
              field === "reservedStock"
                ? parseFloat(value) || 0
                : parseFloat(w.reservedStock) || 0;
            updated.availableStock = (current - reserved).toString();
          }
          return updated;
        }
        return w;
      }),
    }));
  };

  const addPricingTier = () => {
    setFormData((prev) => ({
      ...prev,
      pricingTiers: [
        ...prev.pricingTiers,
        {
          id: Date.now(),
          minQuantity: "",
          maxQuantity: "",
          pricePerUnit: "",
          discountPercentage: "",
        },
      ],
    }));
  };

  const removePricingTier = (id) => {
    setFormData((prev) => ({
      ...prev,
      pricingTiers: prev.pricingTiers.filter((t) => t.id !== id),
    }));
  };

  const updatePricingTier = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      pricingTiers: prev.pricingTiers.map((t) =>
        t.id === id ? { ...t, [field]: value } : t
      ),
    }));
  };

  const calculateMargin = () => {
    const cost = parseFloat(formData.costPrice) || 0;
    const selling = parseFloat(formData.sellingPrice) || 0;
    if (cost > 0 && selling > 0) {
      const margin = (((selling - cost) / cost) * 100).toFixed(2);
      updateFormData("marginPercentage", margin);
    }
  };

  const validateStep = (step) => {
    switch (step) {
      case 0:
        return (
          formData.productName &&
          formData.productCode &&
          formData.productCategory &&
          formData.baseUnit
        );
      case 1:
        return (
          formData.productType === "single" ||
          (formData.productType === "variant" && formData.variants.length > 0)
        );
      case 2:
        return (
          formData.costPrice &&
          formData.sellingPrice &&
          parseFloat(formData.sellingPrice) > parseFloat(formData.costPrice)
        );
      case 3:
        return formData.warehouseAllocations.length > 0;
      case 4:
        return formData.minOrderQty && formData.deliveryMethods.length > 0;
      case 5:
        return formData.distributionChannels.length > 0;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1 && validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.productName}
                  onChange={(e) =>
                    updateFormData("productName", e.target.value)
                  }
                  placeholder="e.g., Premium AGO Diesel"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Code (SKU) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.productCode}
                  onChange={(e) =>
                    updateFormData("productCode", e.target.value)
                  }
                  placeholder="e.g., AGO-PREM-001"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.productCategory}
                  onChange={(e) =>
                    updateFormData("productCategory", e.target.value)
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                >
                  <option value="">Select category</option>
                  {productCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Base Unit of Measure <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.baseUnit}
                  onChange={(e) => updateFormData("baseUnit", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                >
                  <option value="">Select unit</option>
                  <option value="Liters">Liters</option>
                  <option value="Metric Tons">Metric Tons</option>
                  <option value="Kilograms">Kilograms</option>
                  <option value="Barrels">Barrels</option>
                  <option value="Gallons">Gallons</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  HSN/SAC Code
                </label>
                <input
                  type="text"
                  value={formData.hsnCode}
                  onChange={(e) => updateFormData("hsnCode", e.target.value)}
                  placeholder="e.g., 27101900"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer ${
                    formData.productType === "single"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="productType"
                    value="single"
                    checked={formData.productType === "single"}
                    onChange={(e) =>
                      updateFormData("productType", e.target.value)
                    }
                    className="w-4 h-4 text-blue-600"
                  />
                  <div className="ml-3">
                    <span className="font-medium text-gray-900">
                      Single Product
                    </span>
                    <p className="text-sm text-gray-600">No variations</p>
                  </div>
                </label>
                <label
                  className={`flex items-center p-4 border-2 rounded-lg cursor-pointer ${
                    formData.productType === "variant"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="productType"
                    value="variant"
                    checked={formData.productType === "variant"}
                    onChange={(e) =>
                      updateFormData("productType", e.target.value)
                    }
                    className="w-4 h-4 text-blue-600"
                  />
                  <div className="ml-3">
                    <span className="font-medium text-gray-900">
                      Product with Variants
                    </span>
                    <p className="text-sm text-gray-600">
                      Different grades/specifications
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <h4 className="font-medium text-gray-900 mb-4">
                Technical Specifications
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Density (kg/m³)
                  </label>
                  <input
                    type="text"
                    value={formData.specifications.density}
                    onChange={(e) =>
                      updateNestedField(
                        "specifications",
                        "density",
                        e.target.value
                      )
                    }
                    placeholder="e.g., 820-850"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Viscosity (cSt)
                  </label>
                  <input
                    type="text"
                    value={formData.specifications.viscosity}
                    onChange={(e) =>
                      updateNestedField(
                        "specifications",
                        "viscosity",
                        e.target.value
                      )
                    }
                    placeholder="e.g., 2.0-4.5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Flash Point (°C)
                  </label>
                  <input
                    type="text"
                    value={formData.specifications.flashPoint}
                    onChange={(e) =>
                      updateNestedField(
                        "specifications",
                        "flashPoint",
                        e.target.value
                      )
                    }
                    placeholder="e.g., 55 min"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Sulfur Content (%)
                  </label>
                  <input
                    type="text"
                    value={formData.specifications.sulfurContent}
                    onChange={(e) =>
                      updateNestedField(
                        "specifications",
                        "sulfurContent",
                        e.target.value
                      )
                    }
                    placeholder="e.g., 0.05 max"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-black"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => updateFormData("description", e.target.value)}
                placeholder="Detailed product description, quality standards, and usage information..."
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            {formData.productType === "single" ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                <Layers className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-medium text-blue-900 mb-2">
                  Single Product Configuration
                </h3>
                <p className="text-sm text-blue-700">
                  This product has no variants. All inventory and pricing will
                  be tracked under one SKU.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Product Variants
                    </h3>
                    <p className="text-sm text-gray-600">
                      Define different variations of this product (grades,
                      specifications, etc.)
                    </p>
                  </div>
                  <button
                    onClick={addVariant}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Variant</span>
                  </button>
                </div>

                {formData.variants.length === 0 ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Layers className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 mb-4">No variants added yet</p>
                    <button
                      onClick={addVariant}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Add First Variant
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {formData.variants.map((variant, index) => (
                      <div
                        key={variant.id}
                        className="border border-gray-200 rounded-lg p-5 bg-white"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-medium text-sm">
                              {index + 1}
                            </span>
                            <div>
                              <h4 className="font-medium text-gray-900">
                                Variant {index + 1}
                              </h4>
                              <p className="text-xs text-gray-500">
                                SKU: {variant.sku || "Not set"}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeVariant(variant.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Variant Name
                            </label>
                            <input
                              type="text"
                              value={variant.name}
                              onChange={(e) =>
                                updateVariant(
                                  variant.id,
                                  "name",
                                  e.target.value
                                )
                              }
                              placeholder="e.g., High Grade"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Variant SKU
                            </label>
                            <input
                              type="text"
                              value={variant.sku}
                              onChange={(e) =>
                                updateVariant(variant.id, "sku", e.target.value)
                              }
                              placeholder="e.g., AGO-PREM-HG"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Status
                            </label>
                            <select
                              value={variant.active ? "active" : "inactive"}
                              onChange={(e) =>
                                updateVariant(
                                  variant.id,
                                  "active",
                                  e.target.value === "active"
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            >
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Cost Price (₦)
                            </label>
                            <input
                              type="number"
                              value={variant.costPrice}
                              onChange={(e) =>
                                updateVariant(
                                  variant.id,
                                  "costPrice",
                                  e.target.value
                                )
                              }
                              placeholder="0.00"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Selling Price (₦)
                            </label>
                            <input
                              type="number"
                              value={variant.sellingPrice}
                              onChange={(e) =>
                                updateVariant(
                                  variant.id,
                                  "sellingPrice",
                                  e.target.value
                                )
                              }
                              placeholder="0.00"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Margin
                            </label>
                            <div className="flex items-center h-10 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm font-medium text-gray-700">
                              {variant.costPrice && variant.sellingPrice
                                ? `${(
                                    ((variant.sellingPrice -
                                      variant.costPrice) /
                                      variant.costPrice) *
                                    100
                                  ).toFixed(1)}%`
                                : "-%"}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-linear-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-5">
              <div className="flex items-start space-x-3">
                <BarChart3 className="w-6 h-6 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-green-900 mb-1">
                    Pricing Strategy
                  </h3>
                  <p className="text-sm text-green-700">
                    Set cost price (what you pay) and selling price (what
                    customers pay). The system calculates your margin
                    automatically.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cost Price per Unit <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    ₦
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.costPrice}
                    onChange={(e) => {
                      updateFormData("costPrice", e.target.value);
                      setTimeout(calculateMargin, 0);
                    }}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Your acquisition cost
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selling Price per Unit <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    ₦
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.sellingPrice}
                    onChange={(e) => {
                      updateFormData("sellingPrice", e.target.value);
                      setTimeout(calculateMargin, 0);
                    }}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Customer pays this amount
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gross Margin
                </label>
                <div
                  className={`flex items-center justify-between px-4 py-2.5 border-2 rounded-lg ${
                    parseFloat(formData.marginPercentage) > 0
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 bg-gray-50"
                  }`}
                >
                  <span className="text-2xl font-bold text-gray-900">
                    {formData.marginPercentage || "0"}%
                  </span>
                  {parseFloat(formData.marginPercentage) > 0 && (
                    <span className="text-xs text-green-700 font-medium">
                      Profit
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">Auto-calculated</p>
              </div>
            </div>

            {parseFloat(formData.sellingPrice) <=
              parseFloat(formData.costPrice) &&
              formData.costPrice &&
              formData.sellingPrice && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-900">Pricing Alert</h4>
                    <p className="text-sm text-red-700">
                      Selling price must be higher than cost price to ensure
                      profitability.
                    </p>
                  </div>
                </div>
              )}

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Type
                </label>
                <select
                  value={formData.priceType}
                  onChange={(e) => updateFormData("priceType", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                >
                  <option value="fixed">Fixed Price</option>
                  <option value="variable">Variable (Market-based)</option>
                  <option value="contract">Contract Price</option>
                  <option value="tiered">Tiered Pricing</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) => updateFormData("currency", e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                >
                  <option value="NGN">NGN - Nigerian Naira</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                </select>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <h4 className="font-medium text-gray-900 mb-4">
                Tax Configuration
              </h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.taxConfiguration.taxable}
                      onChange={(e) =>
                        updateNestedField(
                          "taxConfiguration",
                          "taxable",
                          e.target.checked
                        )
                      }
                      className="w-4 h-4 rounded border-gray-300 text-blue-600"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Taxable Product
                    </span>
                  </label>
                </div>
                {formData.taxConfiguration.taxable && (
                  <>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Tax Type
                      </label>
                      <select
                        value={formData.taxConfiguration.taxType}
                        onChange={(e) =>
                          updateNestedField(
                            "taxConfiguration",
                            "taxType",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-black"
                      >
                        <option value="VAT">VAT</option>
                        <option value="Excise">Excise Duty</option>
                        <option value="Sales Tax">Sales Tax</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Tax Rate (%)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.taxConfiguration.taxRate}
                        onChange={(e) =>
                          updateNestedField(
                            "taxConfiguration",
                            "taxRate",
                            e.target.value
                          )
                        }
                        placeholder="7.5"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-black"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {formData.priceType === "tiered" && (
              <div className="border border-gray-200 rounded-lg p-6 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">
                    Volume-Based Pricing Tiers
                  </h4>
                  <button
                    onClick={addPricingTier}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    Add Tier
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.pricingTiers.map((tier) => (
                    <div
                      key={tier.id}
                      className="grid grid-cols-5 gap-3 items-end"
                    >
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Min Quantity
                        </label>
                        <input
                          type="number"
                          value={tier.minQuantity}
                          onChange={(e) =>
                            updatePricingTier(
                              tier.id,
                              "minQuantity",
                              e.target.value
                            )
                          }
                          placeholder="1000"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Max Quantity
                        </label>
                        <input
                          type="number"
                          value={tier.maxQuantity}
                          onChange={(e) =>
                            updatePricingTier(
                              tier.id,
                              "maxQuantity",
                              e.target.value
                            )
                          }
                          placeholder="5000"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Price per Unit (₦)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={tier.pricePerUnit}
                          onChange={(e) =>
                            updatePricingTier(
                              tier.id,
                              "pricePerUnit",
                              e.target.value
                            )
                          }
                          placeholder="845.00"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Discount (%)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={tier.discountPercentage}
                          onChange={(e) =>
                            updatePricingTier(
                              tier.id,
                              "discountPercentage",
                              e.target.value
                            )
                          }
                          placeholder="5"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                      </div>
                      <button
                        onClick={() => removePricingTier(tier.id)}
                        className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-linear-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-5">
              <div className="flex items-start space-x-3">
                <Building2 className="w-6 h-6 text-purple-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-purple-900 mb-1">
                    Multi-Warehouse Inventory Management
                  </h3>
                  <p className="text-sm text-purple-700">
                    Product is created globally in the master catalog. Allocate
                    inventory to specific warehouses/depots for distribution.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">
                  Warehouse Allocations
                </h3>
                <p className="text-sm text-gray-600">
                  Assign initial stock levels to different warehouse locations
                </p>
              </div>
              <button
                onClick={addWarehouseAllocation}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
                <span>Add Warehouse</span>
              </button>
            </div>

            {formData.warehouseAllocations.length === 0 ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Warehouse className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-4">
                  No warehouse allocations yet
                </p>
                <button
                  onClick={addWarehouseAllocation}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Allocate to First Warehouse
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {formData.warehouseAllocations.map((allocation, index) => {
                  const warehouse = warehouses.find(
                    (w) => w.id === allocation.warehouseId
                  );
                  return (
                    <div
                      key={allocation.id}
                      className="border border-gray-200 rounded-lg p-5 bg-white"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-10 h-10 bg-purple-100 text-purple-600 rounded-lg">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {warehouse ? warehouse.name : "Select Warehouse"}
                            </h4>
                            {warehouse && (
                              <p className="text-xs text-gray-500">
                                {warehouse.location} • Capacity:{" "}
                                {(warehouse.capacity / 1000000).toFixed(1)}M
                                Liters
                              </p>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            removeWarehouseAllocation(allocation.id)
                          }
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div className="col-span-4">
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Warehouse Location
                          </label>
                          <select
                            value={allocation.warehouseId}
                            onChange={(e) =>
                              updateWarehouseAllocation(
                                allocation.id,
                                "warehouseId",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-black"
                          >
                            <option value="">Select warehouse</option>
                            {warehouses.map((wh) => (
                              <option key={wh.id} value={wh.id}>
                                {wh.name} - {wh.location}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Initial Stock
                          </label>
                          <input
                            type="number"
                            value={allocation.initialStock}
                            onChange={(e) =>
                              updateWarehouseAllocation(
                                allocation.id,
                                "initialStock",
                                e.target.value
                              )
                            }
                            placeholder="50000"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-black"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Current Stock
                          </label>
                          <input
                            type="number"
                            value={allocation.currentStock}
                            onChange={(e) =>
                              updateWarehouseAllocation(
                                allocation.id,
                                "currentStock",
                                e.target.value
                              )
                            }
                            placeholder="50000"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-black"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Reserved Stock
                          </label>
                          <input
                            type="number"
                            value={allocation.reservedStock}
                            onChange={(e) =>
                              updateWarehouseAllocation(
                                allocation.id,
                                "reservedStock",
                                e.target.value
                              )
                            }
                            placeholder="0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-black"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Orders in process
                          </p>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Available Stock
                          </label>
                          <div className="flex items-center h-10 px-3 py-2 bg-green-50 border border-green-300 rounded-lg text-sm font-semibold text-green-700">
                            {allocation.availableStock || "0"}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Ready to sell
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Reorder Point
                          </label>
                          <input
                            type="number"
                            value={allocation.reorderPoint}
                            onChange={(e) =>
                              updateWarehouseAllocation(
                                allocation.id,
                                "reorderPoint",
                                e.target.value
                              )
                            }
                            placeholder="5000"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-black"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Max Stock Level
                          </label>
                          <input
                            type="number"
                            value={allocation.maxStockLevel}
                            onChange={(e) =>
                              updateWarehouseAllocation(
                                allocation.id,
                                "maxStockLevel",
                                e.target.value
                              )
                            }
                            placeholder="100000"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-black"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Storage Location
                          </label>
                          <input
                            type="text"
                            value={allocation.storageLocation}
                            onChange={(e) =>
                              updateWarehouseAllocation(
                                allocation.id,
                                "storageLocation",
                                e.target.value
                              )
                            }
                            placeholder="e.g., Tank-A1"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-black"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
              <h4 className="font-medium text-gray-900 mb-3">
                Inventory Management Settings
              </h4>
              <div className="space-y-3">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.globalInventoryTracking}
                    onChange={(e) =>
                      updateFormData(
                        "globalInventoryTracking",
                        e.target.checked
                      )
                    }
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600"
                  />
                  <div>
                    <span className="font-medium text-gray-900">
                      Global Inventory Tracking
                    </span>
                    <p className="text-sm text-gray-600">
                      Track total inventory across all warehouses in real-time
                    </p>
                  </div>
                </label>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reorder Policy
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label
                      className={`flex items-center p-3 border-2 rounded-lg cursor-pointer ${
                        formData.reorderPolicy === "manual"
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="reorderPolicy"
                        value="manual"
                        checked={formData.reorderPolicy === "manual"}
                        onChange={(e) =>
                          updateFormData("reorderPolicy", e.target.value)
                        }
                        className="w-4 h-4 text-blue-600"
                      />
                      <div className="ml-3">
                        <span className="text-sm font-medium text-gray-900">
                          Manual Reorder
                        </span>
                        <p className="text-xs text-gray-600">
                          You decide when to restock
                        </p>
                      </div>
                    </label>
                    <label
                      className={`flex items-center p-3 border-2 rounded-lg cursor-pointer ${
                        formData.reorderPolicy === "automatic"
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="reorderPolicy"
                        value="automatic"
                        checked={formData.reorderPolicy === "automatic"}
                        onChange={(e) =>
                          updateFormData("reorderPolicy", e.target.value)
                        }
                        className="w-4 h-4 text-blue-600"
                      />
                      <div className="ml-3">
                        <span className="text-sm font-medium text-gray-900">
                          Auto Reorder
                        </span>
                        <p className="text-xs text-gray-600">
                          System creates POs automatically
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {formData.warehouseAllocations.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">
                  Total Inventory Summary
                </h4>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-blue-700">Total Warehouses</p>
                    <p className="text-xl font-bold text-blue-900">
                      {formData.warehouseAllocations.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-700">Total Stock</p>
                    <p className="text-xl font-bold text-blue-900">
                      {formData.warehouseAllocations
                        .reduce(
                          (sum, w) => sum + (parseFloat(w.currentStock) || 0),
                          0
                        )
                        .toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-700">Total Reserved</p>
                    <p className="text-xl font-bold text-blue-900">
                      {formData.warehouseAllocations
                        .reduce(
                          (sum, w) => sum + (parseFloat(w.reservedStock) || 0),
                          0
                        )
                        .toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-700">Total Available</p>
                    <p className="text-xl font-bold text-green-700">
                      {formData.warehouseAllocations
                        .reduce(
                          (sum, w) => sum + (parseFloat(w.availableStock) || 0),
                          0
                        )
                        .toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Order Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.minOrderQty}
                  onChange={(e) =>
                    updateFormData("minOrderQty", e.target.value)
                  }
                  placeholder="1000"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Minimum units per order
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Order Quantity
                </label>
                <input
                  type="number"
                  value={formData.maxOrderQty}
                  onChange={(e) =>
                    updateFormData("maxOrderQty", e.target.value)
                  }
                  placeholder="50000"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Maximum units per order
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order Increments
                </label>
                <input
                  type="number"
                  value={formData.orderIncrements}
                  onChange={(e) =>
                    updateFormData("orderIncrements", e.target.value)
                  }
                  placeholder="100"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Order must be multiples of this
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Lead Time
              </label>
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="number"
                  value={formData.leadTime}
                  onChange={(e) => updateFormData("leadTime", e.target.value)}
                  placeholder="24-48"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
                <select className="col-span-2 px-4 py-2.5 border border-gray-300 rounded-lg text-black">
                  <option>Hours</option>
                  <option>Days</option>
                  <option>Weeks</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Delivery Methods <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  "Supplier Delivery",
                  "Customer Pickup",
                  "Third-party Logistics",
                ].map((method) => (
                  <label
                    key={method}
                    className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer ${
                      formData.deliveryMethods.includes(method)
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.deliveryMethods.includes(method)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateFormData("deliveryMethods", [
                            ...formData.deliveryMethods,
                            method,
                          ]);
                        } else {
                          updateFormData(
                            "deliveryMethods",
                            formData.deliveryMethods.filter((m) => m !== method)
                          );
                        }
                      }}
                      className="sr-only"
                    />
                    <Truck
                      className={`w-8 h-8 mb-2 ${
                        formData.deliveryMethods.includes(method)
                          ? "text-blue-600"
                          : "text-gray-400"
                      }`}
                    />
                    <span className="text-sm font-medium text-center text-black">
                      {method}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <h4 className="font-medium text-gray-900 mb-4">
                Regulatory Compliance & Certifications
              </h4>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.regulatoryCompliance.dprApproved}
                    onChange={(e) =>
                      updateNestedField(
                        "regulatoryCompliance",
                        "dprApproved",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 rounded border-gray-300 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">
                    DPR (Department of Petroleum Resources) Approved
                  </span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.regulatoryCompliance.sonCertified}
                    onChange={(e) =>
                      updateNestedField(
                        "regulatoryCompliance",
                        "sonCertified",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 rounded border-gray-300 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">
                    SON (Standards Organisation of Nigeria) Certified
                  </span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.regulatoryCompliance.nimdaCertified}
                    onChange={(e) =>
                      updateNestedField(
                        "regulatoryCompliance",
                        "nimdaCertified",
                        e.target.checked
                      )
                    }
                    className="w-4 h-4 rounded border-gray-300 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">
                    NIMDA (Nigerian Midstream and Downstream Authority)
                    Certified
                  </span>
                </label>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Quality Certificates
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Drag and drop files or click to browse
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, JPG, PNG up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Distribution Channels <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Direct Sales",
                  "Distributor Network",
                  "B2B Platform",
                  "Retail Partners",
                ].map((channel) => (
                  <label
                    key={channel}
                    className={`flex items-start p-4 border-2 rounded-lg cursor-pointer ${
                      formData.distributionChannels.includes(channel)
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.distributionChannels.includes(channel)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateFormData("distributionChannels", [
                            ...formData.distributionChannels,
                            channel,
                          ]);
                        } else {
                          updateFormData(
                            "distributionChannels",
                            formData.distributionChannels.filter(
                              (c) => c !== channel
                            )
                          );
                        }
                      }}
                      className="mt-1 w-4 h-4 text-blue-600"
                    />
                    <span className="ml-3 font-medium text-gray-900">
                      {channel}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Distributor Access Control
              </label>
              <div className="space-y-3">
                {[
                  {
                    value: "all",
                    label: "All Distributors",
                    desc: "Available to entire distributor network",
                  },
                  {
                    value: "tier",
                    label: "Tier-Based Access",
                    desc: "Restrict by distributor tier level",
                  },
                  {
                    value: "selected",
                    label: "Selected Distributors",
                    desc: "Manually approve each distributor",
                  },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-start p-4 border-2 rounded-lg cursor-pointer ${
                      formData.distributorAccess === option.value
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="distributorAccess"
                      value={option.value}
                      checked={formData.distributorAccess === option.value}
                      onChange={(e) =>
                        updateFormData("distributorAccess", e.target.value)
                      }
                      className="mt-1 w-4 h-4 text-blue-600"
                    />
                    <div className="ml-3">
                      <span className="font-medium text-gray-900">
                        {option.label}
                      </span>
                      <p className="text-sm text-gray-600">{option.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Approval Workflow
              </label>
              <div className="space-y-3">
                {[
                  {
                    value: "auto",
                    label: "Auto-Approve",
                    desc: "Instant access for eligible distributors",
                  },
                  {
                    value: "manual",
                    label: "Manual Approval",
                    desc: "Review each distributor request",
                  },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-start p-4 border-2 rounded-lg cursor-pointer ${
                      formData.approvalWorkflow === option.value
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="approvalWorkflow"
                      value={option.value}
                      checked={formData.approvalWorkflow === option.value}
                      onChange={(e) =>
                        updateFormData("approvalWorkflow", e.target.value)
                      }
                      className="mt-1 w-4 h-4 text-blue-600"
                    />
                    <div className="ml-3">
                      <span className="font-medium text-gray-900">
                        {option.label}
                      </span>
                      <p className="text-sm text-gray-600">{option.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-6">
              <h3 className="text-xl font-bold mb-2">
                Product Ready for Publication
              </h3>
              <p className="text-blue-100">
                Review all configurations before publishing to your distribution
                network
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-5 bg-white">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Package className="w-5 h-5 mr-2 text-blue-600" />
                  Product Master Data
                </h4>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Product Name:</dt>
                    <dd className="font-medium text-gray-900 text-right">
                      {formData.productName || "-"}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Product Code:</dt>
                    <dd className="font-medium text-gray-900">
                      {formData.productCode || "-"}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Category:</dt>
                    <dd className="font-medium text-gray-900 text-right">
                      {formData.productCategory || "-"}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Base Unit:</dt>
                    <dd className="font-medium text-gray-900">
                      {formData.baseUnit || "-"}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Product Type:</dt>
                    <dd className="font-medium text-gray-900">
                      {formData.productType === "single"
                        ? "Single Product"
                        : `With Variants (${formData.variants.length})`}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="border border-gray-200 rounded-lg p-5 bg-white">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                  Pricing Configuration
                </h4>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Cost Price:</dt>
                    <dd className="font-medium text-gray-900">
                      {formData.costPrice
                        ? `₦${parseFloat(formData.costPrice).toLocaleString()}`
                        : "-"}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Selling Price:</dt>
                    <dd className="font-medium text-gray-900">
                      {formData.sellingPrice
                        ? `₦${parseFloat(
                            formData.sellingPrice
                          ).toLocaleString()}`
                        : "-"}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Gross Margin:</dt>
                    <dd className="font-semibold text-green-600">
                      {formData.marginPercentage
                        ? `${formData.marginPercentage}%`
                        : "-"}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Price Type:</dt>
                    <dd className="font-medium text-gray-900 capitalize">
                      {formData.priceType || "-"}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Tax Configuration:</dt>
                    <dd className="font-medium text-gray-900">
                      {formData.taxConfiguration.taxable
                        ? `${formData.taxConfiguration.taxType} ${formData.taxConfiguration.taxRate}%`
                        : "Non-taxable"}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="border border-gray-200 rounded-lg p-5 bg-white">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Warehouse className="w-5 h-5 mr-2 text-purple-600" />
                  Warehouse & Inventory
                </h4>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Warehouses:</dt>
                    <dd className="font-medium text-gray-900">
                      {formData.warehouseAllocations.length}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Total Stock:</dt>
                    <dd className="font-medium text-gray-900">
                      {formData.warehouseAllocations
                        .reduce(
                          (sum, w) => sum + (parseFloat(w.currentStock) || 0),
                          0
                        )
                        .toLocaleString()}{" "}
                      {formData.baseUnit}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Available Stock:</dt>
                    <dd className="font-semibold text-green-600">
                      {formData.warehouseAllocations
                        .reduce(
                          (sum, w) => sum + (parseFloat(w.availableStock) || 0),
                          0
                        )
                        .toLocaleString()}{" "}
                      {formData.baseUnit}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Reorder Policy:</dt>
                    <dd className="font-medium text-gray-900 capitalize">
                      {formData.reorderPolicy}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="border border-gray-200 rounded-lg p-5 bg-white">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Truck className="w-5 h-5 mr-2 text-orange-600" />
                  Trading & Compliance
                </h4>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Min Order Qty:</dt>
                    <dd className="font-medium text-gray-900">
                      {formData.minOrderQty || "-"}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Max Order Qty:</dt>
                    <dd className="font-medium text-gray-900">
                      {formData.maxOrderQty || "-"}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Delivery Methods:</dt>
                    <dd className="font-medium text-gray-900 text-right">
                      {formData.deliveryMethods.length} options
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">DPR Approved:</dt>
                    <dd
                      className={`font-medium ${
                        formData.regulatoryCompliance.dprApproved
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      {formData.regulatoryCompliance.dprApproved ? "Yes" : "No"}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
              <h4 className="font-semibold text-gray-900 mb-4">
                Publication Checklist
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    label: "Product master data complete",
                    checked: validateStep(0),
                  },
                  {
                    label: "Pricing configured with positive margin",
                    checked: validateStep(2),
                  },
                  {
                    label: "Warehouse allocations set",
                    checked: validateStep(3),
                  },
                  { label: "Trading rules defined", checked: validateStep(4) },
                  {
                    label: "Distribution channels selected",
                    checked: validateStep(5),
                  },
                  {
                    label: "Compliance certifications",
                    checked:
                      formData.regulatoryCompliance.dprApproved ||
                      formData.regulatoryCompliance.sonCertified,
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center ${
                        item.checked ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      {item.checked && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span
                      className={`text-sm ${
                        item.checked ? "text-gray-900" : "text-gray-500"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <button className="w-full py-3 px-4 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50">
                Save as Draft
              </button>
              <button className="w-full py-3 px-4 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50">
                Schedule Publication
              </button>
              <button className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700">
                Publish Now
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Energy Product
          </h1>
          <p className="text-gray-600">
            Configure product master data, pricing, and multi-warehouse
            inventory allocation
          </p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === index;
              const isCompleted = currentStep > index;

              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? "bg-blue-600 text-white ring-4 ring-blue-100"
                          : isCompleted
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <StepIcon className="w-6 h-6" />
                      )}
                    </div>
                    <div className="mt-2 text-center">
                      <p
                        className={`text-xs font-medium ${
                          isActive ? "text-blue-600" : "text-gray-700"
                        }`}
                      >
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 mx-4 ${
                        isCompleted ? "bg-green-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-6">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium ${
              currentStep === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          <div className="text-sm text-gray-600">
            Step {currentStep + 1} of {steps.length}
          </div>

          <button
            onClick={nextStep}
            disabled={
              currentStep === steps.length - 1 || !validateStep(currentStep)
            }
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium ${
              currentStep === steps.length - 1 || !validateStep(currentStep)
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <span>Next Step</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnergyProductCreation;
