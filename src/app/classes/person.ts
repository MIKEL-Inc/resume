export class Person {
  id: number;
  name: string;
  status: string;
  clearance: string;
  date: string;
  pdfSrc: string;
  comments: {
    comment: string,
    id: number,
    date: string,
    name: string
  } [];
}
