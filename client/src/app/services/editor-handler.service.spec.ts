import { TestBed } from '@angular/core/testing';

import { EditorHandlerService } from './editor-handler.service';

describe('EditorHandlerService', () => {
  let service: EditorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
