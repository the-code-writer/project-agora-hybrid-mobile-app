import { AgoraError } from "./lib/AgoraErrors";

import { Config, AgoraConfig } from "./lib/AgoraConfig";

import { VoiceCall } from "./apps/voice/VoiceCall";

import { VideoCall } from "./apps/video/VideoCall";

import { InstantMessaging } from "./apps/instant-messaging/InstantMessaging";

import { LiveStreaming } from "./apps/live-streaming/LiveStreaming";

import { WhiteBoard } from "./apps/white-board/WhiteBoard";
import { VoiceCallConfig } from "./apps/voice/VoiceCallConfig";
import { VideoCallConfig } from "./apps/video/VideoCallConfig";
import { InstantMessagingConfig } from "./apps/instant-messaging/InstantMessagingConfig";
import { LiveStreamingConfig } from "./apps/live-streaming/LiveStreamingConfig";
import { WhiteBoardConfig } from "./apps/white-board/WhiteBoardConfig";

export class Agora {
  
  private readonly config: AgoraConfig;

  public voiceCall: VoiceCall;
  public videoCall: VideoCall;
  public instantMessaging: InstantMessaging;
  public liveStreaming: LiveStreaming;
  public whiteBoard: WhiteBoard;

  /**
   * Agora Constructor
   * @param database .
   */

  constructor(
    voiceCall: VoiceCallConfig | Config,
    videoCall: VideoCallConfig,
    instantMessaging: InstantMessagingConfig,
    liveStreaming: LiveStreamingConfig,
    whiteBoard: WhiteBoardConfig
  ) {
    if (voiceCall instanceof Config) {
      this.config = voiceCall;
    } else {
      this.config = new Config(
        voiceCall,
        videoCall,
        instantMessaging,
        liveStreaming,
        whiteBoard
      );
    }

    if (!this.config) {
      throw new AgoraError("Firebase error", 1);
    }

  }

  private initVoiceCall() {
    this.voiceCall = new VoiceCall(
      this.config.voiceCall
    );
  }

  private initVideoCall() {
    this.videoCall = new VideoCall(
      this.config.videoCall
      );
  }

  private initInstantMessaging() {
    this.instantMessaging = new InstantMessaging(
      this.config.instantMessaging
      );
  }

  private initLiveStreaming() {
    this.liveStreaming = new LiveStreaming(
      this.config.liveStreaming
      );
  }

  private initWhiteBoard() {
    this.whiteBoard = new WhiteBoard(
      this.config.whiteBoard
    );
  }

  public voiceCallStart(): {} {

    return this.voiceCall.startCall();

  }

}
