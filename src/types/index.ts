export type UserRole = 'athlete' | 'box_owner' | 'competition_organizer';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  createdAt: Date;
  verified: boolean;
  bio?: string;
  location?: string;
  socialLinks?: {
    instagram?: string;
    youtube?: string;
  };
}

export interface AthleteProfile extends UserProfile {
  role: 'athlete';
  stats?: {
    backSquat?: number;
    deadlift?: number;
    cleanAndJerk?: number;
    snatch?: number;
    fran?: string;
    murph?: string;
  };
  boxAffiliation?: string;
  competitionsJoined?: string[];
  followers?: number;
  following?: number;
}

export interface BoxProfile extends UserProfile {
  role: 'box_owner';
  boxName: string;
  boxAddress: string;
  boxPhone?: string;
  boxWebsite?: string;
  boxDescription?: string;
  boxPhotos?: string[];
  schedule?: string;
  coaches?: string[];
  memberCount?: number;
  amenities?: string[];
  monthlyPrice?: number;
}

export interface CompetitionOrganizerProfile extends UserProfile {
  role: 'competition_organizer';
  organizationName: string;
  eventsOrganized?: string[];
}

export interface Competition {
  id: string;
  organizerId: string;
  name: string;
  description: string;
  date: Date;
  endDate?: Date;
  location: string;
  category: 'rx' | 'scaled' | 'elite' | 'teams' | 'open';
  maxParticipants: number;
  currentParticipants: number;
  price: number;
  imageURL?: string;
  wods?: WOD[];
  status: 'upcoming' | 'active' | 'completed';
  createdAt: Date;
}

export interface WOD {
  id: string;
  name: string;
  description: string;
  type: 'amrap' | 'for_time' | 'emom' | 'chipper' | 'other';
  timeCapMinutes?: number;
  movements: string[];
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorPhoto?: string;
  authorRole: UserRole;
  content: string;
  imageURL?: string;
  likes: number;
  comments: number;
  createdAt: Date;
  type: 'wod_result' | 'announcement' | 'general' | 'competition_update';
}
