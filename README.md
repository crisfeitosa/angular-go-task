# ✅ GoTask

Aplicação de gerenciamento de tarefas estilo Kanban, desenvolvida com **Angular 19** como parte da trilha Angular da [Rocketseat](https://www.rocketseat.com.br/). 🚀

Organize suas tarefas em três colunas — **📋 A Fazer**, **🔧 Fazendo** e **✅ Concluído** — com drag & drop, comentários e persistência local.

## ⚡ Funcionalidades

- ✏️ Criar, editar e excluir tarefas
- 🖱️ Arrastar e soltar tarefas entre colunas (drag & drop)
- 💬 Adicionar e remover comentários nas tarefas
- 🔒 Validação de formulários (mínimo de 10 caracteres)
- 💾 Persistência de dados via `localStorage`
- 📱 Interface responsiva com Tailwind CSS

## 🛠️ Tecnologias

- 🅰️ [Angular 19](https://angular.dev/) — Framework principal (standalone components)
- 📦 [Angular CDK](https://material.angular.io/cdk/) — Drag & Drop
- ⚡ [RxJS](https://rxjs.dev/) — Gerenciamento de estado reativo (BehaviorSubjects)
- 🎨 [Tailwind CSS 4](https://tailwindcss.com/) — Estilização
- 🔷 [TypeScript 5.7](https://www.typescriptlang.org/)

## 🏗️ Estrutura do Projeto

```
src/app/
├── components/
│   ├── header/                 # Navegação superior
│   ├── main-content/           # Layout principal
│   ├── welcome-section/        # Banner de boas-vindas + criar tarefa
│   ├── task-list-section/      # Quadro Kanban com 3 colunas
│   ├── task-card/              # Card individual de tarefa
│   ├── task-form-modal/        # Modal de criação/edição de tarefa
│   └── task-comments-modal/    # Modal de comentários
├── services/
│   ├── task.service.ts         # Estado e operações de tarefas
│   └── modal-controller.service.ts  # Controle de modais (CDK Dialog)
├── interfaces/                 # Tipagens (ITask, IComment, etc.)
├── enums/                      # TaskStatusEnum
├── types/                      # TaskStatus type
└── utils/                      # Geração de IDs únicos
```

## 🚀 Como Executar

### 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) (v18+)
- npm ou yarn

### 📥 Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd angular-go-task

# Instale as dependências
npm install
```

### 🖥️ Servidor de desenvolvimento

```bash
npm start
```

Acesse [http://localhost:4200](http://localhost:4200). A aplicação recarrega automaticamente ao salvar alterações.

### 📦 Build de produção

```bash
npm run build
```

Os artefatos são gerados no diretório `dist/`.

### 🧪 Testes

```bash
npm test
```

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais na trilha Angular da Rocketseat. 💜
