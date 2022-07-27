const K = {
	Modules: {
		AGORA: "agora",
		VAIDA: "vaida",
		FIREBASE: "firebase",
		JSON_DATABASE_SERVICE: "jsonDatabaseService",
	},
	Oauth: {
		BEARER_TOKEN: "Bearer Token",
		BASIC: "Basic",
		DIGEST: "Digest",
		OAUTH1: "Oauth v1",
		OAUTH2: "Oauth v2",
		API_KEY: "Api Key",
		NONE: "none",
	},
	RequestMethods: {
		GET: "get",
		POST: "post",
		PUT: "put",
		DELETE: "delete",
	},
	Inputs: {
		TEXT: "text",
		PASSWORD: "password",
		EMAIL: "email",
		NUMBER: "number",
		URL: "url",
		DATE: "date",
		TIME: "time",
		TEXTAREA: "textarea",
		RADIO: "radio",
		CHECKBOX: "checkbox",
		TOGGLE: "toggle",
		SLIDER: "slider",
	},
	Events: {
		Auth: {
			LOGIN_SUCCESS: "auth_login_success",
			LOGIN_ERROR: "auth_login_error",
		},
		Notification: {
			DEVICE_READY: "event-app-device-ready",
		},
		Imessenger: {
			DEVICE_READY: "event-app-device-ready",
		},
		Socket: {
			DEVICE_READY: "event-app-device-ready",
		},
		Blockchain: {
			DEVICE_READY: "event-app-device-ready",
		},
		Device: {
			DEVICE_READY: "event-app-device-ready",
			DEVICE_THEME_CHANGED: "event-app-device-ready",
		},
		Modules: {
			Firebase: {
				FirebaseLibEvent: {
					MODULE_LOADED: "ModulesFirebaseLoaded"
				},
				Auth: {
					ON_APP_INIT: "ModulesFirebaseAuthOnAppInit",
					USER_LOGGED_IN: "ModulesFirebaseAuthUserLoggedIn",
					USER_LOGGED_OUT: "ModulesFirebaseAuthUserLoggedOut",
					USER_STATE_CHANGED: "ModulesFirebaseAuthUserStateChanged",
				},
				CloudMessaging: {
					ON_APP_INIT: "ModulesFirebaseMessagingOnAppInit",
					LOCAL_NOTIFICATION_RECEIVED: "ModulesFirebaseMessagingLocalNotificationReceived",
					PUSH_NOTIFICATION_RECEIVED: "ModulesFirebaseMessagingPushNotificationReceived",
					LOCAL_NOTIFICATION_TAPPED: "ModulesFirebaseMessagingLocalNotificationTapped",
					PUSH_NOTIFICATION_TAPPED: "ModulesFirebaseMessagingPushNotificationTapped",

				},
				RealtimeDatabase: {
					ON_APP_INIT: "ModulesFirebaseRealtimeDatabaseOnAppInit",
					CHILD_CREATED: "ModulesFirebaseRealtimeDatabaseChildCreated",
					CHILD_READ: "ModulesFirebaseRealtimeDatabaseChildRead",
					CHILD_UPDATED: "ModulesFirebaseRealtimeDatabaseChildUpdated",
					CHILD_DELETED: "ModulesFirebaseRealtimeDatabaseChildDeleted",
				},
				Firestore: {
					ON_APP_INIT: "ModulesFirebaseFirestoreOnAppInit",
					COLLECTION_CREATED: "ModulesFirebaseFirestoreCollectionCreated",
					COLLECTION_READ: "ModulesFirebaseFirestoreCollectionRead",
					COLLECTION_UPDATED: "ModulesFirebaseFirestoreCollectionUpdated",
					COLLECTION_DELETED: "ModulesFirebaseFirestoreCollectionDeleted",
					DOCUMENT_CREATED: "ModulesFirebaseFirestoreDocumentCreated",
					DOCUMENT_READ: "ModulesFirebaseFirestoreDocumentRead",
					DOCUMENT_UPDATED: "ModulesFirebaseFirestoreDocumentUpdated",
					DOCUMENT_DELETED: "ModulesFirebaseFirestoreDocumentDeleted",
				},
				Storage: {
					ON_APP_INIT: "ModulesFirebaseStorageOnAppInit",
					ITEM_ADDED: "ModulesFirebaseStorageItemAdded",
					ITEM_REMOVED: "ModulesFirebaseStorageItemRemoved",
				},
			},
			Agora: {
				AgoraDefaults: {
					DEFAULT_TOKEN: "TK1000000000",
					DEFAULT_CHANNEL: "CH1000000000",
					DEFAULT_VOICECALL_CHANNEL: "AUD1000000000",
					DEFAULT_VIDEOCALL_CHANNEL: "AUD1000000000",
					DEFAULT_INSTANT_MESSAGING_CHANNEL: "TXT1000000000",
					DEFAULT_LIVE_STREAMING_CHANNEL: "LVE1000000000",
					DEFAULT_WHITEBOARD_CHANNEL: "CLB1000000000",
				},
				AgoraLibEvent: {
					NAME: "ModulesAgoraLibEvent",
					MODULE_LOADED: "ModulesAgoraLoaded"
				},
				VoiceCall: {
					ON_APP_INIT: "ModulesAgoraVoiceCallOnAppInit",
					ON_INCOMING_CALL: "ModulesAgoraVoiceCallOnIncomingCall",
					ON_OUTGOING_CALL: "ModulesAgoraVoiceCallOnOutgoingCall",
					ON_CALL_ANSWERED: "ModulesAgoraVoiceCallOnAnswered",
					ON_CALL_REJECTED: "ModulesAgoraVoiceCallOnCallReject",
					ON_CALL_STARTED: "ModulesAgoraVoiceCallOnCallStarted",
					ON_CALL_ENDED: "ModulesAgoraVoiceCallOnCallEnded",
					ON_CALL_HOLD: "ModulesAgoraVoiceCallOnCallHold",
					ON_CALL_UNHOLD: "ModulesAgoraVoiceCallOnCallUnHold",
					ON_CALL_ABORT: "ModulesAgoraVoiceCallOnCallAbort",
					ON_CALL_ON_MUTE: "ModulesAgoraVoiceCallOnCallMute",
					ON_CALL_ON_UNMUTE: "ModulesAgoraVoiceCallOnCallUnmute",
					ON_INCOMING_GROUP_CALL: "ModulesAgoraVoiceCallOnIncomingGroupCall",
					ON_OUTGOING_GROUP_CALL: "ModulesAgoraVoiceCallOnOutgoingGroupCall",
					ON_GROUP_CALL_ANSWERED: "ModulesAgoraVoiceCallOnGroupCallAnswered",
					ON_GROUP_CALL_REJECTED: "ModulesAgoraVoiceCallOnGroupCallReject",
					ON_GROUP_CALL_STARTED: "ModulesAgoraVoiceCallOnGroupCallStarted",
					ON_GROUP_CALL_ENDED: "ModulesAgoraVoiceCallOnGroupCallEnded",
					ON_GROUP_CALL_HOLD: "ModulesAgoraVoiceCallOnGroupCallHold",
					ON_GROUP_CALL_UNHOLD: "ModulesAgoraVoiceCallOnGroupCallUnHold",
					ON_GROUP_CALL_ABORT: "ModulesAgoraVoiceCallOnGroupCallAbort",
					ON_GROUP_CALL_MUTE: "ModulesAgoraVoiceCallOnGroupCallMute",
					ON_GROUP_CALL_UNMUTE: "ModulesAgoraVoiceCallOnGroupCallUnmute",
					ON_GROUP_CALL_PARTICIPANT_JOIN: "ModulesAgoraVoiceCallOnGroupCallParticipantJoin",
					ON_GROUP_CALL_PARTICIPANT_LEAVE: "ModulesAgoraVoiceCallOnGroupCallParticipantLeave",
					ON_GROUP_CALL_PARTICIPANT_ADDED: "ModulesAgoraVoiceCallOnGroupCallParticipantAdded",
					ON_GROUP_CALL_PARTICIPANT_REMOVED: "ModulesAgoraVoiceCallOnGroupCallParticipantRemoved",
				},
				VideoCall: {
					ON_APP_INIT: "ModulesAgoraVideoCallOnAppInit",
					ON_INCOMING_CALL: "ModulesAgoraVideoCallOnIncomingCall",
					ON_OUTGOING_CALL: "ModulesAgoraVideoCallOnOutgoingCall",
					ON_CALL_ANSWERED: "ModulesAgoraVideoCallOnAnswered",
					ON_CALL_REJECTED: "ModulesAgoraVideoCallOnCallReject",
					ON_CALL_STARTED: "ModulesAgoraVideoCallOnCallStarted",
					ON_CALL_ENDED: "ModulesAgoraVideoCallOnCallEnded",
					ON_CALL_HOLD: "ModulesAgoraVideoCallOnCallHold",
					ON_CALL_UNHOLD: "ModulesAgoraVideoCallOnCallUnHold",
					ON_CALL_ABORT: "ModulesAgoraVideoCallOnCallAbort",
					ON_CALL_ON_MUTE: "ModulesAgoraVideoCallOnCallMute",
					ON_CALL_ON_UNMUTE: "ModulesAgoraVideoCallOnCallUnmute",
					ON_INCOMING_GROUP_CALL: "ModulesAgoraVideoCallOnIncomingGroupCall",
					ON_OUTGOING_GROUP_CALL: "ModulesAgoraVideoCallOnOutgoingGroupCall",
					ON_GROUP_CALL_ANSWERED: "ModulesAgoraVideoCallOnGroupCallAnswered",
					ON_GROUP_CALL_REJECTED: "ModulesAgoraVideoCallOnGroupCallReject",
					ON_GROUP_CALL_STARTED: "ModulesAgoraVideoCallOnGroupCallStarted",
					ON_GROUP_CALL_ENDED: "ModulesAgoraVideoCallOnGroupCallEnded",
					ON_GROUP_CALL_HOLD: "ModulesAgoraVideoCallOnGroupCallHold",
					ON_GROUP_CALL_UNHOLD: "ModulesAgoraVideoCallOnGroupCallUnHold",
					ON_GROUP_CALL_ABORT: "ModulesAgoraVideoCallOnGroupCallAbort",
					ON_GROUP_CALL_MUTE: "ModulesAgoraVideoCallOnGroupCallMute",
					ON_GROUP_CALL_UNMUTE: "ModulesAgoraVideoCallOnGroupCallUnmute",
					ON_GROUP_CALL_PARTICIPANT_JOIN: "ModulesAgoraVideoCallOnGroupCallParticipantJoin",
					ON_GROUP_CALL_PARTICIPANT_LEAVE: "ModulesAgoraVideoCallOnGroupCallParticipantLeave",
					ON_GROUP_CALL_PARTICIPANT_ADDED: "ModulesAgoraVideoCallOnGroupCallParticipantAdded",
					ON_GROUP_CALL_PARTICIPANT_REMOVED: "ModulesAgoraVideoCallOnGroupCallParticipantRemoved",
				},
				InstantMessaging: {
					ON_APP_INIT: "ModulesAgoraInstantMessengerOnAppInit",
				},
				LiveStreaming: {
					ON_APP_INIT: "ModulesAgoraLiveStreamingOnAppInit",
				},
				WhiteBoard: {
					ON_APP_INIT: "ModulesAgoraWhiteBoardOnAppInit",
				},
			},
		},
	},
	Dots: {
		white: "Konstants",
		black: "⚫",
	},
};

export default K;
