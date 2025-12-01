import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Brain,
  Cpu,
  Users,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Layers,
  Zap,
  Globe,
  FileText,
  ChevronDown,
  ChevronUp,
  Activity,
  ScanText,
  Code,
  Map,
  Target,
  Terminal,
  Cpu as CpuIcon,
  Eye,
  ShieldCheck,
  BookOpen
} from 'lucide-react';

// --- Components ---

const Section = ({ title, icon: Icon, children, isOpenDefault = false, actionElement = null }) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  return (
    <div className="mb-6 bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden backdrop-blur-sm">
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-800/30 gap-4 sm:gap-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 flex-1 text-left w-full sm:w-auto"
        >
          <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400 shrink-0">
            <Icon size={20} />
          </div>
          <h2 className="text-xl font-semibold text-slate-100">{title}</h2>
        </button>

        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          {actionElement}
          <button onClick={() => setIsOpen(!isOpen)} className="p-1 hover:bg-slate-700/50 rounded">
            {isOpen ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="p-6 border-t border-slate-700/50 animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
};

const StatCard = ({ label, value, subtext, trend, color = "indigo", icon: Icon }) => (
  <div className="bg-slate-800 p-4 rounded-lg border border-slate-700 relative overflow-hidden">
    <div className="flex justify-between items-start mb-2 relative z-10">
      <span className="text-slate-400 text-sm font-medium">{label}</span>
      {trend ? (
        <span className={`text-xs px-2 py-1 rounded-full ${trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
          {trend === 'up' ? '↑ Rising' : '↓ Falling'}
        </span>
      ) : Icon ? (
        <Icon size={16} className={`text-${color}-400`} />
      ) : null}
    </div>
    <div className={`text-2xl font-bold text-${color}-400 mb-1 relative z-10`}>{value}</div>
    <div className="text-slate-500 text-xs relative z-10">{subtext}</div>
    {/* Subtle background glow */}
    <div className={`absolute -bottom-4 -right-4 w-24 h-24 bg-${color}-500/5 rounded-full blur-xl pointer-events-none`}></div>
  </div>
);

const CustomLineChart = ({ data, color, title, subtitle }) => {
  return (
    <div className="w-full bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
      <div className="mb-4">
        <h4 className="text-slate-200 font-medium">{title}</h4>
        <p className="text-slate-500 text-xs">{subtitle}</p>
      </div>
      <div className="relative h-48 flex items-end justify-between gap-2 px-2">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[0, 25, 50, 75, 100].map(tick => (
            <div key={tick} className="w-full border-t border-slate-800 h-0 flex items-center">
              <span className="text-[10px] text-slate-600 -mt-4">{100 - tick}%</span>
            </div>
          ))}
        </div>

        {/* Bars/Points */}
        {data.map((point, index) => (
          <div key={index} className="relative flex flex-col items-center justify-end h-full flex-1 group z-10">
            <div
              className={`w-full max-w-[40px] rounded-t-sm transition-all duration-500 hover:opacity-100 opacity-80 ${point.special ? 'bg-amber-500' : color}`}
              style={{ height: `${point.val}%` }}
            >
              {/* Tooltip */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-800 border border-slate-600 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20 shadow-lg z-50">
                {point.label}: {point.val}%
                <div className="text-[10px] text-slate-400">{point.model}</div>
              </div>
            </div>
            {/* Mobile responsive labels */}
            <div className="mt-2 text-[10px] text-slate-400 -rotate-45 md:rotate-0 origin-top-left md:origin-center text-center truncate w-full">
              {point.year}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ScenarioBar = ({ active, title, prob, description, onClick }) => (
  <div
    onClick={onClick}
    tabIndex={0}
    role="button"
    aria-pressed={active}
    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
    className={`cursor-pointer p-4 rounded-lg border transition-all duration-300 relative overflow-hidden outline-none focus:ring-2 focus:ring-indigo-500/50 ${active
      ? 'bg-indigo-900/20 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.15)]'
      : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
      }`}
  >
    <div className="flex justify-between items-center mb-2">
      <h3 className={`font-bold ${active ? 'text-white' : 'text-slate-300'}`}>{title}</h3>
      <span className={`text-xs font-mono px-2 py-1 rounded ${active ? 'bg-indigo-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
        {prob}
      </span>
    </div>
    <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
    {active && <div className="absolute bottom-0 left-0 h-1 bg-indigo-500 w-full animate-pulse"></div>}
  </div>
);

// --- 6. Modern Capability Radar Visualizer ---

const RadarChart = () => {
  const [yearIndex, setYearIndex] = useState(1); // Default to "Late 2025"

  // Data Configuration
  const years = [
    { label: '2024 (Base)', color: '#94a3b8' },
    { label: 'Late 2025', color: '#6366f1' },
    { label: '2026 (Proj)', color: '#34d399' },
    { label: '2027 (Proj)', color: '#f43f5e' }
  ];

  // 6 Axes: Top, TopRight, BottomRight, Bottom, BottomLeft, TopLeft
  const metrics = [
    { key: 'coding', label: 'CODING', icon: Terminal, benchmark: 'SWE-bench Verified', angle: -90 },
    { key: 'knowledge', label: 'KNOWLEDGE', icon: BookOpen, benchmark: 'MMLU (Gen. Knowledge)', angle: -30 }, // Switched to MMLU
    { key: 'reasoning', label: 'REASONING', icon: Brain, benchmark: 'ARC-AGI-2', angle: 30 },
    { key: 'vision', label: 'VISION', icon: Eye, benchmark: 'MMMU Pro', angle: 90 },
    { key: 'planning', label: 'PLANNING', icon: Map, benchmark: 'GAIA Level 3', angle: 150 },
    { key: 'reliability', label: 'RELIABILITY', icon: ShieldCheck, benchmark: 'SimpleQA (Factuality)', angle: 210 }
  ];

  const data = [
    // 2024
    {
      coding: 40, reasoning: 3, planning: 5, knowledge: 86, reliability: 38, vision: 55,
      desc: "Baseline. Knowledge is superhuman (MMLU > 85%), but models are 'stochastic parrots' that hallucinate often. Planning fails >3 steps."
    },
    // 2025 (Now)
    // FIX: Updated reasoning to 31.1% based on Gemini 3 Pro ARC-AGI-2 score
    {
      coding: 75, reasoning: 31, planning: 60, knowledge: 92, reliability: 68, vision: 91,
      desc: "The Agentic Era. Vision solved by Hunyuan/Gemini. Knowledge is effectively capped. Novelty (ARC) sees 10x growth but remains the bottleneck (31%)."
    },
    // 2026
    {
      coding: 92, reasoning: 65, planning: 85, knowledge: 95, reliability: 89, vision: 96,
      desc: "Synthetic Data Breakthrough. Hallucinations drop below 10% via 'Thinking' tokens. Coding becomes superhuman."
    },
    // 2027
    {
      coding: 99, reasoning: 95, planning: 98, knowledge: 99, reliability: 99, vision: 99,
      desc: "Structural Unemployment. AI solves novel scientific problems and executes multi-week plans with perfect recall."
    }
  ];

  // Helper to calculate polygon points
  const getPoints = (dataIndex) => {
    const stats = data[dataIndex];
    const center = 150;
    const radius = 100;

    return metrics.map(m => {
      const val = stats[m.key];
      const point = valueToPoint(val, m.angle, center, radius);
      return `${point.x},${point.y}`;
    }).join(' ');
  };

  const valueToPoint = (val, angleDeg, center, radius) => {
    const angleRad = (Math.PI / 180) * angleDeg;
    // Normalize value 0-100 to radius 0-100
    const r = (val / 100) * radius;
    return {
      x: center + r * Math.cos(angleRad),
      y: center + r * Math.sin(angleRad)
    };
  };

  const currentData = data[yearIndex];
  const activeColor = years[yearIndex].color;

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start bg-slate-900/50 p-8 rounded-xl border border-slate-700">

      {/* Left: Controls & Context */}
      <div className="flex-1 space-y-8 w-full">
        <div>
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-2xl font-bold text-white">Capability Radar</h3>
            <div className="text-right">
              <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">Projection</div>
              <div className="text-xl font-mono text-indigo-400">{years[yearIndex].label}</div>
            </div>
          </div>

          {/* Enhanced Timeline Stepper */}
          <div className="relative flex justify-between items-center mb-8 px-4 py-4">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-4 right-4 h-1 bg-slate-800 -z-10 rounded-full"></div>
            <div
              className="absolute top-1/2 left-4 h-1 bg-indigo-500/50 -z-0 rounded-full transition-all duration-500"
              style={{ right: `${100 - (yearIndex / 3) * 100}%` }}
            ></div>

            {years.map((y, i) => (
              <button
                key={i}
                onClick={() => setYearIndex(i)}
                className="group relative focus:outline-none"
              >
                <div className={`w-6 h-6 rounded-full border-2 transition-all duration-300 z-10 flex items-center justify-center
                    ${i <= yearIndex
                    ? 'bg-indigo-500 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)] scale-110'
                    : 'bg-slate-900 border-slate-600 hover:border-slate-400'
                  }`}
                >
                  {i === yearIndex && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
                {/* Label */}
                <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors duration-300
                    ${i === yearIndex ? 'text-white' : 'text-slate-500 group-hover:text-slate-400'}`}
                >
                  {y.label === 'Late 2025' ? 'LATE 2025' : y.label.split(' ')[0]}
                </div>
              </button>
            ))}
          </div>

          <div className="bg-slate-800/80 p-4 rounded-lg border border-slate-700 shadow-inner mt-6">
            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              "{currentData.desc}"
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {metrics.map((m) => (
            <div key={m.key} className="flex items-center justify-between group p-2 hover:bg-slate-800/50 rounded transition-colors border border-transparent hover:border-slate-700/50">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-md bg-slate-800 text-slate-400 group-hover:text-white transition-colors`}>
                  <m.icon size={14} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{m.label}</span>
                  <span className="text-[9px] text-slate-600 truncate max-w-[80px]">{m.benchmark}</span>
                </div>
              </div>
              <div className={`font-mono text-sm font-bold ${currentData[m.key] > 90 ? 'text-emerald-400' : 'text-white'}`}>
                {currentData[m.key]}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: The Radar Visualization */}
      <div className="relative w-full max-w-[320px] aspect-square flex-shrink-0 mx-auto md:mx-0">
        <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-2xl">
          {/* Background Circles */}
          {[20, 40, 60, 80, 100].map(r => (
            <circle key={r} cx="150" cy="150" r={r} fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" className="opacity-20" />
          ))}

          {/* Axes Lines */}
          {metrics.map((m, i) => {
            const p = valueToPoint(100, m.angle, 150, 100);
            return (
              <line key={i} x1="150" y1="150" x2={p.x} y2={p.y} stroke="#475569" strokeWidth="1" className="opacity-30" />
            );
          })}

          {/* Labels on Chart */}
          {metrics.map((m, i) => {
            // Push labels out slightly further than radius 100
            const p = valueToPoint(115, m.angle, 150, 100);
            return (
              <text
                key={i}
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#94a3b8"
                fontSize="8"
                fontWeight="bold"
                className="uppercase"
              >
                {m.label}
              </text>
            );
          })}

          {/* The Data Polygon */}
          <polygon
            points={getPoints(yearIndex)}
            fill={activeColor}
            fillOpacity="0.25"
            stroke={activeColor}
            strokeWidth="2"
            className="transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          />

          {/* Data Points (Dots) */}
          {metrics.map((m, i) => {
            const val = currentData[m.key];
            const p = valueToPoint(val, m.angle, 150, 100);
            return (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r="3"
                fill={activeColor}
                stroke="#0f172a"
                strokeWidth="2"
                className="transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};

const SourcesFooter = () => (
  <div className="mt-12 pt-8 border-t border-slate-800 text-xs text-slate-500">
    <h4 className="font-bold text-slate-400 mb-4 uppercase tracking-widest flex items-center gap-2">
      <FileText size={14} /> Methodology & Sources
    </h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-900/50 p-6 rounded-lg border border-slate-800">
      <div>
        <h5 className="text-indigo-400 mb-2 font-semibold">Foundational Frameworks</h5>
        <ul className="space-y-2">
          <li className="flex gap-2">
            <span className="text-slate-600">•</span>
            <span><strong>DeepMind:</strong> Levels of AGI (Morris et al., 2023) - <i>Ontology Basis</i></span>
          </li>
          <li className="flex gap-2">
            <span className="text-slate-600">•</span>
            <span><strong>Princeton NLP:</strong> SWE-bench Verified (Jimenez et al., 2024) - <i>Autonomy Metric</i></span>
          </li>
          <li className="flex gap-2">
            <span className="text-slate-600">•</span>
            <span><strong>Chollet:</strong> ARC-AGI 2024 - <i>Novel Reasoning Metric</i></span>
          </li>
        </ul>
      </div>
      <div>
        <h5 className="text-emerald-400 mb-2 font-semibold">Q4 2025 Data Ingestion</h5>
        <ul className="space-y-2">
          <li className="flex gap-2">
            <span className="text-slate-600">•</span>
            <span><strong>OpenAI:</strong> SimpleQA (Factuality/Hallucinations)</span>
          </li>
          <li className="flex gap-2">
            <span className="text-slate-600">•</span>
            <span><strong>MMMU Pro:</strong> Massive Multi-discipline Multimodal Understanding</span>
          </li>
          <li className="flex gap-2">
            <span className="text-slate-600">•</span>
            <span><strong>DeepSeek AI:</strong> Math V2 System Card (Oct 2025)</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

// --- Main Application ---

const App = () => {
  const [activeScenario, setActiveScenario] = useState('B');
  const [showIndependent, setShowIndependent] = useState(false);

  // Data sets from the report
  const mmluData = [
    { year: '2020', val: 43.9, label: 'GPT-3', model: 'GPT-3 (Emergent)' },
    { year: '2023', val: 86.4, label: 'GPT-4', model: 'GPT-4 (Expert)' },
    { year: '2024', val: 90.0, label: 'Gemini Ultra', model: 'Gemini Ultra' },
    { year: 'Nov 25', val: 92.3, label: 'Gemini 3 Pro', model: 'Gemini 3 Pro' },
  ];

  const gpqaData = [
    { year: '2023', val: 39.0, label: 'GPT-4', model: 'GPT-4 Base' },
    { year: '2024', val: 50.0, label: 'Claude 3', model: 'Claude 3 Opus' },
    { year: 'Early 25', val: 78.0, label: 'o1-preview', model: 'o1-preview' },
    { year: 'Nov 25', val: 91.9, label: 'Gemini 3', model: 'Gemini 3 Pro' },
    // DeepSeek V2 addition based on feedback (Fixed color consistency)
    { year: 'Late 25', val: 94.5, label: 'DeepSeek', model: 'DeepSeek Math V2' },
  ];

  // Dynamic SWE Data based on "Independent Eval" toggle
  const sweData = [
    { year: '2023', val: 1.96, label: 'GPT-4', model: 'GPT-4 (Useless)' },
    { year: '2024', val: 18.0, label: 'SWE-agent', model: 'SWE-agent' },
    { year: 'Mid 25', val: 49.0, label: 'Claude 3.5', model: 'Claude 3.5 Sonnet' },
    // FIX: Updated to 74.4% to match Table 3 in report exactly
    {
      year: 'Nov 25',
      val: showIndependent ? 74.4 : 76.2,
      label: showIndependent ? 'Gemini 3 (Report)' : 'Gemini 3 (Lab)',
      model: showIndependent ? 'SWE-bench (Report)' : 'Gemini 3 Pro + Tools'
    },
  ];

  // New Data for Chart Expansion
  // FIX: Updated to match purely ARC-AGI-2 trajectory (low in 2024, rising in 2025)
  const arcData = [
    { year: '2024', val: 2.5, label: 'SOTA 2024', model: 'ARChitects (ARC-2)' },
    { year: 'Early 25', val: 6.5, label: 'o3', model: 'OpenAI o3' },
    { year: 'Mid 25', val: 18.3, label: 'GPT-5', model: 'GPT-5 Pro' },
    { year: 'Nov 25', val: 31.1, label: 'Gemini 3', model: 'Gemini 3 Pro' },
  ];

  const factualityData = [
    { year: '2024', val: 38.2, label: 'GPT-4o', model: 'GPT-4o' },
    { year: 'Early 25', val: 55.0, label: 'Claude 3.7', model: 'Claude 3.7' },
    { year: 'Mid 25', val: 68.0, label: 'o3', model: 'OpenAI o3' },
    { year: 'Nov 25', val: 84.5, label: 'Search-Aug', model: 'Gemini 3 + Grounding' },
  ];

  const gaiaData = [
    { year: '2023', val: 6.0, label: 'GPT-4', model: 'GPT-4' },
    { year: '2024', val: 33.0, label: 'Multi-Agent', model: 'AutoGPT/Devin' },
    { year: 'Mid 25', val: 62.0, label: 'Agentic', model: 'Claude Computer Use' },
    { year: 'Nov 25', val: 88.0, label: 'Unified', model: 'Gemini 3 Pro' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">

      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-indigo-500 rounded flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Activity className="text-white" size={18} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">The AI Revolution: 2025 Strategic Outlook</h1>
              <div className="flex flex-col sm:flex-row sm:gap-4 text-[10px] text-slate-400 font-semibold uppercase tracking-widest">
                <span>Nov 30, 2025</span>
                <span className="hidden sm:inline">•</span>
                <span className="text-indigo-400">By Arthur Devresse & Gemini 3 Pro</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
              <Globe size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-8">

        {/* Executive Summary Hero */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3 space-y-4">
            <h2 className="text-3xl font-light text-white">
              The Transition from <span className="text-indigo-400 font-semibold">Emergence</span> to <span className="text-emerald-400 font-semibold">Deployment</span>
            </h2>
            <p className="text-slate-400 leading-relaxed text-lg">
              We have fundamentally decoupled from training-time scaling. The era of the "Stochastic Parrot" is obsolete.
              As of November 2025, frontier systems like <strong className="text-slate-200">Gemini 3 Pro</strong> and <strong className="text-slate-200">Claude 3.7</strong> have entered the "Expert" tier of General Intelligence, shifting the economic bottleneck from capability to autonomy.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-300">System 2 Reasoning</span>
              <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-300">Synthetic Data Loops</span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <StatCard
              label="Junior Hiring"
              value="-13%"
              subtext="YoY (Software)"
              trend="down"
              color="rose"
            />
            <StatCard
              label="GitHub Resolv."
              value="74.4%"
              subtext="Autonomous"
              trend="up"
              color="emerald"
            />
            {/* New Hunyuan Metric */}
            <StatCard
              label="Paper Interface"
              value="SOLVED"
              subtext="Hunyuan OCR"
              color="blue"
              icon={ScanText}
            />
          </div>
        </div>

        {/* Section 1: Taxonomy */}
        <Section title="2. Taxonomy of Intelligence (Nov 2025)" icon={Brain} isOpenDefault={true}>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-center text-xs">
            {[
              { name: 'Emerging', desc: 'Unskilled' },
              { name: 'Competent', desc: '50th %' },
              { name: 'Expert', desc: '90th %' },
              { name: 'Virtuoso', desc: '99th %' },
              { name: 'Superhuman', desc: '>100%' }
            ].map((level, i) => {
              const isActive = i === 1 || i === 2; // Active range Level 2-3
              return (
                <div key={level.name} className={`p-3 rounded border transition-all ${isActive
                  ? 'bg-indigo-500/10 border-indigo-500/50 shadow-sm'
                  : 'bg-slate-800 border-slate-700 text-slate-500'
                  }`}>
                  <div className="font-mono text-[10px] opacity-50 mb-1">LEVEL {i + 1}</div>
                  <div className={`font-bold ${isActive ? 'text-indigo-300' : ''}`}>{level.name}</div>
                  <div className="text-[9px] mt-1 text-slate-400">{level.desc}</div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 bg-slate-900/50 p-4 rounded-lg border border-slate-800/50">
            <div className="flex items-center gap-2 mb-3">
              <Activity size={16} className="text-indigo-400" />
              <span className="text-sm font-medium text-slate-200">
                Current Status: <span className="text-indigo-400">Progressing Level 2 → Level 3</span>
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="relative pl-4 border-l-2 border-emerald-500/50">
                <h5 className="text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">Leading Edge (Level 3+)</h5>
                <p className="text-slate-400 text-xs leading-relaxed">
                  In deterministic tasks like <strong>Coding</strong> and structured <strong>Summarization</strong>, frontier models already perform at the 90th percentile of skilled workers (Expert).
                </p>
              </div>
              <div className="relative pl-4 border-l-2 border-amber-500/50">
                <h5 className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">Lagging Edge (Level 2)</h5>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Reliability remains the anchor. <strong>Hallucinations</strong> and occasional logic failures keep general trust at the "Competent" (50th percentile) level.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Section 2: The Implied Graphs */}
        <Section
          title="3. The Technical Landscape (Benchmarks)"
          icon={BarChart3}
          isOpenDefault={true}
          actionElement={
            <div className="flex items-center gap-2 bg-slate-900 rounded-lg p-1 border border-slate-700">
              <button
                onClick={(e) => { e.stopPropagation(); setShowIndependent(false); }}
                className={`px-3 py-1 text-xs rounded transition-colors ${!showIndependent ? 'bg-indigo-500 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Lab
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setShowIndependent(true); }}
                className={`px-3 py-1 text-xs rounded transition-colors ${showIndependent ? 'bg-indigo-500 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Independent
              </button>
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CustomLineChart
              title="Knowledge (MMLU)"
              subtitle="Saturation of General Facts"
              data={mmluData}
              color="bg-slate-400"
            />
            <CustomLineChart
              title="Reasoning (GPQA)"
              subtitle="Vertical Takeoff (System 2)"
              data={gpqaData}
              color="bg-indigo-500"
            />
            <CustomLineChart
              title="Autonomy (SWE-bench)"
              subtitle="Agentic Breakout"
              data={sweData}
              color="bg-emerald-500"
            />
            {/* New Charts */}
            <CustomLineChart
              title="Novelty (ARC-AGI-2)"
              subtitle="Generalization over Memory"
              data={arcData}
              color="bg-rose-500"
            />
            <CustomLineChart
              title="Factuality (SimpleQA)"
              subtitle="Hallucination Reduction"
              data={factualityData}
              color="bg-blue-500"
            />
            <CustomLineChart
              title="Planning (GAIA L3)"
              subtitle="Multi-Step General Assistant"
              data={gaiaData}
              color="bg-amber-500"
            />
          </div>
          <div className="mt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 bg-slate-900 rounded-lg border-l-4 border-indigo-500 text-sm text-slate-300">
            <p>
              <strong>Key Insight:</strong> Benchmarks are saturating <strong>3x faster</strong> than in 2023. The "Half-Life" of a benchmark is now ~8 months.
              As MMLU and GPQA hit ceilings, the industry relies on ARC-AGI (Novelty) and GAIA (Planning) to distinguish progress.
            </p>
          </div>
        </Section>

        {/* Section 3: Economic Scenarios */}
        <Section title="4. Economic Scenarios (2026-2029)" icon={AlertTriangle} isOpenDefault={true}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <ScenarioBar
              active={activeScenario === 'A'}
              title="A. The Plateau"
              prob="<10%"
              description="Inference costs remain high. Reliability stalls. AI remains a 'Super-Tool'."
              onClick={() => setActiveScenario('A')}
            />
            <ScenarioBar
              active={activeScenario === 'B'}
              title="B. The Barbell"
              prob="60%"
              description="Most Likely. Agentic costs drop. Junior roles decimated. High demand for Senior 'Orchestrators' and physical labor."
              onClick={() => setActiveScenario('B')}
            />
            <ScenarioBar
              active={activeScenario === 'C'}
              title="C. Frictionless"
              prob="30%"
              description="Recursive self-improvement via synthetic data loops. Structural unemployment across all cognitive sectors."
              onClick={() => setActiveScenario('C')}
            />
          </div>

          {/* Visualization of the Active Scenario */}
          <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Layers size={16} className="text-indigo-400" />
              Deep Dive: {activeScenario === 'B' ? 'The Barbell Economy' : activeScenario === 'A' ? 'The Conservative Case' : 'The Singularity Case'}
            </h3>

            {activeScenario === 'A' && (
              <div className="space-y-4">
                <div className="text-center text-xs text-slate-500 mb-4 font-mono">
                  VISUALIZATION: LABOR DEMAND DISTRIBUTION
                </div>
                <div className="flex items-center mb-6 h-32">
                  {/* Y-Axis Label */}
                  <div className="h-full flex items-center justify-center w-6">
                    <span className="text-[10px] text-slate-500 font-mono -rotate-90 whitespace-nowrap tracking-widest">REL. DEMAND</span>
                  </div>
                  {/* Chart Area */}
                  <div className="flex-1 flex items-end justify-center gap-4 h-full border-l border-b border-slate-700 pl-4 pb-1">
                    <div className="flex-1 max-w-[64px] bg-emerald-500/20 border border-emerald-500/50 h-[80%] flex flex-col justify-end p-2 text-center text-xs text-emerald-300 rounded-t">
                      Senior<br />Archs
                    </div>
                    <div className="flex-1 max-w-[64px] bg-rose-500/10 border-t border-rose-500/30 h-[70%] flex flex-col justify-end p-2 text-center text-xs text-rose-300 mx-2 sm:mx-8">
                      Junior<br />Middle
                    </div>
                    <div className="flex-1 max-w-[64px] bg-blue-500/20 border border-blue-500/50 h-[80%] flex flex-col justify-end p-2 text-center text-xs text-blue-300 rounded-t">
                      Physical<br />Labor
                    </div>
                  </div>
                </div>
                <p className="text-slate-400 text-sm">
                  <strong>Status Quo+ :</strong> In this scenario, the "Data Wall" holds. AI remains a productivity booster (like Excel) rather than a replacement.
                  <br /><br />
                  Junior roles see only a slight reduction as efficiency gains act as a force multiplier rather than full automation. The economy looks largely like 2024, just faster.
                </p>
              </div>
            )}

            {activeScenario === 'B' && (
              <div className="space-y-4">
                <div className="text-center text-xs text-slate-500 mb-4 font-mono">
                  VISUALIZATION: POLARIZATION OF LABOR DEMAND
                </div>
                <div className="flex items-center mb-6 h-32">
                  {/* Y-Axis Label */}
                  <div className="h-full flex items-center justify-center w-6">
                    <span className="text-[10px] text-slate-500 font-mono -rotate-90 whitespace-nowrap tracking-widest">REL. DEMAND</span>
                  </div>
                  {/* Chart Area */}
                  <div className="flex-1 flex items-end justify-center gap-4 h-full border-l border-b border-slate-700 pl-4 pb-1">
                    <div className="flex-1 max-w-[64px] bg-emerald-500/20 border border-emerald-500/50 h-full flex flex-col justify-end p-2 text-center text-xs text-emerald-300 rounded-t">
                      Senior<br />Archs
                    </div>
                    <div className="flex-1 max-w-[64px] bg-rose-500/10 border-t border-rose-500/30 h-1/4 flex flex-col justify-end p-2 text-center text-xs text-rose-300 mx-2 sm:mx-8">
                      Junior<br />Middle
                    </div>
                    <div className="flex-1 max-w-[64px] bg-blue-500/20 border border-blue-500/50 h-3/4 flex flex-col justify-end p-2 text-center text-xs text-blue-300 rounded-t">
                      Physical<br />Labor
                    </div>
                  </div>
                </div>
                <p className="text-slate-400 text-sm">
                  <strong>The "Hollow Middle":</strong> It is no longer economically viable to train a junior for 2 years when an AI agent can execute tasks for $0.10/unit.
                  <br /><br />
                  The "Apprenticeship Model" of white-collar work is collapsing. Hiring for entry-level cognitive roles is down 13% while demand for "AI Orchestrators" (Seniors who can manage 10+ agents) is at an all-time high.
                </p>
              </div>
            )}

            {activeScenario === 'C' && (
              <div className="space-y-4">
                <div className="text-center text-xs text-slate-500 mb-4 font-mono">
                  VISUALIZATION: COGNITIVE COLLAPSE
                </div>
                <div className="flex items-center mb-6 h-32">
                  {/* Y-Axis Label */}
                  <div className="h-full flex items-center justify-center w-6">
                    <span className="text-[10px] text-slate-500 font-mono -rotate-90 whitespace-nowrap tracking-widest">REL. DEMAND</span>
                  </div>
                  {/* Chart Area */}
                  <div className="flex-1 flex items-end justify-center gap-4 h-full border-l border-b border-slate-700 pl-4 pb-1">
                    <div className="flex-1 max-w-[64px] bg-emerald-500/20 border border-emerald-500/50 h-[25%] flex flex-col justify-end p-2 text-center text-xs text-emerald-300 rounded-t">
                      Senior<br />Archs
                    </div>
                    <div className="flex-1 max-w-[64px] bg-rose-500/10 border-t border-rose-500/30 h-[2px] flex flex-col justify-end p-0 text-center text-xs text-rose-300 mx-2 sm:mx-8 overflow-visible">
                      <span className="-mb-6">Junior</span>
                    </div>
                    <div className="flex-1 max-w-[64px] bg-blue-500/20 border border-blue-500/50 h-full flex flex-col justify-end p-2 text-center text-xs text-blue-300 rounded-t">
                      Physical<br />Labor
                    </div>
                  </div>
                </div>
                <p className="text-slate-400 text-sm">
                  <strong>The "Recursive Loop":</strong> Synthetic data proves to be <i>better</i> than human data. Cognitive labor value trends toward zero as AI solves novel problems better than humans.
                  <br /><br />
                  Demand for Senior Architects drops as AI systems become self-architecting. The only remaining constraints are physical: energy, chips, and robotics.
                </p>
              </div>
            )}
          </div>
        </Section>

        {/* Section 4: Mechanisms & Timeline */}
        <Section title="5. Mechanisms & Timeline" icon={Cpu}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-indigo-400 font-bold mb-3 text-sm uppercase tracking-wider">The New Scaling Laws</h4>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex gap-2">
                  <Zap size={16} className="text-yellow-400 shrink-0 mt-0.5" />
                  <span><strong>Inference Compute:</strong> Pricing has shifted from $/Token to $/Second of Thought. Models "think" before speaking.</span>
                </li>
                <li className="flex gap-2">
                  <FileText size={16} className="text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>Synthetic Data:</strong> The Data Wall is permeable. Models verify their own outputs (DeepSeek Math V2 approach).</span>
                </li>
                <li className="flex gap-2">
                  <ScanText size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Hunyuan OCR Effect:</strong> The "Paper Interface" is solved. Agents can read PDFs/Charts perfectly, unlocking enterprise "Dark Matter."</span>
                </li>
              </ul>
            </div>

            <div className="relative border-l border-slate-700 pl-6 space-y-6">
              <div className="relative">
                <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full bg-indigo-500 border-2 border-slate-900"></div>
                <h5 className="text-white font-bold">Late 2025 (Now)</h5>
                <p className="text-xs text-slate-400">The Agentic Era. "Disembodied Intelligence" gets hands.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full bg-slate-700 border-2 border-slate-900"></div>
                <h5 className="text-slate-300 font-bold">2026</h5>
                <p className="text-xs text-slate-500">Synthetic Breakthrough. Long-horizon planning (days, not minutes).</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full bg-slate-700 border-2 border-slate-900"></div>
                <h5 className="text-slate-300 font-bold">2027</h5>
                <p className="text-xs text-slate-500">Early Superintelligence. Novel scientific discovery.</p>
              </div>
            </div>
          </div>
        </Section>

        {/* Section 5: Future Capability Radar (New) */}
        <Section title="6. Future Capability Radar" icon={Target} isOpenDefault={true}>
          <p className="mb-6 text-sm text-slate-400">
            Interactive projection of the six critical bottlenecks preventing full automation.
            Use the timeline to visualize the projected resolution of these capabilities over time.
          </p>
          <RadarChart />
        </Section>

        {/* Footer */}
        <SourcesFooter />
        <footer className="py-8 text-center text-slate-600 text-xs">
          <p className="mb-2">Canvas inside Gemini • November 30, 2025</p>
        </footer>

      </main>
    </div>
  );
};

export default App;
