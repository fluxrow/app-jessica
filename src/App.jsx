import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, Circle, Activity, Calendar, Heart, Trophy, 
  ChevronRight, ChevronLeft, Info, Sparkles, Loader2, X, 
  MessageCircleHeart, ChevronDown, ChevronUp, Image as ImageIcon,
  Droplet, Timer, Share2, Music, Dumbbell, Award
} from 'lucide-react';

// --- BANCO DE IMAGENS ---
const IMGS = {
  legPress: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&q=80&fit=crop",
  extensora: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=200&q=80&fit=crop",
  puxada: "https://images.unsplash.com/photo-1603287681836-b174ce5074c2?w=200&q=80&fit=crop",
  supino: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200&q=80&fit=crop",
  bola: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&q=80&fit=crop",
  prancha: "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=200&q=80&fit=crop",
  flexao: "https://images.unsplash.com/photo-1434596922112-19c563067271?w=200&q=80&fit=crop",
  parede: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=200&q=80&fit=crop",
  triceps: "https://images.unsplash.com/photo-1530822847156-5df684ec5ee1?w=200&q=80&fit=crop",
  biceps: "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=200&q=80&fit=crop",
};

// --- ESTRUTURA DE DADOS ---
const PLANO_TREINO = {
  fase1: {
    nome: "Fase 1: Adaptação Articular",
    semanas: [1, 2, 3, 4],
    cardio: "20 minutos (Passadeira/Bicicleta) ritmo moderado.",
    rotina: [
      { dia: "Segunda-feira", tipo: "Treino Full Body + Cardio" },
      { dia: "Terça-feira", tipo: "Apenas Cardio" },
      { dia: "Quarta-feira", tipo: "Treino Full Body + Cardio" },
      { dia: "Quinta-feira", tipo: "Apenas Cardio" },
      { dia: "Sexta-feira", tipo: "Treino Full Body + Cardio" },
      { dia: "Sábado", tipo: "Apenas Cardio" },
      { dia: "Domingo", tipo: "Descanso Ativo ou Total" },
    ],
    exercicios: [
      { nome: "Leg Press", series: "3", reps: "12-15", desc: "Pés ao centro da plataforma.", img: IMGS.legPress },
      { nome: "Cadeira Extensora", series: "3", reps: "12-15", desc: "Na estação multifunções.", img: IMGS.extensora },
      { nome: "Puxada Frontal", series: "3", reps: "12-15", desc: "Barra grande, puxar até ao peito.", img: IMGS.puxada },
      { nome: "Supino Máquina", series: "3", reps: "12-15", desc: "Empurrar as pegas para a frente.", img: IMGS.supino },
      { nome: "Abdominal na Bola", series: "3", reps: "15", desc: "Costas apoiadas na bola suíça.", img: IMGS.bola },
      { nome: "Prancha Isométrica", series: "3", reps: "20-30s", desc: "Apoiada nos antebraços.", img: IMGS.prancha }
    ]
  },
  fase2: {
    nome: "Fase 2: Consolidação",
    semanas: [5, 6, 7, 8],
    cardio: "30 min diários (5m aquecimento + 20m moderado).",
    rotina: [
      { dia: "Segunda-feira", tipo: "Treino A (Pernas) + Cardio" },
      { dia: "Terça-feira", tipo: "Treino B (Superiores) + Cardio" },
      { dia: "Quarta-feira", tipo: "Apenas Cardio" },
      { dia: "Quinta-feira", tipo: "Treino A (Pernas) + Cardio" },
      { dia: "Sexta-feira", tipo: "Treino B (Superiores) + Cardio" },
      { dia: "Sábado", tipo: "Apenas Cardio" },
      { dia: "Domingo", tipo: "Descanso Ativo ou Total" },
    ],
    exerciciosA: [
      { nome: "Leg Press", series: "3", reps: "10-12", desc: "Pés mais altos para focar nos glúteos.", img: IMGS.legPress },
      { nome: "Cadeira Extensora", series: "3", reps: "10-12", desc: "Movimento controlado.", img: IMGS.extensora },
      { nome: "Flexão de Pernas", series: "3", reps: "10-12", desc: "Em pé ou adaptado na estação.", img: IMGS.flexao },
      { nome: "Agachamento Parede", series: "3", reps: "12", desc: "Com a Bola Suíça.", img: IMGS.parede },
      { nome: "Abdominal na Bola", series: "3", reps: "20", desc: "Maior amplitude.", img: IMGS.bola }
    ],
    exerciciosB: [
      { nome: "Puxada Frontal", series: "3", reps: "10-12", desc: "Focar nas omoplatas.", img: IMGS.puxada },
      { nome: "Supino Máquina", series: "3", reps: "10-12", desc: "Peito para fora.", img: IMGS.supino },
      { nome: "Tríceps na Polia", series: "3", reps: "10-12", desc: "Empurrar para baixo.", img: IMGS.triceps },
      { nome: "Bíceps na Polia", series: "3", reps: "10-12", desc: "Puxar de baixo para cima.", img: IMGS.biceps }
    ]
  },
  fase3: {
    nome: "Fase 3: Intensificação",
    semanas: [9, 10, 11, 12],
    cardio: "40 minutos contínuos em ritmo moderado a forte.",
    rotina: [
      { dia: "Segunda-feira", tipo: "Treino A (Pernas) + Cardio" },
      { dia: "Terça-feira", tipo: "Treino B (Superiores) + Cardio" },
      { dia: "Quarta-feira", tipo: "Apenas Cardio" },
      { dia: "Quinta-feira", tipo: "Treino A (Pernas) + Cardio" },
      { dia: "Sexta-feira", tipo: "Treino B (Superiores) + Cardio" },
      { dia: "Sábado", tipo: "Apenas Cardio" },
      { dia: "Domingo", tipo: "Descanso Ativo ou Total" },
    ],
    exerciciosA: [
      { nome: "Leg Press", series: "4", reps: "8-10", desc: "Aumentar a carga. Pés altos.", img: IMGS.legPress },
      { nome: "Cadeira Extensora", series: "4", reps: "8-10", desc: "Pausa 1s no topo.", img: IMGS.extensora },
      { nome: "Flexão de Pernas", series: "4", reps: "8-10", desc: "Controlar a descida.", img: IMGS.flexao },
      { nome: "Agachamento Parede", series: "4", reps: "15", desc: "Com Bola Suíça.", img: IMGS.parede },
      { nome: "Abdominal na Bola", series: "4", reps: "20", desc: "Com peso (opcional).", img: IMGS.bola }
    ],
    exerciciosB: [
      { nome: "Puxada Frontal", series: "4", reps: "8-10", desc: "Aumentar a carga.", img: IMGS.puxada },
      { nome: "Supino Máquina", series: "4", reps: "8-10", desc: "Aumentar a carga.", img: IMGS.supino },
      { nome: "Tríceps na Polia", series: "4", reps: "8-10", desc: "Aumentar a carga.", img: IMGS.triceps },
      { nome: "Bíceps na Polia", series: "4", reps: "8-10", desc: "Aumentar a carga.", img: IMGS.biceps }
    ]
  }
};

