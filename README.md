# Educa+ — projeto atualizado

O repositório contém três partes:
- `EducaMais/`: protótipo mobile Expo que acompanha o repositório original.
- `frontend/`: aplicativo mobile React Native/Expo.
- `backend/`: API Express + TypeScript + Prisma + PostgreSQL.

## Backend

1. Entre em `backend/`.
2. Copie `.env.example` para `.env`.
3. Configure `DATABASE_URL` com seu PostgreSQL.
4. Defina `JWT_SECRET` com uma chave aleatória forte (mínimo 32 caracteres).
5. Configure `RESEND_API_KEY` e `EMAIL_FROM` para enviar recuperação de senha por e-mail.
6. Instale dependências e gere o Prisma Client:

```bash
npm install
npx prisma generate
npx prisma migrate deploy
npm run dev
```

A API inicia na porta 3000 por padrão. Rotas:
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me` (Bearer token)
- `GET /auth/student` (somente aluno)
- `GET /auth/teacher` (somente professor)
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `GET /health`

Em desenvolvimento, sem credenciais do Resend, o endpoint de recuperação registra o link no terminal e pode devolver `developmentResetToken`. Esse comportamento é desativado em produção. Em produção, configure o Resend para que o e-mail seja enviado de verdade.

## Frontend

1. Entre em `frontend/`.
2. Copie `.env.example` para `.env`.
3. Ajuste `EXPO_PUBLIC_API_URL`:
   - Android Emulator: `http://10.0.2.2:3000`
   - iOS Simulator/Web: `http://localhost:3000`
   - Celular físico: `http://IP-DO-COMPUTADOR-NA-REDE:3000`
4. Execute `npm install` e `npx expo start`.

O token de acesso fica em memória durante a sessão do app. Fechar/reiniciar o aplicativo exige novo login. O link de recuperação abre `educamais://reset-password?token=...` e permite cadastrar uma nova senha.

## Testes

Em `backend/`, execute `npm test`. Os testes de validação e token não exigem banco. Os testes de integração com PostgreSQL só rodam quando `DATABASE_URL` estiver configurada; use um banco exclusivo de testes.
