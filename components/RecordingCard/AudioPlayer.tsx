"use client";

import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "./AudioPlayer.css";

export default function AudioPlayerComponent({ url }: { url: string }) {
  return (
    <AudioPlayer
      src={url}
      progressJumpSteps={{ backward: 30000, forward: 30000 }}
      customProgressBarSection={[RHAP_UI.CURRENT_TIME, RHAP_UI.PROGRESS_BAR]}
      customVolumeControls={[]}
      customAdditionalControls={[]}
      className="rounded-sm"
      // other props here
    />
  );
}
