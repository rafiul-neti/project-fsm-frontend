export const MAX_FILE_SIZE = 5;

export const MAX_FILE_SIZE_IN_BYTES = MAX_FILE_SIZE * 1024 * 1024;

export const MAX_BIO_LENGTH = 1000;

export const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
];

export const ACCEPTED_DOCS = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export function isAcceptedFileSize(fileSize: number) {
  return fileSize <= MAX_FILE_SIZE_IN_BYTES;
}

export function isAcceptedFileType(fileType: string, fileIs?: "doc" | "img") {
  if (fileIs === "doc") {
    return ACCEPTED_DOCS.includes(fileType);
  }
  return ACCEPTED_FILE_TYPES.includes(fileType);
}
