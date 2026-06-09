import React, { useState, useMemo } from 'react';

// Complete Course Catalog dataset grouped by track
const COURSE_TRACKS = [
  {
    track: "Artificial Intelligence & Data Science Track",
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
    track: "Enterprise Backend Development Track",
    courses: [
      { id: 'java-spring', name: 'Java Spring Boot', defaultHours: 48, defaultPrice: 85 }
    ]
  },
  {
    track: "Cloud & DevOps Track",
    courses: [
      { id: 'devops-eng', name: 'DevOps Engineering', defaultHours: 60, defaultPrice: 120 }
    ]
  },
  {
    track: "Multimedia & Digital Media Track",
    courses: [
      { id: 'graphic-design', name: 'Graphic Design', defaultHours: 60, defaultPrice: 100 },
      { id: 'video-production', name: 'Video Production & Editing', defaultHours: 60, defaultPrice: 100 },
      { id: 'motion-graphics', name: 'Motion Graphics & Animation', defaultHours: 60, defaultPrice: 100 }
    ]
  },
  {
    track: "Cybersecurity Track",
    courses: [
      { id: 'cyber-fundamentals', name: 'Cybersecurity Fundamentals', defaultHours: 45, defaultPrice: 75 },
      { id: 'ethical-hacking', name: 'Ethical Hacking and Penetration Testing', defaultHours: 60, defaultPrice: 120 },
      { id: 'network-security', name: 'Network Security', defaultHours: 45, defaultPrice: 120 },
      { id: 'soc-fundamentals', name: 'Security Operations Center (SOC) Fundamentals', defaultHours: 45, defaultPrice: 120 }
    ]
  },
  {
    track: "IT Support & Digital Skills Track",
    courses: [
      { id: 'computer-repair', name: 'Computer Repair and Maintenance', defaultHours: 50, defaultPrice: 80 },
      { id: 'ms-office', name: 'Microsoft Office', defaultHours: 45, defaultPrice: 75 }
    ]
  },
  {
    track: "Custom Layout",
    courses: [
      { id: 'custom', name: 'Custom Course (Manual Setup)', defaultHours: 0, defaultPrice: 0 }
    ]
  }
];

const ALL_COURSES = COURSE_TRACKS.flatMap(t => t.courses);

