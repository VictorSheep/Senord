#Senord
###Jeu avec tree.js et webGL
## Conventions
- Tab Size:4 dans sublime texte
- On travail avec la syntaxe en camelCase

## Procedure pour travailler et push

Ne jamais travailler sur la branche master !

Developpement et push:
```bash
#on créé une branche feature en local
git checkout -b feature_exemple

# Une fois nos modifications accomplies sur cette branche, il faut merger celle-ci sur la branche master

#on repasse donc sur notre branche master
git checkout master

#on récupére les derniers commit
git pull --all

#et on merge notre feature dans master
git merge feature_exemple

# S'il y a des conflits: les résoudre
# Il ne reste plus qu'à pusher notre travail sur le repo

#on push sur la branche master du repo
git push -u origin master

# Notre branche feature_exemple n'est plus utile

#on la supprime
git branch -d feature_exemple

#et on en créé une nouvelle dirrectement (pour ne pas se retrouver à éditer sur master)
#si on ne sait pas encore sur quoi travailler, on créé une feature_test
git checkout -b feature_test
```