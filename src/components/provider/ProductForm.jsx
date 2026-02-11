import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import api from '../../services/api';
import './ProductForm.css';

const productSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.string().min(1, 'Price is required').refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
    'Price must be a positive number'
  ),
  wattage: z.string().optional(),
  batteryCapacity: z.string().optional(),
  solarPanelType: z.string().optional(),
  lightingDuration: z.string().optional(),
  warrantyPeriod: z.string().optional(),
  stockQuantity: z.string().optional(),
  imageUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
});

function ProductForm({ existingProduct, onSuccess, onCancel }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: existingProduct
      ? {
          name: existingProduct.name,
          description: existingProduct.description,
          price: existingProduct.price.toString(),
          wattage: existingProduct.wattage?.toString() || '',
          batteryCapacity: existingProduct.battery_capacity || '',
          solarPanelType: existingProduct.solar_panel_type || '',
          lightingDuration: existingProduct.lighting_duration || '',
          warrantyPeriod: existingProduct.warranty_period || '',
          stockQuantity: existingProduct.stock_quantity?.toString() || '0',
          imageUrl: existingProduct.image_url || '',
        }
      : {
          stockQuantity: '0',
        },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');

    try {
      const payload = {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        wattage: data.wattage ? parseInt(data.wattage) : null,
        battery_capacity: data.batteryCapacity || null,
        solar_panel_type: data.solarPanelType || null,
        lighting_duration: data.lightingDuration || null,
        warranty_period: data.warrantyPeriod || null,
        stock_quantity: data.stockQuantity ? parseInt(data.stockQuantity) : 0,
        image_url: data.imageUrl || null,
      };

      if (existingProduct) {
        await api.put(`/provider/products/${existingProduct.id}`, payload);
      } else {
        await api.post('/provider/products', payload);
      }

      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="product-form-container">
      <h2 className="form-title">
        {existingProduct ? 'Edit Product' : 'Add New Product'}
      </h2>

      {error && <div className="alert alert-error">{error}</div>}

      {!existingProduct && (
        <div className="alert alert-info">
          Products require admin approval before becoming visible to customers.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="product-form">
        {/* Basic Information */}
        <div className="form-section">
          <h3 className="section-title">Basic Information</h3>

          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Product Name *
            </label>
            <input
              id="name"
              type="text"
              className={`form-input ${errors.name ? 'error' : ''}`}
              placeholder="e.g., Solar LED + Lantern 20W"
              {...register('name')}
            />
            {errors.name && <p className="form-error">{errors.name.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description *
            </label>
            <textarea
              id="description"
              className={`form-textarea ${errors.description ? 'error' : ''}`}
              placeholder="Describe the product features, benefits, and use cases..."
              rows="5"
              {...register('description')}
            />
            {errors.description && (
              <p className="form-error">{errors.description.message}</p>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price" className="form-label">
                Price (KES) *
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                className={`form-input ${errors.price ? 'error' : ''}`}
                placeholder="1500.00"
                {...register('price')}
              />
              {errors.price && <p className="form-error">{errors.price.message}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="stockQuantity" className="form-label">
                Stock Quantity
              </label>
              <input
                id="stockQuantity"
                type="number"
                className="form-input"
                placeholder="100"
                {...register('stockQuantity')}
              />
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="form-section">
          <h3 className="section-title">Technical Specifications</h3>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="wattage" className="form-label">
                Wattage (W)
              </label>
              <input
                id="wattage"
                type="number"
                className="form-input"
                placeholder="20"
                {...register('wattage')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="batteryCapacity" className="form-label">
                Battery Capacity
              </label>
              <input
                id="batteryCapacity"
                type="text"
                className="form-input"
                placeholder="e.g., 6000mAh"
                {...register('batteryCapacity')}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="solarPanelType" className="form-label">
                Solar Panel Type
              </label>
              <input
                id="solarPanelType"
                type="text"
                className="form-input"
                placeholder="e.g., Monocrystalline"
                {...register('solarPanelType')}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lightingDuration" className="form-label">
                Lighting Duration
              </label>
              <input
                id="lightingDuration"
                type="text"
                className="form-input"
                placeholder="e.g., 8-10 hours"
                {...register('lightingDuration')}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="warrantyPeriod" className="form-label">
              Warranty Period
            </label>
            <input
              id="warrantyPeriod"
              type="text"
              className="form-input"
              placeholder="e.g., 2 years"
              {...register('warrantyPeriod')}
            />
          </div>
        </div>

        {/* Product Image */}
        <div className="form-section">
          <h3 className="section-title">Product Image</h3>

          <div className="form-group">
            <label htmlFor="imageUrl" className="form-label">
              Image URL
            </label>
            <input
              id="imageUrl"
              type="url"
              className={`form-input ${errors.imageUrl ? 'error' : ''}`}
              placeholder="https://example.com/product-image.jpg"
              {...register('imageUrl')}
            />
            {errors.imageUrl && (
              <p className="form-error">{errors.imageUrl.message}</p>
            )}
            <p className="form-hint">
              Enter a URL to an image hosted online (e.g., Imgur, Cloudinary)
            </p>
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          {onCancel && (
            <button type="button" onClick={onCancel} className="btn btn-outline">
              Cancel
            </button>
          )}
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Saving...' : existingProduct ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
