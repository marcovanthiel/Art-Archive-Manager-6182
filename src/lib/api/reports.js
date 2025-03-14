import { PrismaClient } from '@prisma/client';
import { withAuth } from '../auth';

const prisma = new PrismaClient();

export const getValueReport = withAuth(async (req, res) => {
  try {
    const artworks = await prisma.artwork.findMany({
      select: {
        purchasePrice: true,
        currentValue: true,
        insuredValue: true,
        artist: {
          select: { name: true }
        },
        location: {
          select: { name: true }
        }
      }
    });

    const report = {
      totalPurchaseValue: artworks.reduce((sum, a) => sum + (a.purchasePrice || 0), 0),
      totalCurrentValue: artworks.reduce((sum, a) => sum + (a.currentValue || 0), 0),
      totalInsuredValue: artworks.reduce((sum, a) => sum + (a.insuredValue || 0), 0),
      valueByArtist: {},
      valueByLocation: {}
    };

    artworks.forEach(artwork => {
      // Group by artist
      if (!report.valueByArtist[artwork.artist.name]) {
        report.valueByArtist[artwork.artist.name] = 0;
      }
      report.valueByArtist[artwork.artist.name] += artwork.currentValue || 0;

      // Group by location
      if (!report.valueByLocation[artwork.location.name]) {
        report.valueByLocation[artwork.location.name] = 0;
      }
      report.valueByLocation[artwork.location.name] += artwork.currentValue || 0;
    });

    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});