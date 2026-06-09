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
  const [activeTab, setActiveTab] = useState('planner'); // 'planner' | 'catalog' | 'settings'
  const [selectedCourseId, setSelectedCourseId] = useState(FLATTENED_COURSES[0].id);
  const [price, setPrice] = useState(FLATTENED_COURSES[0].defaultPrice);
  const [hours, setHours] = useState(FLATTENED_COURSES[0].defaultHours);
  const [students, setStudents] = useState(12);
  
  // Shared Configuration Ratios
  const [schoolCutPercent, setSchoolCutPercent] = useState(60);
  const [mgmtFeePercent, setMgmtFeePercent] = useState(20);
  const [studentThreshold, setStudentThreshold] = useState(10);
  const [highRate, setHighRate] = useState(8); 
  const [lowRate, setLowRate] = useState(5);

  const handleCourseSelect = (courseId) => {
    setSelectedCourseId(courseId);
    const course = FLATTENED_COURSES.find(c => c.id === courseId);
    if (course) {
      setPrice(course.defaultPrice);
      setHours(course.defaultHours);
    }
  };

  // Live Metric Calculation Engine
  const metrics = useMemo(() => {
    const isBonusActive = students >= studentThreshold;
    const teacherRate = isBonusActive ? highRate : lowRate;

    const grossRevenue = price * students;
    const schoolShare = grossRevenue * (schoolCutPercent / 100);
    const remainingRevenue = grossRevenue - schoolShare;
    
    const managementFee = remainingRevenue * (mgmtFeePercent / 100);
    const teacherCost = teacherRate * hours;
    const netProfit = remainingRevenue - managementFee - teacherCost;
    const margin = grossRevenue > 0 ? (netProfit / grossRevenue) * 100 : 0;

    let alertLevel = "success";
    let statusText = "Optimized Strategy Run";
    if (netProfit <= 0) {
      alertLevel = "critical";
      statusText = "Deficit Detected";
    } else if (netProfit < 150) {
      alertLevel = "warning";
      statusText = "Low Margin Variance";
    }

    return {
      teacherRate,
      isBonusActive,
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
  }, [price, hours, students, schoolCutPercent, mgmtFeePercent, studentThreshold, highRate, lowRate]);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 font-sans flex overflow-hidden antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* SIDE NAVIGATION PANEL */}
      <aside className="w-64 bg-[#0d1321] border-r border-slate-800/80 flex flex-col justify-between shrink-0 hidden md:flex">
        <div className="p-6 space-y-7">
          {/* Brand Platform Identity */}
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"/><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"/></svg>
            </div>
            <div>
              <h1 className="text-sm font-black tracking-wider text-white uppercase">EduSaaS</h1>
              <span className="text-[10px] text-slate-500 font-bold block tracking-tight">Enterprise Core Suite</span>
            </div>
          </div>

          {/* Navigation Links Group */}
          <nav className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 block pl-3 mb-2">Management Workspace</span>
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

        {/* Workspace Quick-Account Status Profile */}
        <div className="p-4 border-t border-slate-800/60 bg-[#0b101c]">
          <div className="flex items-center space-x-3 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800/40">
            <div className="h-7 w-7 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs text-indigo-400 border border-slate-700">P</div>
            <div className="truncate">
              <p className="text-xs font-bold text-slate-300 truncate">Workspace Host</p>
              <span className="text-[10px] text-emerald-400 block font-medium">Instance Active</span>
            </div>
          </div>
        </div>
      </aside>

      {/* SYSTEM WORKSPACE BODY WRAPPER */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        
        {/* INTERACTIVE SaaS TOP HEAD BAR HEADER */}
        <header className="h-16 border-b border-slate-800/60 bg-[#0d1321]/60 backdrop-blur-md px-6 md:px-8 flex items-center justify-between shrink-0 sticky top-0 z-40">
          <div className="flex items-center space-x-4">
            <span className="text-xs font-bold text-slate-400">Environment: <b className="text-indigo-400 font-semibold">Production</b></span>
            <div className="h-4 w-px bg-slate-800" />
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide border uppercase ${metrics.alertLevel === 'success' ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/10' : metrics.alertLevel === 'warning' ? 'bg-amber-500/5 text-amber-400 border-amber-500/10' : 'bg-rose-500/5 text-rose-400 border-rose-500/10'}`}>
              <span className={`h-1.5 w-1.5 rounded-full mr-1.5 ${metrics.alertLevel === 'success' ? 'bg-emerald-400' : metrics.alertLevel === 'warning' ? 'bg-amber-400' : 'bg-rose-400'}`} />
              {metrics.statusText}
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="bg-slate-950 px-3 py-1.5 border border-slate-800 rounded-xl flex items-center space-x-2 text-xs font-bold text-slate-400">
              <span>Operational Mode</span>
            </div>
          </div>
        </header>

        {/* WORKSPACE CORE VIEW AREA */}
        <div className="flex-1 p-6 md:p-8 space-y-6 max-w-6xl w-full mx-auto">
          
          {/* SAAS TOP LINE ANALYTICS METRIC KPIN CARDS VIEW GRID */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#0d1321] border border-slate-800 rounded-2xl p-4 space-y-2 relative overflow-hidden group hover:border-slate-700 transition-all">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Gross Financial Pool</span>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-2xl font-black tracking-tight text-white">${metrics.grossRevenue.toFixed(2)}</span>
              </div>
              <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden"><div className="bg-indigo-500 h-full w-3/4" /></div>
            </div>

            <div className="bg-[#0d1321] border border-slate-800 rounded-2xl p-4 space-y-2 relative overflow-hidden group hover:border-slate-700 transition-all">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">External School Payout</span>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-2xl font-black tracking-tight text-rose-400">${metrics.schoolShare.toFixed(2)}</span>
                <span className="text-[11px] text-slate-500 font-bold">@{schoolCutPercent}%</span>
              </div>
              <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden"><div className="bg-rose-500 h-full w-2/3" /></div>
            </div>

            <div className="bg-[#0d1321] border border-slate-800 rounded-2xl p-4 space-y-2 relative overflow-hidden group hover:border-slate-700 transition-all">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Teacher Resource Cost</span>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-2xl font-black tracking-tight text-purple-400">${metrics.teacherCost.toFixed(2)}</span>
                <span className="text-[11px] text-slate-500 font-bold">@{metrics.teacherRate}/h</span>
              </div>
              <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden"><div className="bg-purple-500 h-full w-1/2" /></div>
            </div>

            <div className="bg-[#0d1321] border border-slate-800 rounded-2xl p-4 space-y-2 relative overflow-hidden group hover:border-slate-700 transition-all">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Net Operating Capital</span>
              <div className="flex items-baseline space-x-1.5">
                <span className={`text-2xl font-black tracking-tight ${metrics.netProfit >= 0 ? 'text-emerald-400' : 'text-rose-500'}`}>
                  {metrics.netProfit < 0 ? '-' : ''}${Math.abs(metrics.netProfit).toFixed(2)}
                </span>
                <span className="text-[10px] text-slate-500 font-bold">({metrics.margin.toFixed(0)}% Margin)</span>
              </div>
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
                          className="w-full pl-7 pr-3 py-2.5 bg-[#090d16] border border-slate-800 rounded-xl text-xs font-bold text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
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
                          className="w-full px-3 py-2.5 bg-[#090d16] border border-slate-800 rounded-xl text-xs font-bold text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-slate-500">hrs</span>
                      </div>
                    </div>
                  </div>

                  {/* Student Matrix Inputs */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Target Student Enrollment</label>
                    <input 
                      type="number" 
                      min="1"
                      value={students}
                      onChange={(e) => setStudents(parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-2.5 bg-[#090d16] border border-slate-800 rounded-xl text-xs font-bold text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
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
                
                {/* Dynamic Instructor Payroll Rules Config */}
                <div className="bg-[#0d1321] border border-slate-800 rounded-2xl p-5 space-y-4">
                  <div className="border-b border-slate-800/80 pb-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Payroll Rules Configuration</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-xs text-slate-300">
                      <span>Enrollment &ge;</span>
                      <input 
                        type="number" value={studentThreshold}
                        onChange={(e) => setStudentThreshold(parseInt(e.target.value) || 0)}
                        className="w-12 px-1.5 py-1 bg-[#090d16] border border-slate-800 text-center rounded-lg text-indigo-400 font-bold focus:outline-none"
                      />
                      <span>Rate:</span>
                      <div className="relative inline-block">
                        <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                        <input 
                          type="number" value={highRate}
                          onChange={(e) => setHighRate(parseFloat(e.target.value) || 0)}
                          className="w-12 pl-3.5 pr-1 py-1 bg-[#090d16] border border-slate-800 rounded-lg text-indigo-400 font-bold focus:outline-none"
                        />
                      </div>
                      <span>/h</span>
                    </div>

                    <div className="flex items-center space-x-2 text-xs text-slate-300">
                      <span>Enrollment &lt; {studentThreshold} Rate:</span>
                      <div className="relative inline-block">
                        <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                        <input 
                          type="number" value={lowRate}
                          onChange={(e) => setLowRate(parseFloat(e.target.value) || 0)}
                          className="w-12 pl-3.5 pr-1 py-1 bg-[#090d16] border border-slate-800 rounded-lg text-indigo-400 font-bold focus:outline-none"
                        />
                      </div>
                      <span>/h</span>
                    </div>
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
                    <div className="flex justify-between">
                      <span>Instructor Resource Allocation ({hours}h × ${metrics.teacherRate}/h):</span>
                      <span className="text-rose-400/90 font-bold">-${metrics.teacherCost.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-3.5 border-t border-dashed border-slate-800 items-center">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Net Organization Margin:</span>
                    <span className={`text-xl font-black tracking-tight ${metrics.netProfit >= 0 ? 'text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.15)]' : 'text-rose-400 drop-shadow-[0_0_12px_rgba(251,113,133,0.15)]'}`}>
                      {metrics.netProfit < 0 ? '-' : ''}${Math.abs(metrics.netProfit).toFixed(2)}
                    </span>
                  </div>

                  <div className="pt-2">
                    <span className={`w-full block text-center px-4 py-2.5 rounded-xl text-[11px] font-bold tracking-wide transition-all border ${metrics.alertLevel === 'success' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : metrics.alertLevel === 'warning' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                      {metrics.alertLevel === 'success' ? '🎯 STRATEGY OPTIMIZED: Healthy operations profile.' : metrics.alertLevel === 'warning' ? '⚠️ MARGIN WARNING: Review rates to buffer reserves.' : '🚨 STRUCTURAL LOSS DETECTED: Tweak operational values.'}
                    </span>
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