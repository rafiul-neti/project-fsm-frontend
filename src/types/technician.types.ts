export interface ApplyTechnicianData {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  bio: string;
  yearsOfExperience: number;
  serviceArea: string;
  categoryIds: string[];
}

export interface ApplyTechnicianPayload {
  license: File;
  data: ApplyTechnicianData;
}
