export interface Lesson {
  id: string,
  order: number;
  title: string;
  video: string;
  poster: string;
  url: string;
  price: number;
  category: string
}

export interface LessonData {
  success: boolean;
  data: {
    hasMore: boolean;
    list: Lesson[]
  }
} 