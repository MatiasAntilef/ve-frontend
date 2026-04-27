# 🎬 Video Editor SaaS (Serverless)

Aplicación web para **subir, procesar y transcribir audio/video** usando arquitectura **serverless en AWS**.  
El objetivo del proyecto es manejar **grandes volúmenes de datos y picos de tráfico** de forma escalable.

---


<img width="1413" height="897" alt="image" src="https://github.com/user-attachments/assets/8f026005-2a7b-44f3-9e1c-14a6ed180bc7" />


## 🚀 Features

- 🔐 Autenticación de usuarios con AWS Cognito  
- ☁️ Subida de archivos a S3  
- 🎙️ Transcripción automática de audio  
- 📈 Arquitectura preparada para picos de tráfico

---

## 🏗️ Arquitectura

El proyecto sigue un enfoque **serverless** usando servicios de AWS:

- **Frontend**: Angular  
- **Auth**: AWS Cognito  
- **Storage**: AWS S3  
- **Compute**: AWS Lambda  
- **Transcripción**: AWS Transcribe

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


