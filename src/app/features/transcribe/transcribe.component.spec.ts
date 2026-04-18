import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { VideoService } from '@core/services/videos/api/video.service';

import { TranscribeComponent } from './transcribe.component';

describe('TranscribeComponent', () => {
  let component: TranscribeComponent;
  let fixture: ComponentFixture<TranscribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranscribeComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ videoId: 'test-video-id' }),
            },
          },
        },
        {
          provide: VideoService,
          useValue: {
            getVideo: () => Promise.resolve({ videoUrl: 'https://example.com/video.mp4' }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TranscribeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
