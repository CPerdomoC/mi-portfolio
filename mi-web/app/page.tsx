import Image from "next/image";

// ==========================================
// 1. ZONA DE DATOS
// ==========================================

const personalInfo = {
  name: "Christhian Perdomo Casanova",
  role: "Desarrollador Multiplataforma (DAM)",
  bio: "Estudiante de Desarrollo de Aplicaciones Multiplataforma con experiencia internacional y práctica en entornos reales. Me especializo en resolver problemas técnicos y desarrollar soluciones web eficientes.",
  email: "tuemail@gmail.com",
  linkedin: "https://www.linkedin.com/in/christhian-perdomo-casanova-4b979420b/",
  github: "https://github.com/CPerdomoC/"
};

const projects = [
  {
    title: "Mi Portfolio Web",
    description: "Este mismo sitio web. Diseño moderno tipo Bento Grid con animaciones y estructura modular.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    link: "https://github.com/CPerdomoC/mi-portfolio" // Enlace a tu repo
  },
  {
    title: "Gestor de Inventario",
    description: "Aplicación para controlar stock en tiempo real. Creada durante mis prácticas.",
    tags: ["Java", "SQL", "Swing"],
    link: "#"
  },
  {
    title: "Script Automatización",
    description: "Herramienta en Python para organizar archivos automáticamente por extensión.",
    tags: ["Python", "Scripting"],
    link: "#"
  }
];

const techStack = [
  { name: "HTML5", level: "Avanzado", percent: "85%", color: "bg-orange-500" },
  { name: "CSS3", level: "Avanzado", percent: "80%", color: "bg-blue-500" },
  { name: "JavaScript", level: "Intermedio", percent: "60%", color: "bg-yellow-400" },
  { name: "Next.js", level: "Principiante", percent: "30%", color: "bg-white" },
  { name: "Python", level: "Principiante", percent: "30%", color: "bg-blue-400" },
  { name: "Java", level: "Intermedio", percent: "50%", color: "bg-red-500" },
];

const experience = [
  {
    company: "Agrocentro Armería Calatayud",
    role: "Soporte Web y Gestión",
    location: "Zaragoza",
    period: "Prácticas",
    description: "Gestión de e-commerce con PrestaShop, diseño web básico en WordPress y administración de facturación con FactuSOL y TPVSOL."
  },
  {
    company: "Comprint",
    role: "Técnico Informático (Erasmus+)",
    location: "Coimbra, Portugal",
    period: "Marzo 2023 - Mayo 2023",
    description: "Reparación de hardware y soporte técnico en entorno internacional. Uso diario de inglés y portugués para comunicación con clientes y equipo."
  }
];

const education = [
  { title: "C.F.G.S. Desarrollo de Apps Multiplataforma", center: "IES Haría (Lanzarote)", year: "Cursando" },
  { title: "Grado Medio en Informática", center: "IES Leonardo de Chabacier (Zaragoza)", year: "Finalizado" },
];

