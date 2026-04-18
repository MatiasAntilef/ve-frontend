# 🎬 Video Editor SaaS (Serverless)

Aplicación web para **subir, procesar y transcribir audio/video** usando arquitectura **serverless en AWS**.  
El objetivo del proyecto es manejar **grandes volúmenes de datos y picos de tráfico** de forma escalable.

---

## 🚀 Features

- 🔐 Autenticación de usuarios con AWS Cognito  
- ☁️ Subida de archivos a S3  
- 🎙️ Transcripción automática de audio  
- 🔊 Conversión de texto a voz  
- ⚡ Procesamiento asíncrono con colas (SQS) *(en progreso)*  
- 📈 Arquitectura preparada para picos de tráfico  

---

## 🏗️ Arquitectura

El proyecto sigue un enfoque **serverless** usando servicios de AWS:

- **Frontend**: Angular  
- **Auth**: AWS Cognito  
- **Storage**: AWS S3  
- **Compute**: AWS Lambda  
- **Transcripción**: AWS Transcribe *(o Whisper como alternativa)*  
- **Text-to-Speech**: AWS Polly  
- **Mensajería**: AWS SQS  

---

## 🧠 ¿Qué problema resuelve?

Esta app simula un escenario real donde:

- Muchos usuarios suben archivos simultáneamente  
- Existen picos de tráfico impredecibles  
- El procesamiento de audio/video es costoso  

➡️ Se resuelve usando arquitectura desacoplada, serverless y procesamiento en segundo plano.

---

## 🛠️ Tecnologías

- Frontend: Angular + TailwindCSS  
- Backend: AWS Lambda (Node.js)  
- Cloud: AWS  
- CI/CD: GitHub Actions  
- Storage: S3  

---

## ⚙️ Configuración

Crear archivo de entorno:

```ts
export const environment = {
  production: true,
  auth: {
    authority: 'YOUR_COGNITO_AUTHORITY',
    clientId: 'YOUR_CLIENT_ID',
    scope: 'openid profile email',
    redirectUrl: 'YOUR_REDIRECT_URL',
    postLogoutRedirectUri: 'YOUR_LOGOUT_REDIRECT_URL',
  },
};


git clone https://github.com/tu-usuario/tu-repo.git
cd ve-frontend
pnpm install
ng serve


