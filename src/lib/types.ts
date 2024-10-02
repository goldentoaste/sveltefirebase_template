

// define types...

// in db, the id field dont need to exist
export interface Post {
    id: string;
    userName: string;
    content: string;
    likes: number;
}

