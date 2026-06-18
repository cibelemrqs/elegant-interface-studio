import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Area as RArea,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  Chrome,
  ClipboardPaste,
  Command,
  Flame,
  Link2,
  Mic,
  Paperclip,
  Play,
  Plus,
  Target,
  Trophy,
  Upload,
  Youtube,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — EliteStudy" },
      {
        name: "description",
        content:
          "Visão global das suas áreas de estudo, planejamento do dia e consistência.",
      },
    ],
  }),
  component: DashboardGlobalPage,
});

/* ---------- Mock data ---------- */

const userName = "Cibele";
const today = new Date();
const dayName = [
  "domingo",
  "segunda",
  "terça",
  "quarta",
  "quinta",
  "sexta",
  "sábado",
][today.getDay()];
const monthName = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
][today.getMonth()];
const greeting = (() => {
  const h = today.getHours();
  if (h < 6) return "Boa madrugada";
  if (h < 12) return "Bom dia";
  if (h < 19) return "Boa tarde";
  return "Boa noite";
})();

type Status = "read" | "review" | "done";
const STATUS_LABEL: Record<Status, string> = {
  read: "Para ler",
  review: "Revisar",
  done: "Concluído",
};

type Area = {
  code: string;
  name: string;
  kind: string;
  pct: number;
  done: number;
  total: number;
  paceWeek: number;
  paceGoal: number;
  nextLesson: string;
};

const areas: Area[] = [
  {
    code: "CS",
    name: "Concurso SED – ATA II",
    kind: "Concurso público",
    pct: 75,
    done: 24,
    total: 32,
    paceWeek: 6,
    paceGoal: 5,
    nextLesson: "ECA – Estatuto da Criança e do Adolescente",
  },
  {
    code: "EI",
    name: "Especialização em IA",
    kind: "Pós-graduação",
    pct: 0,
    done: 0,
    total: 18,
    paceWeek: 0,
    paceGoal: 3,
    nextLesson: "Introdução a modelos de linguagem",
  },
  {
    code: "UX",
    name: "UX Design",
    kind: "Curso livre",
    pct: 12,
    done: 1,
    total: 8,
    paceWeek: 1,
    paceGoal: 2,
    nextLesson: "Princípios de design centrado no usuário",
  },
  {
    code: "AP",
    name: "AI Product Design",
    kind: "Curso livre",
    pct: 4,
    done: 0,
    total: 12,
    paceWeek: 0,
    paceGoal: 2,
    nextLesson: "O que é um produto de IA?",
  },
];

const globalPct = Math.round(
  areas.reduce((a, b) => a + b.pct, 0) / areas.length,
);
const globalDone = areas.reduce((a, b) => a + b.done, 0);
const globalTotal = areas.reduce((a, b) => a + b.total, 0);

/* Timeline (study sessions) */
type Block = {
  start: number;
  end: number;
  label: string;
  status: Status;
  area: string;
};
const timeline: Block[] = [
  { start: 8, end: 8.75, label: "Revisão ECA", status: "done", area: "CS" },
  { start: 10, end: 11.5, label: "Atos Administrativos", status: "done", area: "CS" },
  { start: 14, end: 15.5, label: "Lei 13.709 — LGPD aplicada", status: "review", area: "CS" },
  { start: 16.5, end: 17.5, label: "Princípios de UX", status: "read", area: "UX" },
  { start: 20, end: 21.5, label: "Modelos de linguagem", status: "read", area: "EI" },
];

/* Today's planned lessons */
type Plan = {
  id: number;
  title: string;
  area: string;
  duration: number;
  status: Status;
  current?: boolean;
};
const todayPlan: Plan[] = [
  { id: 1, title: "Revisão ECA — flashcards", area: "Concurso SED", duration: 25, status: "done" },
  { id: 2, title: "Atos Administrativos — vídeo 4", area: "Concurso SED", duration: 45, status: "done" },
  { id: 3, title: "Lei 13.709 — LGPD aplicada", area: "Concurso SED", duration: 50, status: "review", current: true },
  { id: 4, title: "Princípios de design centrado no usuário", area: "UX Design", duration: 35, status: "read" },
  { id: 5, title: "O que é um produto de IA?", area: "AI Product Design", duration: 30, status: "read" },
];

/* Streak */
const streak = {
  current: 47,
  record: 62,
  startedAt: "12 mai",
  milestones: [7, 30, 100, 365],
};

