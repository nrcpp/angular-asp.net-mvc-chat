export class JoggingRecord {
  id: number;
  distance: number;
  description: string;
  createdAt: string;
}

export class Contact {
  name: string;
  department: string;
}

export class ChatMessage {
  name: string;
  contact: string;
  message: string;
  time: string;
}
