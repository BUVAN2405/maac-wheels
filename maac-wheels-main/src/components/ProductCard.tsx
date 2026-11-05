import React from 'react';
import { Eye, Star, MessageSquare, CheckCircle2 } from 'lucide-react';
import { Product } from '../types.ts';
import { getProductWhatsAppUrl } from '../data/catalog.ts';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onQuickView
}) => {
  const isAvailable = product.stock > 0;
  const whatsappUrl = getProductWhatsAppUrl(product);

  const isRedBadge = product.badge?.includes('F1') || 
                     product.badge?.includes('SPEC') || 
                     product.badge?.includes('MOTORSPORT') ||
                     product.badge?.includes('DOWNFORCE');

  return (
    <div className="product-card group relative bg-[#ffffff] border border-[#d8d4cf] hover:border-[#556b2f] rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-200 shadow-xs hover:shadow-md h-full">
      {/* Streamlined Image Container */}
      <div className="relative aspect-[16/10] sm:aspect-[4/3] max-h-40 sm:max-h-44 w-full overflow-hidden bg-[#1c2610]">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 pointer-events-none">
          {product.badge && (
            <span className={`px-2 py-0.5 text-[#f2f0ef] font-label text-[8px] sm:text-[9px] uppercase rounded shadow-xs tracking-wider font-bold ${
              isRedBadge ? 'bg-[#b91c1c]' : 'bg-[#556b2f]'
            }`}>
              {product.badge}
            </span>
          )}
        </div>

        {/* Quick View and SKU tag */}
        <div className="absolute top-2 right-2 z-10 flex items-center gap-1">
          <span className="hidden sm:inline-block px-1.5 py-0.5 bg-[#ffffff]/90 border border-[#d8d4cf] text-[#556b2f] font-mono-code text-[8px] rounded font-semibold">
            {product.sku}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center bg-[#ffffff] hover:bg-[#e5e2de] text-[#556b2f] hover:text-[#1c2610] rounded border border-[#d8d4cf] transition-colors cursor-pointer"
            title="View Specifications"
            aria-label={`View specs for ${product.name}`}
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between gap-2 bg-[#ffffff]">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between mb-1 gap-1 text-[10px] sm:text-xs">
            <span className="font-label text-[#556b2f] text-[9px] sm:text-[10px] font-bold tracking-wider uppercase truncate">
              {product.subCategoryName || product.categoryName}
            </span>
            <div className="flex items-center gap-1 text-amber-700 shrink-0 font-medium">
              <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
              <span className="font-subheading text-[10px] tabular-nums text-[#1c2610] font-bold">
                {product.rating.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-heading text-sm text-[#1c2610] hover:text-[#556b2f] cursor-pointer transition-colors line-clamp-2 leading-tight font-bold uppercase tracking-tight"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Compact 1-line key specs */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="mt-1.5 flex items-center gap-1.5 text-[9px] sm:text-[10px] text-[#66774c] overflow-hidden truncate">
              {Object.entries(product.specs).slice(0, 2).map(([key, value], idx) => (
                <span key={key} className="inline-flex items-center gap-1 truncate shrink-0">
                  {idx > 0 && <span className="text-[#d8d4cf]">•</span>}
                  <span className="text-[#556b2f] font-semibold uppercase">{key}:</span>
                  <span className="text-[#1c2610] truncate">{value}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & WhatsApp Inquiry Button */}
        <div className="mt-1 pt-2 border-t border-[#d8d4cf] flex items-center justify-between gap-2">
          {/* Price */}
          <div className="min-w-0">
            <div className="flex items-baseline gap-1">
              <span className="font-price text-base sm:text-lg text-[#1c2610] tracking-tight truncate leading-none tabular-nums font-bold">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.compareAtPrice && (
                <span className="font-price text-[10px] sm:text-xs text-[#8a9870] line-through tracking-tight leading-none tabular-nums">
                  ₹{product.compareAtPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <div className="text-[8px] sm:text-[9px] text-[#556b2f] flex items-center gap-0.5 font-label font-medium truncate mt-0.5">
              <CheckCircle2 className="w-2.5 h-2.5 text-[#556b2f] shrink-0" />
              <span className="truncate">{isAvailable ? 'In Stock • Kumbakonam' : 'Custom Fit'}</span>
            </div>
          </div>

          {/* WhatsApp Direct Action Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 bg-[#556b2f] hover:bg-[#3f5023] text-[#f2f0ef] font-heading text-xs font-bold rounded-lg shadow-xs transition-all flex items-center justify-center gap-1 shrink-0 uppercase tracking-wider cursor-pointer"
            title="Enquire on WhatsApp"
            aria-label={`Enquire about ${product.name} on WhatsApp`}
          >
            <MessageSquare className="w-3 h-3 fill-current shrink-0 text-[#f2f0ef]" />
            <span>Enquire</span>
          </a>
        </div>
      </div>
    </div>
  );
};
