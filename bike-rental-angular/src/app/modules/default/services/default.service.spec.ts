import { DefaultService } from './default.service';
import { TestBed } from '@angular/core/testing'

describe('CustomerService', () => {
  let service: DefaultService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(DefaultService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})