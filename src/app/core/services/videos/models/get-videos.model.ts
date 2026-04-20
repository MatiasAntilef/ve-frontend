import { IVideo } from './video.model';

export interface IResListVideo extends Pick<IVideo, 'id' | 'fileName' | 'screenshot'> {}

export interface IResListVideos {
  items: IResListVideo[];
  nextToken?: string;
}
