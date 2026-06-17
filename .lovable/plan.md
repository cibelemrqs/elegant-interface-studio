# Dashboard Global (`/dashboard`)

Página nova, separada da Visão Geral atual (que continua em `/` como visão de uma área). Mantém a linguagem Glass Academic já estabelecida (off-white, serifa Cormorant para títulos, pílulas pretas, accent âmbar, glass sutil) e introduz uma composição **bento editorial** — blocos de tamanhos diferentes, mais "capa de revista de produtividade" do que dashboard SaaS.

## Princípios de design

- Não replicar a Visão Geral. Aqui o protagonista é o **conjunto de áreas + o dia de hoje**, não uma única área.
- Hierarquia editorial: um headline grande ("Boa noite, [nome]. Hoje é terça, 16 jun.") + sub-linha com a próxima melhor ação.
- Composição bento assimétrica em grid 12 col, com blocos de 1–2 alturas. Bordas finas, raio 2xl, glass leve em superfícies sobrepostas.
- Sem cores novas — só os tokens já definidos em `styles.css`. Accent âmbar usado com parcimônia (no bloco de Foco, no heatmap mais intenso e em micro-detalhes).

## Layout (desktop)

```text
┌───────────────────────────────────────────────────────────────┐
│  HEADER editorial: saudação + data + busca/⌘K + "+ Nova Aula" │
├──────────────────────────────┬────────────────────────────────┤
│  FOCO AGORA (col-span-8)     │  PROGRESSO GLOBAL (col-span-4) │
│  Próxima melhor ação +       │  Ring grande agregando todas   │
│  botão "Iniciar sessão" +    │  as áreas + 4 micro-stats      │
│  timeline horizontal do dia  │  (aulas, revisões, horas, streak)│
├──────────────┬───────────────┴────────────────────────────────┤
│ ÁREAS (8)    │  PLANEJAMENTO HOJE (col-span-4)                │
│ Tabela-card  │  Tabs Hábitos | Agenda                         │
│ comparativa  │  Lista enxuta com checkboxes                   │
│ 4 áreas:     │  Link "ver planejamento completo →"            │
│ nome, %,     ├────────────────────────────────────────────────┤
│ barra, ritmo,│  IMPORTAR CONTEÚDO (col-span-4)                │
│ próxima aula │  3 mini-cards (Curso / Vídeo / Arquivo)        │
├──────────────┴────────────────────────────────────────────────┤
│  CONSISTÊNCIA — heatmap 7×N (col-span-8) │ TENDÊNCIA (col-4)  │
│  Grid estilo GitHub, últimos ~12 semanas │ AreaChart 4 semanas│
│  intensidade em âmbar                    │ + delta vs anterior│
├───────────────────────────────────────────────────────────────┤
│  BANNER motivacional preto (full width, igual home)           │
└───────────────────────────────────────────────────────────────┘
```

Mobile: tudo vira uma coluna, ordem = Header → Foco → Progresso → Áreas → Planejamento → Importar → Heatmap → Tendência → Banner.

## Blocos em detalhe

1. **Header editorial** — saudação em Cormorant + data em mono uppercase. `⌘K` à direita, botão pill preto "+ Nova Aula". Breadcrumb "Início".
2. **Foco Agora** — card destacado com fundo levemente acentuado (glass + tint âmbar 4%). Mostra "Próxima melhor ação" (área + aula sugerida pelo critério: menor progresso + revisão atrasada), botão preto "Iniciar sessão de 25 min", e abaixo uma **timeline horizontal** do dia (00–24h) com blocos para sessões planejadas, revisões e compromissos da agenda.
3. **Progresso Global** — ring SVG grande com % médio ponderado das áreas + 4 stat tiles (Aulas concluídas, Revisões esta semana, Horas, Streak 🔥).
4. **Áreas (comparativo)** — lista-tabela editorial das áreas: avatar de iniciais, nome, barra fina, % grande em Cormorant, ritmo (aulas/semana), próxima aula. Hover = linha sutil. Click → leva pra Visão Geral daquela área. Linha tracejada final "+ Nova área".
5. **Planejamento Hoje** — Tabs `Hábitos | Agenda`. Hábitos: lista de até 4 itens com checkbox + streak. Agenda: até 3 próximos compromissos com data. Footer link "Ver planejamento completo →" (placeholder por enquanto).
6. **Importar Conteúdo** — versão compacta dos 3 cards (Curso / Vídeo / Arquivo) já existentes, em coluna vertical pra caber no slot.
7. **Consistência (heatmap)** — grid 7 linhas × ~12 colunas (84 dias). Intensidade 0–4 com âmbar (do muted ao accent). Tooltip simples no hover. Legenda discreta "menos → mais".
8. **Tendência** — AreaChart de horas estudadas por semana (últimas 4–8 semanas) + delta % vs período anterior em chip.
9. **Banner motivacional** — reaproveita o componente preto já criado.

## Dados mockados

Tudo client-side por enquanto (sem Cloud). Crio um módulo `src/lib/dashboard-data.ts` com:
- `areas[]` (4 áreas iguais às da home + metadados de ritmo/próxima aula)
- `todayTimeline[]` (blocos de hora)
- `habits[]`, `agenda[]`
- `heatmap` (array de 84 ints 0–4 gerados deterministicamente)
- `weeklyTrend[]` (4–8 pontos)
- `globalStats` (agregados)

Sem alterar dados da home.

## Arquivos

- **Novo** `src/routes/dashboard.tsx` — rota + composição da página.
- **Novo** `src/lib/dashboard-data.ts` — mocks tipados.
- **Novo** `src/components/dashboard/` — `FocusNow.tsx`, `GlobalProgress.tsx`, `AreasTable.tsx`, `TodayPlanner.tsx`, `ImportStack.tsx`, `ConsistencyHeatmap.tsx`, `TrendCard.tsx`, `DashboardHeader.tsx`. Cada um pequeno e focado.
- **Editado** `src/routes/index.tsx` — apenas adiciona link "Dashboard global →" no topo (1 linha) pra navegação. Conteúdo da home não muda.
- `routeTree.gen.ts` é regenerado automaticamente.

## Fora de escopo

- Persistência / Lovable Cloud (fica pra próxima iteração quando o usuário pedir).
- Página de Planejamento completa (`/planejamento`) — o card aqui só linka.
- Mexer na Visão Geral / sidebar existente além do link de acesso.
