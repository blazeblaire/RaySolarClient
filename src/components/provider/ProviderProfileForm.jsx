import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import api from '../../services/api';
import './ProviderProfileForm.css';

const profileSchema = z.object({
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  businessDescription: z.string().optional(),
  businessAddress: z.string().optional(),
  taxId: z.string().optional(),
});

function ProviderProfileForm({ existingProfile, onSuccess }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: existingProfile
      ? {
          businessName: existingProfile.business_name,
          businessDescription: existingProfile.business_description || '',
          businessAddress: existingProfile.business_address || '',
          taxId: existingProfile.tax_id || '',
        }
      : {},
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError('');

    try {
      const payload = {
        business_name: data.businessName,
        business_description: data.businessDescription || null,
        business_address: data.businessAddress || null,
        tax_id: data.taxId || null,
      };

      if (existingProfile) {
        await api.put('/provider/profile', payload);
      } else {
        await api.post('/provider/profile', payload);
      }

      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-form-container">
      <h2 className="form-title">
        {existingProfile ? 'Update Business Profile' : 'Create Business Profile'}
      </h2>

      {error && <div className="alert alert-error">{error}</div>}

      {existingProfile && !existingProfile.is_approved && (
        <div className="alert alert-warning">
          ⏳ Your profile is pending admin approval. You can still edit your information.
        </div>
      )}

      {existingProfile && existingProfile.is_approved && (
        <div className="alert alert-success">
          ✓ Your profile has been approved! You can now add products.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="provider-form">
        <div className="form-group">
          <label htmlFor="businessName" className="form-label">
            Business Name *
          </label>
          <input
            id="businessName"
            type="text"
            className={`form-input ${errors.businessName ? 'error' : ''}`}
            placeholder="Ray Solar Energy Ltd"
            {...register('businessName')}
          />
          {errors.businessName && (
            <p className="form-error">{errors.businessName.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="businessDescription" className="form-label">
            Business Description
          </label>
          <textarea
            id="businessDescription"
            className="form-textarea"
            placeholder="Tell us about your solar business..."
            rows="4"
            {...register('businessDescription')}
          />
        </div>

        <div className="form-group">
          <label htmlFor="businessAddress" className="form-label">
            Business Address
          </label>
          <textarea
            id="businessAddress"
            className="form-textarea"
            placeholder="Street, City, Postal Code"
            rows="3"
            {...register('businessAddress')}
          />
        </div>

        <div className="form-group">
          <label htmlFor="taxId" className="form-label">
            Tax ID / Registration Number
          </label>
          <input
            id="taxId"
            type="text"
            className="form-input"
            placeholder="e.g., PIN A123456789B"
            {...register('taxId')}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-full"
          disabled={isLoading}
        >
          {isLoading
            ? 'Saving...'
            : existingProfile
            ? 'Update Profile'
            : 'Create Profile'}
        </button>
      </form>
    </div>
  );
}

export default ProviderProfileForm;
