import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "next-share";
import React from "react";

interface SocialButtonsProps {
  shortUrl: string;
}

export function SocialButtons(props: SocialButtonsProps) {
  return (
    <div className="mt-6 flex justify-center gap-6">
      <WhatsappShareButton
        url={props.shortUrl}
        title="Hey! Check out this url. It has been shortened by this site :)"
      >
        <WhatsappIcon size={48} round />
      </WhatsappShareButton>

      <TwitterShareButton
        url={props.shortUrl}
        title="Hey! Check out this url. It has been shortened by this site :)"
      >
        <TwitterIcon size={48} round />
      </TwitterShareButton>

      <FacebookShareButton
        url={props.shortUrl}
        title="Hey! Check out this url. It has been shortened by this site :)"
      >
        <FacebookIcon size={48} round />
      </FacebookShareButton>
    </div>
  );
}
