import { PrismaClient } from '@prisma/client';
import { withAuth } from '../auth';

const prisma = new PrismaClient();

export const createArtist = withAuth(async (req, res) => {
  try {
    const artist = await prisma.artist.create({
      data: req.body
    });
    res.json(artist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const getArtists = withAuth(async (req, res) => {
  try {
    const artists = await prisma.artist.findMany({
      include: {
        _count: {
          select: { artworks: true }
        }
      }
    });
    res.json(artists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});