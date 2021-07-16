import React from "react";
import { formatDistanceStrict } from "date-fns";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Styles from "./VideoGallery.module.scss";
const useStyles = makeStyles({
  root: {
    color: "#2196f3",
  },
});

export default function VideoGallery(props) {
  const classes = useStyles();

  return (
    <div
      className={`${Styles.container} my-8 flex justify-center items-center px-[20px]`}
    >
      {props.loading ? (
        <CircularProgress className={classes.root} />
      ) : (
        <div className="grid grid-cols-12 gap-4 md:gap-8 gap-y-8 ">
          {props.videos?.map((item) => (
            <div
              key={item.id}
              className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 cursor-pointer hover:opacity-[.6] transition-all"
            >
              <Link to={`/video/${item.id}`}>
                <div>
                  <img
                    src={item.previewImage}
                    alt="thumbnail"
                    className="rounded-md"
                  />
                </div>
                <div className="text-white font-semibold mt-4 whitespace-nowrap	 overflow-hidden overflow-ellipsis">
                  {item.title}
                </div>
                <div className="text-white">
                  {formatDistanceStrict(
                    new Date(item.releaseDate),
                    new Date(),
                    {
                      addSuffix: true,
                    }
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
