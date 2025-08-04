# 🍽️ Cardápio Digital - Frontend

Um sistema moderno e elegante para gerenciamento de cardápios digitais, desenvolvido com React, TypeScript e Vite. 

## 📋 Sobre o Projeto

Este é o frontend de um sistema de cardápio digital que permite visualizar e gerenciar itens de um menu de restaurante. A aplicação oferece uma interface moderna e responsiva para criar, visualizar e organizar produtos do cardápio.

### ✨ Funcionalidades

- 📱 **Interface Responsiva**: Design adaptado para desktop e mobile
- 🍕 **Visualização de Cardápio**: Cards elegantes com imagens, títulos e preços
- ➕ **Adicionar Itens**: Modal moderno para criar novos itens do cardápio
- 🎨 **Design Moderno**: Interface com gradientes, animações e sombras
- 🔔 **Notificações**: Feedback visual com toast notifications
- ⚡ **Performance**: Cache inteligente de dados com React Query

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 19** - Biblioteca para construção de interfaces
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Build tool moderna e rápida
- **CSS3** - Estilização com variáveis CSS e animações

### Gerenciamento de Estado
- **TanStack React Query** - Cache e sincronização de dados do servidor
- **React Hooks** - Gerenciamento de estado local

### Comunicação com API
- **Axios** - Cliente HTTP para requisições à API
- **React Hot Toast** - Notificações elegantes

### Qualidade de Código
- **ESLint** - Linting e padronização de código
- **TypeScript** - Tipagem estática para maior segurança

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   └── card/           # Componente de card
│       ├── card.tsx
│       ├── card.css
│       └── create-modal/    # Modal de criação
│           ├── create-modal.tsx
│           └── create-modal.css
├── hooks/              # Custom hooks
│   ├── useFoodData.ts         # Hook para buscar dados
│   └── userFoodDataMutate.ts  # Hook para mutações
├── interface/          # Definições de tipos TypeScript
│   └── FoodData.ts
├── App.tsx            # Componente principal
├── App.css            # Estilos globais
└── main.tsx           # Ponto de entrada da aplicação
```

## 🛠️ Instalação e Configuração

### Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **API Backend** rodando na porta 8080

### 1. Clone o repositório

```bash
git clone https://github.com/LucasSodreira/cardapio-front.git
cd cardapio-front
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure a API

Certifique-se de que sua API está rodando em `http://localhost:8080` com os seguintes endpoints:

- `GET /food` - Listar todos os itens do cardápio
- `POST /food` - Criar novo item do cardápio

### 4. Execute o projeto

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 📱 Como Usar

### Visualizar Cardápio
- Os itens do cardápio são exibidos automaticamente em cards elegantes
- Cada card mostra a imagem, título e preço do item

### Adicionar Novo Item
1. Clique no botão flutuante "Criar Novo Item"
2. Preencha os campos obrigatórios:
   - **Título**: Nome do item
   - **Preço**: Valor em reais
   - **URL da Imagem**: Link para a imagem do produto
3. Clique em "Criar" para adicionar o item

### Fechar Modal
- Clique no "X" no canto superior direito
- Clique no botão "Cancelar"
- Clique fora da área do modal

## 🎨 Design System

### Cores Principais
- **Primária**: Gradiente azul-roxo (#667eea → #764ba2)
- **Secundária**: Gradiente roxo-azul (#6a11cb → #2575fc)
- **Background**: Branco (#ffffff)
- **Texto**: Cinza escuro (#333)

### Componentes
- **Cards**: Bordas arredondadas, sombras e hover effects
- **Botões**: Gradientes, transições suaves e estados visuais
- **Modal**: Backdrop blur, animações de entrada e saída
- **Inputs**: Focus states e validação visual

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Linting
npm run lint

# Preview da build
npm run preview
```

## 📦 Estrutura da API

### Modelo de Dados (FoodData)

```typescript
interface FoodData {
  id?: number;
  title: string;
  price: number;
  image: string;
}
```

### Endpoints Esperados

```bash
# Listar itens
GET /food
Response: FoodData[]

# Criar item
POST /food
Body: { title: string, price: number, image: string }
Response: FoodData
```

## 🚀 Deploy

### Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`

### Variáveis de Ambiente

Para deploy em produção, configure a URL da API:

```env
VITE_API_URL=https://sua-api.com
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Lucas Sodreira**
- GitHub: [@LucasSodreira](https://github.com/LucasSodreira)

## 📞 Suporte

Se você tiver alguma dúvida ou problema, sinta-se à vontade para abrir uma [issue](https://github.com/LucasSodreira/cardapio-front/issues) no GitHub.

---

⭐ Se este projeto te ajudou, não esqueça de dar uma estrela no repositório!
