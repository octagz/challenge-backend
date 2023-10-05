import { PrismaClient, traces } from '@prisma/client'
const prisma = new PrismaClient()


export interface IStoreTrace {
    success: boolean,
    data?: traces
}

export async function storeTrace(
  country: string,
  distance: number
): Promise<IStoreTrace> {
  try {
    const newEntry: traces = await prisma.traces.create({
      data: {
        country: country,
        distance: distance,
      },
    });
    return {
      success: true,
      data: newEntry
    };
  } catch (err) {
    return {
      success: false,
    };
  }
}