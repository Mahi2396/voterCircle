import { TestBed } from '@angular/core/testing';

import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let dashboardService: DashboardService;
  const dashboardServiceSpy = jasmine.createSpyObj<DashboardService>(
    'DashboardService',
    ['getRecipes']
  );
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DashboardService,
          useValue: dashboardServiceSpy,
        },
      ],
    });
  });

  it('should be created', () => {
    const service: DashboardService = TestBed.get(DashboardService);
    expect(service).toBeTruthy();
  });
});
