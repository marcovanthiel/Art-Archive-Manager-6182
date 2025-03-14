import { PrismaClient } from '@prisma/client';
import { withAuth } from '../auth';

const prisma = new PrismaClient();

export const createLocation = withAuth(async (req, res) => {
  try {
    const location = await prisma.location.create({
      data: req.body
    });
    res.json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const getLocations = withAuth(async (req, res) => {
  try {
    const locations = await prisma.location.findMany({
      include: {
        _count: {
          select: { artworks: true }
        }
      }
    });
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});