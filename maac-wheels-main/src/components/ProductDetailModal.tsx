import React, { useState } from 'react';
import { X, Star, ShieldCheck, MessageSquare, PhoneCall, Check, Car } from 'lucide-react';
import { Product } from '../types.ts';
import { getProductWhatsAppUrl, WORKSHOP_DETAILS } from '../data/catalog.ts';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  theme?: 'light' | 'dark';
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const [vehicleInfo, setVehicleInfo] = useState('');

  if (!product) return null;

  const whatsappUrl = getProductWhatsAppUrl(product, vehicleInfo);

  const isRedBadge = product.badge?.includes('F1') || 
                     product.badge?.includes('SPEC') || 
                     product.badge?.includes('MOTORSPORT') ||
                     product.badge?.includes('DOWNFORCE');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#ffffff] border-2 border-[#556b2f] rounded-2xl overflow-hidden shadow-2xl my-6">
        {/* Close Button: 44x44px touch target */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-11 h-11 flex items-center justify-center bg-[#ffffff] hover:bg-[#e5e2de] border border-[#d8d4cf] text-[#1c2610] hover:text-[#556b2f] rounded-full transition-colors cursor-pointer shadow-md min-h-[44px] min-w-[44px]"
          title="Close modal"
          aria-label="Close modal dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Column */}
          <div className="relative aspect-square md:aspect-auto bg-[#1c2610] flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-[#d8d4cf]">
            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />

            {product.badge && (
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 font-heading text-xs rounded-md shadow-xs font-bold uppercase tracking-wider ${
                  isRedBadge ? 'bg-[#b91c1c] text-white' : 'bg-[#556b2f] text-[#f2f0ef]'
                }`}>
                  {product.badge}
                </span>
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto bg-[#ffffff]">
            <div>
              {/* Category & SKU */}
              <div className="flex items-center justify-between text-xs mb-2 font-heading font-semibold">
                <span className="text-[#556b2f] font-bold uppercase tracking-wider">
                  {product.categoryName} • {product.subCategoryName}
                </span>
                <span className="text-[#66774c] font-mono-code">SKU: {product.sku}</span>
              </div>

              {/* Product Subheading / Name */}
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#1c2610] leading-tight uppercase tracking-tight">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2 text-xs font-label">
                <div className="flex items-center text-amber-600">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span className="ml-1 font-bold tabular-nums text-[#1c2610]">{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-[#d8d4cf]">·</span>
                <span className="text-[#66774c]">{product.reviewsCount} Fitment Verified Reviews</span>
              </div>

              {/* Pricing */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-price text-3xl sm:text-4xl text-[#1c2610] tracking-tight leading-none tabular-nums font-bold">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.compareAtPrice && (
                  <span className="font-price text-base sm:text-lg text-[#8a9870] line-through tracking-tight leading-none tabular-nums">
                    ₹{product.compareAtPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs font-label text-[#66774c]">MRP incl. GST</span>
              </div>

              {/* Workshop Availability Status */}
              <div className="mt-2 text-xs font-label text-[#556b2f] flex items-center gap-1.5 font-bold">
                <Check className="w-3.5 h-3.5" />
                <span>Available at Kumbakonam Workshop • Custom Fitment Consultation Included</span>
              </div>

              {/* Description */}
              <p className="mt-4 text-xs sm:text-sm text-[#405126] font-body leading-relaxed border-t border-[#d8d4cf] pt-4">
                {product.shortDesc}
              </p>

              {/* Specifications Table */}
              <div className="mt-5 border border-[#d8d4cf] rounded-xl overflow-hidden">
                <div className="bg-[#e5e2de] px-4 py-2.5 border-b border-[#d8d4cf] text-xs font-heading text-[#556b2f] uppercase tracking-wider font-bold">
                  Engineering Specifications
                </div>
                <div className="divide-y divide-[#d8d4cf] text-xs bg-[#ffffff]">
                  {Object.entries(product.specs || {}).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2.5 px-4">
                      <span className="text-[#556b2f] font-heading text-xs uppercase tracking-wider font-semibold">{key}</span>
                      <span className="text-[#1c2610] text-right font-body text-xs font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fitment Guarantee Box */}
              <div className="mt-4 p-3.5 bg-[#e5e2de] border border-[#d8d4cf] rounded-xl flex items-start gap-2.5 text-xs text-[#222d13]">
                <ShieldCheck className="w-4 h-4 text-[#556b2f] shrink-0 mt-0.5" />
                <span className="font-body">
                  <strong className="text-[#1c2610] font-semibold">MAAC Fitment Assurance:</strong> Every inquiry is cross-checked against your vehicle chassis year, bolt PCD, and offset prior to dispatch.
                </span>
              </div>

              {/* Vehicle Compatibility Form */}
              <div className="mt-5 space-y-2">
                <label htmlFor="vehicle-model" className="block text-xs font-heading text-[#1c2610] font-bold uppercase tracking-wider">
                  Specify Your Car Model (For Perfect Fitment)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#556b2f]">
                    <Car className="w-4 h-4" />
                  </div>
                  <input
                    id="vehicle-model"
                    type="text"
                    value={vehicleInfo}
                    onChange={(e) => setVehicleInfo(e.target.value)}
                    placeholder="e.g. Hyundai Creta 2024, Mahindra Thar, VW Virtus"
                    className="w-full pl-10 pr-3 py-2.5 bg-[#ffffff] border border-[#d8d4cf] rounded-lg text-xs sm:text-sm text-[#1c2610] placeholder-[#8a9870] focus:outline-none focus:border-[#556b2f] font-body"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-5 border-t border-[#d8d4cf] flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-[#556b2f] hover:bg-[#3f5023] text-[#f2f0ef] font-heading text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-current text-[#f2f0ef]" />
                <span>Inquire Fitment on WhatsApp</span>
              </a>

              <a
                href={`tel:${WORKSHOP_DETAILS.phone.replace(/[^0-9+]/g, '')}`}
                className="py-3 px-4 bg-[#e5e2de] hover:bg-[#dcd8d3] border border-[#d8d4cf] text-[#1c2610] font-heading text-xs sm:text-sm uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-[#556b2f]" />
                <span>Call Desk</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
