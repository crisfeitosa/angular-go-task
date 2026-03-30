# ✅ GoTask

<p align="center">
  Aplicação de gerenciamento de tarefas estilo Kanban, desenvolvida com <strong>Angular 19</strong> como parte da trilha Angular da <a href="https://www.rocketseat.com.br/">Rocketseat</a>.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Angular-19-DD0031?logo=angular&logoColor=white" alt="Angular 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/RxJS-7.8-B7178C?logo=reactivex&logoColor=white" alt="RxJS" />
</p>

---

## 📖 Sobre

O **GoTask** é um quadro Kanban interativo que organiza tarefas em três colunas — **A Fazer**, **Fazendo** e **Concluído**. Permite criar, editar, excluir e comentar tarefas, com drag & drop entre colunas e persistência automática no navegador.

## ⚡ Funcionalidades

| Funcionalidade     | Descrição                                                                  |
| ------------------ | -------------------------------------------------------------------------- |
| ✏️ CRUD de tarefas | Criar, editar e excluir tarefas com validação de formulários               |
| 🖱️ Drag & Drop     | Arrastar e soltar tarefas entre colunas e reordenar dentro da mesma coluna |
| 💬 Comentários     | Adicionar e remover comentários em cada tarefa                             |
| 🔒 Validação       | Campos obrigatórios com mínimo de 10 caracteres (Reactive Forms)           |
| 💾 Persistência    | Dados salvos automaticamente no `localStorage`                             |
| 📱 Responsivo      | Layout adaptável para desktop e mobile                                     |

## 🛠️ Tecnologias

| Tecnologia                                                                       | Versão    | Uso                                         |
| -------------------------------------------------------------------------------- | --------- | ------------------------------------------- |
| [Angular](https://angular.dev/)                                                  | 19.2      | Framework principal (standalone components) |
| [Angular CDK](https://material.angular.io/cdk/)                                  | 19.2      | Drag & Drop e Dialog                        |
| [RxJS](https://rxjs.dev/)                                                        | 7.8       | Estado reativo com `BehaviorSubject`        |
| [Tailwind CSS](https://tailwindcss.com/)                                         | 4.1       | Estilização utilitária                      |
| [TypeScript](https://www.typescriptlang.org/)                                    | 5.7       | Tipagem estática                            |
| [Jasmine](https://jasmine.github.io/) + [Karma](https://karma-runner.github.io/) | 5.6 / 6.4 | Testes unitários                            |

## 🏗️ Arquitetura

O projeto segue uma organização em camadas inspirada em Domain-Driven Design:

```
src/app/
├── core/                               # Serviços singleton e layout
│   ├── interfaces/                     # Contratos de formulários e modais
│   ├── layout/
│   │   ├── header/                     # Navegação superior (logo, avatar)
│   │   └── welcome-section/            # Banner de boas-vindas + botão criar
│   └── services/
│       ├── task.service.ts             # Estado e operações de tarefas (BehaviorSubjects)
│       └── modal-controller.service.ts # Orquestração de modais (CDK Dialog)
│
├── domain/                             # Modelos de domínio
│   └── tasks/
│       ├── interfaces/                 # ITask, IComment
│       ├── enums/                      # TaskStatusEnum (TO_DO, DOING, DONE)
│       └── types/                      # TaskStatus union type
│
├── features/                           # Funcionalidades da aplicação
│   └── tasks/components/
│       ├── main-content/               # Container principal
│       ├── task-list-section/          # Quadro Kanban com 3 colunas
│       ├── task-card/                  # Card individual com ações
│       ├── task-form-modal/            # Modal de criação/edição
│       └── task-comments-modal/        # Modal de comentários
│
└── shared/                             # Utilitários compartilhados
    └── utils/
        └── generate-unique-id-with-timestamp.ts
```

### Padrões utilizados

- **Standalone Components** — sem módulos, cada componente declara suas dependências
- **Estado reativo** — `BehaviorSubject` por status de tarefa com `structuredClone` para imutabilidade
- **Auto-persistência** — operador `tap` nos observables salva no `localStorage` a cada mudança
- **Injeção de dados em modais** — token `DIALOG_DATA` do CDK para passar dados aos modais
- **IDs únicos** — timestamp em base-36 combinado com string aleatória

## 🚀 Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) v18+
- npm

### Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd angular-go-task

# Instale as dependências
npm install
```

### Servidor de desenvolvimento

```bash
npm start
```

Acesse [http://localhost:4200](http://localhost:4200). A aplicação recarrega automaticamente ao salvar alterações.

### Build de produção

```bash
npm run build
```

Os artefatos são gerados no diretório `dist/`.

### Testes unitários

```bash
npm test
```

## 🎨 Paleta de Cores

| Cor        | Hex       | Uso                     |
| ---------- | --------- | ----------------------- |
| 🔵 Azul    | `#2A89EF` | Ações primárias, botões |
| 🟠 Laranja | `#FF850A` | Coluna "Fazendo"        |
| 🟢 Verde   | `#15BE78` | Coluna "Concluído"      |

## 📝 Modelos de Dados

```typescript
interface ITask {
  id: string;
  name: string;
  description: string;
  status: TaskStatus; // 'to-do' | 'doing' | 'done'
  comments: IComment[];
}

interface IComment {
  id: string;
  description: string;
}
```

## 📄 Licença

Projeto educacional desenvolvido na trilha Angular da [Rocketseat](https://www.rocketseat.com.br/). 💜
