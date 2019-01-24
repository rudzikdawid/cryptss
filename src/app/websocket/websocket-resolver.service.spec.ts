import { TestBed } from '@angular/core/testing';

import { WebsocketResolverService } from './websocket-resolver.service';

describe('WebsocketResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebsocketResolverService = TestBed.get(WebsocketResolverService);
    expect(service).toBeTruthy();
  });
});
