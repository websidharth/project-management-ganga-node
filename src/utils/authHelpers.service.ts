
import crypto from "crypto"; 
import uuid from 'uuid-random';

export const generateUserGUID = (): string => {
  return uuid(); // Generates unique UUID v4
};

// Optional: Generate GUID with prefix
export const generateUserGUIDWithPrefix = (): string => {
  return `${uuid()}`;
};

export const generateCustomId = (): number => {
  // Use crypto for a secure random 4-digit number
  const buf = crypto.randomBytes(2);
  return 1000 + (buf.readUInt16BE(0) % 9000);
};

export const userAge = (dateOfBirth: string | Date): number => {
  const dob = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
};

export const getCustomId = (): number => {
  return parseInt(
    new Date().getFullYear().toString() + generateCustomId().toString()
  );
};

export const getAdmissionId = (lastUser: string) => {
  return (
    "User" + new Date().getFullYear() + (parseInt(lastUser) + 1).toString()
  );
};

export const buildUserName = (firstName: string, lastName: string): string => {
  return `${firstName}${lastName}`.toLowerCase().replace(/\s+/g, "");
};

export const createUserName = (firstName: string, lastName: string): string => {
  const buf = crypto.randomBytes(2);
  const random = 1000 + (buf.readUInt16BE(0) % 9000);
  return `${firstName}${lastName}${random}`.toLowerCase().replace(/\s+/g, "");
};

export const nowISO = (): string => {
  return new Date().toISOString();
};

/**
 * Generates a cryptographically secure 4-digit OTP string.
 * Uses crypto.randomBytes instead of Math.random() to prevent predictability.
 */
export const generate4DigitOtp = (): string => {
  const buf = crypto.randomBytes(2);
  return (1000 + (buf.readUInt16BE(0) % 9000)).toString();
};
