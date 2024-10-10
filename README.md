# API de Justification de Texte

## Objectif

Ce projet consiste à implémenter et déployer une API REST qui justifie un texte selon des règles typographiques, avec une longueur maximale de ligne de 80 caractères. L'API utilise un mécanisme d'authentification par token et impose une limite d'utilisation quotidienne sur le nombre de mots traités.

## Fonctionnalités

- **Justification de texte** : L'API prend en entrée un texte brut via une requête POST et retourne le texte justifié, avec des lignes de longueur maximale de 80 caractères.
- **Authentification par token** : L'API requiert un token d'authentification généré par un endpoint dédié. Ce token doit être inclus dans les requêtes pour accéder à l'endpoint `/justify`.
- **Limitation du nombre de mots** : Chaque token est limité à 80 000 mots par jour pour les requêtes sur l'endpoint `/justify`. Si cette limite est dépassée, une erreur `402 Payment Required` est retournée.

## Endpoints

### 1. **Générer un Token**

- **URL** : `/api/token`
- **Méthode** : `POST`
- **Description** : Génère un token JWT pour une authentification.
- **Exemple de requête** :
  ```bash
  curl -X POST http://168.63.104.167:80/api/token -H "Content-Type: application/json" -d '{"email": "user@example.com"}'
* Exemple de réponse :
  ```json
  {
  "token": "votre_token_JWT"
  }

### 2. **Justifier un Texte**

- **URL** : `/api/justify`
- **Méthode** : `POST`
- **Description** : Justifie le texte fourni en entrée avec des lignes de 80 caractères maximum.
- **Exemple de requête** :
  ```bash
  curl -X POST http://168.63.104.167:80/api/justify -H "Authorization: Bearer <votre_token>" -H "Content-Type: text/plain" --data "Ceci est un exemple de  texte  justifié"
* Exemple de réponse :
  ```txt
  Ceci  est  un  exemple  de  texte  justifié.
## Contraintes
1. Longueur des lignes : Les lignes du texte justifié doivent faire 80 caractères.
2. Authentification : Utilisation d’un token JWT pour chaque requête sur /justify.
3. Limite de mots : 80 000 mots par token et par jour pour l’endpoint /justify.
## Déploiement
L'API est déployée et accessible publiquement à l'URL suivante :
  ```arduino 
http://168.63.104.167:80/api/justify
http://168.63.104.167:80/api/token
```
## Tests
Des tests unitaires ont été implémentés pour valider les fonctionnalités critiques de l'API, incluant la génération de tokens et la justification de texte. Les tests ont été réalisés avec Jest  pour tester le fonctionnement.

Exécuter les tests :
  ```bash 
npm run test
```
## Documentation Swagger: 
L'API est entièrement documentée avec Swagger. Vous pouvez accéder à la documentation complète à l'URL suivante :

http://168.63.104.167/api-docs/

### Exemples de Requêtes dans Swagger
1. Génération de Token (/token) : Permet de générer un token d'authentification en passant l'email de l'utilisateur.
2. Justification de Texte (/justify) : Permet de justifier un texte, nécessite un token JWT.
## Technologies Utilisées:
* **Node.js avec TypeScript** : Développement de l'API.
* **Express.js** : Framework utilisé pour créer l'API REST.
* **JWT** : Utilisé pour l'authentification par token.
* **Jest** : Pour les tests unitaires et les tests d'intégration.
* **Docker** : Pour containeriser et déployer l'application.
* **Terraform** : Pour la gestion de l'infrastructure cloud sur Azure.
* **Swagger** : Pour la documentation de l'API.




