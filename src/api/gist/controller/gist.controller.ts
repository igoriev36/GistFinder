import { Controller, Get, Query, Res, Logger } from '@nestjs/common';
import { ResponseService } from 'src/utils/response/response.service';
import { Response } from 'express';
import { GistService } from '../service/gist.service';
import { Public } from 'src/utils/decorators/public.decorator';

@Controller('gist')
export class GistController {
    private readonly logger = new Logger(GistController.name);

    constructor(
        public readonly responseService: ResponseService,
        private gistService: GistService,
      ) {}

    @Public()
    @Get('')
    async getUserWallets(@Query() req: any, @Res() res: Response) {
      try {
        const result = await this.gistService.publicGists(req?.username);
        this.responseService.successResponse(true, result, res);
      } catch (error) {
        this.responseService.serverFailureResponse(error.message, res);
      }
    }
}
