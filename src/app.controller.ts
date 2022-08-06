import { Controller, Get, Post, Body, Query, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { player } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAllPlayers(@Query('page') page: number): Promise<player[]> {
    const NB_ELEMENTS_PER_PAGE = 6;
    return this.appService.getPlayers({
      skip: (page - 1) * NB_ELEMENTS_PER_PAGE,
      take: NB_ELEMENTS_PER_PAGE,
    });
  }

  @Post()
  @HttpCode(200)
  async getPlayers(
    @Body() searchDto: { name: string; page: number },
  ): Promise<player[]> {
    const NB_ELEMENTS_PER_PAGE = 6;
    const { name, page } = searchDto;
    return this.appService.getPlayers({
      skip: (page - 1) * NB_ELEMENTS_PER_PAGE,
      take: NB_ELEMENTS_PER_PAGE,
      where: {
        OR: [
          { firstname: { contains: name, mode: 'insensitive' } },
          { lastname: { contains: name, mode: 'insensitive' } },
        ],
      },
    });
  }
}
