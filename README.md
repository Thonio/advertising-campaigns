# Application de gestion de campagne
## 1. Architecture
L'application est structuree en architecture client-server classique avec séparation claire des responsabilités.

**Frontend**
Le frontend est une SPA construite avec React.
Responsabilités :
-   affichage de la liste des campagnes
-   création d'une campagne    
-   affichage des statistiques    
-   validation des formulaires    
-   communication avec l’API backend

**Backend**
Le backend suit l’architecture modulaire de NestJS.
Responsabilités :
-   gestion des campagnes    
-   stockage des données    
-   calcul des statistiques    
-   exposition d’une API REST

## 2. Choix techniques
**React VS Next**
React est idéale pour ce type de projet qui évolue constamment surtout dans la partie front. Alors que sur Next qui oblige a se plier à sa religion et toute modification devient rapidement un contrainte.

**React Router**
Gestion simple du routing côté client :
-   `/`  : pour le dashboard
-   `/campaigns`  : pour la liste des campagnes
-   `/campaigns/new` : pour l'ajout de nouveau campagne

**React Hook Form**
Permet une gestion performante des formulaires sans re-render inutiles.

**Zod**
Zod est utilisé pour :
-   validation des formulaires côté frontend    
-   cohérence des données envoyées à l’API    

**Tailwind**
Tailwind permet :
-   développement rapide de l’UI    
-   cohérence visuelle    
-   faible coût de maintenance CSS

**NestJS VS express**
NestJS est conçu pour être complet donc juste quelques ajout pour certain, par contre sur express, il faut encore partir du début (Contrairement au front, le back ne subit pas de changement radical poor ce type de projet et donc par trop d'impact sur la structure de base)

**MongoDB**
MongoDB est adapté pour :
-   stockage flexible    
-   haut volume d’écriture    
-   scalabilité horizontale    

**Mongoose**
Mongoose permet :
-   validation des schémas    
-   mapping objet/document    
-   gestion simple des modèles.

## 3. Améliorer le système pour gérer 1 million de requêtes par minute

Pour gérer un trafic très élevé, plusieurs optimisations seraient nécessaires.

**Mise en cache**
Utiliser Redis pour :
-   cache des campagnes    
-   cache des statistiques    
-   réduction de la charge sur MongoDB    

**Event Driven Architecture**
Les impressions peuvent être traitées de manière asynchrone avec l'usage des "message Queue" comme Kafka ou RabbitMQ et l'utilisation des "Workers".

**Agrégation des statistiques**
Au lieu de recalculer les stats en temps réel :
-   stocker des statistiques pré-agrégées    
-   mettre à jour les agrégats via workers.

## 4. Gestion du capping d’impressions
Le capping consiste à limiter le nombre d’impressions d’une campagne pour un utilisateur.
Deux types de capping peuvent être utilisés.

**Frequency Capping**
Limiter le nombre d’impressions par utilisateur.
Exemple :
-   5 impressions par jour    
-   20 impressions par semaine

Redis est adapté car :
-   accès très rapide    
-   TTL intégré    
-   gestion simple des compteurs.

**Global Capping**
Limiter le nombre total d’impressions d’une campagne.

## 5. Scalabilité en production
Pour un environnement production, l’architecture peut évoluer vers une infrastructure distribuée.

**Load Balancer**
Utilisation d’un load balancer, plusieurs instances NestJS peuvent être lancées.
**Horizontal Scaling**
L’API peut être scalée horizontalement :
-   Kubernetes    
-   Docker containers    

**Database Scaling**
MongoDB peut être configuré avec :
-   Replica Set (haute disponibilité)    
-   Sharding (distribution des données)    

**Monitoring**
Mettre en place :
-   logs centralisés    
-   métriques    
-   alerting
    
Outils possibles :
-   Prometheus    
-   Grafana    
-   ELK Stack

