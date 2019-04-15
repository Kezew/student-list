export enum Gender {
    female = 'Nő',
    male = 'Férfi',
}

export interface Student {
    id?: number;
    name: string;
    email: string;
    age: number;
    gender: Gender;
}
