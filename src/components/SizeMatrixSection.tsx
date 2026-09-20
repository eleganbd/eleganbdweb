import React, { useState } from 'react';
import { MessageSquare, Calculator, Check, Sparkles } from 'lucide-react';
import { SIZE_MATRIX } from '../data/products';
import { SizeNumber } from '../types';

export const SizeMatrixSection: React.FC = () => {
  const [showCalculator, setShowCalculator] = useState(false);
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(8);
  const [weightKg, setWeightKg] = useState<number>(68);
  const [fitPreference, setFitPreference] = useState<'slim' | 'tailored' | 'comfort'>('tailored');
  const [recommendedSize, setRecommendedSize] = useState<SizeNumber | null>(null);

  const calculateFit = () => {
    // Estimator tailored for Bangladeshi male morphology
    let calculated: SizeNumber = 32;
    if (weightKg < 58) calculated = 28;
    else if (weightKg <= 65) calculated = 30;
    else if (weightKg <= 73) calculated = 32;
    else if (weightKg <= 81) calculated = 34;
    else if (weightKg <= 90) calculated = 36;
    else calculated = 38;

    if (fitPreference === 'comfort' && calculated < 38) {
      if (weightKg % 5 >= 3) {
        calculated = Math.min(38, calculated + 2) as SizeNumber;
      }
    }
    setRecommendedSize(calculated);
  };

  return (
    <section className="w-full py-20 bg-[#f5f3ef]" id="fit-guide">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-10">
        
        {/* Section Heading */}
        <div className="text-center flex flex-col items-center gap-3">
          <span className="font-semibold text-[11px] uppercase text-[#725b38] tracking-[0.2em]">
            Zero Fit Uncertainty
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#111111]">
            Bangladesh Standard Size Matrix
          </h2>
          <p className="text-sm text-[#444748] max-w-xl leading-relaxed">
            Order your exact denim or chino waist size. Every trouser includes a 2-inch internal let-out allowance at the waist and 1.5-inch blind hem inside.
          </p>

          <button 
            onClick={() => {
              setShowCalculator(!showCalculator);
              if (!showCalculator) calculateFit();
            }}
            className="mt-2 inline-flex items-center gap-2 bg-white text-[#111111] hover:bg-[#111111] hover:text-white px-4 py-2 rounded-full border border-[#e5e2de] text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
          >
            <Calculator className="w-3.5 h-3.5 text-[#725b38]" />
            <span>{showCalculator ? 'Hide Fit Calculator' : 'Try AI Fit Concierge (Height & Weight)'}</span>
          </button>
        </div>

        {/* Interactive Fit Calculator Panel */}
        {showCalculator && (
          <div className="bg-white p-6 rounded-xl border border-[#fedeb2] shadow-lg animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-[#f5f3ef]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#725b38]" />
                <h4 className="font-semibold text-sm text-[#111111] uppercase tracking-wide">
                  Atelier Sizing Predictor
                </h4>
              </div>
              <span className="text-[11px] text-[#747878]">Calibrated for South Asian builds</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-5">
              <div>
                <label className="block text-xs font-semibold text-[#444748] mb-1.5 uppercase tracking-wider">
                  Height: {heightFeet} ft {heightInches} in
                </label>
                <div className="flex gap-2">
                  <select 
                    value={heightFeet} 
                    onChange={(e) => setHeightFeet(Number(e.target.value))}
                    className="w-1/2 p-2 bg-[#f5f3ef] rounded text-xs border border-[#e5e2de] focus:outline-none"
                  >
                    {[5, 6].map(ft => (
                      <option key={ft} value={ft}>{ft} ft</option>
                    ))}
                  </select>
                  <select 
                    value={heightInches} 
                    onChange={(e) => setHeightInches(Number(e.target.value))}
                    className="w-1/2 p-2 bg-[#f5f3ef] rounded text-xs border border-[#e5e2de] focus:outline-none"
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i}>{i} in</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#444748] mb-1.5 uppercase tracking-wider">
                  Weight (kg): {weightKg} kg
                </label>
                <input 
                  type="range"
                  min="50"
                  max="105"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full h-2 bg-[#e5e2de] rounded-lg appearance-none cursor-pointer accent-[#725b38] mt-3"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#444748] mb-1.5 uppercase tracking-wider">
                  Preferred Fit Style
                </label>
                <div className="grid grid-cols-3 gap-1">
                  {(['slim', 'tailored', 'comfort'] as const).map(style => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => setFitPreference(style)}
                      className={`py-2 text-[11px] font-semibold uppercase tracking-wider rounded transition-colors ${
                        fitPreference === style 
                          ? 'bg-[#111111] text-white' 
                          : 'bg-[#f5f3ef] text-[#444748]'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-[#f5f3ef] flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={calculateFit}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#725b38] text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-[#111111] transition-colors"
              >
                Calculate Recommended Size
              </button>

              {recommendedSize && (
                <div className="flex items-center gap-3 bg-[#fedeb2]/40 px-4 py-2 rounded-lg border border-[#fedeb2]">
                  <span className="text-xs text-[#78603e] font-medium">Predicted Perfect Fit:</span>
                  <span className="text-base font-bold text-[#111111]">
                    Size {recommendedSize} (Waist {SIZE_MATRIX.find(s => s.size === recommendedSize)?.exactWaist})
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Size Table Container */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#e5e2de]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#111111] text-white">
                  <th className="py-4 px-6 font-semibold text-[11px] uppercase tracking-wider">Size (BD)</th>
                  <th className="py-4 px-6 font-semibold text-[11px] uppercase tracking-wider">Exact Waist</th>
                  <th className="py-4 px-6 font-semibold text-[11px] uppercase tracking-wider">Thigh Circumference</th>
                  <th className="py-4 px-6 font-semibold text-[11px] uppercase tracking-wider">Knee Width</th>
                  <th className="py-4 px-6 font-semibold text-[11px] uppercase tracking-wider">Ankle Opening</th>
                  <th className="py-4 px-6 font-semibold text-[11px] uppercase tracking-wider">Standard Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#efeeea] text-xs text-[#111111]">
                {SIZE_MATRIX.map((row) => (
                  <tr 
                    key={row.size}
                    className={`transition-colors ${
                      row.isPopular 
                        ? 'bg-[#fedeb2]/25 hover:bg-[#fedeb2]/35' 
                        : 'hover:bg-[#f5f3ef]'
                    }`}
                  >
                    <td className="py-4 px-6 font-bold text-sm">
                      <div className="flex items-center gap-2">
                        <span>{row.size}</span>
                        {row.isPopular && (
                          <span className="text-[9px] bg-[#725b38] text-white px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider">
                            Most Common
                          </span>
                        )}
                      </div>
                    </td>
                    <td className={`py-4 px-6 ${row.isPopular ? 'font-semibold' : ''}`}>{row.exactWaist}</td>
                    <td className="py-4 px-6">{row.thighCircumference}</td>
                    <td className="py-4 px-6">{row.kneeWidth}</td>
                    <td className="py-4 px-6">{row.ankleOpening}</td>
                    <td className="py-4 px-6">{row.standardLength}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Bottom Help Bar */}
          <div className="p-6 bg-[#f5f3ef] flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#e5e2de]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#725b38] shrink-0 border border-[#e5e2de]">
                <MessageSquare className="w-4 h-4 text-[#725b38]" />
              </div>
              <p className="text-xs text-[#444748]">
                Confused between two sizes? Our sizing concierge is active 24/7 on WhatsApp.
              </p>
            </div>

            <a 
              href="https://wa.me/8801631496122?text=Hello%20Elegan%20BD%2C%20I%20am%20confused%20between%20two%20sizes%20for%20formal%20pants"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#111111] text-white hover:bg-[#725b38] px-5 py-2.5 rounded text-[11px] font-semibold uppercase tracking-wider transition-colors shrink-0 shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Fit Concierge</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
