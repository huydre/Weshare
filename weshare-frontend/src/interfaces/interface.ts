export interface User {
  id: number;
  posts: Post[];
  posts_count: number;
  last_login: Date | null;
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: Date;
  email: string;
  image: string;
  bio: string | null;
  groups: any[];
  user_permissions: any[];
}

export interface Post {
  id: number;
  author: string;
  author_image: string;
  author_id: number;
  likes: string[];
  comments: Comment[];
  description: string;
  image: string;
  created_at: Date;
  updated_at: Date;
}

export interface Comment {
  id: number;
  author: string;
  author_image: string;
  post: string;
  text: string;
  updated_at: Date;
}

/* Redux */
export interface AuthState {
  access: string | null;
  refresh: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
}


export interface Form {
  [key:string] : string
}

export interface UserMessage {
  map(arg0: (message: any) => void): import("react").ReactNode;
  last_message:      string;
  unread_count:      number;
  last_message_time: Date;
  chat_id:           string;
  participants:      string[];
}

export interface ParticipantsMessage {
  id:       number;
  sender:   string;
  receiver: string;
  body:     string;
  date:     Date;
  is_read:  boolean;
}