# projetMc
# LanaGlow

Application web composée d’un frontend développé avec **ReactJS (Vite)** et d’un backend avec **Django**.  
Ce projet permet de gérer une plateforme web avec authentification, interface administrateur et API REST.

## 🚀 Fonctionnalités principales

- Authentification des utilisateurs
- Connexion administrateur
- Interface moderne avec React + Vite
- Consommation d'API REST Django
- Communication sécurisée via CORS

---

## ⚙️ Prérequis

- [✓] Git
- [✓] Python 3.x
- [✓] Node.js & npm
- [✓] pip (inclus avec Python)
- (Optionnel) Virtualenv / venv

---

## 🛠️ Installation du projet

 🔁 1. Cloner le projet
🐍 2. Lancer le backend Django
cd backend

# Créer un environnement virtuel
python -m venv env

# Activer l’environnement virtuel
# Linux/macOS :
source env/bin/activate
# Windows :
env\Scripts\activate

# Installer les dépendances
pip install -r requirements.txt

# Appliquer les migrations
python manage.py migrate

# Créer un superutilisateur (admin)
python manage.py createsuperuser

# Lancer le serveur
python manage.py runserver
⚛️ 3. Lancer le frontend React (Vite)
cd ../frontend
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
Assurez-vous que l’API Django tourne sur http://localhost:8000 et que le frontend sur http://localhost:5173.

🔐 Connexion administrateur (par défaut)
	Email	                
	admin@example.com	 
Mot de passe
adminpass
