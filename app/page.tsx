'use client';

import { useState } from 'react';

const ACCENT = 'text-emerald-400';
const ACCENT_BG = 'bg-emerald-500';
const ACCENT_RING = 'ring-emerald-500/50';
const ACCENT_GLOW = 'shadow-emerald-500/20';

export default function GreenBuildingPage() {
  const [form, setForm] = useState({
    buildingType: 'Office',
    size: '10000',
    age: '15',
    location: '',
    energyBill: '2500',
    renewablePercentage: '10',
    description: '',
  });
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Generation failed');
      setResult(data.result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 ${ACCENT} text-sm font-medium mb-4 uppercase tracking-widest`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            Environmental AI Suite
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className={ACCENT}>Green Building</span> Energy Analyzer
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get AI-powered energy efficiency analysis, renewable integration plans, and green certification recommendations for your building.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6">
            <h2 className={`text-xl font-semibold ${ACCENT} mb-6`}>Building Parameters</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Building Type</label>
                <select name="buildingType" value={form.buildingType} onChange={handleChange}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
                  <option>Office</option><option>Residential</option><option>Retail</option>
                  <option>Industrial</option><option>Hospital</option><option>School</option><option>Warehouse</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Size (sq ft)</label>
                  <input name="size" type="number" value={form.size} onChange={handleChange} required
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Building Age (years)</label>
                  <input name="age" type="number" value={form.age} onChange={handleChange} required
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Location / Climate Zone</label>
                <input name="location" type="text" value={form.location} onChange={handleChange} placeholder="e.g. Phoenix, AZ — Hot & Dry"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Monthly Energy Bill ($)</label>
                  <input name="energyBill" type="number" value={form.energyBill} onChange={handleChange} required
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Renewable %</label>
                  <input name="renewablePercentage" type="number" min="0" max="100" value={form.renewablePercentage} onChange={handleChange}
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Additional Details</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={3}
                  placeholder="HVAC age, insulation status, window types, current certifications..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none" />
              </div>
              <button type="submit" disabled={loading}
                className={`w-full ${ACCENT_BG} hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all shadow-lg ${ACCENT_GLOW} shadow-emerald-500/20`}>
                {loading ? 'Analyzing Energy Performance...' : 'Generate Energy Efficiency Report'}
              </button>
            </form>
          </div>

          {/* Result */}
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6">
            <h2 className={`text-xl font-semibold ${ACCENT} mb-6`}>Analysis Results</h2>
            {error && (
              <div className="bg-red-900/30 border border-red-700/50 rounded-xl p-4 text-red-300 text-sm">
                {error}
              </div>
            )}
            {loading && (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mb-4" />
                <p>Generating your green building analysis...</p>
              </div>
            )}
            {!loading && !result && !error && (
              <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <svg className="w-16 h-16 mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                <p className="text-center">Enter your building parameters and click generate to see your AI-powered energy analysis.</p>
              </div>
            )}
            {result && (
              <div className="prose prose-invert prose-sm max-w-none">
                <div className="bg-gray-900/80 rounded-xl p-5 text-gray-300 text-sm leading-relaxed whitespace-pre-wrap overflow-auto max-h-[600px]">
                  {result}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center text-gray-600 text-xs">
          Powered by DeepSeek AI · Next.js 16 · Tailwind CSS
        </div>
      </div>
    </div>
  );
}
