import React, { useState, useMemo } from 'react';

// Complete System Dataset
const COURSE_CATALOG = [
  {
    track: "Artificial Intelligence & Data Science",
    courses: [
      { id: 'python-prog', name: 'Python Programming', defaultHours: 40, defaultPrice: 70 },
      { id: 'data-analysis', name: 'Data Analysis with Python', defaultHours: 60, defaultPrice: 120 },
      { id: 'machine-learning', name: 'Machine Learning with Python', defaultHours: 45, defaultPrice: 150 },
      { id: 'deep-learning', name: 'Deep Learning with Python', defaultHours: 45, defaultPrice: 180 },
      { id: 'mlops', name: 'MLOps: Machine Learning Operations', defaultHours: 45, defaultPrice: 220 }
    ]
  },
  {
    track: "Software Development Track",
    courses: [
      { id: 'fullstack-web', name: 'Full-Stack Web Development', defaultHours: 60, defaultPrice: 100 },
      { id: 'ui-ux', name: 'UI/UX Design with Figma', defaultHours: 45, defaultPrice: 75 }
    ]
  },
  {
    track: "Enterprise Backend Development",
    courses: [
      { id: 'java-spring', name: 'Java Spring Boot', defaultHours: 48, defaultPrice: 85 }
    ]
  },
  {
    track: "Cloud & DevOps Architecture",
    courses: [
      { id: 'devops-eng', name: 'DevOps Engineering', defaultHours: 60, defaultPrice: 120 }
    ]
  },
  {
    track: "Multimedia & Content Creation",
    courses: [
      { id: 'graphic-design', name: 'Graphic Design', defaultHours: 60, defaultPrice: 100 },
      { id: 'video-production', name: 'Video Production & Editing', defaultHours: 60, defaultPrice: 100 },
      { id: 'motion-graphics', name: 'Motion Graphics & Animation', defaultHours: 60, defaultPrice: 100 }
    ]
  },
  {
    track: "Cybersecurity Operations",
    courses: [
      { id: 'cyber-fundamentals', name: 'Cybersecurity Fundamentals', defaultHours: 45, defaultPrice: 75 },
      { id: 'ethical-hacking', name: 'Ethical Hacking & Penetration Testing', defaultHours: 60, defaultPrice: 120 },
      { id: 'network-security', name: 'Network Security', defaultHours: 45, defaultPrice: 120 },
      { id: 'soc-fundamentals', name: 'SOC Fundamentals', defaultHours: 45, defaultPrice: 120 }
    ]
  },
  {
    track: "IT Infrastructure & Digital Skills",
    courses: [
      { id: 'computer-repair', name: 'Computer Repair & Maintenance', defaultHours: 50, defaultPrice: 80 },
      { id: 'ms-office', name: 'Microsoft Office Systems', defaultHours: 45, defaultPrice: 75 }
    ]
  }
];

const FLATTENED_COURSES = COURSE_CATALOG.flatMap(t => t.courses);

