# Installation et lancement du projet

Le projet est organisé sous forme de **monorepo** contenant deux applications :

- `front` : application frontend React
- `back` : API backend NestJS

---

# Prérequis

Avant de lancer le projet, assurez-vous d'avoir installé :

- Node.js (>= 18 recommandé)
- npm
- MongoDB (local ou distant)

---

# 1. Installation

## Cloner le repository

    git clone <repository-url>  
    cd <repository-name>

---

# 2. Configuration du backend

Se rendre dans le dossier `back`.

    cd back

Installer les dépendances :

    npm install

Créer un fichier `.env` à partir du fichier exemple :

    cp env.example .env

Modifier ensuite les variables nécessaires dans `.env`.

Exemple :

    MONGODB_URI=mongodb://localhost:27017/campaign


`MONGODB_URI` doit pointer vers votre instance MongoDB.

---

# 3. Lancer le backend

Depuis le dossier `back` :

    npm run start

Le serveur NestJS démarre alors sur le port défini dans `.env`.

---

# 4. Installation du frontend

Se rendre dans le dossier `front`.

    cd front

Installer les dépendances :

    npm install

---

# 5. Lancer le frontend

Depuis le dossier `front` :

    npm run start

L'application React sera accessible via l'URL indiquée dans le terminal (généralement `http://localhost:5173` ou `http://localhost:3000` selon la configuration).

---

# 6. Lancement rapide (résumé)

Backend :

    cd back
    npm install
    cp env.example .env
    npm run start

Frontend :

    cd front
    npm install
    npm run start

---

# 7. Vérification

Une fois les deux applications lancées :

- le **backend** expose l'API
- le **frontend** consomme l'API pour :
  - afficher la liste des campagnes
  - créer une campagne
  - afficher les statistiques
