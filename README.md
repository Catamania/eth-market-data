# Utilisation

```groovy
$ docker-compose up
// connect in your browser to <host IP>:8088
```

# Autoriser la récupération périodique des données des marchés

Décommenter les lignes 6 et 7 du fichier server.js .

# Routes

```groovy
/devises 
```
 Tab des devises/pairs en base
```groovy
/intervals 
```
 Tab des grains en base
```groovy
/providers 
```
 Tab des providers en base
```groovy
/:provider/:devise/:interval/bound
```
 Borne temporelle dispo pour un type de pair donné en fonction des bornes souhaitées
```groovy
/:provider/:devise/:interval/?from=<timestamp>&to=<timestamp>
```
 Données de 'from' à 'to'.
