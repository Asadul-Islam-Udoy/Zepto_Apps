export interface Book {
  id: number;
  title: string;
  authors: { name: string }[];
  subjects: string[];
  formats: { [key: string]: string }; // image/jpeg, text/html etc.
}
