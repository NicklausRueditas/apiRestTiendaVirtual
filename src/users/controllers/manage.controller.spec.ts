import { Test, TestingModule } from '@nestjs/testing';
import { ManageController } from './manage.controller';
import { UsersService } from '../services/users.service';


describe('UsersController', () => {
  let controller: ManageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageController],
      providers: [ManageController],
    }).compile();

    controller = module.get<ManageController>(ManageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
