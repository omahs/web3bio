import { forwardRef, useMemo, useRef } from "react";
import { useAsync, useAsyncRetry } from "react-use";
import { Loading } from "./Loading";

export interface VideoRef {
  video?: HTMLVideoElement | null;
}

export interface VideoProps {
  src: string | Blob;
  component?: "video";
  VideoProps?: React.DetailedHTMLProps<
    React.VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement
  >;
}

export async function _fetch(url: string): Promise<Blob> {
  const res = await globalThis.fetch(url);
  return res.blob();
}

export const Video = forwardRef<VideoRef, VideoProps>(function Video(
  props,
  forwardRef
) {
  const { src, component = "video", VideoProps } = props;
  const videoRef = useRef<HTMLVideoElement>(null);

  if (component !== "video") return null;

  return (
    <picture>
      <video
        style={{ borderRadius: 12 }}
        width={"100%"}
        height={"100%"}
        ref={videoRef}
        muted
        autoPlay
        loop
        poster={src as string}
        {...VideoProps}
      >
        {src ? (
          <source src={src as string} type="video/mp4" />
        ) : (
          <Loading style={{ margin: 0 }} />
        )}
      </video>
    </picture>
  );
});
