import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpen,
  Bookmark,
  Check,
  ChevronRight,
  Clock,
  FileText,
  HelpCircle,
  Home,
  Layers,
  Play,
  Plus,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
  CalendarDays,
} from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EliteStudy — Concurso SED ATA II" },
      {
        name: "description",
        content:
          "Painel editorial de progresso de estudos para o Concurso SED – ATA II.",
      },
    ],
  }),
  component: DashboardPage,
});

/* ---------- Data ---------- */

const subjects = [
  {
    title: "Conhecimentos Gerais: Fundamentos legais e organização",
    progress: 20,
    done: 1,
    total: 5,
    chips: [
      { label: "1 feita", tone: "done" as const },
      { label: "2 revisar", tone: "review" as const },
      { label: "2 pend.", tone: "pending" as const },
    ],
  },
  {
    title: "Conhecimentos Gerais: Tecnologias, inovação e mídias",
    progress: 0,
    done: 0,
    total: 2,
    chips: [{ label: "2 revisar", tone: "review" as const }],
  },
  {
    title: "Conhecimentos Específicos – Parte I",
    progress: 78,
    done: 14,
    total: 18,
    chips: [
      { label: "14 feitas", tone: "done" as const },
      { label: "4 pend.", tone: "pending" as const },
    ],
  },
  {
    title: "Noções de Informática",
    progress: 100,
    done: 1,
    total: 1,
    chips: [{ label: "1 feita", tone: "done" as const }],
  },
  {
    title: "Conhecimentos Gerais: Currículo e organização do ensino",
    progress: 100,
    done: 3,
    total: 3,
    chips: [{ label: "3 feitas", tone: "done" as const }],
  },
  {
    title: "Conhecimentos Gerais: Diversidade, direitos e cidadania",
    progress: 100,
    done: 1,
    total: 1,
    chips: [{ label: "1 feita", tone: "done" as const }],
  },
  {
    title: "Conhecimentos Específicos – Parte II",
    progress: 100,
    done: 2,
    total: 2,
    chips: [{ label: "2 feitas", tone: "done" as const }],
  },
];

const continueStudying = [
  {
    cat: "Conhecimentos Gerais: Fundamentos legais",
    title: "Estatuto e o plano de carreira do magistério",
  },
  {
    cat: "Conhecimentos Específicos – Parte I",
    title: "Lei nº 13.709/2018 | Introdução e Fundamentos",
  },
  {
    cat: "Conhecimentos Específicos – Parte I",
    title: "Governo aberto, participação social e controle",
  },
  {
    cat: "Conhecimentos Específicos – Parte I",
    title: "Atos Administrativos – Conceito",
  },
  {
    cat: "Conhecimentos Específicos – Parte I",
    title: "Questões de Licitação e contratos administrativos",
  },
  {
    cat: "Conhecimentos Gerais: Fundamentos legais",
    title: "ECA – Estatuto da Criança e do Adolescente",
  },
];

const reviews = [
  {
    day: "07",
    month: "MAI",
    title: "Cultura digital, letramento digital e cidadania",
    cat: "Tecnologias, inovação e mídias",
  },
  {
    day: "05",
    month: "MAI",
    title: "ECA – Estatuto da Criança e do Adolescente",
    cat: "Fundamentos legais",
  },
  {
    day: "02",
    month: "MAI",
    title: "Tecnologias digitais na educação e na gestão",
    cat: "Tecnologias, inovação e mídias",
  },
  {
    day: "28",
    month: "ABR",
    title: "Constituição Federal de 1988 – Art. 211",
    cat: "Fundamentos legais",
  },
];

const weekly = [
  { day: "Seg", h: 1.8 },
  { day: "Ter", h: 2.4 },
  { day: "Qua", h: 2.1 },
  { day: "Qui", h: 3.2 },
  { day: "Sex", h: 2.7 },
  { day: "Sáb", h: 4.1 },
  { day: "Dom", h: 7.5 },
];

const aiActivity = [
  { icon: FileText, label: "Resumo gerado", meta: "Estatuto e o plano de carreira" },
  { icon: Layers, label: "Flashcards criados", meta: "Gestão Patrimonial (Controle)" },
  { icon: HelpCircle, label: "Questões geradas", meta: "Ciclo Vital dos Documentos" },
  { icon: Check, label: "Transcrição concluída", meta: "Lei nº 13.709/2018 — Introdução" },
];

