import React, { useState } from 'react';
import { FORGE_BUILDS, type VehicleBuild } from '../data/forgeData';
import { ArrowUpRight, Gauge, Zap, CheckCircle2, X } from 'lucide-react';
import { scrollTo } from '../services/scroll';

export const BuildsShowcase: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Delivered' | 'Available'>('All');
  const [selectedBuild, setSelectedBuild] = useState<VehicleBuild | null>(null);

  const filteredBuilds =
    filter === 'All' ? FORGE_BUILDS : FORGE_BUILDS.filter((b) => b.status === filter);

  return (
    <section id="builds" className="py-24 sm:py-32 bg-[#080808] px-4 sm:px-8 border-t border-white/10">
      <div className="max-w-[1440px] mx-auto">
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-white/10 gap-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.3em] text-red-500 mb-2">
              CURATED COMMISSIONS & INVENTORY
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Previous Builds & Stock
            </h2>
            <p className="mt-2 text-neutral-400 text-xs sm:text-sm max-w-lg font-light leading-relaxed">
              Refined with intent, engineered with purpose, and ready to make a statement on the road.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 font-mono text-xs">
            {(['All', 'Delivered', 'Available'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 rounded-full border transition-all ${
                  filter === tab
                    ? 'bg-white text-black border-white font-medium shadow-lg shadow-white/10'
                    : 'bg-white/[0.03] text-neutral-400 border-white/10 hover:text-white hover:border-white/20'
                }`}
              >
                {tab === 'All' ? 'ALL ARCHIVES' : tab === 'Delivered' ? 'COMMISSIONED' : 'STOCK READY'}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {filteredBuilds.map((build) => (
            <div
              key={build.id}
              onClick={() => setSelectedBuild(build)}
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#0e0e0e] hover:border-white/30 transition-all duration-500 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <img
                  src={build.image}
                  alt={build.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-black/40" />

                {/* Status Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span
                    className={`font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded backdrop-blur-md border ${
                      build.status === 'Available'
                        ? 'bg-emerald-950/70 border-emerald-500/30 text-emerald-300'
                        : 'bg-black/60 border-white/15 text-neutral-300'
                    }`}
                  >
                    {build.status === 'Available' ? 'AVAILABLE STOCK' : 'COMMISSIONED ARCHIVE'}
                  </span>
                  <span className="font-mono text-[10px] text-neutral-400 bg-black/60 px-2 py-1 rounded border border-white/10">
                    {build.year}
                  </span>
                </div>
              </div>

              {/* Specs & Title */}
              <div className="p-6 sm:p-8">
                <div className="font-mono text-[11px] text-red-500 tracking-[0.2em] uppercase mb-1">
                  {build.subtitle}
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-4 group-hover:text-red-400 transition-colors">
                  {build.title}
                </h3>

                {/* Quick Specs strip */}
                <div className="grid grid-cols-2 gap-3 py-4 border-y border-white/10 font-mono text-xs text-neutral-300">
                  <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-red-500" />
                    <span>{build.power}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gauge className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{build.acceleration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 mt-2">
                  <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 group-hover:text-white transition-colors">
                    View Commission Dossier
                  </span>
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Build Specification Modal */}
      {selectedBuild && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#111111] border border-white/20 rounded-2xl p-6 sm:p-8 overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedBuild(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="font-mono text-xs text-red-500 uppercase tracking-widest block mb-1">
              {selectedBuild.subtitle}
            </span>
            <h3 className="font-display text-3xl font-extrabold text-white uppercase tracking-tight mb-2">
              {selectedBuild.title}
            </h3>
            <div className="font-mono text-xs text-neutral-400 mb-6">
              CHASSIS PLATFORM: {selectedBuild.chassis}
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-black/40 border border-white/10 mb-6 font-mono text-xs">
              <div>
                <span className="text-neutral-500 block mb-0.5">POWERTRAIN OUTPUT</span>
                <span className="text-white font-medium">{selectedBuild.power}</span>
              </div>
              <div>
                <span className="text-neutral-500 block mb-0.5">PERFORMANCE ACCEL</span>
                <span className="text-white font-medium">{selectedBuild.acceleration}</span>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 block mb-2">
                Atelier Commission Highlights:
              </span>
              {selectedBuild.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setSelectedBuild(null);
                scrollTo('#contact', -30);
              }}
              className="w-full py-3.5 bg-white text-black font-mono text-xs uppercase tracking-wider rounded font-medium hover:bg-neutral-200 transition-colors"
            >
              Request Dossier & Commission Pricing
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
