# ProFit

## Project Description

**ProFit** is a fitness application built with React Native and Expo. The app allows users to create and customize their own workout routines, add exercises to those routines, and explore routines shared by the app and other users. The goal of ProFit is to provide a community-driven platform for fitness enthusiasts to plan and share their workouts effectively.

## Key Features

- **Create Custom Routines**: Users can create personalized workout routines and add exercises tailored to their fitness goals.
- **Explore Shared Routines**: Users can browse routines shared by other users and the app for inspiration.
- **Authentication**: Secure email-based authentication is implemented using Firebase.
- **Data Synchronization**: Routines and exercises are stored in Firebase Realtime Database, allowing real-time updates and synchronization.

### Technologies Used

![React Native](https://img.shields.io/badge/-React_Native-61DAFB?style=flat-square&logo=react&logoColor=white) ![Expo](https://img.shields.io/badge/-Expo-000020?style=flat-square&logo=expo&logoColor=white) ![Redux](https://img.shields.io/badge/-Redux-764ABC?style=flat-square&logo=redux&logoColor=white) ![Firebase Realtime Database](https://img.shields.io/badge/-Firebase_RTD-FFCA28?style=flat-square&logo=firebase&logoColor=black)

- **React Native**: Used for building the cross-platform mobile application.
- **Expo**: Simplifies app development with tools for building and deploying the app.
- **Redux**: Used for managing application state effectively.
- **Firebase Realtime Database**: Stores user data, routines, and exercises in real-time.
- **Firebase Authentication**: Provides secure email-based authentication for user accounts.

---

## Project Execution

### To Run the Project Locally:

1. Clone the repository from [GitHub](https://github.com/tu-usuario/profit).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file to configure your Firebase credentials. Include the following keys:
   ```env
   FIREBASE_API_KEY=your-api-key
   FIREBASE_AUTH_DOMAIN=your-auth-domain
   FIREBASE_DATABASE_URL=your-database-url
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_STORAGE_BUCKET=your-storage-bucket
   FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   FIREBASE_APP_ID=your-app-id
   ```
4. Start the Expo development server:
   ```bash
   expo start
   ```
5. Use the Expo Go app to scan the QR code on your physical device, or run the app on an emulator.

---

## Notes and Acknowledgments

- **Project Status**: The application is **not fully finalized** due to connection issues encountered when working with the API for Firebase Authentication. These issues affected testing both on the emulator and on a physical iOS device. While the core functionalities (routine creation, Firebase integration, etc.) are functional, user authentication and data persistence could not be completed as planned.  
- **Reason for Incompletion**: Given time constraints and connection-related obstacles, the project is currently missing the final implementation of persistence and authentication functionalities.

This project was created by **Mathias Rodao**. Thank you for your understanding of its limitations due to unforeseen technical difficulties.

--------------------------------

# ProFit

## Descripción del Proyecto

**ProFit** es una aplicación de fitness desarrollada con React Native y Expo. Permite a los usuarios crear y personalizar sus propias rutinas de ejercicio, agregar ejercicios a dichas rutinas y explorar rutinas compartidas por la aplicación y otros usuarios. El objetivo de ProFit es proporcionar una plataforma impulsada por la comunidad para que los entusiastas del fitness planifiquen y compartan sus entrenamientos de manera efectiva.

## Funcionalidades Principales

- **Creación de rutinas personalizadas**: Los usuarios pueden crear rutinas de ejercicios adaptadas a sus metas de fitness y agregar ejercicios específicos.
- **Exploración de rutinas compartidas**: Los usuarios pueden buscar rutinas compartidas por otros usuarios o propuestas por la aplicación.
- **Autenticación**: Implementación de autenticación segura basada en correo electrónico utilizando Firebase.
- **Sincronización de datos**: Las rutinas y ejercicios se almacenan en Firebase Realtime Database, lo que permite actualizaciones y sincronización en tiempo real.

### Tecnologías Utilizadas

![React Native](https://img.shields.io/badge/-React_Native-61DAFB?style=flat-square&logo=react&logoColor=white) ![Expo](https://img.shields.io/badge/-Expo-000020?style=flat-square&logo=expo&logoColor=white) ![Redux](https://img.shields.io/badge/-Redux-764ABC?style=flat-square&logo=redux&logoColor=white) ![Firebase Realtime Database](https://img.shields.io/badge/-Firebase_RTD-FFCA28?style=flat-square&logo=firebase&logoColor=black)

- **React Native**: Para desarrollar una aplicación móvil multiplataforma.
- **Expo**: Herramienta que facilita el desarrollo y despliegue de la aplicación.
- **Redux**: Para gestionar de forma efectiva el estado de la aplicación.
- **Firebase Realtime Database**: Para almacenar los datos de usuarios, rutinas y ejercicios en tiempo real.
- **Firebase Authentication**: Proporciona una autenticación segura basada en correo electrónico para las cuentas de los usuarios.

---

## Ejecución del Proyecto

### Pasos para Ejecutar Localmente:

1. Clona el repositorio desde [GitHub](https://github.com/tu-usuario/profit).
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Crea un archivo `.env` para configurar tus credenciales de Firebase. Incluye las siguientes claves:
   ```env
   FIREBASE_API_KEY=tu-api-key
   FIREBASE_AUTH_DOMAIN=tu-auth-domain
   FIREBASE_DATABASE_URL=tu-database-url
   FIREBASE_PROJECT_ID=tu-project-id
   FIREBASE_STORAGE_BUCKET=tu-storage-bucket
   FIREBASE_MESSAGING_SENDER_ID=tu-messaging-sender-id
   FIREBASE_APP_ID=tu-app-id
   ```
4. Inicia el servidor de desarrollo de Expo:
   ```bash
   expo start
   ```
5. Usa la aplicación **Expo Go** para escanear el código QR en tu dispositivo físico o ejecuta la app en un emulador.

---

## Notas y Reconocimientos

- **Estado del Proyecto**: La aplicación está **incompleta** debido a problemas de conexión al trabajar con la API de autenticación de Firebase. Estos problemas afectaron las pruebas tanto en el emulador como en un dispositivo físico con iOS. Aunque las funcionalidades principales (creación de rutinas, integración con Firebase, etc.) son funcionales, la autenticación de usuarios y la persistencia de datos no pudieron completarse según lo planeado.
- **Razón de la Incompletitud**: Debido a limitaciones de tiempo y dificultades técnicas relacionadas con la conexión, el proyecto carece de la implementación final de estas funcionalidades.

Este proyecto fue creado por **Mathias Rodao**. Gracias por tu comprensión sobre sus limitaciones debido a dificultades técnicas imprevistas.