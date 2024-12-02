# RestFull API / Club de Badminton

## Sommaire

[Lancer le projet](#lancer-le-projet)<br>
[Tester](#tester)<br>
[Dictionnaire des données](#dictionnaire-des-données)<br>
[Difficultés rencontrées](#difficultés-rencontrées)<br>
[Sources](#sources)<br>

## Lancer le projet

Installer les dépendances et lancer le serveur :
```
npm install
npm run start
```

Générer une clé secrète :
```
node genkey.js
```

## Tester

S'authentifier en tant qu'adminitrateur (pseudo et password : `admybad`)
```
curl -X POST localhost:3000/login \
-d "pseudo=admybad&password=admybad"
```
S'authentifier en tant que simple adhérent (pseudo : `Erwan` et password : `ErwanPassword`)
```
curl -X POST localhost:3000/login \
-d "pseudo=Erwan&password=ErwanPassword"
```
Les administrateurs ont accès à touts les données de l'API alors que les simples adhérents, seulement aux réservations.
```
curl localhost:3000/reservations
curl localhost:3000/courts
```
Quand le login est effectué, nous pouvons recupérer cette clé et l'enregistrer comme une variable dans le terminale
```
jwt=lejwt
```
Accéder aux ressources avec le JWT.
```
curl -X GET localhost:3000/reservations \
-H "Authorization: Bearer $jwt"
```

## Dictionnaire des données

| ressource   | url          | Méthodes HTTP | Paramètres d’URL/Variations | Commentaires                                                   |
| ----------- | ------------ | ------------- | --------------------------- | -------------------------------------------------------------- |
| reservations | reservations/ | GET           | reservations/{id}            | liste des reservations dans le club                           |
| courts      | courts/      | GET           | court/{id}                 | liste des terrains (A,B,C,D) |
| users      | users/      | POST           | users/{id}                 | liste des users    |
     

## Difficultés rencontrées
Je n'ai pas compris toutes les consignes. Les contraintes du cahier des charges ne disent pas la même chose que la partie bien démarrer dans le brief. L'un dit que l'on doit mettre GET, POST et DELETE alors que sur l'autre partie, on nous dit qu'il faut implémenté un des sous ensemble de l'interface uniforme (GET, POST, DELETE, PUT)

## Sources

https://stackoverflow.com/<br>
https://www.w3schools.com/<br>
https://codedamn.com/
