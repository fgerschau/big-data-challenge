## BIG DATA CHALLENGE | Code Competition 07/2017 IT-Talents
>Lösung der [Code Competition 07/2017](https://www.it-talents.de/foerderung/code-competition/code-competition-07-2017)

Dieses Projekt habe ich mit dem *MEAN Stack* entwickelt. Das heißt es wurde **MongoDB** für die Datenbank, **Express** für HTTP Anfragen, **NodeJS** für das Backend und **AngularJS** für das Frontend verwendet.
Außerdem habe ich **Pug** als *Template Engine* verwendet. Diese wird von Express zu HTML '*gerendert*'.

## Folgendes brauchst du:
1. [NVM (Node Version Manager)](https://github.com/creationix/nvm#installation)
2. [NodeJS (mit v6.9.4 getestet)](https://nodejs.org/en/download/)
3. [MongoDB (mit 3.4.0 getestet)](https://docs.mongodb.com/manual/administration/install-community/)
- - -
## Installation (Linux/ MacOS)

#### Node
Zuerst stellen wir sicher, dass *NodeJS* richtig installiert wurde.
Mit `node --version` können wir die aktuell verwendete Node Version herausfinden und gegebenenfalls mit `nvm ls` und `nvm use v6.9.4` ändern.

#### MongoDB
Wir müssen einen *MongoD* server starten, damit unsere Anwendung funktioniert:
`sudo mongod` (MacOS) oder `sudo service mongod start` (Linux/ Debian).

#### Repository Klonen
Um den Quellcode herunterzuladen, müssen wir uns zum gewünschten Ordner bewegen (mittels `cd /path`) und
    - `git clone git@github.com:fgerschau/big-data-challenge.git`
    oder
    - `git clone https://github.com/fgerschau/big-data-challenge.git`
ausführen. Danach, mittels `cd big-data-challenge`, bewegen wir uns zum Quellverzeichnis der Anwendung.

#### NPM Pakete installieren
Im Quellverzeichnis installieren wir alle nötigen Pakete mittels `npm install` (dies kann eine Weile dauern).

---
## Script ausführen
> Das script im ordner `/scripts/` parst zuerst die CSV Datei und fügt danach jede Zeile in die MongoDB Datenbank ein (in die `races` Collection).
> Daher müssen wir sicherstellen, dass ein MongoD server am laufen ist, bevor wir das Script ausführen.

Mit `node scripts` starten wir das Script. Dieser Vorgang kann einige Minuten in Anspruch nehmen, da über 160.000 Dokumente in die Datenbank eingefügt werden müssen.

---
## Anwendung starten

Mit `node app` starten wir die MEAN Anwendung auf dem Port 3000.
Die Seite können wir im Browser unter [localhost:3000](localhost:3000) aufrufen.

---
Bei Fragen kontaktiert: felix.gerschau@gmail.com
