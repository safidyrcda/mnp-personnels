# Guide de Configuration Détaillé

## Prérequis

- Node.js 18+
- npm ou pnpm
- Compte Neon (PostgreSQL)
- Compte Vercel (pour Blob)

## Étape 1: Configuration de la Base de Données

### Créer une base de données Neon

1. Aller sur [neon.tech](https://neon.tech)
2. Créer un nouveau projet
3. Copier la chaîne de connexion `DATABASE_URL`

### Initialiser Prisma

\`\`\`bash
# Générer le client Prisma
npx prisma generate

# Créer les migrations
npx prisma migrate dev --name init
\`\`\`

## Étape 2: Configuration de Vercel Blob

### Obtenir le token Blob

1. Aller sur [vercel.com/storage/blob](https://vercel.com/storage/blob)
2. Créer un nouveau token
3. Copier le token dans `BLOB_READ_WRITE_TOKEN`

## Étape 3: Remplir la Base de Données

\`\`\`bash
# Exécuter le script d'initialisation
npx ts-node scripts/init-db.ts
\`\`\`

## Étape 4: Démarrer le Développement

\`\`\`bash
npm run dev
\`\`\`

## Commandes Utiles

\`\`\`bash
# Générer le client Prisma
npm run prisma:generate

# Créer une migration
npm run prisma:migrate

# Ouvrir Prisma Studio
npx prisma studio

# Construire pour la production
npm run build

# Démarrer en production
npm start
\`\`\`

## Variables d'Environnement

| Variable | Description | Exemple |
|----------|-------------|---------|
| `DATABASE_URL` | URL de connexion PostgreSQL | `postgresql://...` |
| `BLOB_READ_WRITE_TOKEN` | Token Vercel Blob | `vercel_blob_rw_...` |
| `NEXTAUTH_SECRET` | Secret pour NextAuth | `your-secret-key` |
| `NEXTAUTH_URL` | URL de l'application | `http://localhost:3000` |

## Dépannage

### Erreur: "Cannot find module '@prisma/client'"

\`\`\`bash
npm install @prisma/client
npx prisma generate
\`\`\`

### Erreur: "Connection refused"

Vérifier que:
- La base de données Neon est active
- La chaîne `DATABASE_URL` est correcte
- La connexion réseau est disponible

### Erreur: "BLOB_READ_WRITE_TOKEN is not set"

Ajouter le token dans `.env.local`:

\`\`\`env
BLOB_READ_WRITE_TOKEN="your_token_here"
