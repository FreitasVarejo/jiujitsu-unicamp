export interface TeamMember {
  id: string;
  name: string;
  role: string;
  belt: string;
  course: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
}

export interface Event {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface ScheduleItem {
  time: string;
  mwf: string; // Mon/Wed/Fri
  tt: string;   // Tue/Thu
}