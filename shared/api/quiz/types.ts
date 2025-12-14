export interface ApiQuizListResponse {
  items: ApiQuizListItemResponse[];
  total: number;
}

export interface ApiQuizListItemResponse {
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
  progress: {
    completedTasks?: number;
    totalTasks: number;
  };
}

export interface ApiCreateQuizPayload {
  bgColor: string; // HEX
  bannerBgColor: string; // HEX
  description: string;
  image: string; // base64
  widgetImage: string; // base64
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
  url: string;
}

export interface ApiTaskResponse {
  description: string;
  entityId: number;
  extId: string;
  title: string;
  isCompleted?: boolean;
  url: string;
}

export interface ApiTaskDetailResponse {
  description: string;
  entityId: number;
  extId: string;
  title: string;
  quizId: number;
  url: string;
}

export interface ApiCreateTaskPayload {
  description: string;
  extId: string;
  title: string;
  quizId: number;
  url: string;
}

export interface ApiUpdateTaskPayload {
  description?: string;
  extId?: string;
  title?: string;
  quizId?: number;
  url?: string;
}
