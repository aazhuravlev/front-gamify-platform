export interface ApiQuizResponse {
  bgColor: string;
  bannerBgColor: string;
  description: string;
  entityId: number;
  image: string; // base64
  widgetImage: string; // base64
  shortDescription: string;
  tasks: ApiTaskResponse[];
  title: string;
  uuid: string;
}

export interface ApiTaskResponse {
  description: string;
  entityId: number;
  extId: string;
  title: string;
}