const MEDALHAS_INFO = {
  primeiro_passo: { id: 'primeiro_passo', icone: '🏃♀️', titulo: "Primeiro Passo", desc: "Marcaste o teu primeiro exercício!" },
  hidratada: { id: 'hidratada', icone: '🌊', titulo: "Rainha da Água", desc: "Bebeste os 8 copos num dia!" },
  semana_perfeita: { id: 'semana_perfeita', icone: '🔥', titulo: "Semana On Fire", desc: "Completaste tudo numa semana!" },
  focada: { id: 'focada', icone: '🏋️♀️', titulo: "Sempre a Subir", desc: "Registaste a carga em 5 exercícios." }
};

// --- INTEGRAÇÃO GEMINI API ---
const apiKey = ""; 

const fetchWithRetry = async (url, options, retries = 5) => {
  const delays = [1000, 2000, 4000, 8000, 16000];
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return await res.json();
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise(resolve => setTimeout(resolve, delays[i]));
    }
  }
};

const callGeminiLLM = async (prompt) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: "És um personal trainer amigável e especialista. Responde sempre de forma encorajadora e concisa (tópicos curtos). Usa português europeu." }] }
  };
  try {
    const data = await fetchWithRetry(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Desculpa, não consegui ligar-me. Mas continua firme!";
  } catch (error) {
    return "A minha ligação falhou. Mas lembra-te: a postura é o mais importante! Força!";
  }
};

