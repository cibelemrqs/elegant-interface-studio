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
  CalendarDays,
  Check,
  ChevronRight,
  Command,
  Flame,
  Headphones,
  Link2,
  Mic,
  Play,
  Plus,
  Sparkles,
  Target,
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

type Area = {
  code: string;
  name: string;
  kind: string;
  pct: number;
  done: number;
  total: number;
  paceWeek: number;
  nextLesson: string;
  accent: string;
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
    nextLesson: "ECA – Estatuto da Criança e do Adolescente",
    accent: "from-amber-500 to-orange-600",
  },
  {
    code: "EE",
    name: "Especialização em IA",
    kind: "Pós-graduação",
    pct: 0,
    done: 0,
    total: 18,
    paceWeek: 0,
    nextLesson: "Introdução a modelos de linguagem",
    accent: "from-emerald-500 to-teal-600",
  },
  {
    code: "UD",
    name: "UX Design",
    kind: "Curso livre",
    pct: 12,
    done: 1,
    total: 8,
    paceWeek: 1,
    nextLesson: "Princípios de design centrado no usuário",
    accent: "from-violet-500 to-purple-600",
  },
  {
    code: "AP",
    name: "AI Product Design",
    kind: "Curso livre",
    pct: 4,
    done: 0,
    total: 12,
    paceWeek: 0,
    nextLesson: "O que é um produto de IA?",
    accent: "from-sky-500 to-cyan-600",
  },
];

const globalPct = Math.round(
  areas.reduce((a, b) => a + b.pct, 0) / areas.length,
);
const globalDone = areas.reduce((a, b) => a + b.done, 0);
const globalTotal = areas.reduce((a, b) => a + b.total, 0);

type Block = {
  start: number; // hour 0-24
  end: number;
  label: string;
  kind: "study" | "review" | "agenda";
  area?: string;
};
const timeline: Block[] = [
  { start: 8, end: 9, label: "Revisão ECA", kind: "review", area: "CS" },
  { start: 9.5, end: 11, label: "Aula: Atos Administrativos", kind: "study", area: "CS" },
  { start: 14, end: 15.5, label: "Aula: Lei 13.709", kind: "study", area: "CS" },
  { start: 16, end: 16.5, label: "Revisar Constituição", kind: "review", area: "CS" },
  { start: 20, end: 22, label: "Concluir APP Orbi", kind: "agenda" },
];

const habits = [
  { label: "Estudar 1h na Alura", streak: 7, done: false },
  { label: "Revisar 3 cards", streak: 12, done: true },
  { label: "Resumo do dia", streak: 4, done: false },
  { label: "Caminhar 20 min", streak: 23, done: true },
];

const agenda = [
  { day: "16", month: "JUN", title: "Arrumar dashboard no Lovable", time: "Hoje" },
  { day: "20", month: "JUN", title: "Concluir APP Orbi", time: "22:00" },
  { day: "22", month: "JUN", title: "Simulado SED", time: "09:00" },
];

