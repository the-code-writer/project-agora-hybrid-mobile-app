
import Framework7 from 'framework7/bundle';
import { getAuth } from 'firebase-admin/auth';
import {K, Snippets} from "../../../app/helpers";
import * as ModuleBaseClasses from "../../../app/module-base-classes";
import { FirebaseAuthError } from "./FirebaseAuthErrors";

// Parent constructor
class FirebaseAuth {

  	framework7Component: Framework7;
	eventsLibrary:ModuleBaseClasses.DovellousLibraryEvent

	constructor(_eventsLibrary: ModuleBaseClasses.DovellousLibraryEvent, _framework7Component:Framework7) {
    	this.framework7Component = _framework7Component;
    	this.eventsLibrary = _eventsLibrary;
	}

	/**
	 * Get the user data by passing the id as a reference
	 * param uid string - The id of the user
	 * return Promise
	 */
	 async getUserById(uid) {
		
		return new Promise((callBackSuccessResolve, callBackErrorReject)=>{
			
			getAuth()
				.getUser(uid)
				.then((userRecord) => {
				  callBackSuccessResolve(userRecord);
				})
				.catch((error) => {
					callBackErrorReject(error);
				});

		});

	}

	/**
	 * Get the user data by passing the id as a reference
	 * param uid string - The id of the user
	 * return Promise
	 */
	 async createCustomToken(uid) {
		
		return new Promise((callBackSuccessResolve, callBackErrorReject)=>{
			
			getAuth()
				.createCustomToken(uid)
				.then((customToken) => {
				  callBackSuccessResolve(customToken);
				})
				.catch((error) => {
					callBackErrorReject(error);
				});

		});

	}

	/**
	 * Get the user data by passing the id as a reference
	 * param uid string - The id of the user
	 * return Promise
	 */
	 async createCustomTokenWithClaims(uid, additionalClaims) {
		
		return new Promise((callBackSuccessResolve, callBackErrorReject)=>{
			
			getAuth()
				.createCustomToken(uid, additionalClaims)
				.then((customToken) => {
				  callBackSuccessResolve(customToken);
				})
				.catch((error) => {
					callBackErrorReject(error);
				});

		});

	}

	/**
	 * Get the user data by passing the id as a reference
	 * param uid string - The id of the user
	 * return Promise
	 */
	 async verifyIdToken(tokenId) {
		
		return new Promise((callBackSuccessResolve, callBackErrorReject)=>{
			
			getAuth()
				.verifyIdToken(tokenId)
				.then((decodedToken) => {
				  callBackSuccessResolve(decodedToken);
				})
				.catch((error) => {
					callBackErrorReject(error);
				});

		});

	}

	/**
	 * Revoke all refresh tokens for a specified user for whatever reason.
	 * Retrieve the timestamp of the revocation, in seconds since the epoch.
	 * param uid string - The id of the user
	 * return Promise
	 */
	 async revokeRefreshTokens(uid) {
		
		return new Promise((callBackSuccessResolveUser, callBackSuccessTokenValidity, callBackSuccessResolveTokenRevokeTime, callBackErrorReject)=>{
			
			getAuth()
				.revokeRefreshTokens(uid)
				.then(() => {
					callBackSuccessResolveUser(getAuth().getUser(uid));
				  })
				  .then((userRecord) => {
					callBackSuccessTokenValidity(new Date(userRecord.tokensValidAfterTime).getTime() / 1000);
				  })
				  .then((timestamp) => {
					callBackSuccessResolveTokenRevokeTime(timestamp);
				  })
				  .catch((error) => {
					callBackErrorReject(error);
				  });

		});

	}

	/**
	 * Get the user data by passing an email as a reference
	 * param email string - The email of the user
	 * return Promise
	 */
	 async getUserByEmail(email) {
		
		return new Promise((callBackSuccessResolve, callBackErrorReject)=>{
			
			getAuth()
				.getUserByEmail(email)
				.then((userRecord) => {
				  callBackSuccessResolve(userRecord);
				})
				.catch((error) => {
					callBackErrorReject(error);
				});

		});

	}