const trend = [
  { w: "S1", h: 9 },
  { w: "S2", h: 12 },
  { w: "S3", h: 8 },
  { w: "S4", h: 14 },
  { w: "S5", h: 17 },
  { w: "S6", h: 15 },
  { w: "S7", h: 19 },
  { w: "S8", h: 22 },
];
const trendDelta = Math.round(
  ((trend.slice(-4).reduce((a, b) => a + b.h, 0) -
    trend.slice(0, 4).reduce((a, b) => a + b.h, 0)) /
    trend.slice(0, 4).reduce((a, b) => a + b.h, 0)) *
    100,
);

/* ---------- Page ---------- */

function DashboardGlobalPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-[1400px] px-6 lg:px-10 py-8 lg:py-10 space-y-6">
        <DashboardHeader />

        <div className="grid grid-cols-12 gap-5">
          <FocusNow />
          <GlobalProgress />

          <ImportStack />

          <AreasComparative />
          <TodayPlanner />

          <StreakMilestones />
          <TrendCard />
        </div>

        <MotivationalBanner />
      </main>
    </div>
  );
}

/* ---------- Header ---------- */

function DashboardHeader() {
  return (
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 animate-fade-up">
      <div className="min-w-0">
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-mono text-muted-foreground mb-3">
          <Link to="/" className="hover:text-foreground transition-colors">
            Início
          </Link>
          <ChevronRight className="size-3" />
          <span className="text-foreground">Dashboard</span>
        </nav>
        <h1 className="font-serif italic text-4xl lg:text-5xl font-bold tracking-tight text-balance leading-[1.05]">
          {greeting}, {userName}.
        </h1>
        <p className="mt-3 text-sm text-muted-foreground max-w-xl">
          <span className="font-mono uppercase tracking-widest text-[10px] text-accent mr-2">
            {dayName} · {String(today.getDate()).padStart(2, "0")} {monthName}
          </span>
          Você tem <span className="text-foreground font-medium">3 aulas</span>{" "}
          previstas e{" "}
          <span className="text-foreground font-medium">2 revisões</span>{" "}
          atrasadas hoje.
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-full border border-border bg-white/60 backdrop-blur-md text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors">
          <Command className="size-3" /> K
        </button>
        <button className="inline-flex items-center gap-2 px-5 py-3 bg-foreground text-background rounded-full text-sm font-medium shadow-[var(--shadow-elegant)] hover:scale-[1.02] active:scale-[0.99] transition-transform">
          <Plus className="size-4" /> Nova Aula
        </button>
      </div>
    </header>
  );
}

/* ---------- Focus Now ---------- */

function FocusNow() {
  const next = areas.filter((a) => a.pct < 100).sort((a, b) => a.pct - b.pct)[0];

  return (
    <section className="col-span-12 lg:col-span-8 rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/[0.06] via-background to-background p-7 lg:p-9 relative overflow-hidden animate-fade-up">
      <div className="absolute -top-24 -right-24 size-64 rounded-full bg-accent/15 blur-3xl pointer-events-none" />
      <div className="relative">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-mono text-accent mb-4">
          <Target className="size-3" />
          Foco agora
        </div>
        <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-end mb-8">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
              {next.name}
            </p>
            <h2 className="font-serif italic text-3xl lg:text-[40px] leading-[1.05] font-bold text-balance">
              {next.nextLesson}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-md">
              Menor progresso entre suas áreas. Uma sessão curta agora já te
              coloca de volta no ritmo.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 px-5 py-3 bg-foreground text-background rounded-full text-sm font-medium shadow-[var(--shadow-elegant)] hover:scale-[1.02] transition-transform">
              <Play className="size-4" /> Iniciar 25 min
            </button>
            <button className="px-4 py-3 rounded-full border border-border bg-white/60 backdrop-blur-md text-sm text-muted-foreground hover:text-foreground transition-colors">
              Mais tarde
            </button>
          </div>
        </div>

        <DayTimeline />
      </div>
    </section>
  );
}

