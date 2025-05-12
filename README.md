# Taskforce – Application de Gestion de Tâches

Taskforce est une application web moderne et intuitive conçue pour la gestion des tâches et le suivi des performances. Elle offre une interface utilisateur élégante et immersive, inspirée d'un thème cyberpunk, avec des effets lumineux et des transitions fluides. L'application est idéale pour les équipes ou les individus souhaitant organiser leurs tâches, suivre leur progression et analyser leurs performances.

---

🎥 [Voir la démonstration de Taskforce sur YouTube](https://youtu.be/VOEIw0Vlfrs)

## **Fonctionnalités principales :**

### **1. Gestion des tâches**

- **Création, modification et suppression de tâches :**

  - Ajoutez de nouvelles tâches avec des informations telles que le nom, la description, la date d'échéance et le statut.
  - Modifiez les tâches existantes pour refléter les changements.
  - Supprimez les tâches obsolètes ou terminées.

- **Statuts des tâches :**

  - Les tâches peuvent être marquées comme "À faire", "En cours" ou "Terminée".
  - Les statuts sont visualisés dans des graphiques pour un suivi clair.

---

### **2. Statistiques et visualisations**

- **Graphiques :**

  - Graphiques pour visualiser la répartition des tâches par statut.
  - Analysez les performances sur les 8 dernières semaines ou les 12 derniers mois.

- **Indicateurs de performance :**

  - Suivez les progrès de l'équipe ou des individus grâce à des statistiques claires et détaillées.

---

### **3. Gestion des utilisateurs**

- **Profil utilisateur :**
- - Modifiez vos informations personnelles, telles que le nom, l'email et le mot de passe.
  - Interface intuitive avec des champs de saisie stylisés et des boutons interactifs.
- **Déconnexion sécurisée :**

  - Déconnectez-vous facilement avec un bouton dédié.
  - Gestion des sessions expirées avec redirection automatique vers la page de connexion.

---

### **4. Sécurité et authentification**

- **Routes protégées :**

  - Certaines pages, comme les statistiques, sont accessibles uniquement aux utilisateurs authentifiés.
  - Vérification automatique des tokens pour sécuriser les sessions.

- **Gestion des sessions :**

  - Déconnexion automatique en cas de session (**token**) expirée.
  - Redirection vers la page de connexion pour une expérience utilisateur fluide.

---

### **5. Interface utilisateur moderne**

- **Thème cyberpunk :**

  - Couleurs dominantes : cyan et noir.
  - Effets lumineux et transitions fluides pour une expérience immersive.

- **Composants interactifs :**

  - Boutons, champs de saisie et menus stylisés avec des animations au survol et au clic.
  - Utilisation de bibliothèques modernes comme PrimeReact pour des composants réactifs et élégants.

---

## Architecture technique

### Backend

- **Java 23**
- **Spring Boot**
- Authentification via **JWT**
- Endpoints REST sécurisés
- Gestion des utilisateurs et des tâches avec entités relationnelles

### Frontend

- **React**
- **TypeScript**
- **PrimeReact** pour les composants interactifs

- **React Router** pour la gestion des routes.
- **CSS sur mesure** avec styles **néon / cyberpunk**
- État géré localement (via `useState`/`useEffect`) et APIs REST consommées dynamiquement

🎥 [Exemple de stylisation YouTube](https://www.youtube.com/watch?v=8y0YlWumwNg)

---

## **Public cible :**

Taskforce est conçu pour :

- Les équipes souhaitant collaborer efficacement sur des projets.
- Les individus cherchant à organiser leurs tâches personnelles.
- Les managers souhaitant analyser les performances de leur équipe.

---

## **Conclusion :**

Taskforce est une solution complète et moderne pour la gestion des tâches et le suivi des performances. Avec son interface immersive et ses fonctionnalités avancées, elle offre une expérience utilisateur unique, idéale pour les environnements professionnels et personnels.
