import React, { useState, useEffect, useRef } from 'react';
import { VolumeX } from 'lucide-react';

export const AudioAmbience: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);

  const toggleSound = () => {
    if (!isPlaying) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        // Master gain
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 1.5);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Deep low V8 idle hum (44 Hz)
        const osc1 = ctx.createOscillator();
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(44, ctx.currentTime);

        // Low-pass filter for deep muffled purr
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(110, ctx.currentTime);
        filter.Q.setValueAtTime(3.0, ctx.currentTime);

        // Subtle sub-bass atmospheric rumble (32 Hz)
        const osc2 = ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(32, ctx.currentTime);

        osc1.connect(filter);
        filter.connect(masterGain);
        osc2.connect(masterGain);

        osc1.start();
        osc2.start();

        osc1Ref.current = osc1;
        osc2Ref.current = osc2;

        setIsPlaying(true);
      } catch (e) {
        console.warn('AudioContext not allowed yet', e);
      }
    } else {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.exponentialRampToValueAtTime(
          0.0001,
          audioCtxRef.current.currentTime + 0.5
        );
        setTimeout(() => {
          osc1Ref.current?.stop();
          osc2Ref.current?.stop();
          audioCtxRef.current?.close();
          setIsPlaying(false);
        }, 500);
      } else {
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      audioCtxRef.current?.close().catch(() => {});
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      title={isPlaying ? 'Mute Atelier Ambience' : 'Listen: V8 Atelier Atmosphere'}
      className="group flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/25 transition-all text-xs font-mono tracking-wider text-neutral-400 hover:text-white"
    >
      <div className="relative flex items-center justify-center w-3.5 h-3.5">
        {isPlaying ? (
          <div className="flex items-end gap-[2px] h-3">
            <span className="w-[2px] h-3 bg-red-500 animate-pulse" />
            <span className="w-[2px] h-2 bg-red-400 animate-ping" />
            <span className="w-[2px] h-2.5 bg-red-500 animate-bounce" />
          </div>
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-300" />
        )}
      </div>
      <span className="hidden sm:inline uppercase text-[10px] tracking-[0.2em]">
        {isPlaying ? 'ENGINE IDLE 44HZ' : 'SOUND AMBIENCE'}
      </span>
    </button>
  );
};
