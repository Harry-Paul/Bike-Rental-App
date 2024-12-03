import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostBikeComponent } from './post-bike.component';

describe('PostBikeComponent', () => {
  let component: PostBikeComponent;
  let fixture: ComponentFixture<PostBikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostBikeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostBikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
