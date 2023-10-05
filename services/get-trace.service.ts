import { PrismaClient, traces } from '@prisma/client'
const prisma = new PrismaClient()


export interface IGetTrace {
    success: boolean,
    data?: traces
}

export async function calculateMetrics() {
  const longestDistance = await prisma.traces.findFirst({
    orderBy: {
      distance: 'desc',
    },
    select: {
      country: true,
      distance: true,
    },
  });

  const mostTracedCountry = await prisma.traces.groupBy({
    by: ['country'],
    _count: {
      country: true,
    },
    orderBy: {
      _count: {
        country: 'desc',
      },
    },
    take: 1,
  });

  const result = {
    longest_distance: {
      country: longestDistance?.country || "N/A",
      value: longestDistance?.distance || 0,
    },
    most_traced: {
      country: mostTracedCountry[0]?.country || "N/A",
      value: mostTracedCountry[0]?._count.country || 0,
    },
  };

  return result;
}