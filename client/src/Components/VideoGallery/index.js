import React from "react";
import Grid from "@material-ui/core/Grid";
import { formatDistanceStrict } from "date-fns";

export default function VideoGallery(props) {
  console.log(props.videos);

  return (
    <div className="my-8 flex justify-center items-cente">
      <div className="grid grid-cols-12 gap-4 md:gap-8 gap-y-8 ">
        {props.videos?.map((item) => (
          <div
            key={item.id}
            className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 cursor-pointer"
          >
            <div>
              <img
                src={item.previewImage}
                alt="thumbnail"
                className="rounded-md"
              />
            </div>
            <div className="text-white font-semibold mt-4">{item.title}</div>
            <div className="text-white">
              {formatDistanceStrict(new Date(item.releaseDate), new Date(), {
                addSuffix: true,
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
