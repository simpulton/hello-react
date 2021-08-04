export interface Message {
  message: string;
}
export interface BaseEntity {
  id: string | null;
}
export interface Course extends BaseEntity {
  title: string;
  description: string;
}