// ==========================================
// 2. COMPONENTE VISUAL
// ==========================================

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-gray-300 pb-20 overflow-x-hidden selection:bg-emerald-500/30">
      
      {/* --- LUCES DE FONDO (LAS "LUCECITAS") --- */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Luz Verde Arriba Derecha */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[120px] opacity-50 animate-pulse" />
        {/* Luz Azul Abajo Izquierda */}
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* =========================================
              COLUMNA IZQUIERDA (Info Personal + CV)
              Ocupa 7 de 12 columnas
             ========================================= */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* HERO / SOBRE MÍ */}
            <section className="flex flex-col sm:flex-row gap-8 items-center text-center sm:text-left">
              
              {/* FOTO CON EFECTO NEÓN */}
              <div className="group relative shrink-0">
                {/* El brillo que aparece al hacer hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full blur opacity-20 group-hover:opacity-100 transition duration-500"></div>
                
                {/* Contenedor de la imagen */}
                <div className="relative w-40 h-40 rounded-full bg-neutral-900 border-4 border-neutral-900 overflow-hidden flex items-center justify-center">
                  <Image 
                    src="/avatar.png" 
                    fill 
                    alt="Christhian" 
                    className="object-cover" 
                    priority 
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                  Hola, soy <span className="text-emerald-400">{personalInfo.name.split(" ")[0]}</span>
                </h1>
                <p className="text-lg text-gray-400 leading-relaxed">
                  {personalInfo.bio}
                </p>
                <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                  <a href={personalInfo.linkedin} target="_blank" className="bg-[#0077b5] text-white px-5 py-2 rounded-full font-medium hover:scale-105 transition-transform text-sm">LinkedIn</a>
                  <a href={personalInfo.github} target="_blank" className="bg-neutral-800 text-white px-5 py-2 rounded-full border border-neutral-700 hover:border-emerald-500 transition-colors text-sm">GitHub</a>
                </div>
              </div>
            </section>

            {/* STACK TECNOLÓGICO */}
            <section>
              <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-2 inline-block">💻 Stack Tecnológico</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {techStack.map((tech, idx) => (
                  <div key={idx} className="bg-neutral-900/40 p-3 rounded-xl border border-white/5">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white font-medium">{tech.name}</span>
                      <span className="text-emerald-500/80 text-xs">{tech.level}</span>
                    </div>
                    <div className="w-full bg-neutral-800 rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full ${tech.color}`} style={{ width: tech.percent }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* EXPERIENCIA LABORAL */}
            <section>
              <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-2 inline-block">💼 Experiencia</h3>
              <div className="space-y-8">
                {experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-emerald-500/30">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-neutral-950 border-2 border-emerald-500 rounded-full"></div>
                    <h4 className="text-lg font-bold text-white">{exp.role}</h4>
                    <p className="text-emerald-400 text-sm mb-1">{exp.company} | {exp.location}</p>
                    <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest">{exp.period}</p>
                    <p className="text-sm text-gray-400 leading-relaxed bg-white/5 p-3 rounded-lg border border-white/5">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* FORMACIÓN */}
            <section>
              <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-2 inline-block">🎓 Estudios</h3>
              <div className="grid gap-4">
                {education.map((edu, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-neutral-900/30 p-4 rounded-xl border border-white/5">
                    <div>
                      <h4 className="font-bold text-white text-sm">{edu.title}</h4>
                      <p className="text-gray-400 text-xs mt-1">{edu.center}</p>
                    </div>
                    <span className="mt-2 sm:mt-0 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-full border border-emerald-500/20">
                      {edu.year}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* =========================================
              COLUMNA DERECHA (Proyectos / Cristal)
              Ocupa 5 de 12 columnas (y se queda fija al bajar)
             ========================================= */}
          <div className="lg:col-span-5">
            <div className="sticky top-10 space-y-6">
              
              <div className="flex items-center gap-3 mb-4">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <h2 className="text-2xl font-bold text-white">Proyectos Destacados</h2>
              </div>

              {/* TARJETAS CRISTAL (GLASSMORPHISM) */}
              {projects.map((project, index) => (
                <a 
                  key={index}
                  href={project.link}
                  target="_blank"
                  className="group block relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 transition-all duration-300 hover:bg-white/10 hover:border-emerald-500/50 hover:-translate-y-1 shadow-lg hover:shadow-emerald-500/10"
                >
                  {/* Brillo interior al hacer hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-xs bg-black/50 px-2 py-1 rounded text-gray-400 border border-white/10">Code ↗</span>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-5 leading-relaxed">
                      {project.description}
                    </p>

                    {/* ETIQUETAS */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 text-xs font-medium text-emerald-200 bg-emerald-500/20 rounded-full border border-emerald-500/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              ))}

              {/* Tarjeta Extra: GitHub */}
              <a 
                  href={personalInfo.github}
                  target="_blank"
                  className="block text-center p-4 rounded-2xl border border-dashed border-gray-700 text-gray-500 hover:text-white hover:border-emerald-500 transition-colors text-sm"
              >
                Ver más repositorios en GitHub →
              </a>

            </div>
          </div>

        </div>
        
        <footer className="mt-20 border-t border-white/5 pt-8 text-center text-sm text-gray-600">
          <p>© 2026 {personalInfo.name}. Hecho con Next.js y Tailwind.</p>
        </footer>

      </div>
    </main>
  );
}