export interface User {
    createdAt: number;
    displayName: string;
    email: string | null;
    phoneNumber: string | null;
    photoURL: string | null;
    providerId: string;
    uid: string;
}

export class UserFactory {
    createdAt: number;
    displayName: string;
    email: string | null;
    phoneNumber: string | null;
    photoURL: string | null;
    providerId: string;
    uid: string;

    constructor(userObj?: User) {
        this.createdAt = userObj && !!userObj.createdAt ? userObj.createdAt : 0;
        this.displayName = userObj && !!userObj.displayName ? userObj.displayName : "";
        this.email = userObj && !!userObj.email ? userObj.email : null;
        this.phoneNumber = userObj && !!userObj.phoneNumber ? userObj.phoneNumber : null;
        this.photoURL = userObj && !!userObj.photoURL ? userObj.photoURL : null;
        this.providerId = userObj && !!userObj.providerId ? userObj.providerId : "";
        this.uid = userObj && !!userObj.uid ? userObj.uid : "";
    }

    toJson() {
        return {
            createdAt: this.createdAt,
            displayName: this.displayName,
            email: this.email,
            phoneNumber: this.phoneNumber,
            photoURL: this.photoURL,
            providerId: this.providerId,
            uid: this.uid
        }
    }
}