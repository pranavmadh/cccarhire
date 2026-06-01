export interface ChauffeurCar {
  id: string;
  name: string;
  price: number;
  passengers: number;
  image: string;
  createdAt: string;
}

export interface CreateChauffeurCarInput {
  name: string;
  price: number;
  passengers: number;
  imagePath: string;
}
