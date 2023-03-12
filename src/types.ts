export type User = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
};

export type Comment = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replies?: Comment[] | undefined;
  replyingTo?: string;
  user: User;
};

// export type ReplyType = User & {
//   id: number;
//   content: string;
//   createdAt: string;
//   score: number;
//   replyingTo: string;
// };
