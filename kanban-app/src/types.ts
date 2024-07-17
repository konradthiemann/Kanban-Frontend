export enum Urgency {
  high = 'high',
  medium = 'medium',
  low = 'low',
}
export interface Task {
    id: number;
    assigned_to: string[];
    author: {
      id: number,
      first_name: string,
      last_name: string,
      username: string,
      email: string
    }
    status: string;
    due_date: number;
    urgency: Urgency;
    title: string;
    description: string;
    category: number;
  }


  export interface Category {
    id: number;
    name: string;
  }

  export interface DecodedToken {
    exp: number; // expiration time
    iat: number; // issued at
    jti: string; // JWT ID
    token_type: string; // token type
    user_id: number; // user ID
  }

  export interface User {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
  }