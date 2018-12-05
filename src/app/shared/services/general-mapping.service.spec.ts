import { TestBed } from '@angular/core/testing';

import { GeneralMappingService } from 'shared/services/general-mapping.service';

describe('GeneralMappingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneralMappingService = TestBed.get(GeneralMappingService);
    expect(service).toBeTruthy();
  });
});
