import { IVideo } from './video.model';

export interface IResListVideo extends Pick<IVideo, 'id' | 'fileName' | 'status' | 'createdAt'> {}

export interface IResListVideos {
  items: IResListVideo[];
  nextToken?: string;
}