const generateExerciseImage = async (exerciseName) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${apiKey}`;
  const prompt = `Desenho minimalista de um boneco palito (stick figure) fazendo o exercício de academia '${exerciseName}'. Fundo branco, ilustração em vetor flat 2D, traços simples e pretos, demonstrando o movimento.`;
  const payload = { contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseModalities: ["IMAGE"] } };
  const data = await fetchWithRetry(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  const inlineData = data.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData;
  if (inlineData) return `data:${inlineData.mimeType};base64,${inlineData.data}`;
  throw new Error("Imagem não retornada");
};

// Gestor de Imagens Cache
const globalImageCache = {};
const ExerciseImage = ({ exerciseName, isFeito }) => {
  const [imgSrc, setImgSrc] = useState(globalImageCache[exerciseName] || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleGenerate = async (e) => {
    e.stopPropagation();
    setLoading(true); setError(false);
    try {
      const base64Img = await generateExerciseImage(exerciseName);
      globalImageCache[exerciseName] = base64Img;
      setImgSrc(base64Img);
    } catch (err) { setError(true); } 
    finally { setLoading(false); }
  };

  if (imgSrc) return <img src={imgSrc} alt={exerciseName} className={`w-full h-full object-cover transition-opacity duration-300 ${isFeito ? 'opacity-40 grayscale' : 'opacity-100'}`} />;
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 p-1 relative">
      {loading ? <Loader2 size={16} className="animate-spin text-purple-500" /> : (
        <button onClick={handleGenerate} className={`w-full h-full rounded flex flex-col items-center justify-center transition-colors active:scale-90 ${error ? 'bg-red-100 text-red-600' : 'bg-purple-100 text-purple-700'}`}>
          {error ? <X size={14} /> : <Sparkles size={14} />}
          <span className="text-[7px] font-bold text-center uppercase mt-0.5">{error ? "Falhou" : "Gerar"}</span>
        </button>
      )}
    </div>
  );
};

// --- COMPONENTE PRINCIPAL ---
export default function App() {
  // Helpers do Local Storage
  const loadState = (key, defaultVal) => {
    try { const saved = localStorage.getItem(key); return saved ? JSON.parse(saved) : defaultVal; } 
    catch { return defaultVal; }
  };
  
  // ESTADOS PERSISTENTES (Local Storage)
  const [semanaAtual, setSemanaAtual] = useState(() => loadState('jessica_semana', 1));
  const [itensConcluidos, setItensConcluidos] = useState(() => loadState('jessica_checks', {})); 
  const [cargasRegistadas, setCargasRegistadas] = useState(() => loadState('jessica_cargas', {}));
  const [aguaDiaria, setAguaDiaria] = useState(() => loadState('jessica_agua', {}));
  const [medalhasDesbloqueadas, setMedalhasDesbloqueadas] = useState(() => loadState('jessica_medalhas', []));

  // ESTADOS VOLÁTEIS (Sessão)
  const [diasExpandidos, setDiasExpandidos] = useState({});
  const [mensagemMotivacao, setMensagemMotivacao] = useState("");
  const [loadingMotivacao, setLoadingMotivacao] = useState(false);
  const [modalDica, setModalDica] = useState({ ativo: false, exercicio: "", texto: "", loading: false });
  const [modalMedalhas, setModalMedalhas] = useState(false);
  const [showMusicMenu, setShowMusicMenu] = useState(false);
  
  // ESTADOS CRONÓMETRO
  const [tempoDescanso, setTempoDescanso] = useState(0);
  const [timerAtivo, setTimerAtivo] = useState(false);
  const [modalTimerFim, setModalTimerFim] = useState(false);

  // EFEITOS PARA GUARDAR AUTOMATICAMENTE
  useEffect(() => { localStorage.setItem('jessica_semana', JSON.stringify(semanaAtual)); }, [semanaAtual]);
  useEffect(() => { localStorage.setItem('jessica_checks', JSON.stringify(itensConcluidos)); }, [itensConcluidos]);
  useEffect(() => { localStorage.setItem('jessica_cargas', JSON.stringify(cargasRegistadas)); }, [cargasRegistadas]);
  useEffect(() => { localStorage.setItem('jessica_agua', JSON.stringify(aguaDiaria)); }, [aguaDiaria]);
  useEffect(() => { localStorage.setItem('jessica_medalhas', JSON.stringify(medalhasDesbloqueadas)); }, [medalhasDesbloqueadas]);

  // EFEITO DO CRONÓMETRO
  useEffect(() => {
    let intervalo;
    if (timerAtivo && tempoDescanso > 0) {
      intervalo = setInterval(() => setTempoDescanso((prev) => prev - 1), 1000);
    } else if (timerAtivo && tempoDescanso === 0) {
      setTimerAtivo(false);
      setModalTimerFim(true);
    }
    return () => clearInterval(intervalo);
  }, [timerAtivo, tempoDescanso]);

  // EFEITO DE GAMIFICAÇÃO (Desbloquear Medalhas)
  useEffect(() => {
    const checkMedalhas = () => {
      let novas = [...medalhasDesbloqueadas];
      
      // 1. Primeiro Passo (Algum exercício feito)
      if (!novas.includes('primeiro_passo') && Object.keys(itensConcluidos).length > 0) {
        novas.push('primeiro_passo');
      }
      
      // 2. Rainha da Água (Qualquer dia com 8 copos)
      if (!novas.includes('hidratada') && Object.values(aguaDiaria).some(copos => copos >= 8)) {
        novas.push('hidratada');
      }

      // 3. Focada na Carga (Mais de 5 cargas registadas)
      if (!novas.includes('focada') && Object.keys(cargasRegistadas).length >= 5) {
        novas.push('focada');
      }

      if (novas.length > medalhasDesbloqueadas.length) {
        setMedalhasDesbloqueadas(novas);
      }
    };
    checkMedalhas();
  }, [itensConcluidos, aguaDiaria, cargasRegistadas, medalhasDesbloqueadas]);

  // FUNÇÕES AUXILIARES
  const getFaseAtual = (semana = semanaAtual) => {
    if (semana <= 4) return PLANO_TREINO.fase1;
    if (semana <= 8) return PLANO_TREINO.fase2;
    return PLANO_TREINO.fase3;
  };

  const faseAtual = getFaseAtual();

  const getExerciciosDoDia = (fase, tipo) => {
    if (tipo.includes("Full Body")) return fase.exercicios || [];
    if (tipo.includes("Treino A")) return fase.exerciciosA || [];
    if (tipo.includes("Treino B")) return fase.exerciciosB || [];
    return [];
  };

  const mudarSemana = (direcao) => {
    let nova = semanaAtual + direcao;
    if (nova < 1) nova = 1;
    if (nova > 12) nova = 12;
    setSemanaAtual(nova);
    setDiasExpandidos({});
  };

  const toggleItem = (diaIndex, tipoItem, exIndex = 0) => {
    const key = `${semanaAtual}-${diaIndex}-${tipoItem}-${exIndex}`;
    setItensConcluidos(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const registarCarga = (nomeExercicio, valor) => {
    setCargasRegistadas(prev => ({ ...prev, [nomeExercicio]: valor }));
  };

  const beberAgua = (diaKey) => {
    setAguaDiaria(prev => {
      const atual = prev[diaKey] || 0;
      return { ...prev, [diaKey]: atual >= 8 ? 0 : atual + 1 };
    });
  };

  const ativarDescanso = (e) => {
    e.stopPropagation();
    setTempoDescanso(60);
    setTimerAtivo(true);
  };

  const partilharTreino = (diaInfo, dIdx) => {
    const progDia = calcularProgressoDia(dIdx, diaInfo);
    const agua = aguaDiaria[`${semanaAtual}-${dIdx}`] || 0;
    const msg = `O meu treino da Semana ${semanaAtual} (${diaInfo.dia}) está ${progDia}% concluído! 💪 Já bebi ${agua} copos de água. Foco total! 🔥`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const calcularProgressoDia = (diaIndex, dia) => {
    const exercicios = getExerciciosDoDia(faseAtual, dia.tipo);
    let total = 0; let feitos = 0;
    if (dia.tipo.includes("Cardio")) {
      total++; if (itensConcluidos[`${semanaAtual}-${diaIndex}-cardio-0`]) feitos++;
    }
    exercicios.forEach((_, idx) => {
      total++; if (itensConcluidos[`${semanaAtual}-${diaIndex}-ex-${idx}`]) feitos++;
    });
    if (dia.tipo.includes("Descanso")) {
      total++; if (itensConcluidos[`${semanaAtual}-${diaIndex}-descanso-0`]) feitos++;
    }
    return total === 0 ? 0 : Math.round((feitos / total) * 100);
  };

  const calcularProgressoGeral = () => {
    let total = 0; let feitos = 0;
    for (let s = 1; s <= 12; s++) {
      const fase = getFaseAtual(s);
      fase.rotina.forEach((dia, dIdx) => {
        if (dia.tipo.includes("Cardio")) { total++; if (itensConcluidos[`${s}-${dIdx}-cardio-0`]) feitos++; }
        const exercicios = getExerciciosDoDia(fase, dia.tipo);
        exercicios.forEach((_, eIdx) => { total++; if (itensConcluidos[`${s}-${dIdx}-ex-${eIdx}`]) feitos++; });
      });
    }
    return total === 0 ? 0 : Math.round((feitos / total) * 100);
  };

  // --- Funções IA ---
  const gerarMotivacao = async () => {
    setLoadingMotivacao(true);
    const resposta = await callGeminiLLM(`A Jessica está na Semana ${semanaAtual}. Completou ${calcularProgressoGeral()}% das 12 semanas. Gera uma frase (máx 15 palavras) muito motivadora para o treino de hoje! Usa emojis.`);
    setMensagemMotivacao(resposta);
    setLoadingMotivacao(false);
  };

  const pedirDicasExercicio = async (nomeExercicio, e) => {
    e.stopPropagation();
    setModalDica({ ativo: true, exercicio: nomeExercicio, texto: "", loading: true });
    const resposta = await callGeminiLLM(`A Jessica vai fazer o exercício '${nomeExercicio}'. Dá 3 dicas muito curtas (bullets) sobre postura e foco muscular.`);
    setModalDica({ ativo: true, exercicio: nomeExercicio, texto: resposta, loading: false });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-24 relative overflow-x-hidden">
      
      {/* CABEÇALHO */}
      <header className="bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-600 text-white p-6 shadow-lg rounded-b-[2rem] relative overflow-hidden">
        {/* Efeito de brilho de fundo */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

        <div className="flex items-center justify-between mb-4 relative z-10">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight drop-shadow-sm">Treino da Jess</h1>
            <p className="text-white/90 text-sm mt-1 flex items-center gap-1 font-medium">
              <Activity size={16} /> Evolução Contínua
            </p>
          </div>
          
          <div className="flex gap-2">
            {/* Botão Música */}
            <button 
              onClick={() => setShowMusicMenu(true)}
              className="bg-white/20 hover:bg-white/30 p-3 rounded-full backdrop-blur-sm transition-colors shadow-inner"
              title="Playlist de Treino"
            >
              <Music size={22} className="text-white" />
            </button>

            {/* Botão Gamificação (Medalhas) */}
            <button 
              onClick={() => setModalMedalhas(true)}
              className="bg-white/20 hover:bg-white/30 p-3 rounded-full backdrop-blur-sm transition-colors shadow-inner relative"
            >
              <Award size={22} className="text-yellow-300" />
              {medalhasDesbloqueadas.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-sm">
                  {medalhasDesbloqueadas.length}
                </span>
              )}
            </button>
          </div>
        </div>
        
        {/* Barra de Progresso Geral */}
        <div className="mt-6 relative z-10">
          <div className="flex justify-between text-sm mb-1.5 font-semibold text-white/95">
            <span>A tua Jornada (12 Semanas)</span>
            <span>{calcularProgressoGeral()}%</span>
          </div>
          <div className="w-full bg-black/20 rounded-full h-3 overflow-hidden shadow-inner p-0.5">
            <div 
              className="bg-gradient-to-r from-yellow-300 to-emerald-400 h-full rounded-full transition-all duration-1000 ease-out relative" 
              style={{ width: `${calcularProgressoGeral()}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 mt-6 max-w-md mx-auto">
        
        {/* IA: CARTÃO DE MOTIVAÇÃO */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-purple-100 relative overflow-hidden mb-6">
          <div className="flex items-start gap-3 relative z-10">
            <div className="bg-purple-100 p-2.5 rounded-2xl shrink-0">
              <MessageCircleHeart size={24} className="text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-800">Treinador Virtual</h3>
              {mensagemMotivacao ? (
                <p className="text-sm text-slate-600 mt-2 italic leading-relaxed animate-in fade-in">
                  "{mensagemMotivacao}"
                </p>
              ) : (
                <p className="text-xs text-slate-400 mt-1">Pronta para esmagar o treino de hoje?</p>
              )}
              <button 
                onClick={gerarMotivacao} disabled={loadingMotivacao}
                className="mt-3 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-md hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-70"
              >
                {loadingMotivacao ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} className="text-yellow-400"/>} 
                {mensagemMotivacao ? "Quero outra frase" : "Dar-me Motivação!"}
              </button>
            </div>
          </div>
        </div>

        {/* NAVEGAÇÃO DE SEMANAS */}
        <div className="flex items-center justify-between bg-white p-4 rounded-3xl shadow-sm mb-6 border border-slate-100">
          <button 
            onClick={() => mudarSemana(-1)} disabled={semanaAtual === 1}
            className={`p-2.5 rounded-full transition-colors ${semanaAtual === 1 ? 'text-slate-300' : 'text-slate-700 bg-slate-100 hover:bg-slate-200'}`}
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="text-center">
            <h2 className="text-xl font-bold text-slate-800 flex items-center justify-center gap-2">
              <Calendar size={20} className="text-indigo-500" />
              Semana {semanaAtual} <span className="text-sm font-medium text-slate-400">/ 12</span>
            </h2>
            <p className="text-xs font-bold text-indigo-700 mt-1 bg-indigo-50 py-1 px-3 rounded-full inline-block">
              {faseAtual.nome}
            </p>
          </div>

          <button 
            onClick={() => mudarSemana(1)} disabled={semanaAtual === 12}
            className={`p-2.5 rounded-full transition-colors ${semanaAtual === 12 ? 'text-slate-300' : 'text-slate-700 bg-slate-100 hover:bg-slate-200'}`}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* LISTA DE DIAS */}
        <div className="space-y-4">
          {faseAtual.rotina.map((dia, dIdx) => {
            const isExpandido = diasExpandidos[dIdx];
            const progressoDia = calcularProgressoDia(dIdx, dia);
            const exerciciosDoDia = getExerciciosDoDia(faseAtual, dia.tipo);
            const isDescanso = dia.tipo.includes("Descanso");
            const diaKey = `${semanaAtual}-${dIdx}`;
            const coposAgua = aguaDiaria[diaKey] || 0;
            
            return (
              <div key={dIdx} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                
                {/* CABEÇALHO DO DIA */}
                <div 
                  onClick={() => setDiasExpandidos(prev => ({...prev, [dIdx]: !prev[dIdx]}))}
                  className={`p-5 flex items-center justify-between cursor-pointer transition-colors hover:bg-slate-50
                    ${progressoDia === 100 ? 'bg-emerald-50/30' : ''}`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className={`text-lg font-bold ${progressoDia === 100 ? 'text-emerald-600' : 'text-slate-800'}`}>
                        {dia.dia}
                      </h4>
                      {progressoDia === 100 && <CheckCircle2 size={20} className="text-emerald-500" />}
                    </div>
                    
                    <p className={`text-sm mt-0.5 ${isDescanso ? 'text-slate-400' : 'text-indigo-600 font-semibold'}`}>
                      {dia.tipo}
                    </p>

                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex-1 bg-slate-100 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${progressoDia === 100 ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                          style={{ width: `${progressoDia}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-slate-500 font-bold">{progressoDia}%</span>
                    </div>
                  </div>
                  
                  <div className="ml-5 bg-slate-50 p-2 rounded-full text-slate-400">
                    {isExpandido ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>

                {/* CONTEÚDO DO DIA */}
                {isExpandido && (
                  <div className="border-t border-slate-100 bg-slate-50/50 p-5 animate-in fade-in slide-in-from-top-2 duration-200">
                    
                    {/* ÁGUA TRACKER */}
                    <div className="bg-white p-4 rounded-2xl border border-sky-100 shadow-sm mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="text-xs font-bold text-sky-700 uppercase flex items-center gap-1">
                          <Droplet size={14} /> Hidratação (2L)
                        </h5>
                        <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md">{coposAgua}/8</span>
                      </div>
                      <div className="flex justify-between gap-1">
                        {[...Array(8)].map((_, i) => (
                          <button 
                            key={i} onClick={(e) => { e.stopPropagation(); beberAgua(diaKey); }}
                            className="p-1 focus:outline-none transition-transform active:scale-75 hover:scale-110"
                          >
                            <Droplet size={24} fill={i < coposAgua ? "#0ea5e9" : "transparent"} className={i < coposAgua ? "text-sky-500" : "text-slate-200"} />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* CARDIO */}
                    {dia.tipo.includes("Cardio") && (
                      <div 
                        onClick={() => toggleItem(dIdx, 'cardio')}
                        className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-rose-100 cursor-pointer mb-4 active:scale-[0.98] transition-transform shadow-sm"
                      >
                        <button className="shrink-0 focus:outline-none">
                          {itensConcluidos[`${semanaAtual}-${dIdx}-cardio-0`] ? <CheckCircle2 size={28} className="text-emerald-500" /> : <Circle size={28} className="text-rose-300" />}
                        </button>
                        <div>
                          <h5 className="text-sm font-bold text-rose-700 flex items-center gap-1">
                            <Heart size={16} fill="currentColor" /> Meta de Cardio
                          </h5>
                          <p className="text-xs text-slate-600 mt-1 leading-snug">{faseAtual.cardio}</p>
                        </div>
                      </div>
                    )}

                    {/* EXERCÍCIOS */}
                    {exerciciosDoDia.length > 0 && (
                      <div className="space-y-4 mt-2">
                        <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1 mb-1">Exercícios do Treino</h5>
                        
                        {exerciciosDoDia.map((ex, eIdx) => {
                          const isFeito = itensConcluidos[`${semanaAtual}-${dIdx}-ex-${eIdx}`];
                          const cargaAtual = cargasRegistadas[ex.nome] || '';
                          
                          return (
                            <div 
                              key={eIdx} 
                              className={`flex flex-col p-4 bg-white rounded-2xl border transition-all shadow-sm
                                ${isFeito ? 'border-emerald-200 bg-emerald-50/10' : 'border-slate-200'}`}
                            >
                              {/* Top row: Check, Image, Info */}
                              <div className="flex gap-3 cursor-pointer" onClick={() => toggleItem(dIdx, 'ex', eIdx)}>
                                <div className="flex items-center shrink-0 pt-1">
                                  {isFeito ? <CheckCircle2 size={26} className="text-emerald-500" /> : <Circle size={26} className="text-slate-300" />}
                                </div>

                                <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                                  <ExerciseImage exerciseName={ex.nome} isFeito={isFeito} />
                                </div>

                                <div className="flex-1 min-w-0">
                                  <div className="flex justify-between items-start gap-2">
                                    <h4 className={`font-bold text-[15px] truncate ${isFeito ? 'text-slate-400 line-through decoration-slate-300' : 'text-slate-800'}`}>
                                      {ex.nome}
                                    </h4>
                                    <button 
                                      onClick={(e) => pedirDicasExercicio(ex.nome, e)}
                                      className="bg-purple-100 text-purple-700 p-1.5 rounded-lg active:scale-90"
                                    >
                                      <Sparkles size={16} />
                                    </button>
                                  </div>
                                  
                                  <div className="mt-1">
                                    <span className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-md font-bold uppercase">
                                      {ex.series} x {ex.reps}
                                    </span>
                                  </div>
                                  <p className="text-slate-500 text-[11px] mt-1.5 leading-tight line-clamp-1">{ex.desc}</p>
                                </div>
                              </div>

                              {/* Bottom row: Carga Input & Timer Botão */}
                              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                                
                                {/* Input Carga */}
                                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 w-1/2">
                                  <Dumbbell size={14} className="text-slate-400" />
                                  <input 
                                    type="number" 
                                    placeholder="Carga..." 
                                    value={cargaAtual}
                                    onChange={(e) => registarCarga(ex.nome, e.target.value)}
                                    className="bg-transparent text-sm font-bold text-slate-700 w-full focus:outline-none placeholder:font-normal"
                                  />
                                  <span className="text-xs text-slate-400 font-bold">kg</span>
                                </div>

                                {/* Botão Descanso */}
                                <button 
                                  onClick={ativarDescanso}
                                  className="flex items-center justify-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 px-3 py-2 rounded-xl text-xs font-bold flex-1 transition-colors active:scale-95 border border-indigo-100"
                                >
                                  <Timer size={14} /> Descanso
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* BOTÃO DE PARTILHAR (Final do Dia) */}
                    <div className="mt-6">
                      <button 
                        onClick={() => partilharTreino(dia, dIdx)}
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-2xl flex justify-center items-center gap-2 shadow-md shadow-emerald-200 transition-colors active:scale-95"
                      >
                        <Share2 size={18} /> Partilhar com o Namorado!
                      </button>
                    </div>

                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* --- SOBREPOSIÇÕES (MODAIS E ALERTAS) --- */}

      {/* CRONÓMETRO FLUTUANTE ATIVO */}
      {timerAtivo && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-6 py-4 rounded-full shadow-2xl z-50 flex items-center gap-4 border border-slate-700 animate-in slide-in-from-bottom-10">
          <Timer size={24} className={tempoDescanso < 10 ? "text-rose-500 animate-pulse" : "text-sky-400"} />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Descanso</span>
            <span className={`text-xl font-mono font-bold leading-none ${tempoDescanso < 10 ? "text-rose-500" : ""}`}>
              00:{tempoDescanso.toString().padStart(2, '0')}
            </span>
          </div>
          <button onClick={() => setTimerAtivo(false)} className="ml-2 bg-slate-800 p-2 rounded-full hover:bg-rose-500 transition-colors">
            <X size={16} />
          </button>
        </div>
      )}

      {/* MODAL: FIM DO DESCANSO */}
      {modalTimerFim && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xs shadow-2xl p-6 text-center animate-in zoom-in-90">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Timer size={32} className="text-rose-500 animate-bounce" />
            </div>
            <h3 className="font-extrabold text-xl text-slate-800 mb-2">Acabou o Descanso!</h3>
            <p className="text-slate-600 text-sm mb-6">Pega no peso, está na hora de voltar ao trabalho.</p>
            <button onClick={() => setModalTimerFim(false)} className="w-full bg-rose-500 text-white font-bold py-3 rounded-xl shadow-md active:scale-95">
              Bora lá! 💪
            </button>
          </div>
        </div>
      )}

      {/* MODAL: MEDALHAS (Gamificação) */}
      {modalMedalhas && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="bg-slate-900 p-5 text-white flex justify-between items-center">
              <h3 className="font-bold text-lg flex items-center gap-2"><Award size={20} className="text-yellow-400"/> As tuas Conquistas</h3>
              <button onClick={() => setModalMedalhas(false)} className="bg-white/10 p-1.5 rounded-full"><X size={20} /></button>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              {Object.values(MEDALHAS_INFO).map((m) => {
                const desbloqueada = medalhasDesbloqueadas.includes(m.id);
                return (
                  <div key={m.id} className={`flex flex-col items-center text-center p-4 rounded-2xl border-2 transition-all ${desbloqueada ? 'border-yellow-300 bg-yellow-50/50 shadow-sm' : 'border-slate-100 bg-slate-50 grayscale opacity-60'}`}>
                    <span className="text-3xl mb-2">{m.icone}</span>
                    <h4 className="font-bold text-xs text-slate-800 leading-tight">{m.titulo}</h4>
                    {desbloqueada && <p className="text-[9px] text-slate-500 mt-1">{m.desc}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MODAL IA: DICAS */}
      {modalDica.ativo && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-5 text-white flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-1 rounded-md mb-2 inline-block">Treinador IA</span>
                <h3 className="font-bold text-lg leading-tight">{modalDica.exercicio}</h3>
              </div>
              <button onClick={() => setModalDica({ ativo: false, exercicio: "", texto: "", loading: false })} className="bg-white/20 p-1.5 rounded-full"><X size={20} /></button>
            </div>
            <div className="p-6 min-h-[150px] flex flex-col justify-center">
              {modalDica.loading ? (
                <div className="flex flex-col items-center gap-3 text-slate-400 py-6"><Loader2 size={32} className="animate-spin text-purple-500" /><p className="text-sm font-medium">A analisar o movimento...</p></div>
              ) : (
                <div className="prose prose-sm prose-slate max-w-none prose-li:marker:text-purple-500" dangerouslySetInnerHTML={{ __html: modalDica.texto.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }} />
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL MÚSICA */}
      {showMusicMenu && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 sm:zoom-in-95">
            <div className="bg-slate-900 p-5 text-white flex justify-between items-center">
              <h3 className="font-bold text-lg flex items-center gap-2"><Music size={20} className="text-rose-400"/> Escolhe o Player</h3>
              <button onClick={() => setShowMusicMenu(false)} className="bg-white/10 p-1.5 rounded-full"><X size={20} /></button>
            </div>
            <div className="p-4 flex flex-col gap-3">
              <a
                href="https://open.spotify.com/playlist/37i9dQZF1DX70RN3TfR076"
                target="_blank" rel="noreferrer"
                onClick={() => setShowMusicMenu(false)}
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#1DB954] hover:bg-green-50 transition-all active:scale-95"
              >
                <div className="w-10 h-10 bg-[#1DB954] rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.02zm1.44-3.3c-.301.42-.84.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15.001 10.62 18.66 12.9c.42.18.6.78.3 1.14zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.42-1.02.599-1.56.3z"/></svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Spotify</h4>
                  <p className="text-xs text-slate-500">Workout Mix</p>
                </div>
              </a>
              
              <a
                href="https://music.apple.com/br/curator/apple-music-fitness/1442223548"
                target="_blank" rel="noreferrer"
                onClick={() => setShowMusicMenu(false)}
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#FA243C] hover:bg-rose-50 transition-all active:scale-95"
              >
                <div className="w-10 h-10 bg-[#FA243C] rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white ml-0.5 mb-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.12 14.15c-.93 0-1.78-.32-2.48-.87-.71.55-1.56.87-2.48.87-2.28 0-4.14-1.85-4.14-4.13 0-2.27 1.86-4.13 4.14-4.13 1 0 1.93.38 2.62 1.01.69-.63 1.61-1.01 2.61-1.01 2.27 0 4.13 1.86 4.13 4.13 0 2.28-1.86 4.13-4.13 4.13zm.01-7.22c-1.64 0-2.98 1.34-2.98 2.98s1.34 2.98 2.98 2.98 2.98-1.34 2.98-2.98-1.34-2.98-2.98-2.98zm-5.26 0c-1.64 0-2.98 1.34-2.98 2.98s1.34 2.98 2.98 2.98 2.98-1.34 2.98-2.98-1.34-2.98-2.98-2.98zm2.63-4.22c-1.12 0-2.04.91-2.04 2.03s.92 2.03 2.04 2.03 2.03-.91 2.03-2.03-.91-2.03-2.03-2.03z"/></svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Apple Music</h4>
                  <p className="text-xs text-slate-500">Fitness & Workout</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