export default function CourseCalculator() {
  const [selectedCourseId, setSelectedCourseId] = useState(ALL_COURSES[0].id);
  const [price, setPrice] = useState(ALL_COURSES[0].defaultPrice);
  const [hours, setHours] = useState(ALL_COURSES[0].defaultHours);
  const [students, setStudents] = useState(10);
  const [schoolCutPercent, setSchoolCutPercent] = useState(60);
  const [mgmtFeePercent, setMgmtFeePercent] = useState(20);

  // New states for Dynamic Teacher Rules
  const [studentThreshold, setStudentThreshold] = useState(10);
  const [highRate, setHighRate] = useState(8); // Rate for >= threshold
  const [lowRate, setLowRate] = useState(5);   // Rate for < threshold

  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    setSelectedCourseId(courseId);
    
    const targetCourse = ALL_COURSES.find(c => c.id === courseId);
    if (targetCourse) {
      setPrice(targetCourse.defaultPrice);
      setHours(targetCourse.defaultHours);
    }
  };

  const metrics = useMemo(() => {
    // Dynamic rule evaluation based on modified settings
    const isBonusActive = students >= studentThreshold;
    const teacherRate = isBonusActive ? highRate : lowRate;

    const grossRevenue = price * students;
    const schoolShare = grossRevenue * (schoolCutPercent / 100);
    const remainingRevenue = grossRevenue - schoolShare;
    
    const managementFee = remainingRevenue * (mgmtFeePercent / 100);
    const teacherCost = teacherRate * hours;
    const netProfit = remainingRevenue - managementFee - teacherCost;

    let verdictMessage = "🎯 OPTIMIZED: Healthy profit split for your team.";
    let verdictStyle = "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";

    if (netProfit <= 0) {
      verdictMessage = "🚨 LOSS DETECTED: Increase price or lower hours/cuts.";
      verdictStyle = "bg-rose-500/10 text-rose-400 border border-rose-500/20";
    } else if (netProfit > 0 && netProfit < 100) {
      verdictMessage = "⚠️ TIGHT MARGINS: Consider adjusting settings for safety.";
      verdictStyle = "bg-amber-500/10 text-amber-400 border border-amber-500/20";
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
      verdictMessage,
      verdictStyle
    };
  }, [price, hours, students, schoolCutPercent, mgmtFeePercent, studentThreshold, highRate, lowRate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-950 p-4 font-sans selection:bg-indigo-500 selection:text-white">
      <div className="w-full max-w-md bg-slate-900 rounded-3xl shadow-2xl p-6 space-y-6 border border-slate-800 transition-all duration-300 hover:border-slate-700">
        
        {/* Header Title Section */}
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1 text-xs text-indigo-400 font-medium tracking-wide">
            <span>Financial Manager v4.0</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight pt-1">Strategy Planner</h2>
          <p className="text-xs text-slate-400 font-medium">Evaluate pricing and custom teacher rules live.</p>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

        {/* 1. Template Input Selection Menu */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Select Course Template</label>
          <div className="relative">
            <select 
              value={selectedCourseId}
              onChange={handleCourseChange}
              className="w-full p-3 bg-slate-950/60 border border-slate-800 rounded-xl text-sm text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all cursor-pointer appearance-none"
            >
              {COURSE_TRACKS.map(group => (
                <optgroup key={group.track} label={group.track} className="bg-slate-950 text-indigo-400 font-semibold text-xs">
                  {group.courses.map(course => (
                    <option key={course.id} value={course.id} className="bg-slate-900 text-slate-300 font-normal text-sm">
                      {course.name} {course.id !== 'custom' && `($${course.defaultPrice} / ${course.defaultHours}h)`}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        {/* 2. Custom Modifiers Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Adjusted Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-indigo-400">$</span>
              <input 
                type="number" 
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                className="w-full pl-7 pr-3 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-sm font-bold text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder-slate-700"
                placeholder="0"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Adjusted Hours</label>
            <div className="relative">
              <input 
                type="number" 
                value={hours}
                onChange={(e) => setHours(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-sm font-bold text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder-slate-700"
                placeholder="0"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500">hrs</span>
            </div>
          </div>
        </div>

        {/* 3. Students Config */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Student Enrollment</label>
          <input 
            type="number" 
            min="1"
            value={students}
            onChange={(e) => setStudents(parseInt(e.target.value) || 0)}
            className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-sm font-bold text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
          />
        </div>

        {/* 4. Split Matrix Policies */}
        <div className="bg-slate-950/40 border border-slate-800/60 rounded-2xl p-4 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">School Revenue Cut</span>
              <span className="text-sm font-bold text-indigo-400">{schoolCutPercent}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100"
              value={schoolCutPercent}
              onChange={(e) => setSchoolCutPercent(parseInt(e.target.value) || 0)}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Org Management Fee</span>
              <span className="text-sm font-bold text-purple-400">{mgmtFeePercent}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100"
              value={mgmtFeePercent}
              onChange={(e) => setMgmtFeePercent(parseInt(e.target.value) || 0)}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>
          
          <div className="h-px bg-slate-800/60" />

          {/* Fully Dynamic Teacher Policy Panel */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">Dynamic Teacher Policy Setup</span>
            
            <div className="flex items-center space-x-2 text-xs text-slate-300">
              <span>If Students are &ge;</span>
              <input 
                type="number"
                value={studentThreshold}
                onChange={(e) => setStudentThreshold(parseInt(e.target.value) || 0)}
                className="w-14 px-2 py-1 bg-slate-900 border border-slate-800 text-center rounded-md font-bold text-indigo-400 focus:outline-none focus:border-indigo-500"
              />
              <span>pay teacher</span>
              <div className="relative inline-block">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                <input 
                  type="number"
                  value={highRate}
                  onChange={(e) => setHighRate(parseFloat(e.target.value) || 0)}
                  className="w-14 pl-4 pr-1 py-1 bg-slate-900 border border-slate-800 rounded-md font-bold text-indigo-400 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <span>/h</span>
            </div>

            <div className="flex items-center space-x-2 text-xs text-slate-300">
              <span>Else if under {studentThreshold} students, pay teacher</span>
              <div className="relative inline-block">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                <input 
                  type="number"
                  value={lowRate}
                  onChange={(e) => setLowRate(parseFloat(e.target.value) || 0)}
                  className="w-14 pl-4 pr-1 py-1 bg-slate-900 border border-slate-800 rounded-md font-bold text-indigo-400 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <span>/h</span>
            </div>

            {/* Current Status Badge Indicator */}
            <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400 bg-slate-950/60 p-2 rounded-xl border border-slate-800/40">
              <span>Current Applied Rate:</span>
              <span className={`px-2 py-0.5 rounded font-bold ${metrics.isBonusActive ? 'bg-indigo-500/20 text-indigo-400' : 'bg-purple-500/20 text-purple-400'}`}>
                ${metrics.teacherRate}/h ({metrics.isBonusActive ? 'Bonus Level' : 'Base Level'})
              </span>
            </div>
          </div>
        </div>

        {/* 5. Live Summary Display Panel */}
        <div className="bg-slate-950 border border-slate-850 p-4 rounded-2xl space-y-3 text-xs font-medium">
          <div className="flex justify-between text-slate-400">
            <span>Gross Income Pool ({students} × ${price}):</span>
            <span className="text-slate-200 font-semibold">${metrics.grossRevenue.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>School House Cut ({schoolCutPercent}%):</span>
            <span className="text-rose-400/90">-${metrics.schoolShare.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-400 border-b border-slate-800/80 pb-2">
            <span>Your Managed Share ({100 - schoolCutPercent}%):</span>
            <span className="text-slate-200 font-bold">${metrics.remainingRevenue.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-400 pt-1">
            <span>Management Fee ({mgmtFeePercent}% of Org Share):</span>
            <span className="text-purple-400">-${metrics.managementFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Teacher Invoice Allocation ({hours}h × ${metrics.teacherRate}/h):</span>
            <span className="text-rose-400/90">-${metrics.teacherCost.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between pt-3 border-t border-dashed border-slate-800 items-center">
            <span className="text-sm font-bold text-white tracking-tight">Organization Net Takeaway:</span>
            <span className={`text-xl font-black tracking-tight ${metrics.netProfit >= 0 ? 'text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.2)]' : 'text-rose-400 drop-shadow-[0_0_12px_rgba(251,113,133,0.2)]'}`}>
              {metrics.netProfit < 0 ? '-' : ''}${Math.abs(metrics.netProfit).toFixed(2)}
            </span>
          </div>

          <div className="pt-2 text-center">
            <span className={`inline-block px-4 py-1.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 ${metrics.verdictStyle}`}>
              {metrics.verdictMessage}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}