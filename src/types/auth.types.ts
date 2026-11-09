export interface UserRegisterData {
    name: string;
    email: string;
    password: string;
}

export interface UserRegisterPayload {
    profileImage: File;
    data: UserRegisterData;
}