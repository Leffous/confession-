Anon Stories - Firebase-ready hosting

Files:
- firebase.json  (Firebase Hosting config)
- .firebaserc    (placeholder for your project id)
- public/index.html, style.css, script.js

Setup steps:
1. Create a Firebase project at https://console.firebase.google.com/
2. In Project settings -> Add web app -> copy config and paste into public/script.js firebaseConfig.
3. In Firestore -> Create database (choose production or test mode).
4. IMPORTANT: Firestore rules (for open read/write testing, not secure):
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   Use only for private/testing. Tighten for production.
5. Install Firebase CLI: npm install -g firebase-tools
6. In terminal, authenticate: firebase login
7. Initialize in project folder: firebase init hosting
   - Choose existing project, or use the project you created.
   - Set public directory to 'public' and choose single-page app if asked.
8. Deploy: firebase deploy
   Your site will be available as https://<yourproject>.web.app

Notes:
- Posts are anonymous and uncensored (text escaped to avoid HTML injection).
- You are responsible for content. Do not use to host illegal material.
