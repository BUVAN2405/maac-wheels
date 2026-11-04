import React from 'react';
import { ArrowRight, Wrench } from 'lucide-react';
import { Category } from '../types.ts';

interface CategoryGridProps {
  categories: Category[];
  onSelectCategory: (id: string, subCategory?: string) => void;
  isLocked?: boolean;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  onSelectCategory,
  isLocked = false,
}) => {
  const handleCardClick = (catId: string, subCategory?: string) => {
    if (isLocked) return;
    onSelectCategory(catId, subCategory);
    const el = document.getElementById('product-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Ensure 4 sectors
  const displaySectors = React.useMemo(() => {
    const list = [...categories];
    const hasAll = list.some(c => c.id === 'all');
    if (!hasAll) {
      list.push({
        id: 'all',
        name: 'All Accessories',
        slug: 'all',
        tagline: 'Complete Inventory',
        description: 'Alloy fitments, laser optics, Android screens, custom upholstery, and detailing armor for all car models.',
        image: '/images/hero-drift.jpg',
        itemCount: 23,
        mainType: 'accessories',
        subcategories: [
          { id: 'interior', name: 'Interior', count: 11 },
          { id: 'exterior', name: 'Exterior', count: 8 },
          { id: 'car-care', name: 'Car Care', count: 4 },
        ]
      });
    }
    return list;
  }, [categories]);

  return (
    <section
      id="category-section"
      className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-[1360px] mx-auto bg-[#fffdd0]"
    >
      <div id="category-rack" className="sr-only" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-10 border-b border-[#dbd49b] pb-4 sm:pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#556b2f]" />
            <span className="font-heading text-[#556b2f] text-xs font-bold tracking-wider uppercase">
              Specialized Divisions
            </span>
            <span className="mx-2 text-[#dbd49b] hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-heading text-xs bg-[#f5f1c6] border border-[#dbd49b] text-[#556b2f] font-semibold">
              Verified Fitments
            </span>
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl text-[#1c2610] uppercase tracking-tight">
            Automotive <span className="text-[#556b2f]">Display Rack</span>
          </h2>
        </div>
        <p className="mt-2 md:mt-0 text-xs sm:text-sm text-[#405126] max-w-md font-body leading-relaxed">
          Select an accessory division below to explore interior cockpits, exterior aerodynamics, or detailing chemistry.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
        {displaySectors.map((cat, index) => {
          return (
            <div
              key={cat.id}
              onClick={() => handleCardClick(cat.id)}
              className="group relative bg-[#fdfcf3] rounded-xl border border-[#dbd49b] hover:border-[#556b2f] overflow-hidden transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-md cursor-pointer"
            >
              {/* Image */}
              <div className="relative w-full aspect-[16/10] bg-[#1c2610] flex items-center justify-center overflow-hidden border-b border-[#dbd49b]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover p-0 transition-transform duration-300 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Sector Badge */}
                <div className="absolute top-2 left-2 z-10">
                  <span className="font-mono-code text-[8px] sm:text-[9px] px-2 py-0.5 bg-[#fdfcf3]/90 border border-[#dbd49b] text-[#556b2f] rounded font-bold tracking-wider">
                    SECTOR 0{index + 1}
                  </span>
                </div>

                {/* Specs Badge */}
                <div className="absolute top-2 right-2 z-10">
                  <span className="font-mono-code text-[8px] sm:text-[9px] text-[#fffdd0] bg-[#556b2f] px-2 py-0.5 rounded font-bold">
                    {cat.itemCount} SPECS
                  </span>
                </div>
              </div>

              {/* Content & Action Area */}
              <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between gap-1.5 sm:gap-2">
                <div>
                  <p className="font-heading text-[9px] sm:text-[10px] text-[#556b2f] font-bold tracking-wider uppercase truncate">
                    {cat.tagline}
                  </p>
                  <h3 className="font-heading text-sm sm:text-base lg:text-lg text-[#1c2610] tracking-tight group-hover:text-[#556b2f] transition-colors uppercase line-clamp-1 leading-tight font-bold">
                    {cat.name}
                  </h3>
                  
                  <p className="hidden sm:block mt-1 text-[11px] text-[#405126] line-clamp-2 font-body leading-relaxed">
                    {cat.description}
                  </p>

                  {cat.subcategories && cat.subcategories.length > 0 && (
                    <div className="hidden sm:flex mt-3 pt-2.5 border-t border-[#dbd49b] flex-wrap gap-1">
                      {cat.subcategories.slice(0, 3).map(sub => (
                        <span
                          key={sub.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick(cat.id, sub.id);
                          }}
                          className="text-[9px] font-mono-code px-1.5 py-0.5 rounded bg-[#f5f1c6] border border-[#dbd49b] text-[#405126] hover:text-[#1c2610] hover:border-[#556b2f] transition-colors"
                        >
                          {sub.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Action */}
                <div className="mt-1 pt-2 border-t border-[#dbd49b] flex items-center justify-between">
                  <span className="font-heading text-xs uppercase tracking-wider text-[#556b2f] group-hover:text-[#3f5023] flex items-center gap-1 font-bold">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3 transform transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="text-[10px] font-body text-[#66774c] hidden sm:inline">
                    Kumbakonam Bay
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
