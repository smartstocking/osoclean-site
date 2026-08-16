# Site OsoClean

Site statique (HTML/CSS/JS, sans framework) — trilingue FR / DE / EN.

## Structure

```
index.html   → le contenu et la structure du site
style.css    → tous les styles (couleurs, mise en page)
i18n.js      → tous les textes, en 3 langues
script.js    → sélecteur de langue, menu mobile
*.jpg        → vos photos (à la racine, pour rester simple sur GitHub)
CNAME        → contient votre domaine osoclean.eu (ne pas supprimer)
```

## Remplacer les photos

Les images actuelles sont des **placeholders** générés automatiquement (fond gris avec le nom du fichier écrit dessus). Pour les remplacer, gardez **exactement les mêmes noms de fichiers** et déposez vos photos à la racine du dépôt (sur GitHub : "Add file" → "Upload files") :

| Fichier | Utilisation | Taille conseillée |
|---|---|---|
| `hero.jpg` | Grande photo en haut de la page d'accueil | 1600×900 px |
| `about.jpg` | Photo dans la section "À propos" | 1200×1000 px |
| `gallery-1.jpg` à `gallery-6.jpg` | Les 6 photos de la galerie | 900×700 px |

Vous pouvez utiliser un format `.jpg` ou `.png` — dans ce dernier cas, renommez simplement le fichier `.jpg` dans `index.html` (remplacer `.jpg` par `.png` à l'endroit correspondant), ou tout simplement convertissez votre photo en `.jpg` avant de la déposer (le plus simple).

## Modifier les textes

Tous les textes sont dans `i18n.js`, organisés par langue (`fr`, `de`, `en`). Cherchez la phrase à modifier et changez le texte entre guillemets, par exemple :

```js
"hero.title": "La propreté professionnelle, sans compromis.",
```

## Modifier les coordonnées

Dans `index.html`, cherchez et remplacez :
- Le téléphone : `+4917689938472` (dans les liens `tel:` et `wa.me`)
- L'email : `contact@osoclean.de` (dans les liens `mailto:`)

## Aperçu en local

Ouvrez simplement `index.html` dans votre navigateur (double-clic), ou lancez un petit serveur local :

```
cd osoclean-site
python3 -m http.server 8000
```
puis ouvrez http://localhost:8000

## Mise en ligne (GitHub Pages)

Voir les instructions séparées — nous les ferons ensemble pas à pas dans le navigateur, avec connexion de votre domaine `osoclean.eu`.