function DayTimeline() {
  const startH = 6;
  const endH = 24;
  const span = endH - startH;
  const nowDec = today.getHours() + today.getMinutes() / 60;
  const nowFrac = Math.min(1, Math.max(0, (nowDec - startH) / span));
  const nowLabel = `${String(today.getHours()).padStart(2, "0")}:${String(today.getMinutes()).padStart(2, "0")}`;

  const styleFor = (s: Status) =>
    s === "done"
      ? "bg-foreground text-background border-foreground"
      : s === "review"
        ? "bg-accent/15 text-foreground border-accent/40"
        : "bg-white text-foreground border-border";

  const ticks = [6, 9, 12, 15, 18, 21, 24];

  return (
    <div>
      <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-mono text-muted-foreground mb-3">
        <span>Seu dia</span>
        <span className="flex items-center gap-4">
          <Legend dot="bg-white border border-border" label="Para ler" />
          <Legend dot="bg-accent/40 border border-accent/50" label="Revisar" />
          <Legend dot="bg-foreground" label="Concluído" />
        </span>
      </div>

      <div className="relative h-[88px] rounded-2xl border border-border bg-white/70 backdrop-blur-md">
        {/* hour grid */}
        {ticks.map((h, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 border-l border-dashed border-border/60"
            style={{ left: `${((h - startH) / span) * 100}%` }}
          />
        ))}

        {/* blocks */}
        <div className="absolute inset-x-2 top-2 bottom-2">
          {timeline.map((b, i) => {
            const left = ((b.start - startH) / span) * 100;
            const width = ((b.end - b.start) / span) * 100;
            return (
              <div
                key={i}
                className={
                  "absolute top-0 bottom-0 rounded-xl border px-2.5 py-1.5 flex flex-col justify-between overflow-hidden shadow-sm transition-transform hover:-translate-y-0.5 cursor-pointer " +
                  styleFor(b.status)
                }
                style={{ left: `${left}%`, width: `calc(${width}% - 4px)` }}
                title={`${b.label} · ${STATUS_LABEL[b.status]}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-widest opacity-70 truncate">
                    {b.area}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-widest opacity-70 shrink-0">
                    {STATUS_LABEL[b.status]}
                  </span>
                </div>
                <p className="text-[11px] font-medium leading-tight line-clamp-2">
                  {b.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* now line */}
        <div
          className="absolute -top-2 -bottom-2 w-px bg-accent z-10 pointer-events-none"
          style={{ left: `${nowFrac * 100}%` }}
        >
          <div className="absolute -top-1.5 -translate-x-1/2 size-2.5 rounded-full bg-accent ring-2 ring-background" />
          <div className="absolute -bottom-6 -translate-x-1/2 whitespace-nowrap text-[9px] font-mono uppercase tracking-widest text-accent">
            agora · {nowLabel}
          </div>
        </div>
      </div>

      <div className="relative mt-2 h-3">
        {ticks.map((h) => (
          <span
            key={h}
            className="absolute -translate-x-1/2 text-[10px] font-mono text-muted-foreground"
            style={{ left: `${((h - startH) / span) * 100}%` }}
          >
            {String(h).padStart(2, "0")}h
          </span>
        ))}
      </div>
    </div>
  );
}

function Legend({ dot, label }: { dot: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 normal-case tracking-normal">
      <span className={"inline-block size-2 rounded-full " + dot} />
      {label}
    </span>
  );
}

/* ---------- Global Progress ---------- */

function GlobalProgress() {
  const stats = [
    { label: "Áreas ativas", value: areas.length.toString() },
    { label: "Aulas concluídas", value: `${globalDone}/${globalTotal}` },
    { label: "Streak", value: `${streak.current}d`, icon: Flame },
    { label: "Horas (semana)", value: "17h" },
  ];

  return (
    <section className="col-span-12 lg:col-span-4 rounded-3xl border border-border bg-white p-7 flex flex-col gap-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.2em] font-mono text-muted-foreground">
          Progresso global
        </p>
        <ArrowUpRight className="size-4 text-muted-foreground" />
      </div>
      <div className="flex items-center gap-6">
        <Ring value={globalPct} size={132} stroke={9} />
        <div className="min-w-0">
          <p className="font-serif italic text-2xl font-bold leading-tight">
            Você está acima
            <br />
            do seu ritmo médio.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Média ponderada das suas {areas.length} áreas.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-auto">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-border bg-secondary/40 p-3"
          >
            <p className="font-mono text-xl tracking-tight inline-flex items-center gap-1.5">
              {s.value}
              {s.icon ? <s.icon className="size-3.5 text-accent" /> : null}
            </p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono mt-0.5">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Ring({
  value,
  size,
  stroke,
}: {
  value: number;
  size: number;
  stroke: number;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--secondary)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--foreground)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 800ms var(--ease-out-expo)" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span
          className="font-mono font-medium tracking-tighter"
          style={{ fontSize: size * 0.22 }}
        >
          {value}%
        </span>
      </div>
    </div>
  );
}

/* ---------- Import Stack (light bento, 4 distinct cards) ---------- */

function ImportStack() {
  return (
    <section className="col-span-12 animate-fade-up">
      <div className="flex items-end justify-between gap-4 mb-5">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] font-mono text-muted-foreground">
            Importar conteúdo
          </p>
          <h2 className="font-serif italic text-3xl font-bold mt-1 leading-tight">
            De onde vem sua aula?
          </h2>
        </div>
        <p className="text-xs text-muted-foreground max-w-xs text-right hidden md:block">
          Quatro formas de trazer conteúdo. A IA gera resumo, flashcards e
          cronograma em cada uma.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* 1. Plataforma de curso */}
        <article className="col-span-12 lg:col-span-7 rounded-3xl border border-border bg-white p-7 relative overflow-hidden group hover:border-foreground/30 transition-colors">
          <div className="absolute top-0 right-0 size-40 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="size-11 rounded-2xl bg-foreground text-background grid place-items-center">
                  <BookOpen className="size-5" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Mais usado
                  </p>
                  <h3 className="font-serif italic text-2xl font-bold leading-tight">
                    Aula de plataforma de curso
                  </h3>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              Hotmart, Kiwify, Eduzz, Memberkit, Udemy, Coursera e outras.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-5">
              <div className="rounded-2xl border border-border bg-secondary/30 p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <Link2 className="size-3.5 text-accent" />
                  <p className="font-mono text-[10px] uppercase tracking-widest text-foreground">
                    Por link ou código
                  </p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Mostramos passo a passo como pegar o link direto da aula.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-secondary/30 p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <Chrome className="size-3.5 text-accent" />
                  <p className="font-mono text-[10px] uppercase tracking-widest text-foreground">
                    Extensão Chrome
                  </p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Captura o áudio direto do player. Se não permitir, pega a
                  legenda automaticamente.
                </p>
              </div>
            </div>

            <p className="flex items-start gap-2 text-xs text-muted-foreground mb-6">
              <Paperclip className="size-3.5 mt-0.5 shrink-0 text-foreground/60" />
              Anexe PDFs e materiais da aula para a IA enriquecer o resumo.
            </p>

            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-full text-sm font-medium hover:scale-[1.02] transition-transform">
                Importar aula <ArrowUpRight className="size-4" />
              </button>
              <a
                href="#"
                className="text-xs font-medium text-foreground hover:text-accent inline-flex items-center gap-1"
              >
                Instalar extensão <ChevronRight className="size-3" />
              </a>
            </div>
          </div>
        </article>

        {/* 2. YouTube */}
        <article className="col-span-12 lg:col-span-5 rounded-3xl border border-border bg-white p-7 hover:border-foreground/30 transition-colors flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-11 rounded-2xl border border-border bg-secondary/40 grid place-items-center">
              <Youtube className="size-5 text-foreground" />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Link · transcrição
              </p>
              <h3 className="font-serif italic text-2xl font-bold leading-tight">
                YouTube
              </h3>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-5 flex-1">
            Cole o link. Quando existe legenda, usamos a transcrição direto —
            bem mais rápido que processar áudio.
          </p>
          <div className="flex items-stretch gap-2">
            <div className="flex-1 flex items-center px-4 rounded-full border border-border bg-secondary/30 text-xs font-mono text-muted-foreground">
              https://youtube.com/…
            </div>
            <button className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-foreground text-background rounded-full text-xs font-medium hover:scale-[1.02] transition-transform shrink-0">
              Importar
            </button>
          </div>
        </article>

        {/* 3. Áudio gravado */}
        <article className="col-span-12 lg:col-span-5 rounded-3xl border border-border bg-white p-7 hover:border-foreground/30 transition-colors flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-11 rounded-2xl border border-border bg-secondary/40 grid place-items-center">
              <Mic className="size-5 text-foreground" />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Upload
              </p>
              <h3 className="font-serif italic text-2xl font-bold leading-tight">
                Áudio gravado
              </h3>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Aulas próprias, reuniões, gravações pessoais.
          </p>
          <button className="flex-1 min-h-[88px] rounded-2xl border border-dashed border-border bg-secondary/20 hover:bg-secondary/40 hover:border-foreground/40 transition-colors grid place-items-center group">
            <div className="text-center">
              <Upload className="size-5 mx-auto text-muted-foreground group-hover:text-foreground transition-colors" />
              <p className="text-xs font-medium mt-2">Arraste ou selecione</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                MP3 · MP4 · M4A · WAV
              </p>
            </div>
          </button>
        </article>

        {/* 4. Texto / legenda */}
        <article className="col-span-12 lg:col-span-7 rounded-3xl border border-border bg-white p-7 hover:border-foreground/30 transition-colors flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-11 rounded-2xl border border-border bg-secondary/40 grid place-items-center">
              <ClipboardPaste className="size-5 text-foreground" />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Colar texto
              </p>
              <h3 className="font-serif italic text-2xl font-bold leading-tight">
                Texto ou legenda colada
              </h3>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Para plataformas que mostram a transcrição na própria página — copie,
            cole aqui e a IA gera o resumo sem precisar do áudio.
          </p>
          <div className="rounded-2xl border border-border bg-secondary/20 p-4 flex-1 min-h-[100px] text-xs font-mono text-muted-foreground">
            Cole a transcrição, legenda ou texto da aula aqui…
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Sem limite de tamanho
            </p>
            <button className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-foreground text-background rounded-full text-xs font-medium hover:scale-[1.02] transition-transform">
              Gerar resumo <ArrowUpRight className="size-3.5" />
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}

/* ---------- Areas comparative (recolored) ---------- */

function AreasComparative() {
  return (
    <section className="col-span-12 lg:col-span-8 rounded-3xl border border-border bg-white p-7 animate-fade-up">
      <SectionTitle
        eyebrow="Suas áreas"
        title="Comparativo"
        action="Ver todas"
      />
      <div className="mt-5 divide-y divide-border">
        {areas.map((a) => (
          <AreaRow key={a.code} area={a} />
        ))}
        <button className="w-full py-4 text-left flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors">
          <div className="size-10 rounded-xl border border-dashed border-border grid place-items-center">
            <Plus className="size-4" />
          </div>
          <span className="text-sm">Adicionar nova área</span>
        </button>
      </div>
    </section>
  );
}

function AreaRow({ area }: { area: Area }) {
  const above = area.paceWeek >= area.paceGoal && area.paceWeek > 0;
  return (
    <div className="py-4 grid grid-cols-12 gap-4 items-center group cursor-pointer hover:bg-secondary/40 -mx-3 px-3 rounded-2xl transition-colors">
      <div className="col-span-12 sm:col-span-5 flex items-center gap-3 min-w-0">
        <div className="size-10 rounded-xl bg-foreground text-background grid place-items-center font-serif italic text-sm font-bold shrink-0">
          {area.code}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium truncate">{area.name}</p>
          <p className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
            {area.kind}
          </p>
        </div>
      </div>
      <div className="col-span-6 sm:col-span-3 flex items-center gap-3">
        <div className="flex-1 h-1 rounded-full bg-border overflow-hidden">
          <div
            className="h-full bg-foreground rounded-full transition-all"
            style={{ width: `${area.pct}%` }}
          />
        </div>
        <span className="font-serif italic text-lg font-bold tabular-nums">
          {area.pct}%
        </span>
      </div>
      <div className="col-span-3 sm:col-span-2 text-center">
        <p
          className={
            "font-mono text-sm tabular-nums " +
            (above ? "text-accent" : "text-foreground")
          }
        >
          {area.paceWeek}
          <span className="text-muted-foreground">/{area.paceGoal}</span>
        </p>
        <p className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
          aulas/sem
        </p>
      </div>
      <div className="col-span-3 sm:col-span-2 text-right min-w-0">
        <p className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
          Próxima
        </p>
        <p className="text-xs font-medium truncate">{area.nextLesson}</p>
      </div>
    </div>
  );
}

/* ---------- Today Planner (study queue) ---------- */

function TodayPlanner() {
  const [items, setItems] = useState(todayPlan);
  const done = items.filter((i) => i.status === "done").length;
  const pct = Math.round((done / items.length) * 100);

  const toggle = (id: number) =>
    setItems((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, status: i.status === "done" ? "read" : ("done" as Status) }
          : i,
      ),
    );

  const statusStyle = (s: Status) =>
    s === "done"
      ? "bg-foreground text-background border-foreground"
      : s === "review"
        ? "bg-accent/15 text-foreground border-accent/40"
        : "bg-white text-muted-foreground border-border";

  return (
    <section className="col-span-12 lg:col-span-4 rounded-3xl border border-border bg-white p-7 animate-fade-up flex flex-col">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex items-center gap-4">
          <Ring value={pct} size={64} stroke={5} />
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-mono text-muted-foreground">
              Planejamento de hoje
            </p>
            <h2 className="font-serif italic text-2xl font-bold leading-tight mt-0.5">
              {dayName}, {today.getDate()} {monthName}
            </h2>
          </div>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground border border-border rounded-full px-2.5 py-1 shrink-0">
          {done} de {items.length}
        </span>
      </div>

      <ul className="flex-1 -mx-2">
        {items.map((it) => {
          const isDone = it.status === "done";
          return (
            <li
              key={it.id}
              className={
                "relative flex items-start gap-3 px-3 py-3 rounded-2xl transition-colors " +
                (it.current && !isDone
                  ? "bg-accent/[0.06]"
                  : "hover:bg-secondary/40")
              }
            >
              {it.current && !isDone && (
                <span className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-accent" />
              )}
              <button
                onClick={() => toggle(it.id)}
                aria-label={isDone ? "Desmarcar" : "Concluir"}
                className={
                  "mt-0.5 size-6 rounded-full border-2 grid place-items-center shrink-0 transition-colors " +
                  (isDone
                    ? "bg-foreground border-foreground text-background"
                    : "border-foreground/30 hover:border-foreground")
                }
              >
                {isDone && <Check className="size-3.5" strokeWidth={3} />}
              </button>
              <div className="flex-1 min-w-0">
                <p
                  className={
                    "font-serif italic text-base font-bold leading-snug " +
                    (isDone ? "line-through opacity-50" : "")
                  }
                >
                  {it.title}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5 truncate">
                  {it.area}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <span
                  className={
                    "text-[9px] font-mono uppercase tracking-widest border rounded-full px-2 py-0.5 " +
                    statusStyle(it.status)
                  }
                >
                  {STATUS_LABEL[it.status]}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground tabular-nums">
                  {it.duration} min
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
        <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border text-xs font-medium text-foreground hover:bg-secondary/40 transition-colors">
          <Plus className="size-3.5" /> Adicionar à fila
        </button>
        <a
          href="#"
          className="text-xs font-medium text-foreground hover:text-accent inline-flex items-center gap-1"
        >
          Ver semana <ChevronRight className="size-3" />
        </a>
      </div>
    </section>
  );
}

/* ---------- Streak + Milestones ---------- */

function StreakMilestones() {
  const { current, record, startedAt, milestones } = streak;
  const next = milestones.find((m) => m > current) ?? milestones[milestones.length - 1];
  const prev = [...milestones].reverse().find((m) => m <= current) ?? 0;
  const towardsNext = Math.min(
    100,
    Math.round(((current - prev) / (next - prev)) * 100),
  );
  const daysToNext = Math.max(0, next - current);

  return (
    <section className="col-span-12 lg:col-span-8 rounded-3xl border border-border bg-white p-7 animate-fade-up">
      <SectionTitle eyebrow="Consistência" title="Sequência de estudos" />

      <div className="mt-6 grid lg:grid-cols-[auto_1fr] gap-8 items-center">
        <div className="flex items-baseline gap-3">
          <span className="font-serif italic text-[88px] leading-none font-bold tabular-nums">
            {current}
          </span>
          <Flame className="size-7 text-accent -translate-y-2" />
        </div>
        <div className="min-w-0">
          <p className="text-sm text-foreground">
            <span className="font-medium">dias de estudo seguidos.</span>{" "}
            <span className="text-muted-foreground">
              Faltam{" "}
              <span className="text-foreground font-medium tabular-nums">
                {daysToNext} dias
              </span>{" "}
              para bater o marco de{" "}
              <span className="text-foreground font-medium tabular-nums">
                {next}
              </span>
              .
            </span>
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-2">
            Recorde pessoal: {record} dias · Iniciou em {startedAt}
          </p>
        </div>
      </div>

      {/* Milestones rail */}
      <div className="mt-8">
        <div className="relative h-12">
          {/* baseline */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-border" />
          {/* progress overlay up to current */}
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-px bg-foreground transition-all"
            style={{
              width: `${Math.min(100, (current / milestones[milestones.length - 1]) * 100)}%`,
            }}
          />
          {milestones.map((m) => {
            const left = (m / milestones[milestones.length - 1]) * 100;
            const reached = current >= m;
            const isNext = m === next && current < m;
            return (
              <div
                key={m}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center"
                style={{ left: `${left}%` }}
              >
                <div
                  className={
                    "size-4 rounded-full border-2 grid place-items-center transition-colors " +
                    (reached
                      ? "bg-foreground border-foreground"
                      : isNext
                        ? "bg-white border-accent"
                        : "bg-white border-border")
                  }
                >
                  {reached && <Check className="size-2 text-background" strokeWidth={4} />}
                  {isNext && <span className="size-1.5 rounded-full bg-accent" />}
                </div>
                <span
                  className={
                    "absolute top-6 font-mono text-[10px] uppercase tracking-widest tabular-nums " +
                    (isNext
                      ? "text-accent font-medium"
                      : reached
                        ? "text-foreground"
                        : "text-muted-foreground")
                  }
                >
                  {m}d
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress to next */}
      <div className="mt-12 pt-5 border-t border-border flex items-center gap-4">
        <Trophy className="size-4 text-muted-foreground shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between mb-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Próximo marco: {next} dias
            </p>
            <p className="font-mono text-xs tabular-nums">
              {towardsNext}%
            </p>
          </div>
          <div className="h-1.5 rounded-full bg-border overflow-hidden">
            <div
              className="h-full bg-foreground rounded-full transition-all"
              style={{ width: `${towardsNext}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Trend ---------- */

function TrendCard() {
  return (
    <section className="col-span-12 lg:col-span-4 rounded-3xl border border-border bg-white p-7 animate-fade-up flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[10px] uppercase tracking-[0.2em] font-mono text-muted-foreground">
          Tendência
        </p>
        <span
          className={
            "text-[10px] font-mono px-2 py-0.5 rounded-full border " +
            (trendDelta >= 0
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-red-200 bg-red-50 text-red-700")
          }
        >
          {trendDelta >= 0 ? "+" : ""}
          {trendDelta}% vs 4 sem
        </span>
      </div>
      <p className="font-serif italic text-3xl font-bold leading-tight">
        {trend.at(-1)!.h}h
        <span className="text-base text-muted-foreground not-italic font-sans font-normal">
          {" "}
          esta semana
        </span>
      </p>
      <div className="flex-1 mt-4 min-h-[140px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trend} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
            <defs>
              <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="w"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}
            />
            <Tooltip
              cursor={{ stroke: "var(--accent)", strokeWidth: 1 }}
              contentStyle={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                fontSize: 12,
              }}
              formatter={(v: number) => [`${v}h`, "Estudo"]}
            />
            <RArea
              type="monotone"
              dataKey="h"
              stroke="var(--accent)"
              strokeWidth={2}
              fill="url(#trendFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

/* ---------- Banner ---------- */

function MotivationalBanner() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-foreground text-background p-8 lg:p-10 animate-fade-up">
      <div className="absolute -right-32 -bottom-32 size-80 rounded-full bg-accent/30 blur-3xl pointer-events-none" />
      <div className="relative grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-6">
        <div className="size-12 rounded-2xl bg-background/10 grid place-items-center">
          <Target className="size-5 text-accent" />
        </div>
        <div className="min-w-0">
          <h3 className="font-serif italic text-2xl lg:text-3xl font-bold leading-tight">
            Disciplina hoje, aprovação amanhã.
          </h3>
          <p className="text-sm text-background/60 mt-1 max-w-xl">
            Pequenos passos diários. Você está construindo algo grande.
          </p>
        </div>
        <button className="shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-background text-foreground rounded-full text-sm font-medium hover:scale-[1.02] transition-transform">
          <BookOpen className="size-4" /> Continuar estudo
        </button>
      </div>
    </section>
  );
}

/* ---------- Helpers ---------- */

function SectionTitle({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string;
  title: string;
  action?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] font-mono text-muted-foreground">
          {eyebrow}
        </p>
        <h2 className="font-serif italic text-2xl font-bold mt-1 leading-tight">
          {title}
        </h2>
      </div>
      {action && (
        <a
          href="#"
          className="text-xs font-medium text-foreground inline-flex items-center gap-1 hover:text-accent transition-colors shrink-0"
        >
          {action} <ChevronRight className="size-3" />
        </a>
      )}
    </div>
  );
}