export default function SaaSMetricsDashboard() {
  // App Core States
  const [activeTab, setActiveTab] = useState('planner');
  const [selectedCourseId, setSelectedCourseId] = useState(FLATTENED_COURSES[0].id);
  const [price, setPrice] = useState(FLATTENED_COURSES[0].defaultPrice);
  const [hours, setHours] = useState(FLATTENED_COURSES[0].defaultHours);
  const [students, setStudents] = useState(10); // Matches your screenshot target setup
  
  // Shared Configuration Ratios
  const [schoolCutPercent, setSchoolCutPercent] = useState(60);
  const [mgmtFeePercent, setMgmtFeePercent] = useState(10);

  // Stateful Multi-Tier Thinking Engine Control Rules
  const [tier1Min, setTier1Min] = useState(15);
  const [tier1Rate, setTier1Rate] = useState(8.0);

  const [tier2Min, setTier2Min] = useState(10);
  const [tier2Rate, setTier2Rate] = useState(6.0);

  const [tier3Min, setTier3Min] = useState(5);
  const [tier3Rate, setTier3Rate] = useState(5.4);

  const [fallbackRate, setFallbackRate] = useState(4.0);

  const handleCourseSelect = (courseId) => {
    setSelectedCourseId(courseId);
    const course = FLATTENED_COURSES.find(c => c.id === courseId);
    if (course) {
      setPrice(course.defaultPrice);
      setHours(course.defaultHours);
    }
  };

  // Thinking Engine & Financial Calculation Layer
  const metrics = useMemo(() => {
    // 1. Calculate Core Pool Allocations
    const grossRevenue = price * students;
    const schoolShare = grossRevenue * (schoolCutPercent / 100);
    const remainingRevenue = grossRevenue - schoolShare;
    const managementFee = remainingRevenue * (mgmtFeePercent / 100);
    
    // Total allocation boundary space remaining for teacher compensation
    const maxAvailableTeacherBudget = remainingRevenue - managementFee;
    
    // Mathematically deduce absolute ceiling threshold
    const absoluteBreakEvenRate = hours > 0 ? maxAvailableTeacherBudget / hours : 0;

    // 2. Multi-Tier Operational Routing Matches
    let targetRate = fallbackRate;
    let appliedTierName = `BELOW BASE (<${tier3Min} STD)`;

    if (students >= tier1Min) {
      targetRate = tier1Rate;
      appliedTierName = `TIER 1 (≥${tier1Min} STD)`;
    } else if (students >= tier2Min) {
      targetRate = tier2Rate;
      appliedTierName = `TIER 2 (${tier2Min}-${tier1Min - 1} STD)`;
    } else if (students >= tier3Min) {
      targetRate = tier3Rate;
      appliedTierName = `TIER 3 (${tier3Min}-${tier2Min - 1} STD)`;
    }

    // 3. Automated Guardrail Protection Execution
    let teacherRate = targetRate;
    let guardrailActivated = false;

    if (targetRate * hours > maxAvailableTeacherBudget) {
      // Safely round down precision to float boundary to safeguard against negative micro-margins
      teacherRate = Math.max(0, Math.floor(absoluteBreakEvenRate * 100) / 100);
      guardrailActivated = true;
    }

    const teacherCost = teacherRate * hours;
    const netProfit = remainingRevenue - managementFee - teacherCost;
    const margin = grossRevenue > 0 ? (netProfit / grossRevenue) * 100 : 0;

    let alertLevel = "success";
    let statusText = "Optimized Strategy Run";
    if (guardrailActivated) {
      alertLevel = "critical";
      statusText = "Guardrail Overwrite Active";
    } else if (netProfit < 100) {
      alertLevel = "warning";
      statusText = "Low Margin Variance";
    }

    return {
      targetRate,
      teacherRate,
      appliedTierName,
      guardrailActivated,
      absoluteBreakEvenRate,
      grossRevenue,
      schoolShare,
      remainingRevenue,
      managementFee,
      teacherCost,
      netProfit,
      margin,
      alertLevel,
      statusText
    };
  }, [price, hours, students, schoolCutPercent, mgmtFeePercent, tier1Min, tier1Rate, tier2Min, tier2Rate, tier3Min, tier3Rate, fallbackRate]);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 font-sans flex overflow-hidden antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* SIDE NAVIGATION PANEL */}
      <aside className="w-64 bg-[#0d1321] border-r border-slate-800/80 flex flex-col justify-between shrink-0 hidden md:flex">
        <div className="p-6 space-y-7">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
            </div>
            <div>
              <h1 className="text-sm font-black tracking-wider text-white uppercase">EduSaaS</h1>
              <span className="text-[10px] text-indigo-400 font-bold block tracking-tight">AI Safeguard Active</span>
            </div>
          </div>

          <nav className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 block pl-3 mb-2">Workspace Rooms</span>
            <button 
              onClick={() => setActiveTab('planner')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'planner' ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/10' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z"/></svg>
              <span>Strategy Modeling</span>
            </button>
            <button 
              onClick={() => setActiveTab('catalog')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'catalog' ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/10' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
              <span>Global Curriculum</span>
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800/60 bg-[#0b101c]">
          <div className="flex items-center space-x-3 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800/40">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <div className="truncate">
              <p className="text-xs font-bold text-slate-300 truncate">Anti-Loss Guardrail</p>
              <span className="text-[10px] text-emerald-400 block font-medium">Secured Status</span>
            </div>
          </div>
        </div>
      </aside>

      {/* SYSTEM WORKSPACE BODY WRAPPER */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        
        {/* INTERACTIVE HEAD BAR HEADER */}
        <header className="h-16 border-b border-slate-800/60 bg-[#0d1321]/60 backdrop-blur-md px-6 md:px-8 flex items-center justify-between shrink-0 sticky top-0 z-40">
          <div className="flex items-center space-x-4">
            <span className="text-xs font-bold text-slate-400">Environment: <b className="text-indigo-400 font-semibold">Production Engine</b></span>
            <div className="h-4 w-px bg-slate-800" />
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide border uppercase ${metrics.alertLevel === 'success' ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/10' : metrics.alertLevel === 'warning' ? 'bg-amber-500/5 text-amber-400 border-amber-500/10' : 'bg-rose-500/5 text-rose-400 border-rose-500/10'}`}>
              <span className={`h-1.5 w-1.5 rounded-full mr-1.5 ${metrics.alertLevel === 'success' ? 'bg-emerald-400' : metrics.alertLevel === 'warning' ? 'bg-amber-400' : 'bg-rose-400'}`} />
              {metrics.statusText}
            </span>
          </div>
        </header>

        {/* WORKSPACE CORE VIEW AREA */}
        <div className="flex-1 p-6 md:p-8 space-y-6 max-w-6xl w-full mx-auto">
          
          {/* SAAS TOP LINE METRICS KPI CARDS */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#0d1321] border border-slate-800 rounded-2xl p-4 space-y-2 relative overflow-hidden">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Gross Financial Pool</span>
              <span className="text-2xl font-black tracking-tight text-white">${metrics.grossRevenue.toFixed(2)}</span>
              <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden"><div className="bg-indigo-500 h-full w-3/4" /></div>
            </div>

            <div className="bg-[#0d1321] border border-slate-800 rounded-2xl p-4 space-y-2 relative overflow-hidden">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Applied Teacher Rate</span>
              <div className="flex items-baseline space-x-1">
                <span className={`text-2xl font-black ${metrics.guardrailActivated ? 'text-amber-400 line-through text-lg opacity-50' : 'text-purple-400'}`}>
                  ${metrics.targetRate.toFixed(2)}/h
                </span>
                {metrics.guardrailActivated && (
                  <span className="text-2xl font-black text-emerald-400 pl-1">${metrics.teacherRate.toFixed(2)}/h</span>
                )}
              </div>
              <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden"><div className="bg-purple-500 h-full w-1/2" /></div>
            </div>

            <div className="bg-[#0d1321] border border-slate-800 rounded-2xl p-4 space-y-2 relative overflow-hidden">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Safe Payout Ceiling</span>
              <span className="text-2xl font-black tracking-tight text-slate-300">${metrics.absoluteBreakEvenRate.toFixed(2)}/h</span>
              <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden"><div className="bg-slate-700 h-full w-full" /></div>
            </div>

            <div className="bg-[#0d1321] border border-slate-800 rounded-2xl p-4 space-y-2 relative overflow-hidden">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Net Strategy Capital</span>
              <span className={`text-2xl font-black tracking-tight ${metrics.netProfit >= 0 ? 'text-emerald-400' : 'text-rose-500'}`}>
                ${metrics.netProfit.toFixed(2)}
              </span>
              <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden"><div className={`h-full ${metrics.netProfit >= 0 ? 'bg-emerald-500' : 'bg-rose-500'} w-4/5`} /></div>
            </div>
          </section>

          {/* MAIN DOCK TWO COLUMN GRID PANEL EXECUTION */}
          {activeTab === 'planner' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* LEFT CONFIG PLATFORM (7 COLUMNS) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-[#0d1321] border border-slate-800 rounded-2xl p-5 md:p-6 space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                    <h3 className="text-sm font-bold tracking-wide text-white uppercase">Course Configuration Parameters</h3>
                    <span className="text-[10px] bg-slate-950 px-2 py-0.5 rounded text-indigo-400 border border-slate-800 font-bold uppercase tracking-wider">Live Controls</span>
                  </div>

                  {/* Course Presets Dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Active Curriculum Template</label>
                    <select 
                      value={selectedCourseId}
                      onChange={(e) => handleCourseSelect(e.target.value)}
                      className="w-full p-3 bg-[#090d16] border border-slate-800 rounded-xl text-xs text-slate-200 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/40 cursor-pointer appearance-none"
                    >
                      {COURSE_CATALOG.map(group => (
                        <optgroup key={group.track} label={group.track} className="bg-[#090d16] text-indigo-400 font-bold text-[11px]">
                          {group.courses.map(course => (
                            <option key={course.id} value={course.id} className="bg-[#0d1321] text-slate-300 font-medium text-xs">
                              {course.name} ({course.defaultHours}h @ ${course.defaultPrice})
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>

                  {/* Pricing Matrix Layout Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Adjusted Strategy Price</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-indigo-400">$</span>
                        <input 
                          type="number" 
                          value={price}
                          onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                          className="w-full pl-7 pr-3 py-2.5 bg-[#090d16] border border-slate-800 rounded-xl text-xs font-bold text-indigo-400 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Adjusted Course Hours</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          value={hours}
                          onChange={(e) => setHours(parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2.5 bg-[#090d16] border border-slate-800 rounded-xl text-xs font-bold text-indigo-400 focus:outline-none"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-slate-500">hrs</span>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Enrollment Slider Selector */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Target Student Enrollment</label>
                      <span className="text-xs bg-indigo-600/20 text-indigo-400 font-bold px-2.5 py-0.5 rounded-md border border-indigo-500/20">{students} Active Users</span>
                    </div>
                    <input 
                      type="range" min="1" max="40" value={students}
                      onChange={(e) => setStudents(parseInt(e.target.value) || 1)}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                  </div>

                  {/* Financial Infrastructure Control Sliders */}
                  <div className="bg-[#090d16] border border-slate-800/80 rounded-xl p-4 space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">School Revenue Commission</span>
                        <span className="text-xs font-black text-indigo-400">{schoolCutPercent}%</span>
                      </div>
                      <input 
                        type="range" min="0" max="100" value={schoolCutPercent}
                        onChange={(e) => setSchoolCutPercent(parseInt(e.target.value) || 0)}
                        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Internal Management Reserves</span>
                        <span className="text-xs font-black text-purple-400">{mgmtFeePercent}%</span>
                      </div>
                      <input 
                        type="range" min="0" max="100" value={mgmtFeePercent}
                        onChange={(e) => setMgmtFeePercent(parseInt(e.target.value) || 0)}
                        className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT LEDGER DISPLAY SUMMARY (5 COLUMNS) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* ADVANCED SMART RULE CONFIGURATION CORE INTERFACE */}
                <div className="bg-[#0d1321] border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
                  <div className="border-b border-slate-800/80 pb-2">
                    <span className="text-[11px] font-bold text-violet-400 uppercase tracking-widest block">Thinking Engine Multi-Tier Rules</span>
                  </div>
                  
                  <div className="space-y-3.5 text-xs">
                    {/* Tier 1 Matrix Configuration Row */}
                    <div className="flex items-center justify-between bg-[#090d16] p-2.5 border border-slate-800 rounded-xl">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-slate-400">If Students &ge;</span>
                        <input 
                          type="number" value={tier1Min} onChange={(e) => setTier1Min(parseInt(e.target.value) || 0)}
                          className="w-10 py-0.5 bg-slate-900 text-center rounded border border-slate-700 text-white font-bold"
                        />
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-slate-500">Pay</span>
                        <input 
                          type="number" step="0.1" value={tier1Rate} onChange={(e) => setTier1Rate(parseFloat(e.target.value) || 0)}
                          className="w-14 py-0.5 text-center bg-slate-900 border border-slate-700 text-indigo-400 font-bold"
                        />
                        <span className="text-slate-500">/h</span>
                      </div>
                    </div>

                    {/* Tier 2 Matrix Configuration Row */}
                    <div className="flex items-center justify-between bg-[#090d16] p-2.5 border border-slate-800 rounded-xl">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-slate-400">If Students &ge;</span>
                        <input 
                          type="number" value={tier2Min} onChange={(e) => setTier2Min(parseInt(e.target.value) || 0)}
                          className="w-10 py-0.5 bg-slate-900 text-center rounded border border-slate-700 text-white font-bold"
                        />
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-slate-500">Pay</span>
                        <input 
                          type="number" step="0.1" value={tier2Rate} onChange={(e) => setTier2Rate(parseFloat(e.target.value) || 0)}
                          className="w-14 py-0.5 text-center bg-slate-900 border border-slate-700 text-indigo-400 font-bold"
                        />
                        <span className="text-slate-500">/h</span>
                      </div>
                    </div>

                    {/* Tier 3 Matrix Configuration Row */}
                    <div className="flex items-center justify-between bg-[#090d16] p-2.5 border border-slate-800 rounded-xl">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-slate-400">If Students &ge;</span>
                        <input 
                          type="number" value={tier3Min} onChange={(e) => setTier3Min(parseInt(e.target.value) || 0)}
                          className="w-10 py-0.5 bg-slate-900 text-center rounded border border-slate-700 text-white font-bold"
                        />
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-slate-500">Pay</span>
                        <input 
                          type="number" step="0.1" value={tier3Rate} onChange={(e) => setTier3Rate(parseFloat(e.target.value) || 0)}
                          className="w-14 py-0.5 text-center bg-slate-900 border border-slate-700 text-indigo-400 font-bold"
                        />
                        <span className="text-slate-500">/h</span>
                      </div>
                    </div>

                    {/* Baseline Minimum Fallback Setup */}
                    <div className="flex items-center justify-between bg-[#090d16] p-2.5 border border-slate-800/40 rounded-xl opacity-80">
                      <span className="text-slate-500 italic">Else Floor Baseline Rate:</span>
                      <div className="flex items-center space-x-1">
                        <input 
                          type="number" step="0.1" value={fallbackRate} onChange={(e) => setFallbackRate(parseFloat(e.target.value) || 0)}
                          className="w-14 py-0.5 text-center bg-slate-900 border border-slate-700 text-slate-400 font-bold"
                        />
                        <span className="text-slate-500">/h</span>
                      </div>
                    </div>
                  </div>

                  {/* Active Matching Logic State Output */}
                  <div className="bg-[#090d16] border border-slate-800 p-3 rounded-xl flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-medium">Matched Scenario Link:</span>
                    <span className="text-violet-400 font-black tracking-wide uppercase bg-violet-500/10 border border-violet-500/20 px-2.5 py-0.5 rounded">
                      {metrics.appliedTierName}
                    </span>
                  </div>
                </div>

                {/* Financial Output Statement Ledger */}
                <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl space-y-4 text-xs font-medium relative shadow-xl">
                  <div>
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block">Live Operational Invoice Ledger</span>
                  </div>
                  
                  <div className="space-y-2.5 text-slate-400">
                    <div className="flex justify-between">
                      <span>Gross Receipts Allocation ({students} std × ${price}):</span>
                      <span className="text-slate-200 font-bold">${metrics.grossRevenue.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>External School Share Cut ({schoolCutPercent}%):</span>
                      <span className="text-rose-400/90 font-bold">-${metrics.schoolShare.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800/80 pb-2.5">
                      <span>Managed Gross Margin Base ({100 - schoolCutPercent}%):</span>
                      <span className="text-indigo-400 font-bold">${metrics.remainingRevenue.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span>Management Retainer ({mgmtFeePercent}% of Org Share):</span>
                      <span className="text-purple-400 font-bold">-${metrics.managementFee.toFixed(2)}</span>
                    </div>
                    
                    {/* MODIFIED: Real-time visual synchronization for the guardrail activation discrepancy */}
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span>Instructor Resource Allocation:</span>
                        <span className="text-[10px] text-slate-500 font-bold">
                          ({hours}h × {' '}
                          {metrics.guardrailActivated ? (
                            <>
                              <span className="line-through text-rose-400/70 mr-1">${metrics.targetRate.toFixed(2)}</span>
                              <span className="text-emerald-400 font-extrabold">${metrics.teacherRate.toFixed(2)}</span>
                            </>
                          ) : (
                            <span className="text-slate-400">${metrics.teacherRate.toFixed(2)}</span>
                          )}
                          /h)
                        </span>
                      </div>
                      <span className="text-rose-400/90 font-bold">-${metrics.teacherCost.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-3.5 border-t border-dashed border-slate-800 items-center">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Net Organization Margin:</span>
                    <span className={`text-xl font-black tracking-tight ${metrics.netProfit >= 0 ? 'text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.15)]' : 'text-rose-400 drop-shadow-[0_0_12px_rgba(251,113,133,0.15)]'}`}>
                      ${metrics.netProfit.toFixed(2)}
                    </span>
                  </div>

                  {/* Defensive Guardrail Notification Banner */}
                  <div className="pt-2">
                    {metrics.guardrailActivated ? (
                      <div className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-2.5 rounded-xl text-[11px] font-bold leading-relaxed space-y-1">
                        <p className="uppercase text-[10px] font-black tracking-widest text-amber-500 flex items-center">
                          <svg className="w-3.5 h-3.5 mr-1 animate-pulse" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
                          Financial Guardrail Active
                        </p>
                        <p className="font-medium text-slate-300">
                          The requested tier rate would result in a deficit. Payout auto-tuned down to the absolute maximum safe break-even rate (<b className="text-emerald-400 font-bold">${metrics.teacherRate.toFixed(2)}/h</b>).
                        </p>
                      </div>
                    ) : (
                      <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-2 rounded-xl text-[11px] text-center font-bold uppercase tracking-wide">
                        🎯 Operations Stable: Capital Retained Safely.
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* SECONDARY TRACK CATALOG DATA LIST VIEW */}
          {activeTab === 'catalog' && (
            <div className="bg-[#0d1321] border border-slate-800 rounded-2xl p-6 space-y-6">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">Enterprise Global Tracks</h3>
                <p className="text-xs text-slate-400">Baseline database schema for deployment catalogs.</p>
              </div>
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {COURSE_CATALOG.map((trackGroup) => (
                  <div key={trackGroup.track} className="bg-slate-950/50 border border-slate-800/60 rounded-xl p-4 space-y-2">
                    <h4 className="text-xs font-extrabold text-indigo-400 tracking-wider uppercase">{trackGroup.track}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {trackGroup.courses.map(c => (
                        <div key={c.id} onClick={() => { handleCourseSelect(c.id); setActiveTab('planner'); }} className="bg-[#0d1321]/60 border border-slate-800 p-3 rounded-lg flex justify-between items-center hover:border-slate-600 transition-all cursor-pointer group">
                          <div>
                            <p className="text-xs font-bold text-slate-200 group-hover:text-indigo-400 transition-colors">{c.name}</p>
                            <span className="text-[10px] text-slate-500 font-medium">{c.defaultHours} Baseline Syllabus Hours</span>
                          </div>
                          <span className="text-xs font-black text-slate-300 bg-slate-950 px-2 py-1 rounded border border-slate-800">${c.defaultPrice}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}