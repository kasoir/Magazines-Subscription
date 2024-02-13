import { Test, TestingModule } from '@nestjs/testing';
import { MagazineService } from './magazine.service';
import { MagazineController } from './magazine.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Magazine } from './magazine.entity';

describe('MagazineController', () => {
  let magazineController: MagazineController;
  let magazineService: MagazineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MagazineController],
      providers: [
        MagazineService,
        {
          provide: getRepositoryToken(Magazine),
          useValue: {},
        },
      ],
    }).compile();

    magazineService = module.get<MagazineService>(MagazineService);
    magazineController = module.get<MagazineController>(MagazineController);
  });

  describe('createMagazine', () => {
    it('should return a magazine', async () => {
      const result = Promise.resolve({ 
        id: 1, 
        name: 'Test Magazine', 
        description: 'Test Description', 
        price: 10, 
        createdAt: new Date(), 
        updatedAt: new Date(), 
        deletedAt: null, 
        subscribed: false 
      });
      jest.spyOn(magazineService, 'createMagazine').mockImplementation(() => result);

      expect(await magazineController.createMagazine('Test Magazine', 'Test Description', 10)).toEqual(await result);
    });
  });
});