// Heatmap: 84 days (12 weeks × 7), seeded
function makeHeatmap(): number[] {
  const out: number[] = [];
  let seed = 7;
  for (let i = 0; i < 84; i++) {
    seed = (seed * 9301 + 49297) % 233280;
    const r = seed / 233280;
    // recent days denser
    const recency = i / 84;
    const v = r + recency * 0.3;
    if (v < 0.25) out.push(0);
    else if (v < 0.45) out.push(1);
    else if (v < 0.65) out.push(2);
    else if (v < 0.85) out.push(3);
    else out.push(4);
  }
  return out;
}
const heatmap = makeHeatmap();

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

          <AreasComparative />
          <TodayPlanner />
          <ImportStack />

          <ConsistencyHeatmap />
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
          <Link
            to="/"
            className="hover:text-foreground transition-colors"
          >
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
          previstas e <span className="text-foreground font-medium">2 revisões</span>{" "}
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
  const next = areas
    .filter((a) => a.pct < 100)
    .sort((a, b) => a.pct - b.pct)[0];

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
  const nowFrac = Math.min(
    1,
    Math.max(0, (today.getHours() + today.getMinutes() / 60 - startH) / span),
  );
  const toneFor = (k: Block["kind"]) =>
    k === "study"
      ? "bg-foreground text-background"
      : k === "review"
        ? "bg-accent text-accent-foreground"
        : "bg-white border border-border text-foreground";

  return (
    <div>
      <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-mono text-muted-foreground mb-2">
        <span>Hoje</span>
        <span className="flex items-center gap-3">
          <Legend dot="bg-foreground" label="Estudo" />
          <Legend dot="bg-accent" label="Revisão" />
          <Legend dot="bg-white border border-border" label="Agenda" />
        </span>
      </div>
      <div className="relative h-16 rounded-2xl border border-border bg-white/70 backdrop-blur-md p-2">
        <div className="relative h-full w-full">
          {/* hour ticks */}
          {Array.from({ length: span + 1 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 border-l border-dashed border-border/60"
              style={{ left: `${(i / span) * 100}%` }}
            />
          ))}
          {/* blocks */}
          {timeline.map((b, i) => {
            const left = ((b.start - startH) / span) * 100;
            const width = ((b.end - b.start) / span) * 100;
            return (
              <div
                key={i}
                className={
                  "absolute top-1 bottom-1 rounded-lg px-2 flex items-center text-[10px] font-medium truncate shadow-sm " +
                  toneFor(b.kind)
                }
                style={{ left: `${left}%`, width: `${width}%` }}
                title={b.label}
              >
                <span className="truncate">{b.label}</span>
              </div>
            );
          })}
          {/* now */}
          <div
            className="absolute -top-1 -bottom-1 w-px bg-accent"
            style={{ left: `${nowFrac * 100}%` }}
          >
            <div className="absolute -top-1 -translate-x-1/2 size-2 rounded-full bg-accent ring-2 ring-background" />
          </div>
        </div>
      </div>
      <div className="flex justify-between text-[10px] font-mono text-muted-foreground mt-1.5 px-1">
        {[6, 9, 12, 15, 18, 21, 24].map((h) => (
          <span key={h}>{String(h).padStart(2, "0")}h</span>
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
    { label: "Streak", value: "12d", icon: Flame },
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

/* ---------- Areas comparative ---------- */

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
  return (
    <div className="py-4 grid grid-cols-12 gap-4 items-center group cursor-pointer hover:bg-secondary/40 -mx-3 px-3 rounded-2xl transition-colors">
      <div className="col-span-12 sm:col-span-5 flex items-center gap-3 min-w-0">
        <div
          className={
            "size-10 rounded-xl text-white grid place-items-center font-mono text-xs font-semibold bg-gradient-to-br shrink-0 " +
            area.accent
          }
        >
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
        <div className="flex-1 h-1 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full bg-foreground rounded-full"
            style={{ width: `${area.pct}%` }}
          />
        </div>
        <span className="font-serif italic text-lg font-bold tabular-nums">
          {area.pct}%
        </span>
      </div>
      <div className="col-span-3 sm:col-span-2 text-center">
        <p className="font-mono text-sm tabular-nums">{area.paceWeek}</p>
        <p className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
          aulas/sem
        </p>
      </div>
      <div className="col-span-3 sm:col-span-2 text-right">
        <p className="text-xs text-muted-foreground truncate">Próxima</p>
        <p className="text-xs font-medium truncate">{area.nextLesson}</p>
      </div>
    </div>
  );
}

/* ---------- Today Planner ---------- */

function TodayPlanner() {
  const [tab, setTab] = useState<"habits" | "agenda">("habits");
  return (
    <section className="col-span-12 lg:col-span-4 rounded-3xl border border-border bg-white p-7 animate-fade-up flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <p className="text-[10px] uppercase tracking-[0.2em] font-mono text-muted-foreground">
          Planejamento de hoje
        </p>
        <CalendarDays className="size-4 text-muted-foreground" />
      </div>
      <div className="flex items-center gap-1 p-1 bg-secondary rounded-full mb-5 w-fit">
        {(["habits", "agenda"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={
              "px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors " +
              (tab === t
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground")
            }
          >
            {t === "habits" ? "Hábitos" : "Agenda"}
          </button>
        ))}
      </div>

      {tab === "habits" ? (
        <div className="space-y-1.5 flex-1">
          {habits.map((h) => (
            <div
              key={h.label}
              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer"
            >
              <div
                className={
                  "size-5 rounded-md border grid place-items-center shrink-0 " +
                  (h.done
                    ? "bg-foreground border-foreground text-background"
                    : "border-border")
                }
              >
                {h.done && <Check className="size-3" />}
              </div>
              <p
                className={
                  "text-sm flex-1 truncate " +
                  (h.done ? "text-muted-foreground line-through" : "")
                }
              >
                {h.label}
              </p>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-accent">
                <Flame className="size-3" /> {h.streak}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2 flex-1">
          {agenda.map((a) => (
            <div
              key={a.title}
              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-secondary/50 transition-colors cursor-pointer"
            >
              <div className="text-center min-w-[36px]">
                <p className="font-mono font-semibold text-base leading-none tabular-nums">
                  {a.day}
                </p>
                <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-mono mt-0.5">
                  {a.month}
                </p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{a.title}</p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
                  {a.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <a
        href="#"
        className="mt-4 text-xs font-medium text-accent inline-flex items-center gap-1"
      >
        Ver planejamento completo <ChevronRight className="size-3" />
      </a>
    </section>
  );
}

/* ---------- Import Stack ---------- */

function ImportStack() {
  const items = [
    { icon: Link2, title: "Adicionar Curso", sub: "Plataforma de ensino" },
    { icon: Youtube, title: "Importar Vídeo", sub: "Link YouTube" },
    { icon: Mic, title: "Enviar Áudio", sub: "MP3 / gravação" },
    { icon: Headphones, title: "Aula em áudio", sub: "Podcast / aula" },
  ];
  return (
    <section className="col-span-12 lg:col-span-4 rounded-3xl border border-border bg-white p-7 animate-fade-up">
      <div className="flex items-center justify-between mb-5">
        <p className="text-[10px] uppercase tracking-[0.2em] font-mono text-muted-foreground">
          Importar conteúdo
        </p>
        <Sparkles className="size-4 text-accent" />
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {items.map((i) => (
          <button
            key={i.title}
            className="group text-left rounded-2xl border border-border p-3.5 hover:border-foreground/20 hover:bg-secondary/40 transition-all"
          >
            <div className="size-8 rounded-lg bg-accent/10 text-accent grid place-items-center mb-3">
              <i.icon className="size-4" />
            </div>
            <p className="text-sm font-medium leading-tight">{i.title}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{i.sub}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

/* ---------- Consistency Heatmap ---------- */

function ConsistencyHeatmap() {
  const days = ["S", "T", "Q", "Q", "S", "S", "D"];
  const intensities = [
    "bg-secondary",
    "bg-accent/20",
    "bg-accent/40",
    "bg-accent/70",
    "bg-accent",
  ];
  // arrange into 7 rows × 12 cols
  const grid: number[][] = Array.from({ length: 7 }, () => []);
  heatmap.forEach((v, i) => {
    grid[i % 7].push(v);
  });

  const total = heatmap.reduce((a, b) => a + (b > 0 ? 1 : 0), 0);

  return (
    <section className="col-span-12 lg:col-span-8 rounded-3xl border border-border bg-white p-7 animate-fade-up">
      <SectionTitle
        eyebrow="Consistência"
        title={`${total} dias ativos nos últimos 84`}
      />
      <div className="mt-6 flex gap-3">
        <div className="flex flex-col justify-between text-[9px] uppercase font-mono text-muted-foreground py-0.5">
          {days.map((d, i) => (
            <span key={i}>{d}</span>
          ))}
        </div>
        <div className="flex-1 grid grid-rows-7 gap-1">
          {grid.map((row, ri) => (
            <div
              key={ri}
              className="grid gap-1"
              style={{ gridTemplateColumns: `repeat(${row.length}, minmax(0,1fr))` }}
            >
              {row.map((v, ci) => (
                <div
                  key={ci}
                  className={"aspect-square rounded-[4px] " + intensities[v]}
                  title={`Nível ${v}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        <span>12 semanas</span>
        <span className="flex items-center gap-1.5">
          menos
          {intensities.map((c, i) => (
            <span key={i} className={"size-2.5 rounded-[3px] " + c} />
          ))}
          mais
        </span>
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
            <Area
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
          <BookOpen className="size-4" /> Ver hábitos
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
