# Madagascar National Parks - Staff ID Card Management System

Un système complet de gestion des cartes professionnelles pour Madagascar National Parks avec authentification, upload d'images et import de données.

## Fonctionnalités

- **Authentification**: Système de login/register avec Prisma et PostgreSQL
- **Gestion du Personnel**: CRUD complet pour les enregistrements du personnel
- **Upload d'Images**: Upload de photos de profil avec Vercel Blob
- **Import CSV**: Import en masse de données de personnel à partir de fichiers CSV
- **Cartes Professionnelles**: Génération de cartes professionnelles avec QR codes
- **Dashboard Admin**: Interface d'administration complète

## Stack Technologique

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Storage**: Vercel Blob
- **Authentication**: Custom auth avec bcryptjs

## Installation

### 1. Cloner le projet

\`\`\`bash
git clone <repository-url>
cd mnp
\`\`\`

### 2. Installer les dépendances

\`\`\`bash
npm install
# ou
pnpm install
\`\`\`

### 3. Configurer les variables d'environnement

Créer un fichier `.env.local` à la racine du projet:

\`\`\`env
# Database
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"

# Vercel Blob
BLOB_READ_WRITE_TOKEN="your_blob_token_here"

# NextAuth (optionnel)
NEXTAUTH_SECRET="your_secret_key"
NEXTAUTH_URL="http://localhost:3000"
\`\`\`

### 4. Initialiser la base de données

\`\`\`bash
# Générer le client Prisma
npx prisma generate

# Créer les tables
npx prisma migrate dev --name init

# Remplir avec les données d'exemple
npx ts-node scripts/init-db.ts
\`\`\`

### 5. Démarrer le serveur de développement

\`\`\`bash
npm run dev
\`\`\`

Ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.

## Structure du Projet

\`\`\`
mnp/
├── app/
│   ├── api/
│   │   ├── auth/              # Routes d'authentification
│   │   └── personnel/         # Routes API pour le personnel
│   ├── admin/                 # Pages d'administration
│   ├── auth/                  # Pages de login/register
│   ├── personnel/             # Pages de détail du personnel
│   ├── liste-personnel/       # Liste du personnel
│   └── page.tsx               # Page d'accueil
├── components/
│   ├── ui/                    # Composants shadcn/ui
│   ├── auth-form.tsx          # Formulaire d'authentification
│   ├── csv-import.tsx         # Composant d'import CSV
│   ├── image-upload.tsx       # Composant d'upload d'image
│   └── staff-id-card.tsx      # Composant de carte professionnelle
├── lib/
│   ├── auth.ts                # Fonctions d'authentification
│   ├── blob.ts                # Fonctions Vercel Blob
│   ├── db.ts                  # Client Prisma
│   └── session.ts             # Gestion des sessions
├── prisma/
│   └── schema.prisma          # Schéma de base de données
└── scripts/
    └── init-db.ts             # Script d'initialisation
\`\`\`

## Utilisation

### Authentification

1. Aller à `/auth/register` pour créer un compte
2. Aller à `/auth/login` pour se connecter
3. Accéder au dashboard admin à `/admin`

### Gestion du Personnel

#### Ajouter un personnel manuellement

1. Aller à `/admin/personnel`
2. Cliquer sur "Add Personnel"
3. Remplir le formulaire et soumettre

#### Importer depuis CSV

1. Aller à `/admin`
2. Aller à l'onglet "Import CSV"
3. Sélectionner un fichier CSV avec les colonnes:
   - Matricule
   - Nom
   - Nom Complet
   - POSTE ABR
   - Département/Unité/Programme/Projet
   - Direction

#### Upload de photo

1. Aller à `/admin/personnel/[matricule]`
2. Utiliser le composant "Upload Photo"
3. Sélectionner une image et soumettre

### Voir les cartes professionnelles

1. Aller à `/liste-personnel` pour voir la liste
2. Cliquer sur "Voir la carte" pour afficher la carte professionnelle
3. Utiliser le bouton "Imprimer" pour imprimer la carte

## API Endpoints

### Authentification

- `POST /api/auth/register` - Créer un compte
- `POST /api/auth/login` - Se connecter

### Personnel

- `GET /api/personnel` - Lister tous les personnels
- `POST /api/personnel` - Créer un personnel
- `GET /api/personnel/[matricule]` - Obtenir un personnel
- `PUT /api/personnel/[matricule]` - Mettre à jour un personnel
- `DELETE /api/personnel/[matricule]` - Supprimer un personnel

### Upload

- `POST /api/personnel/upload-image` - Upload une photo
- `POST /api/personnel/import-csv` - Importer un CSV

## Format du fichier CSV

\`\`\`csv
Matricule,Nom,Nom Complet,POSTE ABR,Département/Unité/Programme/Projet,Direction
10400,Nirina,Nirina Jean,REGOI,Département SYSTEME D'INFORMATION,Direction Générale
10401,RASOAMALALA,RASOAMALALA Marie,Responsable Communication,Direction Générale,Direction Générale
\`\`\`

## Déploiement

### Déployer sur Vercel

1. Pousser le code sur GitHub
2. Aller sur [vercel.com](https://vercel.com)
3. Importer le projet
4. Ajouter les variables d'environnement
5. Déployer

\`\`\`bash
vercel
\`\`\`

## Troubleshooting

### Erreur de connexion à la base de données

- Vérifier que `DATABASE_URL` est correctement configurée
- Vérifier la connectivité réseau vers Neon
- Vérifier les credentials

### Erreur d'upload d'image

- Vérifier que `BLOB_READ_WRITE_TOKEN` est correctement configurée
- Vérifier que le fichier n'est pas trop volumineux
- Vérifier le format du fichier (JPG, PNG, etc.)

### Erreur d'import CSV

- Vérifier que le CSV a les bonnes colonnes
- Vérifier que les données sont correctement formatées
- Vérifier que les matricules sont uniques

## Licence

MIT

## Support

Pour toute question ou problème, veuillez ouvrir une issue sur GitHub.
