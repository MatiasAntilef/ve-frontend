# 🎬 Serverless Video Processing App (MVP)

Aplicación web para subir videos y procesarlos en la nube usando una arquitectura **serverless en AWS**.

## 🚀 Objetivo

Permitir a los usuarios:

- Subir videos
- Transcribir audio automáticamente
- (Próximamente) generar doblaje con IA

Todo de forma **asíncrona, escalable y desacoplada**.

---

## 🧠 Arquitectura

El sistema está basado en un enfoque de **jobs + colas**:

1. El usuario crea un video (job)
2. El frontend sube el archivo directamente a S3
3. Se envían tareas a una cola (SQS)
4. Lambdas procesan:
   - Transcripción (AWS Transcribe)
   - (Futuro) Doblaje (AWS Polly)
5. DynamoDB guarda el estado del proceso

---

## 🧩 Stack

### Frontend
- Angular
- Tailwind / UI components
- Auth con AWS Cognito

### Backend (Serverless)
- AWS Lambda
- API Gateway
- DynamoDB
- S3 (storage)
- SQS (colas)
- AWS Transcribe
- (Próximamente) AWS Polly

### DevOps
- CI/CD con GitHub Actions
- Deploy a S3 (frontend)

---

## 🔄 Flujo principal

```text
Frontend → API (crear job)
Frontend → S3 (upload directo)
SQS → Lambda (procesamiento)
Lambda → DynamoDB (estado)
Frontend → API (consulta estado)
