// Diploma
export type Diploma = {
  _id: string;
  name: string;
  icon: string;
  createdAt: string;
};

export type DiplomasMetadata = {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
};

export type DiplomasAPIResponse = {
  message?: string;
  diplomas: Diploma[];
  metadata: DiplomasMetadata;
};
