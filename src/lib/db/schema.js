// Using Prisma for type-safe database operations
export const schema = `
  datasource db {
    provider = "sqlite"
    url      = "file:./art-archive.db"
  }

  generator client {
    provider = "prisma-client-js"
  }

  model User {
    id        Int      @id @default(autoincrement())
    email     String   @unique
    name      String
    password  String
    role      String   @default("viewer")
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
  }

  model Artist {
    id           Int       @id @default(autoincrement())
    name         String
    address      String?
    city         String?
    country      String?
    website      String?
    portraitUrl  String?
    birthDate    DateTime?
    deathDate    DateTime?
    biography    String?
    createdAt    DateTime  @default(now())
    updatedAt    DateTime  @updatedAt
    artworks     Artwork[]
  }

  model Artwork {
    id              Int       @id @default(autoincrement())
    title           String
    artistId        Int
    artist          Artist    @relation(fields: [artistId], references: [id])
    type            String
    height          Float?
    width           Float?
    depth           Float?
    weight          Float?
    productionDate  DateTime?
    isEstimatedDate Boolean   @default(false)
    isEdition       Boolean   @default(false)
    editionDetails  String?
    isSigned        Boolean   @default(false)
    signatureLocation String?
    description     String?
    locationId      Int
    location        Location  @relation(fields: [locationId], references: [id])
    purchaseDate    DateTime?
    purchasePrice   Float?
    currentValue    Float?
    insuredValue    Float?
    photos          Photo[]
    attachments     Attachment[]
    createdAt       DateTime  @default(now())
    updatedAt       DateTime  @updatedAt
  }

  model Photo {
    id        Int      @id @default(autoincrement())
    url       String
    isMain    Boolean  @default(false)
    artworkId Int
    artwork   Artwork  @relation(fields: [artworkId], references: [id])
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
  }

  model Attachment {
    id        Int      @id @default(autoincrement())
    url       String
    filename  String
    type      String
    artworkId Int
    artwork   Artwork  @relation(fields: [artworkId], references: [id])
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
  }

  model Location {
    id          Int       @id @default(autoincrement())
    name        String
    address     String
    type        String
    description String?
    latitude    Float?
    longitude   Float?
    artworks    Artwork[]
    createdAt   DateTime  @default(now())
    updatedAt   DateTime  @updatedAt
  }
`;