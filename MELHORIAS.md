# Melhorias sugeridas para o Front-end

## O que já está bom

- Uso de React com TypeScript e Vite.
- Layout com cards e modais de criar/editar/excluir.
- Uso de `react-query` para carregar e invalidar dados.
- Feedback ao usuário com `react-hot-toast`.

## O que dá para melhorar sem complicar muito

### 1. Centralizar o `API_URL`
Hoje o endereço `http://localhost:8080` está repetido em vários hooks. Crie um arquivo de configuração simples, como `src/config/api.ts`, ou use `import.meta.env.VITE_API_URL` para facilitar mudança entre ambientes.

### 2. Separar chamadas de API
Uma camada `src/services/api.ts` deixa o código mais limpo. Exemplo:
- `getFoods()`
- `createFood(data)`
- `updateFood(data)`
- `deleteFood(id)`

Isso evita duplicação e torna mais fácil adicionar tratamento de erro centralizado.

### 3. Validar melhor o formulário
Os campos já são verificados, mas o `price` ainda aceita valores negativos ou formato estranho. Use validação de número com `min="0.01"` e converta corretamente antes de enviar.

### 4. Melhorar o UX no formulário de imagem
Quando a URL de imagem estiver vazia ou inválida, mostre uma imagem de fallback no card para não quebrar a interface.

### 5. Organizar os componentes
O `App.tsx` já está funcionando, mas pode ser dividido em:
- `Header`
- `SearchBar`
- `FoodGrid`
- `FoodListItem` ou `FoodCard`

Isso facilita manutenção quando o projeto crescer.

### 6. Usar `index.css` para reset global ou apagar se não for usado
Hoje `src/index.css` está vazio; ou adicione estilos globais importantes, ou remova/importação se não estiver em uso.

### 7. Responsividade leve
O layout está básico e deve funcionar bem, mas pode ganhar:
- espaçamento mais suave em telas pequenas
- cards mais estreitos
- botão principal sempre visível

## Sugestões extras opcionais

- Adicionar testes simples com Vitest + React Testing Library.
- Criar um `README.md` pequeno no front explicando como rodar `npm install` e `npm run dev`.
- Adicionar animações suaves nos cards ou modais somente se quiser um visual mais polido.

## Prioridade recomendada

1. Centralizar `API_URL`
2. Criar um serviço de API centralizado
3. Melhorar validação/formulário
4. Adicionar imagem fallback
5. Organizar componentes em pequenos arquivos
6. Incluir README de execução
