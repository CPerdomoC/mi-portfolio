"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

// ==========================================
// 1. TIPOS DE DATOS (TypeScript)
// ==========================================

type Task = {
  id: string;
  title: string;
  date: string;
  type: "examen" | "viaje" | "entrega" | "otro";
};

type FileItem = {
  id: string;
  parentId: string | null;
  name: string;
  type: "folder" | "file";
  content: string;
  createdAt: string;
};

// ==========================================
// 2. COMPONENTE PRINCIPAL
// ==========================================

export default function Dashboard() {
  
  // --- ESTADOS GLOBALES ---
  const [time, setTime] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  // --- ESTADOS: RELOJ / POMODORO ---
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(25);

  // --- ESTADOS: CALENDARIO ---
  const [currentDate, setCurrentDate] = useState(new Date());

  // --- ESTADOS: TAREAS (EVENTS) ---
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [newDate, setNewDate] = useState("");

  // --- ESTADOS: GESTOR DE ARCHIVOS ---
  const [fileSystem, setFileSystem] = useState<FileItem[]>([]);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [editingFileId, setEditingFileId] = useState<string | null>(null);
  const [newFileName, setNewFileName] = useState("");

  // ==========================================
  // 3. EFECTOS (Persistencia y Tiempo)
  // ==========================================

  // Reloj Cliente
  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Timer Lógica
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds((p) => p - 1), 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
      alert("⏰ ¡TIEMPO TERMINADO!");
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  // Cargar datos de LocalStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem("studentOS_tasks");
    const savedFiles = localStorage.getItem("studentOS_files");
    
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    
    if (savedFiles) {
      setFileSystem(JSON.parse(savedFiles));
    } else {
      // Datos iniciales si está vacío
      setFileSystem([
        { id: "1", parentId: null, name: "Asignaturas", type: "folder", content: "", createdAt: new Date().toISOString() },
        { id: "2", parentId: "1", name: "D. Interfaces", type: "folder", content: "", createdAt: new Date().toISOString() },
        { id: "3", parentId: "2", name: "Apuntes React", type: "file", content: "React es una librería de JS...", createdAt: new Date().toISOString() },
      ]);
    }
  }, []);

  // Guardar datos automáticamente
  useEffect(() => { localStorage.setItem("studentOS_tasks", JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem("studentOS_files", JSON.stringify(fileSystem)); }, [fileSystem]);


  // ==========================================
  // 4. FUNCIONES LÓGICAS
  // ==========================================

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const setCustomTime = () => {
    if (customMinutes <= 0) return;
    setTimerSeconds(customMinutes * 60);
    setIsTimerRunning(false);
  };

  // --- LÓGICA DE TAREAS ---
  const addTask = () => {
    if (!newTask) return;
    setTasks([...tasks, { id: Date.now().toString(), title: newTask, date: newDate, type: "examen" }]);
    setNewTask(""); setNewDate("");
  };

  const deleteTask = (id: string) => setTasks(tasks.filter((t) => t.id !== id));

  // --- LÓGICA DE ARCHIVOS ---
  const createItem = (type: "folder" | "file") => {
    if (!newFileName.trim()) {
      alert("Por favor, escribe un nombre primero.");
      return;
    }
    const newItem: FileItem = {
      id: Date.now().toString(),
      parentId: currentFolderId,
      name: newFileName,
      type,
      content: type === "file" ? "" : "",
      createdAt: new Date().toISOString()
    };
    setFileSystem([...fileSystem, newItem]);
    setNewFileName("");
  };

  const getCurrentFolder = () => fileSystem.find(f => f.id === currentFolderId);
  const currentItems = fileSystem.filter(item => item.parentId === currentFolderId);

  const updateFileContent = (content: string) => {
    setFileSystem(fileSystem.map(item => item.id === editingFileId ? { ...item, content } : item));
  };

  // --- LÓGICA DE CALENDARIO ---
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    let day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + offset));
    setCurrentDate(new Date(newDate));
  };

  // ==========================================
  // 5. RENDERIZADO
  // ==========================================

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-200 font-sans flex flex-col md:flex-row overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-neutral-900 border-r border-white/5 p-6 flex flex-col justify-between md:h-screen shrink-0 z-20">
        <div>
          <div className="flex items-center gap-2 mb-10 text-emerald-400 font-bold text-xl tracking-wider">
             ⚡ StudentOS
          </div>
          <nav className="space-y-2">
            <button onClick={() => setActiveTab("overview")} className={`w-full text-left px-4 py-2 rounded-lg transition ${activeTab === "overview" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "text-gray-400 hover:bg-white/5"}`}>📊 Dashboard</button>
            <button onClick={() => setActiveTab("files")} className={`w-full text-left px-4 py-2 rounded-lg transition ${activeTab === "files" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "text-gray-400 hover:bg-white/5"}`}>📁 Documentos</button>
            <button onClick={() => setActiveTab("calendar")} className={`w-full text-left px-4 py-2 rounded-lg transition ${activeTab === "calendar" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "text-gray-400 hover:bg-white/5"}`}>📅 Calendario</button>
          </nav>
        </div>
        
        <div className="mt-8 md:mt-0">
          <Link href="/" className="flex items-center gap-2 text-xs text-gray-500 hover:text-white transition group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Volver al Portfolio
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {/* HEADER */}
        <header className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-neutral-950/50 backdrop-blur-sm z-10">
          <div>
            <h1 className="text-2xl font-bold text-white capitalize">
              {activeTab === "overview" ? "Panel General" : activeTab === "files" ? "Gestor de Archivos" : "Calendario Académico"}
            </h1>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-xl font-mono text-emerald-400 font-bold">
              {time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "--:--"}
            </p>
          </div>
        </header>

        {/* CONTENIDO SCROLLABLE */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
          
          {/* ================= VISTA 1: DASHBOARD ================= */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              
              {/* RELOJ / TIMER */}
              <div className="bg-neutral-900/50 border border-white/5 p-6 rounded-2xl shadow-lg shadow-emerald-500/5 flex flex-col items-center justify-center relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500"></div>
                 <h3 className="text-gray-400 text-sm font-bold tracking-widest mb-4 uppercase">Temporizador</h3>
                 <div className="text-6xl font-mono font-bold text-white mb-6 tabular-nums tracking-tighter">
                   {formatTime(timerSeconds)}
                 </div>
                 <div className="flex gap-3 mb-6">
                   <button onClick={() => setIsTimerRunning(!isTimerRunning)} className={`px-6 py-2 rounded-full font-bold transition ${isTimerRunning ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" : "bg-emerald-500 text-black hover:bg-emerald-400"}`}>
                     {isTimerRunning ? "PAUSAR" : "INICIAR"}
                   </button>
                   <button onClick={() => {setIsTimerRunning(false); setTimerSeconds(customMinutes * 60);}} className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-sm">Reset</button>
                 </div>
                 <div className="w-full pt-4 border-t border-white/10 flex items-center justify-center gap-2">
                    <input 
                      type="number" min="1" value={customMinutes}
                      onChange={(e) => setCustomMinutes(Number(e.target.value))}
                      className="w-16 bg-neutral-800 border border-white/10 rounded px-2 py-1 text-center text-sm focus:border-emerald-500 outline-none"
                    />
                    <span className="text-xs text-gray-500">min</span>
                    <button onClick={setCustomTime} className="ml-2 bg-neutral-800 hover:text-emerald-400 border border-white/10 px-3 py-1 rounded text-xs transition">Fijar</button>
                 </div>
              </div>

              {/* TAREAS / EVENTOS */}
              <div className="bg-neutral-900/50 border border-white/5 p-6 rounded-2xl lg:col-span-2 flex flex-col">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">📌 Próximos Eventos <span className="text-xs text-gray-500 bg-white/5 px-2 rounded-full">{tasks.length}</span></h3>
                <div className="flex gap-2 mb-4 flex-col sm:flex-row">
                  <input type="text" placeholder="Ej: Examen Interfaces, Viaje Lisboa..." className="flex-1 bg-neutral-800 border-none rounded-lg px-4 py-2 text-sm text-white focus:ring-1 focus:ring-emerald-500" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
                  <input type="date" className="bg-neutral-800 border-none rounded-lg px-4 py-2 text-sm text-gray-400" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
                  <button onClick={addTask} className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg">+</button>
                </div>
                <div className="flex-1 overflow-y-auto space-y-2 max-h-48 custom-scrollbar">
                  {tasks.length === 0 ? <p className="text-gray-600 text-sm italic p-2">No hay eventos pendientes.</p> : tasks.map(t => (
                    <div key={t.id} className="flex justify-between items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition group">
                       <div>
                         <span className="text-sm font-medium text-gray-200">{t.title}</span>
                         {t.date && <span className="ml-2 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">{t.date}</span>}
                       </div>
                       <button onClick={() => deleteTask(t.id)} className="text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition">✕</button>
                    </div>
                  ))}
                </div>
              </div>

              {/* ACCESOS DIRECTOS */}
              <div onClick={() => setActiveTab("files")} className="bg-gradient-to-br from-neutral-800 to-neutral-900 p-6 rounded-2xl border border-white/5 hover:border-emerald-500/50 cursor-pointer transition group">
                 <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition">📂</div>
                 <h3 className="font-bold text-white text-lg">Documentos</h3>
                 <p className="text-gray-400 text-sm mt-1">Apuntes y archivos.</p>
              </div>
              
              <div onClick={() => setActiveTab("calendar")} className="bg-gradient-to-br from-neutral-800 to-neutral-900 p-6 rounded-2xl border border-white/5 hover:border-emerald-500/50 cursor-pointer transition group">
                 <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition">📅</div>
                 <h3 className="font-bold text-white text-lg">Calendario</h3>
                 <p className="text-gray-400 text-sm mt-1">Planifica tus exámenes.</p>
              </div>

            </div>
          )}

          {/* ================= VISTA 2: GESTOR DE ARCHIVOS ================= */}
          {activeTab === "files" && (
            <div className="max-w-6xl mx-auto h-full flex flex-col">
              {/* NAV BAR */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-400 mb-6 bg-neutral-900 p-3 rounded-lg border border-white/5">
                <div className="flex items-center gap-2">
                  <button onClick={() => setCurrentFolderId(null)} className="hover:text-white hover:underline transition">Inicio</button>
                  {currentFolderId && <span className="text-gray-600">/</span>}
                  {getCurrentFolder() && <span className="text-emerald-400 font-medium">{getCurrentFolder()?.name}</span>}
                </div>
                
                <div className="sm:ml-auto flex gap-2 w-full sm:w-auto">
                  <input 
                    type="text" 
                    placeholder="Nombre del archivo..." 
                    className="flex-1 sm:w-48 bg-neutral-800 border-none rounded px-3 py-1 text-xs text-white focus:ring-1 focus:ring-emerald-500"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && createItem("folder")}
                  />
                  <button onClick={() => createItem("folder")} className="bg-neutral-800 hover:bg-neutral-700 text-white px-3 py-1 rounded text-xs border border-white/10 whitespace-nowrap">
                    + 📁 Carpeta
                  </button>
                  <button onClick={() => createItem("file")} className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded text-xs whitespace-nowrap">
                    + 📝 Doc
                  </button>
                </div>
              </div>

              {/* GRID */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {currentFolderId && (
                   <div onClick={() => {
                     const parent = fileSystem.find(f => f.id === currentFolderId)?.parentId;
                     setCurrentFolderId(parent || null);
                   }} className="bg-neutral-900/30 border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition border-dashed border-gray-700 min-h-[120px]">
                      <span className="text-2xl text-gray-500 mb-2">↩️</span>
                      <span className="text-xs text-gray-500">Atrás</span>
                   </div>
                )}
                
                {currentItems.map(item => (
                  <div 
                    key={item.id} 
                    onClick={() => item.type === "folder" ? setCurrentFolderId(item.id) : setEditingFileId(item.id)}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      if(confirm(`¿Eliminar ${item.name}?`)) {
                        setFileSystem(fileSystem.filter(f => f.id !== item.id && f.parentId !== item.id));
                      }
                    }}
                    className="bg-neutral-900 border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-neutral-800 hover:border-emerald-500/30 hover:-translate-y-1 transition group relative min-h-[120px]"
                  >
                     <div className="text-4xl mb-3 drop-shadow-lg">{item.type === "folder" ? "📁" : "📄"}</div>
                     <span className="text-sm font-medium text-gray-300 text-center truncate w-full px-2 group-hover:text-white">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= VISTA 3: CALENDARIO (NUEVO) ================= */}
          {activeTab === "calendar" && (
             <div className="max-w-4xl mx-auto bg-neutral-900/50 border border-white/5 p-6 rounded-2xl shadow-lg">
                
                {/* CABECERA CALENDARIO */}
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-white capitalize">
                    {months[currentDate.getMonth()]} <span className="text-emerald-400">{currentDate.getFullYear()}</span>
                  </h2>
                  <div className="flex gap-2">
                    <button onClick={() => changeMonth(-1)} className="p-2 bg-neutral-800 rounded-lg hover:bg-neutral-700 text-white">←</button>
                    <button onClick={() => setCurrentDate(new Date())} className="px-4 py-2 bg-neutral-800 rounded-lg hover:bg-neutral-700 text-sm">Hoy</button>
                    <button onClick={() => changeMonth(1)} className="p-2 bg-neutral-800 rounded-lg hover:bg-neutral-700 text-white">→</button>
                  </div>
                </div>

                {/* GRID DÍAS SEMANA */}
                <div className="grid grid-cols-7 gap-4 mb-4 text-center">
                  {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map(day => (
                    <div key={day} className="text-sm font-bold text-gray-500 uppercase">{day}</div>
                  ))}
                </div>

                {/* GRID DÍAS DEL MES */}
                <div className="grid grid-cols-7 gap-4">
                  {/* Espacios vacíos antes del primer día */}
                  {Array.from({ length: getFirstDayOfMonth(currentDate) }).map((_, i) => (
                    <div key={`empty-${i}`} className="h-24 rounded-xl bg-transparent"></div>
                  ))}

                  {/* Días reales */}
                  {Array.from({ length: getDaysInMonth(currentDate) }).map((_, i) => {
                    const day = i + 1;
                    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                    const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
                    const dayTasks = tasks.filter(t => t.date === dateStr);

                    return (
                      <div key={day} className={`h-24 rounded-xl border p-2 flex flex-col justify-between transition hover:bg-neutral-800 relative ${isToday ? "bg-emerald-500/10 border-emerald-500" : "bg-white/5 border-white/5"}`}>
                         <span className={`text-sm font-bold ${isToday ? "text-emerald-400" : "text-gray-400"}`}>{day}</span>
                         
                         {/* Puntitos de eventos */}
                         <div className="flex flex-wrap gap-1 mt-1">
                           {dayTasks.map((t, idx) => (
                             <div key={idx} className="w-full text-[10px] bg-emerald-500 text-black px-1 rounded truncate" title={t.title}>
                               {t.title}
                             </div>
                           ))}
                         </div>
                      </div>
                    );
                  })}
                </div>
             </div>
          )}

        </div>

        {/* ================= MODAL EDITOR DE TEXTO ================= */}
        {editingFileId && (
          <div className="absolute inset-0 z-50 bg-neutral-950 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
             <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-neutral-900">
                <h2 className="font-bold text-white flex items-center gap-2">
                   📝 {fileSystem.find(f => f.id === editingFileId)?.name}
                </h2>
                <button onClick={() => setEditingFileId(null)} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition">
                  Guardar y Cerrar
                </button>
             </div>
             <div className="flex-1 p-0 bg-neutral-950">
               <textarea 
                  className="w-full h-full bg-neutral-900/50 text-gray-200 p-8 resize-none focus:outline-none font-mono leading-relaxed"
                  value={fileSystem.find(f => f.id === editingFileId)?.content || ""}
                  onChange={(e) => updateFileContent(e.target.value)}
                  placeholder="Escribe aquí..."
                  autoFocus
               ></textarea>
             </div>
          </div>
        )}

      </main>
    </div>
  );
}