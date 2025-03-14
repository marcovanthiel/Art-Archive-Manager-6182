import { PrismaClient } from '@prisma/client';
import { withAuth } from '../auth';

const prisma = new PrismaClient();

export const createArtwork = withAuth(async (req, res) => {
  try {
    const artwork = await prisma.artwork.create({
      data: {
        ...req.body,
        photos: {
          create: req.body.photos.map((photo) => ({
            url: photo.url,
            isMain: photo.isMain
          }))
        },
        attachments: {
          create: req.body.attachments.map((attachment) => ({
            url: attachment.url,
            filename: attachment.filename,
            type: attachment.type
          }))
        }
      },
      include: {
        artist: true,
        location: true,
        photos: true,
        attachments: true
      }
    });
    res.json(artwork);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const getArtworks = withAuth(async (req, res) => {
  try {
    const artworks = await prisma.artwork.findMany({
      include: {
        artist: true,
        location: true,
        photos: {
          where: { isMain: true }
        }
      }
    });
    res.json(artworks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});