/* ---------- Page ---------- */

function DashboardPage() {
  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1320px] px-10 py-10 space-y-12">
          <Header />
          <ProgressHero />
          <SubjectsSection />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ContinueStudying />
            <PendingReviews />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WeeklyPerformance />
            <AIActivity />
          </div>
          <UpcomingEmpty />
          <MotivationalBanner />
        </div>
      </main>
    </div>
  );
}

/* ---------- Sidebar ---------- */

function Sidebar() {
  return (
    <aside className="w-72 shrink-0 border-r border-border bg-glass backdrop-blur-xl flex flex-col sticky top-0 h-screen z-10">
      <div className="p-8 flex items-center gap-3">
        <div className="size-7 rounded-full bg-foreground grid place-items-center">
          <div className="size-2 rounded-full bg-background" />
        </div>
        <span className="text-lg font-semibold tracking-tight">EliteStudy</span>
      </div>

      <div className="px-6 pb-4">
        <button className="w-full rounded-2xl border border-border bg-white/60 backdrop-blur-md p-4 flex items-center gap-3 text-left hover:bg-white transition-colors">
          <div className="size-10 rounded-xl bg-accent/10 text-accent grid place-items-center font-mono text-xs font-semibold">
            CS
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium truncate">Concurso SED – ATA II</p>
            <p className="text-[11px] text-muted-foreground truncate">
              Trocar área
            </p>
          </div>
          <ChevronRight className="size-4 text-muted-foreground" />
        </button>
      </div>

      <nav className="px-4 space-y-1">
        <NavItem icon={Home} label="Visão Geral" active />
        <NavItem icon={BookOpen} label="Matérias" />
        <NavItem icon={Bookmark} label="Revisões" badge="4" />
      </nav>

      <div className="px-6 pt-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="size-1.5 rounded-full bg-accent" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-mono font-semibold">
            Matérias
          </span>
          <span className="ml-auto text-[10px] font-mono text-muted-foreground tabular-nums">
            {subjects.length}
          </span>
        </div>
        <div className="space-y-1">
          {subjects.slice(0, 5).map((s) => (
            <button
              key={s.title}
              className="group w-full text-left px-3 py-2.5 rounded-xl hover:bg-white/70 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className={
                    "size-1.5 rounded-full shrink-0 " +
                    (s.progress === 100
                      ? "bg-emerald-500"
                      : s.progress > 0
                        ? "bg-accent"
                        : "bg-foreground/20")
                  }
                />
                <span className="text-[12px] font-medium text-foreground/85 group-hover:text-foreground truncate flex-1">
                  {s.title.replace(/^Conhecimentos (Gerais|Específicos)[:–\s-]*/i, "")}
                </span>
                <span className="text-[9px] font-mono text-muted-foreground tabular-nums shrink-0">
                  {s.progress}%
                </span>
              </div>
              <div className="h-[2px] rounded-full bg-foreground/5 overflow-hidden ml-3.5">
                <div
                  className={
                    "h-full rounded-full transition-all " +
                    (s.progress === 100 ? "bg-emerald-500" : "bg-foreground/70")
                  }
                  style={{ width: `${Math.max(s.progress, 4)}%` }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto p-6">
        <div className="rounded-2xl border border-accent/15 bg-accent/[0.04] p-4">
          <p className="font-display text-[15px] font-medium text-foreground leading-snug mb-2">
            "O sucesso é a soma de pequenos esforços, repetidos dia após dia."
          </p>
          <p className="text-[10px] uppercase tracking-widest text-accent/70 font-mono">
            Robert Collier
          </p>
        </div>
      </div>
    </aside>
  );
}

function NavItem({
  icon: Icon,
  label,
  active,
  badge,
}: {
  icon: typeof Home;
  label: string;
  active?: boolean;
  badge?: string;
}) {
  return (
    <a
      href="#"
      className={
        "flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-medium transition-colors " +
        (active
          ? "bg-foreground text-background"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary")
      }
    >
      <Icon className="size-4" />
      <span className="flex-1">{label}</span>
      {badge && (
        <span
          className={
            "text-[10px] px-1.5 py-0.5 rounded-full font-mono " +
            (active ? "bg-background/20 text-background" : "bg-accent text-accent-foreground")
          }
        >
          {badge}
        </span>
      )}
    </a>
  );
}

/* ---------- Header ---------- */

function Header() {
  return (
    <header className="flex items-end justify-between gap-6 animate-fade-up">
      <div className="min-w-0">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <span className="hover:text-foreground transition-colors cursor-pointer">
            Áreas de Estudo
          </span>
          <ChevronRight className="size-3" />
          <span className="text-foreground">Concurso SED – ATA II</span>
        </nav>
        <h1 className="font-display text-5xl font-bold tracking-tight text-balance">
          Concurso SED – ATA II
        </h1>
      </div>
      <button className="shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-foreground text-background rounded-full text-sm font-medium shadow-[var(--shadow-elegant)] hover:scale-[1.02] active:scale-[0.99] transition-transform">
        <Plus className="size-4" />
        Nova Aula
      </button>
    </header>
  );
}

/* ---------- Hero ---------- */

function ProgressHero() {
  const pct = 69;
  return (
    <section className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-8 bg-white border border-border rounded-3xl p-10 flex items-center gap-12 shadow-[var(--shadow-elegant)] animate-fade-up">
        <ProgressRing value={pct} size={172} stroke={10} />
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono mb-2">
            Seu progresso geral
          </p>
          <h2 className="font-display text-4xl font-bold mb-3">
            Muito Bom!
          </h2>
          <p className="text-sm text-muted-foreground max-w-md leading-relaxed mb-6">
            A aprovação está cada vez mais próxima. Não pare agora — mantenha o
            ritmo de estudos atual.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-1 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full bg-foreground rounded-full transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
            <a
              href="#"
              className="text-xs font-medium text-accent inline-flex items-center gap-1 whitespace-nowrap"
            >
              Continue progredindo
              <ChevronRight className="size-3" />
            </a>
          </div>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-4 grid grid-cols-2 gap-3 animate-fade-up">
        <StatTile icon={BookOpen} label="Aulas no total" value="32" />
        <StatTile icon={Check} label="Concluídas" value="22" accent />
        <StatTile icon={Bookmark} label="Revisões" value="04" />
        <StatTile
          icon={Clock}
          label="Horas de estudo"
          value="17h"
          suffix="00m"
        />
      </div>
    </section>
  );
}

function StatTile({
  icon: Icon,
  label,
  value,
  suffix,
  accent,
}: {
  icon: typeof Home;
  label: string;
  value: string;
  suffix?: string;
  accent?: boolean;
}) {
  return (
    <div className="bg-white border border-border rounded-2xl p-5 flex flex-col justify-between min-h-[110px] hover:border-foreground/20 transition-colors">
      <div className="size-7 rounded-lg bg-secondary text-muted-foreground grid place-items-center">
        <Icon className="size-3.5" />
      </div>
      <div>
        <p
          className={
            "font-mono text-2xl tracking-tight " +
            (accent ? "text-accent" : "text-foreground")
          }
        >
          {value}
          {suffix && (
            <span className="text-sm text-muted-foreground"> {suffix}</span>
          )}
        </p>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono mt-1">
          {label}
        </p>
      </div>
    </div>
  );
}

/* ---------- Progress Ring ---------- */

function ProgressRing({
  value,
  size = 140,
  stroke = 8,
  showLabel = true,
}: {
  value: number;
  size?: number;
  stroke?: number;
  showLabel?: boolean;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div
      className="relative shrink-0"
      style={{ width: size, height: size }}
    >
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
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-mono font-medium tracking-tighter"
            style={{ fontSize: size * 0.22 }}
          >
            {value}%
          </span>
        </div>
      )}
    </div>
  );
}

/* ---------- Subjects ---------- */

function SubjectsSection() {
  return (
    <section className="animate-fade-up">
      <div className="flex items-end justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="size-1.5 rounded-full bg-accent" />
          <h2 className="text-[10px] uppercase tracking-[0.2em] font-mono font-semibold text-accent">
            Matérias
          </h2>
          <span className="text-[11px] text-muted-foreground font-mono">
            {subjects.length} no total · {subjects.filter((s) => s.progress === 100).length} concluídas
          </span>
        </div>
        <a
          href="#"
          className="text-xs font-medium text-foreground inline-flex items-center gap-1 hover:text-accent transition-colors"
        >
          Ver todas <ChevronRight className="size-3" />
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {subjects.map((s) => (
          <SubjectCard key={s.title} {...s} />
        ))}
      </div>
    </section>
  );
}

function SubjectCard({
  title,
  progress,
  done,
  total,
  chips,
}: (typeof subjects)[number]) {
  const complete = progress === 100;
  return (
    <article className="group bg-white border border-border rounded-2xl p-5 hover:border-foreground/20 hover:shadow-[var(--shadow-elegant)] transition-all cursor-pointer flex flex-col">
      <div className="flex items-start justify-between mb-5">
        <ProgressRing value={progress} size={72} stroke={6} />
        <span className="text-[10px] font-mono text-muted-foreground tabular-nums">
          {done}/{total}
        </span>
      </div>
      <h3 className="text-sm font-medium leading-snug mb-4 line-clamp-2 min-h-[40px]">
        {title}
      </h3>
      <p className="text-[11px] text-muted-foreground mb-4">
        {done} de {total} aulas
      </p>
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {chips.map((c) => (
          <Chip key={c.label} tone={c.tone}>
            {c.label}
          </Chip>
        ))}
        {complete && (
          <Chip tone="done">
            <Check className="size-2.5 mr-0.5 inline" /> concluído
          </Chip>
        )}
      </div>
    </article>
  );
}

function Chip({
  tone,
  children,
}: {
  tone: "done" | "review" | "pending";
  children: React.ReactNode;
}) {
  const cls =
    tone === "done"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
      : tone === "review"
        ? "bg-accent/10 text-accent border-accent/20"
        : "bg-secondary text-muted-foreground border-border";
  return (
    <span
      className={
        "inline-flex items-center text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border " +
        cls
      }
    >
      {children}
    </span>
  );
}

/* ---------- Continue Studying ---------- */

function ContinueStudying() {
  return (
    <section className="bg-white border border-border rounded-3xl p-7 animate-fade-up">
      <SectionHeader
        icon={Play}
        title="Continuar estudando"
        action="Ver tudo"
      />
      <div className="space-y-2">
        {continueStudying.map((c) => (
          <div
            key={c.title}
            className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-secondary/70 transition-colors cursor-pointer"
          >
            <div className="size-10 rounded-full bg-secondary group-hover:bg-foreground group-hover:text-background grid place-items-center transition-colors shrink-0">
              <Play className="size-3.5 ml-0.5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground truncate">
                {c.cat}
              </p>
              <p className="text-sm font-medium truncate mt-0.5">{c.title}</p>
            </div>
            <button className="text-xs font-medium px-3 py-1.5 rounded-full border border-border hover:bg-foreground hover:text-background transition-colors shrink-0">
              Para ler
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Pending Reviews ---------- */

function PendingReviews() {
  return (
    <section className="bg-white border border-border rounded-3xl p-7 animate-fade-up">
      <SectionHeader icon={Bookmark} title="Revisões pendentes" action="Ver tudo" />
      <div className="divide-y divide-border">
        {reviews.map((r) => (
          <div
            key={r.title}
            className="py-3 flex items-center gap-4 group cursor-pointer first:pt-0 last:pb-0"
          >
            <div className="text-center min-w-[42px] py-1">
              <p className="font-mono font-semibold text-lg leading-none tabular-nums">
                {r.day}
              </p>
              <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-mono mt-1">
                {r.month}
              </p>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-snug truncate">
                {r.title}
              </p>
              <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                {r.cat}
              </p>
            </div>
            <button className="text-xs font-medium px-3 py-1.5 rounded-full bg-foreground text-background hover:bg-accent transition-colors shrink-0">
              Revisar
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Section Header ---------- */

function SectionHeader({
  icon: Icon,
  title,
  action,
}: {
  icon: typeof Home;
  title: string;
  action?: string;
}) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2">
        <Icon className="size-3.5 text-muted-foreground" />
        <h3 className="text-[10px] uppercase tracking-[0.2em] font-mono text-muted-foreground">
          {title}
        </h3>
      </div>
      {action && (
        <a
          href="#"
          className="text-xs font-medium inline-flex items-center gap-1 hover:text-accent transition-colors"
        >
          {action} <ChevronRight className="size-3" />
        </a>
      )}
    </div>
  );
}

/* ---------- Weekly Performance ---------- */

function WeeklyPerformance() {
  return (
    <section className="bg-white border border-border rounded-3xl p-7 animate-fade-up">
      <SectionHeader
        icon={TrendingUp}
        title="Desempenho semanal"
        action="Ver análise completa"
      />
      <div className="mb-4">
        <p className="font-display text-3xl font-bold">
          7h<span className="text-muted-foreground">30m</span>
        </p>
        <p className="text-xs text-muted-foreground mt-1">Pico no domingo</p>
      </div>
      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={weekly} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="perfFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--foreground)" stopOpacity={0.18} />
                <stop offset="100%" stopColor="var(--foreground)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: "var(--muted-foreground)", fontFamily: "var(--font-mono)" }}
            />
            <YAxis hide />
            <Tooltip
              cursor={{ stroke: "var(--border)", strokeWidth: 1 }}
              contentStyle={{
                background: "var(--foreground)",
                color: "var(--background)",
                border: "none",
                borderRadius: 12,
                fontSize: 11,
                fontFamily: "var(--font-mono)",
              }}
              labelStyle={{ color: "var(--background)", opacity: 0.6 }}
              formatter={(v: number) => [`${v}h`, "Estudo"]}
            />
            <Area
              type="monotone"
              dataKey="h"
              stroke="var(--foreground)"
              strokeWidth={2}
              fill="url(#perfFill)"
              dot={{ r: 3, fill: "var(--background)", stroke: "var(--foreground)", strokeWidth: 2 }}
              activeDot={{ r: 5, fill: "var(--accent)", stroke: "var(--background)", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-4 gap-2 mt-6 pt-5 border-t border-border">
        <MiniStat label="Horas estudo" value="17h00m" />
        <MiniStat label="Concluídas" value="22" />
        <MiniStat label="Total aulas" value="32" />
        <MiniStat label="Revisões" value="04" />
      </div>
    </section>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-sm font-medium tabular-nums">{value}</p>
      <p className="text-[9px] uppercase tracking-widest text-muted-foreground font-mono mt-1">
        {label}
      </p>
    </div>
  );
}

/* ---------- AI Activity ---------- */

function AIActivity() {
  return (
    <section className="bg-white border border-border rounded-3xl p-7 animate-fade-up">
      <SectionHeader icon={Sparkles} title="Atividade da IA" action="Ver tudo" />
      <div className="space-y-3">
        {aiActivity.map((a) => (
          <div
            key={a.label}
            className="flex items-center gap-4 p-3 rounded-2xl hover:bg-secondary/70 transition-colors"
          >
            <div className="size-10 rounded-xl bg-accent/8 text-accent grid place-items-center shrink-0">
              <a.icon className="size-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{a.label}</p>
              <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                {a.meta}
              </p>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground shrink-0">
              3 sem
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Upcoming empty ---------- */

function UpcomingEmpty() {
  return (
    <section className="bg-white border border-dashed border-border rounded-3xl p-12 text-center animate-fade-up">
      <div className="inline-flex flex-col items-center gap-3">
        <div className="size-12 rounded-full bg-secondary text-muted-foreground grid place-items-center">
          <CalendarDays className="size-5" />
        </div>
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-mono text-muted-foreground">
          <span>Próximos compromissos</span>
        </div>
        <p className="font-display text-2xl font-bold">
          Sem compromissos agendados
        </p>
        <p className="text-sm text-muted-foreground max-w-sm">
          Sua agenda está livre. Aproveite para revisar as matérias pendentes.
        </p>
        <a
          href="#"
          className="mt-2 text-xs font-medium text-accent inline-flex items-center gap-1"
        >
          Ver cronograma completo <ChevronRight className="size-3" />
        </a>
      </div>
    </section>
  );
}

/* ---------- Motivational banner ---------- */

function MotivationalBanner() {
  return (
    <section className="relative overflow-hidden bg-foreground text-background rounded-3xl p-10 flex items-center gap-8 animate-fade-up">
      <div className="size-14 rounded-full bg-background/10 grid place-items-center shrink-0 border border-background/15">
        <Target className="size-6 text-accent" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-display text-3xl font-bold mb-2 leading-tight">
          Disciplina hoje, aprovação amanhã.
        </h3>
        <p className="text-sm text-background/60 max-w-xl">
          Você está acumulando conhecimento. Continue sua rotina de estudos
          hoje — pequenos passos, todos os dias.
        </p>
      </div>
      <a
        href="#"
        className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-background text-foreground text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        <Zap className="size-4" />
        Ver hábitos semanais
      </a>
      <div className="absolute -right-16 -bottom-16 size-64 bg-accent/30 blur-3xl rounded-full pointer-events-none" />
    </section>
  );
}
