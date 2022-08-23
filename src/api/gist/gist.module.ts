import { CacheModule, Module } from '@nestjs/common';
import { ResponseService } from 'src/utils/response/response.service';
import { GistController } from './controller/gist.controller';
import { GistService } from './service/gist.service';
import { NestCrawlerModule } from 'nest-crawler';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    NestCrawlerModule,
    CacheModule.register({ 
      store: redisStore, 
      host: 'localhost', //default host
      port: 6379 //default port
    })
  ],
  controllers: [GistController],
  providers: [GistService, ResponseService]
})
export class GistModule {}
