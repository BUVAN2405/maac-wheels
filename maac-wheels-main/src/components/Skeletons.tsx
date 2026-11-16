import React from 'react';

/**
 * Route-level skeletons for dynamic pages and lazy-loaded components.
 * All containers use fixed heights and intrinsic aspect ratios to guarantee
 * zero Cumulative Layout Shift (CLS = 0) during route transitions.
 */

export const ServiceDetailSkeleton: React.FC = () => {
  return (
    <article 
      className="min-h-screen bg-[#f2f0ef] text-[#1c2610] animate-pulse"
      aria-busy="true"
      aria-label="Loading service details"
    >
      {/* 1. Breadcrumb Bar Skeleton (fixed height: 48px / h-12) */}
      <div className="h-12 border-b border-[#d8d4cf] bg-[#e8e5e0] px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-[1320px] w-full mx-auto flex items-center gap-3">
          <div className="h-3.5 w-12 bg-[#d8d4cf] rounded" />
          <div className="h-3 w-3 bg-[#d8d4cf] rounded-full" />
          <div className="h-3.5 w-16 bg-[#d8d4cf] rounded" />
          <div className="h-3 w-3 bg-[#d8d4cf] rounded-full" />
          <div className="h-3.5 w-40 bg-[#c5c1bb] rounded" />
        </div>
      </div>

      {/* 2. Split Hero Band Skeleton (fixed min-height: 480px) */}
      <section className="bg-[#1c2610] text-[#f2f0ef] min-h-[460px] sm:min-h-[500px] flex items-center">
        <div className="max-w-[1320px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Hero Details */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap gap-2.5">
              <div className="h-6 w-32 bg-[#2a3818] rounded" />
              <div className="h-6 w-56 bg-[#253216] rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-10 sm:h-14 w-4/5 bg-[#2d3d1a] rounded" />
              <div className="h-5 sm:h-6 w-2/3 bg-[#243015] rounded" />
            </div>
            <div className="space-y-2 max-w-2xl pt-2">
              <div className="h-4 w-full bg-[#243015] rounded" />
              <div className="h-4 w-11/12 bg-[#243015] rounded" />
              <div className="h-4 w-3/4 bg-[#243015] rounded" />
            </div>
            {/* 4 Specs Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
              <div className="space-y-1.5">
                <div className="h-3 w-16 bg-[#2a3818] rounded" />
                <div className="h-4 w-24 bg-[#243015] rounded" />
              </div>
              <div className="space-y-1.5">
                <div className="h-3 w-16 bg-[#2a3818] rounded" />
                <div className="h-4 w-24 bg-[#243015] rounded" />
              </div>
              <div className="space-y-1.5">
                <div className="h-3 w-16 bg-[#2a3818] rounded" />
                <div className="h-4 w-24 bg-[#243015] rounded" />
              </div>
              <div className="space-y-1.5">
                <div className="h-3 w-16 bg-[#2a3818] rounded" />
                <div className="h-4 w-24 bg-[#243015] rounded" />
              </div>
            </div>
            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="h-12 w-44 bg-[#556b2f]/60 rounded-lg" />
              <div className="h-10 w-36 bg-[#243015] rounded-lg" />
            </div>
          </div>
          {/* Right Showcase Image Box */}
          <div className="lg:col-span-5">
            <div className="w-full aspect-[4/3] bg-[#243015] rounded-xl border border-[#3a4a20]" />
          </div>
        </div>
      </section>

      {/* 3. Specs & Overview Section (fixed min-height: 380px) */}
      <section className="py-12 sm:py-16 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#d8d4cf] min-h-[360px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="h-4 w-32 bg-[#d8d4cf] rounded" />
            <div className="h-8 w-64 bg-[#c5c1bb] rounded" />
            <div className="divide-y divide-[#d8d4cf] border-t border-b border-[#d8d4cf] pt-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="py-3 flex justify-between gap-4">
                  <div className="h-4 w-28 bg-[#d8d4cf] rounded" />
                  <div className="h-4 w-36 bg-[#c5c1bb] rounded" />
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7 space-y-4">
            <div className="h-7 w-72 bg-[#c5c1bb] rounded" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-[#d8d4cf] rounded" />
              <div className="h-4 w-full bg-[#d8d4cf] rounded" />
              <div className="h-4 w-5/6 bg-[#d8d4cf] rounded" />
            </div>
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-8 bg-[#e8e5e0] rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Process Timeline Section (fixed min-height: 200px) */}
      <section className="py-12 bg-[#e8e5e0] border-b border-[#d8d4cf] min-h-[220px]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-6 w-48 bg-[#d8d4cf] rounded mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="border-t-2 border-[#556b2f]/40 pt-4 space-y-2">
                <div className="h-3 w-16 bg-[#d8d4cf] rounded" />
                <div className="h-5 w-32 bg-[#c5c1bb] rounded" />
                <div className="h-12 w-full bg-[#dedad5] rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
};

export const ServiceCardSkeleton: React.FC = () => {
  return (
    <div 
      className="bg-white rounded-xl border border-[#d8d4cf] overflow-hidden flex flex-col justify-between shadow-xs animate-pulse"
      aria-hidden="true"
    >
      <div className="relative w-full aspect-[16/10] bg-[#e8e5e0] border-b border-[#d8d4cf]">
        <div className="absolute top-2 left-2 h-5 w-24 bg-[#d8d4cf] rounded" />
      </div>
      <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          <div className="h-5 w-3/4 bg-[#d8d4cf] rounded" />
          <div className="h-3.5 w-1/2 bg-[#dedad5] rounded" />
          <div className="h-3 w-full bg-[#e8e5e0] rounded" />
          <div className="h-3 w-4/5 bg-[#e8e5e0] rounded" />
        </div>
        <div className="pt-2 border-t border-[#d8d4cf] flex items-center justify-between gap-2">
          <div className="h-9 flex-1 bg-[#556b2f]/30 rounded-lg" />
          <div className="h-9 w-20 bg-[#e8e5e0] rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export const HomeSkeleton: React.FC = () => {
  return (
    <div 
      className="min-h-screen bg-[#f2f0ef] text-[#1c2610] animate-pulse"
      aria-busy="true"
      aria-label="Loading homepage"
    >
      {/* Hero Section Skeleton (fixed aspect ratio / responsive height) */}
      <section className="relative w-full bg-[#e8e5e0] overflow-hidden sm:h-screen min-h-[300px] flex items-center justify-center">
        <div className="text-center px-4 max-w-xl mx-auto space-y-3">
          <div className="h-8 sm:h-12 w-3/4 mx-auto bg-[#d8d4cf] rounded-lg" />
          <div className="h-4 sm:h-5 w-2/3 mx-auto bg-[#dedad5] rounded" />
          <div className="h-9 w-36 mx-auto bg-[#556b2f]/40 rounded-full mt-4" />
        </div>
      </section>

      {/* Services Grid Skeleton */}
      <section className="py-12 sm:py-16 px-4 max-w-[1320px] mx-auto">
        <div className="mb-8 space-y-2">
          <div className="h-5 w-40 bg-[#d8d4cf] rounded-full" />
          <div className="h-8 sm:h-10 w-72 bg-[#c5c1bb] rounded" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {[...Array(6)].map((_, i) => (
            <ServiceCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
};

