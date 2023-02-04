/* eslint-disable-next-line*/
import pkg from '@prisma/client';

const { PrismaClient } = pkg;

export const prisma = new PrismaClient();
