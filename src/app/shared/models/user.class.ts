export interface User {
    createdAt: string; // timestamp
    displayName: string | null;
    email: string | null;
    emailVerified: boolean;
    isAnonymous: boolean;
    lastLoginAt: number; // timestamp
    phoneNumber: string | null;
    photoURL: string | null;
    providerId: string;
    uid: string;
    username?: string | null;
}

export class UserFactory {
    createdAt: string; // timestamp
    displayName: string | null;
    email: string | null;
    emailVerified: boolean;
    isAnonymous: boolean;
    lastLoginAt: number; // timestamp
    phoneNumber: string | null;
    photoURL: string | null;
    providerId: string;
    uid: string;
    username?: string | null;

    constructor(userObj?: User) {
        this.createdAt = userObj?.createdAt || "0";
        this.displayName = userObj?.displayName || null;
        this.email = userObj?.email || null;
        this.emailVerified = userObj?.emailVerified || false;
        this.isAnonymous = userObj?.isAnonymous || false;
        this.lastLoginAt = userObj?.lastLoginAt || 0;
        this.phoneNumber = userObj?.phoneNumber || null;
        this.photoURL = userObj?.photoURL || null;
        this.providerId = userObj?.providerId || "";
        this.uid = userObj?.uid || "";
        this.username = userObj?.username || null;
    }

    toJson() {
        return {
            createdAt: this.createdAt,
            displayName: this.displayName,
            email: this.email,
            emailVerified: this.emailVerified,
            isAnonymous: this.isAnonymous,
            phoneNumber: this.phoneNumber,
            lastLoginAt: this.lastLoginAt,
            photoURL: this.photoURL,
            providerId: this.providerId,
            uid: this.uid,
            username: this.username
        }
    }
}