# Alterações desta cópia

## Implementado
- Cadastro real no PostgreSQL via Prisma, com senha protegida por bcrypt e normalização do e-mail.
- Login com comparação bcrypt e emissão de token JWT HS256 assinado usando `node:crypto` (sem dependência JWT adicional).
- Middleware Bearer para validar assinatura e expiração do token.
- Middleware de autorização para perfis `aluno` e `professor`, com rotas demonstrativas protegidas.
- Consulta do usuário autenticado em `GET /auth/me`.
- Recuperação de senha com token aleatório, armazenamento apenas do hash, validade de 30 minutos e uso único.
- Envio de e-mail pelo serviço Resend quando configurado.
- Tela mobile de redefinição de senha com deep link `educamais://reset-password?token=...`.
- Frontend chama a API real e não simula cadastro/recuperação.
- Testes atualizados para validação, token e permissões; integração PostgreSQL é condicional a `DATABASE_URL`.

## Configuração necessária
O ZIP não inclui credenciais, banco de dados, nem chaves secretas. Configure os arquivos `.env` seguindo os `.env.example` em `backend/` e `frontend/`. Em produção, configure `JWT_SECRET` forte, PostgreSQL e credenciais Resend.

## Limitações conhecidas
- O token de login fica em memória no app e é perdido ao fechar/reiniciar o aplicativo; será necessário entrar novamente.
- Sem `RESEND_API_KEY` e `EMAIL_FROM`, a recuperação funciona apenas em modo local: o backend escreve o link no terminal e disponibiliza token de desenvolvimento na resposta. Isso não deve ser usado em produção.
- O ambiente desta execução não conseguiu instalar as dependências via `npm ci`; por isso não foi possível confirmar build/testes automatizados. Execute `npm install`, `npx prisma generate`, `npx prisma migrate deploy`, `npm run build` e `npm test` no backend após configurar o banco.
