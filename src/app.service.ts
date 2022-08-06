import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { player, Prisma } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getPlayers(params: {
    skip?: number;
    take?: number;
    where?: Prisma.playerWhereInput;
    orderBy?: Prisma.playerOrderByWithRelationInput;
  }): Promise<player[]> {
    const { skip, take, where, orderBy } = params;
    return this.prisma.player.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }
}
