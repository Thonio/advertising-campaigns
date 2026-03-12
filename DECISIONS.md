## Erreurs rencontrees
Les erreurs sont souvent lies au typage des variables, certes c'est fait sur TypesScript et c'est justement ca qui fait qu'on a des types strict. Le plus gros etais surement dans la partie "validation du formulaire" car on a des erreurs silencieuse (pas d'erreur dans la console mais le formulaire ne fonctionne juste pas).

## Arbitrage techniques
Il y a 2 decisions qui est juste lies au type de projet comme celle-ci:

**React et non Next**
React par ce que pour ce type de projet les evolutions arrive tres rapidement et c'est souvent des evolutions graphique, en design qu'en experience utilisateur. React avec les component reutilisable et sa flexibilite peut repondre rapidement et simplement. Contrairement a Next, qui est plus pour du "site vitrine" avec son SSR par defaut, qui oblige a se plier au contrainte du framework.

**Nest et non Express**
Contrairement a ce qui etait dit au dessus, le back peut utiliser les avantages de Nest avec son ecosysteme complet, qui peut demarer au quard de tour. La logique vient du fait que le backend ne subit pas enormement de changement au niveau du structure meme avec les evolutions constantes, donc previligie les framework complets face a express qui doit demarer du tout debut.
