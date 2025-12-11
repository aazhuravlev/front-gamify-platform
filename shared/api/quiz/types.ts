export interface ApiQuizListResponse {
  items: ApiQuizResponse[];
  total: number;
}

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

export interface ApiCreateQuizPayload {
  bgColor: string; // HEX
  description: string;
  image: string; // base64
  imageSmall: string; // base64
  shortDescription: string;
  title: string;
}

export interface ApiUpdateQuizPayload {
  bgColor?: string; // HEX
  description?: string;
  image?: string; // base64
  imageSmall?: string; // base64
  shortDescription?: string;
  title?: string;
}

export interface ApiTaskListResponse {
  items: ApiTaskListItemResponse[];
  total: number;
}

export interface ApiTaskListItemResponse {
  description: string;
  entityId: number;
  extId: string;
  title: string;
  quizId: number;
}

export interface ApiTaskResponse {
  description: string;
  entityId: number;
  extId: string;
  title: string;
}

export interface ApiTaskDetailResponse {
  description: string;
  entityId: number;
  extId: string;
  title: string;
  quizId: number;
}

export interface ApiCreateTaskPayload {
  description: string;
  extId: string;
  title: string;
  quizId: number;
}

export interface ApiUpdateTaskPayload {
  description?: string;
  extId?: string;
  title?: string;
  quizId?: number;
}