	/**
	 * Get the user data by passing a phone number as a reference
	 * param phone string - The phone numberof the user
	 * return Promise
	 */
	 async getUserByPhoneNumber(phoneNumber) {
		
		return new Promise((callBackSuccessResolve, callBackErrorReject)=>{
			
			getAuth()
				.getUserByPhoneNumber(phoneNumber)
				.then((userRecord) => {
				  callBackSuccessResolve(userRecord);
				})
				.catch((error) => {
					callBackErrorReject(error);
				});

		});

	}

	/**
	 * Get the user data by passing user params as a reference
	 * param params array -An array of user params 
	 * return Promise
	 */
	 async getUsers(params) {
		
		return new Promise((callBackSuccessResolve, callBackErrorReject)=>{
			
			getAuth()
				.getUsers(params)
				.then((getUsersResult) => {
				  callBackSuccessResolve(getUsersResult.users);
				})
				.catch((error) => {
					callBackErrorReject(error);
				});

		});

	}

	/**
	 * Get the user data by passing a user id as a reference
	 * param uid string - The user id of the user
	 * return Promise
	 */
	 async createUser(email, password, firstname, lastname, photo, phoneNumber) {

		const hashedUserPassword = password;

		const userData = {
			email: email,
			emailVerified: false,
			password: hashedUserPassword,
			displayName: `${firstname} ${lastname}`,
			disabled: false,
		  };

		if(phoneNumber){
			userData.phoneNumber = phoneNumber;
		}
		
		if(photo){
			userData.photoURL = photo;
		}else{
			userData.photoURL = photo;
		}
		
		return new Promise((callBackSuccessResolve, callBackErrorReject)=>{
			
			getAuth()
				.createUser(userData)
				.then((userRecord) => {
				  callBackSuccessResolve(userRecord);
				})
				.catch((error) => {
					callBackErrorReject(error);
				});

		});

	}

	/**
	 * Get the user data by passing a user id as a reference
	 * param uid string - The user id of the user
	 * return Promise
	 */
	 async updateUser(uid, userData) {
		
		return new Promise((callBackSuccessResolve, callBackErrorReject)=>{
			
			getAuth()
				.updateUser(uid, userData)
				.then((userRecord) => {
				  callBackSuccessResolve(userRecord);
				})
				.catch((error) => {
					callBackErrorReject(error);
				});

		});

	}

	/**
	 * Delete a user with the specified user id
	 * param uid string - The user id of the user
	 * return Promise
	 */
	 async deleteUser(uid) {
		
		return new Promise((callBackSuccessResolve, callBackErrorReject)=>{
			
			getAuth()
				.deleteUser(uid)
				.then(() => {
				  callBackSuccessResolve(null);
				})
				.catch((error) => {
					callBackErrorReject(error);
				});

		});

	}

	/**
	 * Delete users with the specified user ids
	 * param userIds array - An array of user uids
	 * return Promise
	 */
	 async deleteUsers(userIds) {
		
		return new Promise((callBackSuccessResolve, callBackErrorReject)=>{
			
			getAuth()
				.deleteUsers(userIds)
				.then((deleteUsersResult) => {
				  callBackSuccessResolve(deleteUsersResult);
				})
				.catch((error) => {
					callBackErrorReject(error);
				});

		});

	}

	/**
	 * Get the user data by passing a user id as a reference
	 * param uid string - The user id of the user
	 * return Promise
	 */
	 async listAllUsers(limit, nextPageToken) {
		
		return new Promise((callBackSuccessResolve, callBackErrorReject)=>{
			
			getAuth()
				.listUsers(limit, nextPageToken)
				.then((listUsersResult) => {
				  callBackSuccessResolve(listUsersResult.users);
				})
				.catch((error) => {
					callBackErrorReject(error);
				});

		});

	}

}

export {FirebaseAuthError, FirebaseAuth}


