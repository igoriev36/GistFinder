import { Test, TestingModule } from '@nestjs/testing';
import { GistController } from './gist.controller';

describe('GistController', () => {
  let controller: GistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GistController],
    }).compile();

    controller = module.get<GistController>(GistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
