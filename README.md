# 📁 FDrive

A simple Google Drive-inspired file storage app built using **Firebase**.  
Users can upload, view, and manage files in their own secure storage space.

🔗 [Live Demo](https://daviderl99.github.io/Storage-Drive/#/login)

---

## Features

- 🔐 User authentication with Firebase Auth
- ☁️ File upload and storage via Firebase Storage
- 🗂️ Basic folder structure and navigation
- 📄 File preview, renaming, and deleting
- 🧭 Responsive design using Bootstrap

---

## 🛠️ Tech Stack

**Frontend:**
- React
- Bootstrap
- SASS
- Font Awesome Icons

**Backend:**
- Firebase Authentication
- Firebase Storage

---

## 🏁 Getting Started (Development)

1. **Clone the repository:**

   ```bash
   git clone https://github.com/daviderl99/Storage-Drive.git
   cd Storage-Drive
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up Firebase:**

   - Create a Firebase project at [firebase.google.com](https://firebase.google.com/)
   - Enable **Authentication** (Email/Password)
   - Enable **Cloud Storage**
   - Create a config file (e.g. `firebase.js` or `.env`) and add your Firebase credentials

4. **Run the app locally:**

   ```bash
   npm start
   ```

---

## 🌐 Deployment

This project is configured to deploy to GitHub Pages.

To deploy:

```bash
npm run deploy
```

This will build the app and push the contents of the `/build` folder to the `gh-pages` branch.

---

## ⚠️ Notes

- This project is intended for learning and experimentation.
- Firebase security rules should be reviewed and tightened before public deployment.
- File and folder handling is basic and can be extended for better UX and scalability.

---

## 📄 License

MIT

---
