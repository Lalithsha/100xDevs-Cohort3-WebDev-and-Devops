import { ShareIcon } from "../../icons/Share";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

function Card({ title, link, type }: CardProps) {
  return (
    <div>
      <div className="pg-8 bg-white rounded-md shadow-md border-gray-200 max-w-72 border min-h-48 min-w-72 ">
        <div className="flex justify-between">
          <div className="flex items-center text-md ">
            <div className="text-gray-500 pr-2">
              <ShareIcon size="sm" />
            </div>
            {/* Project Ideas */}
            {title}
          </div>
          <div className="flex items-center">
            <div className="pr-2 text-gray-500">
              <a href={link} target="_blank">
                <ShareIcon size="md" />
              </a>
            </div>

            <div className="pr-2 text-gray-500">
              <ShareIcon size="md" />
            </div>
          </div>
        </div>

        <div className="p-4">
          {type === "youtube" && (
            <iframe
              className="w-full"
              src={link.replace("watch", "embed").replace("?v=", "/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}

          {type === "twitter" && (
            <blockquote className="twitter-tweet">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          )}

          {/* <blockquote class="twitter-tweet"><p lang="en" dir="ltr">Published new Blog on ReactJS.<br><br>Even if you know this still do read it. You may learn some new concepts.<br>After reading this, you can clear most of the frontend developer interviews where ReactJS questions are asked.<a href="https://t.co/ar6I5qwipS">https://t.co/ar6I5qwipS</a></p>&mdash; Shivam Bhadani (@shivambhadani_) <a href="https://twitter.com/shivambhadani_/status/1888576767113175300?ref_src=twsrc%5Etfw">February 9, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> */}
        </div>
      </div>
    </div>
  );
}

export default Card;
