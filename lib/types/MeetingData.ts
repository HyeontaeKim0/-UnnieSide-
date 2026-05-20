interface MeetingData {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  location: string;
  date: string;
  time: string;
  price: string;
  groupName: string;
  groupIcon: string;
  participants: number;
  maxParticipants: number;
  isFull: boolean;
  tags: string[];
  filter: string[];
}

interface CreateMeetingRequest {
  title: string;
  description: string;
  image: string;
  category: string;
  location: string;
  date: string;
  time: string;
  duration: string;
  price: string;
  maxParticipants: number;
  isOnline: boolean;
  tags: string[];
  filter: string[];
}

interface MeetingFormData {
  // Step1
  category: string;
  title: string;
  description: string;
  image: string;
  // Step2
  date: string;
  time: string;
  duration: string;
  isOnline: boolean;
  location: string;
  // Step3
  maxParticipants: number;
  price: string;
  filter: string[];
  tags: string[];
}

export type { MeetingData, CreateMeetingRequest, MeetingFormData };
