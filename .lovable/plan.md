# Revisão do /dashboard

Não mexer no layout geral nem nos tokens. Só refazer 5 blocos que ficaram fora do padrão Glass Academic.

## 1. Foco Agora — manter, redesenhar timeline

- Mantém headline "Próxima melhor ação" + área + aula + pílula preta "Iniciar sessão 25 min".
- Timeline redesenhada:
  - Régua horizontal limpa, marcadores de 3h (00 · 03 · 06 · 09 · 12 · 15 · 18 · 21), mono pequeno.
  - Blocos maiores (altura ~56px), com título da aula legível dentro + área em mono uppercase + duração à direita. Sem cortar texto.
  - Etiqueta no canto do bloco usando o vocabulário do app: **Para ler** (outline), **Revisar** (âmbar suave), **Concluído** (preto/check). Nada de "agenda" ou "hábitos".
  - Linha "agora" vertical em âmbar com label `AGORA · 14:32`.
  - Hover do bloco abre tooltip simples (sem popover pesado).
- Sem inventar mais campos. 3–5 blocos no dia.

## 2. Importar Conteúdo — bento claro, 4 cards distintos

Sai o bloco preto inteiro. Volta pro papel off-white da página, mas com peso visual real (não card SaaS genérico).

Grid bento 12 col, 4 cards de tamanhos diferentes (não 4 iguais):

```text
┌─────────────────────────┬─────────────────┐
│ 1. Plataforma de curso  │ 2. YouTube       │
│    (col-span-7, alto)   │   (col-span-5)   │
├──────────────┬──────────┴──────────────────┤
│ 3. Áudio     │ 4. Texto / Legenda          │
│ gravado      │    (col-span-7)             │
│ (col-span-5) │                             │
└──────────────┴─────────────────────────────┘
```

Cada card: borda fina, raio 2xl, hover sutil (lift + accent), ícone próprio, título serifa, 1 linha de descrição, tags do método, CTA pílula preta pequena "Começar".

Conteúdo de cada um (textos exatos para evitar improviso):

1. **Plataforma de curso** (destaque, maior)
   - Subtítulo: "Hotmart, Kiwify, Eduzz, Memberkit, Udemy, Coursera…"
   - 2 caminhos lado a lado dentro do card:
     - **Por link/código** — "Mostramos como pegar o link da aula"
     - **Extensão Chrome** — "Captura áudio (ou legenda, se houver) direto do player"
   - Linha final: "Anexe PDFs e materiais da aula como complemento para a IA"
   - CTA: "Importar aula" + link discreto "Instalar extensão →"

2. **YouTube** (médio)
   - "Cole o link. Usamos a transcrição/legenda quando existe — bem mais rápido."
   - Input inline `https://youtube.com/…` + botão preto "Importar"
   - Tag: `link · transcrição`

3. **Áudio gravado** (médio)
   - "Aulas próprias, reuniões, gravações pessoais (MP3, MP4, M4A, WAV)"
   - Dropzone compacto "Arraste ou selecione"
   - Tag: `upload`

4. **Texto ou legenda colada** (largo, finaliza)
   - "Para plataformas que mostram a transcrição na própria página — copie, cole aqui e a IA gera o resumo sem precisar do áudio."
   - Textarea baixa (3 linhas visíveis) + botão "Gerar resumo"
   - Tag: `colar texto`

Tom editorial, sem dark glass. Mesmo papel da página.

## 3. Áreas (comparativo) — recolorir

Problema: avatares com gradientes coloridos fugiram do app.

- Avatares: círculo preto com iniciais brancas em serifa (`PT`, `MK`…), OU off-white com borda fina e iniciais pretas. Sem gradientes coloridos.
- Barras de progresso: trilho `border` / preenchimento `foreground` (preto). Accent âmbar só quando ritmo está acima da meta (microdetalhe).
- % grande em Cormorant preto. Ritmo e próxima aula em mono uppercase muted.
- Linha "+ Nova área" tracejada mantém.

## 4. Planejamento de Hoje — redesenho caprichado

Sai Hábitos/Agenda. Vira o "mapa do dia de estudo" — protagonista do quadrante direito.

Estrutura:

- Header do card: data extensa em serifa ("terça, 16 jun") + chip mono `3 de 5 concluídas`.
- Ring pequeno (~64px) à esquerda do header mostrando progresso do dia (aulas feitas / planejadas).
- **Lista das aulas planejadas para hoje** (4–5 itens), cada linha:
  - Checkbox circular grande à esquerda (preto quando marcado).
  - Título da aula em serifa + área em mono uppercase pequena embaixo.
  - À direita: etiqueta `Para ler` / `Revisar` / `Concluído` + duração estimada (`25 min`).
  - Item atual: fundo papel levemente acentuado + barra âmbar à esquerda.
  - Concluído: título com strike sutil e opacity reduzida.
- Rodapé: linha fina + botão pílula outline "Adicionar à fila" + link "Ver semana →".
- Micro-detalhe: ao concluir, animação fade do item pro fim da lista (motion já presente).

Sem tabs. Um card único, denso mas elegante.

## 5. Consistência → **Streak + Marcos**

Remove heatmap. Novo card no mesmo slot:

- Número grande Cormorant: dias seguidos (`47`) + label "dias de estudo seguidos" e fogo âmbar discreto.
- Linha mono: "Recorde pessoal: 62 dias · Iniciou em 12 mai".
- **Trilho de marcos** horizontal: 7 · 30 · 100 · 365 dias.
  - Pontos pretos para marcos atingidos, círculo vazio outline para os pendentes, linha fina conectando.
  - Marco atual em destaque com label do próximo (`próximo: 100 dias em 53 dias`).
- Barra de progresso até o próximo marco (preto sobre trilho border, % em mono à direita).
- Sem grid, sem 84 quadradinhos.

## Arquivos

- `src/routes/dashboard.tsx` — edita 5 blocos no lugar (FocusNow, ImportStack, AreasComparative, TodayPlanner, substitui ConsistencyHeatmap por StreakMilestones). Mantém TrendCard, GlobalProgress, header e banner.
- Sem mudanças em tokens (`styles.css`), sem novo arquivo de dados, sem mexer em `index.tsx`/sidebar/rotas.

## Fora de escopo

- Persistência / Cloud.
- Fluxos reais de importação (extensão, upload, transcrição) — só UI da entrada.
- Página de planejamento completa.
- Mudar GlobalProgress, Tendência ou banner.