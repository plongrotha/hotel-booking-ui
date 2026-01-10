export interface Hotel {
  hotelId: number;
  hotelName: string;
  location: string;
  hotelImage: string;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Room {
  roomId: number;
  roomNumber: number;
  price: number;
  roomType: RoomType;
  hotelId: number;
  booked: boolean;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum RoomType {
  SINGLE = 'DOUBLE_ROOM',
  DOUBLE = 'SINGLE_ROOM',
  SUITE = 'TRIPLE_ROOM',
}

export interface RoomRequest {
  roomNumber: number;
  price: number;
  roomType: RoomType;
  hotelId: number;
}
