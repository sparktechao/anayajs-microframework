

# AnayaJS Microframework

AnayaJS é um microframework Node.js com TypeScript, Prisma, `tsyringe` para injeção de dependências e diversas funcionalidades integradas para facilitar o desenvolvimento de aplicações web modernas.

## Sumário

- [Instalação](#instalação)
- [Configuração](#configuração)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [CLI](#cli)
- [Uso](#uso)
- [Testes](#testes)
- [Documentação da API](#documentação-da-api)
- [Tratamento de Erros](#tratamento-de-erros)
- [Licença](#licença)

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/sparktechao/anayajs-microframework.git
cd anayajs-microframework
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente necessárias:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase"
JWT_SECRET="seu-segredo-jwt"
PORT=5000
```

## Scripts Disponíveis

No diretório do projeto, você pode executar:

### `npm start`

Compila e executa o servidor.

### `npm run dev`

Usa `nodemon` para reiniciar automaticamente o servidor ao detectar mudanças nos arquivos.

### `npm run build`

Compila o código TypeScript para JavaScript na pasta `dist`.

### `npm test`

Executa os testes usando `jest`.

## Estrutura do Projeto

```bash
anayajs-microframework/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── common/
│   │   ├── config/
│   │   │   ├── config.ts
│   │   │   ├── db.ts
│   │   ├── decorators/
│   │   │   ├── httpMethods.ts
│   │   │   ├── useMiddleware.ts
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.ts
│   │   │   └── validationMiddleware.ts
│   │   ├── services/
│   │   │   └── prismaService.ts
│   │   └── utils/
│   │       └── logger.ts
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── controllers/
│   │   │   │   └── authController.ts
│   │   │   ├── dtos/
│   │   │   │   └── authDTO.ts
│   │   │   ├── routes/
│   │   │   │   └── authRoutes.ts
│   │   │   ├── services/
│   │   │       └── authService.ts
│   │   ├── user/
│   │   │   ├── controllers/
│   │   │   │   └── userController.ts
│   │   │   ├── dtos/
│   │   │   │   └── userDTO.ts
│   │   │   ├── routes/
│   │   │   │   └── userRoutes.ts
│   │   │   ├── services/
│   │   │       └── userService.ts
│   ├── loaders/
│   │   ├── express.ts
│   │   └── index.ts
│   ├── types/
│   │   └── index.d.ts
│   └── index.ts
├── .env
├── .gitignore
├── tsconfig.json
├── package.json
├── package-lock.json
└── README.md
```

## CLI

A CLI fornece comandos para gerar controladores e serviços.

### Instalação da CLI

Torne o arquivo CLI executável:

```bash
chmod +x src/cli.ts
```

### Comandos da CLI

#### `generate:controller <name>`

Gera um novo controlador.

```bash
node src/cli.js generate:controller User
```

#### `generate:service <name>`

Gera um novo serviço.

```bash
node src/cli.js generate:service User
```

## Uso

### Adicionar uma Nova Rota

Para adicionar uma nova rota, crie um novo controlador e defina os métodos usando os decorators apropriados.

#### Exemplo de Controlador

```typescript
import { Request, Response, NextFunction } from 'express';
import { autoInjectable } from 'tsyringe';
import { Get, Post, applyRoutes } from '../../common/decorators/httpMethods';

@autoInjectable()
class ExampleController {
  @Get('/')
  async getExample(req: Request, res: Response, next: NextFunction): Promise<void> {
    res.send('GET request to the homepage');
  }

  @Post('/')
  async postExample(req: Request, res: Response, next: NextFunction): Promise<void> {
    res.send('POST request to the homepage');
  }
}

export default applyRoutes(ExampleController);
```

Adicione a nova rota em `src/loaders/express.ts`:

```typescript
import exampleRoutes from '../modules/example/routes/exampleRoutes';

export default ({ app }: { app: express.Application }) => {
  // outras configurações
  app.use('/api/example', exampleRoutes);
  // outras configurações
};
```

## Testes

### Executar Testes

Para executar os testes, use o comando:

```bash
npm test
```

### Adicionar Testes

Adicione seus testes no diretório `__tests__` dentro do módulo correspondente.

#### Exemplo de Teste

```typescript
import request from 'supertest';
import express from 'express';
import exampleRoutes from '../routes/exampleRoutes';

const app = express();
app.use(express.json());
app.use('/example', exampleRoutes);

describe('ExampleController', () => {
  it('should return GET request to the homepage', async () => {
    const response = await request(app).get('/example');
    expect(response.text).toBe('GET request to the homepage');
  });

  it('should return POST request to the homepage', async () => {
    const response = await request(app).post('/example');
    expect(response.text).toBe('POST request to the homepage');
  });
});
```

## Documentação da API

A documentação da API é gerada usando Swagger.

### Acessar a Documentação

A documentação da API estará disponível em:

```
http://localhost:5000/api-docs
```

### Adicionar Documentação

Adicione comentários JSDoc aos seus controladores e modelos para gerar a documentação automaticamente.

#### Exemplo

```typescript
/**
 * @swagger
 * /example:
 *   get:
 *     summary: Retorna um exemplo
 *     responses:
 *       200:
 *         description: Sucesso
 */
```

## Tratamento de Erros

Os erros são tratados por um middleware centralizado.

### Exemplo de Middleware de Erro

```typescript
import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
};
```

## Licença

Este projeto está licenciado sob a Licença MIT.

---

Siga essas instruções para configurar, executar e desenvolver com o AnayaJS. Para mais informações, consulte a documentação ou entre em contato com o autor.
```

