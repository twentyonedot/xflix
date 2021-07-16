import React, { useState, useRef, useEffect } from "react";
import Header from "../Header";
import Grid from "@material-ui/core/Grid";
import {
  MdThumbDown as ThumbUpIcon,
  MdThumbUp as ThumbDownIcon,
} from "react-icons/md";
import { useParams, useHistory } from "react-router-dom";
import { config } from "../../App";
import VideoGallery from "../VideoGallery";
import Styles from "./VideoPage.module.scss";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  root: {
    color: "#2196f3",
  },
  colorPrimary: {
    backgroundColor: "#49657b",
  },
  barColorPrimary: {
    backgroundColor: "#2196f3",
  },
});
export default function VideoPage() {
  const classes = useStyles();
  const [video, setVideo] = useState("");
  const [loading, setLoading] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [videoList, setVideoList] = useState([]);

  const params = useParams();
  console.log("params", params);

  useEffect(() => {
    async function main() {
      setIframeLoading(true);
      window.scrollTo(0, 0);
      setVideo("");
      setLoading(true);
      await addView(params.id);
      await getVideoData(params.id);
      getAllVideos();
      setLoading(false);
    }
    main();
  }, [params]);

  const history = useHistory();

  const handleVoteChange = (id, vote, change) => {
    let reqObj = { vote, change };
    changeVote(id, reqObj);
  };

  const changeVote = async (videoId, reqObj) => {
    const response = await fetch(`${config.endpoint}/videos/${videoId}/votes`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(reqObj),
    });
    if (response.ok) {
      getVideoData(params.id);
    }
  };

  const getVideoData = async (id) => {
    setLoading(true);
    const response = await fetch(`${config.endpoint}/videos/${id}`);
    if (!response.ok) {
      history.push("/");
      return;
    }
    const data = await response.json();
    setVideo(data);
    setLoading(false);
  };

  const getAllVideos = async () => {
    const response = await fetch(
      `${config.endpoint}/videos/${
        searchText && searchText !== "" ? `?title=${searchText}` : ""
      }`
    );
    if (!response.ok) {
      return;
    }
    const data = await response.json();
    setVideoList(data.videos);
  };

  const addView = async (videoId) => {
    await fetch(`${config.endpoint}/videos/${videoId}/views`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
  };

  return (
    <>
      <Header isUploadVisible={false} isSearchVisible={false} />
      <Grid container>
        <Grid item xs={12}>
          {video ? (
            <>
              <div className={`${Styles.container} mx-auto`}>
                <div className="relative pb-[56.25%] pt-[25px] h-0 m-[20px]">
                  {!iframeLoading ? null : (
                    <div className="flex justify-center items-center">
                      <CircularProgress className={classes.root} />
                    </div>
                  )}
                  <iframe
                    src={`https://${video.videoLink}`}
                    className="absolute top-0 left-0  w-full h-full"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title="video"
                    onLoad={() => {
                      setIframeLoading(false);
                    }}
                  ></iframe>
                </div>
              </div>
              <div className={`${Styles.container}`}>
                <div className="flex justify-between flex-wrap items-center m-[20px]">
                  <div>
                    <p className="font-semibold text-white my-[5px]">
                      {video.title}
                    </p>
                    <div className="py-[.5rem] mt-[1rem] flex items-center">
                      <span className="text-[#c2c2c2] mr-[1rem]">
                        {video.viewCount} Views
                      </span>
                      <div className="bg-white w-[6px] h-[6px] rounded-full mr-[1rem]"></div>
                      <span className="text-[#c2c2c2] mr-[1rem]">
                        {video.contentRating} Rating
                      </span>
                      <div className="bg-white w-[6px] h-[6px] rounded-full mr-[1rem]"></div>
                      <span className="text-[#c2c2c2] mr-[1rem]">
                        {video.releaseDate}
                      </span>
                    </div>
                  </div>

                  <div className="inline-flex justify-center">
                    <span
                      className={Styles.votePill}
                      onClick={() =>
                        handleVoteChange(video.id, "upVote", "increase")
                      }
                    >
                      <ThumbUpIcon className="text-[#797979] mr-3" />{" "}
                      <span>{video.votes.upVotes}</span>
                    </span>
                    <span
                      className={Styles.votePill}
                      onClick={() =>
                        handleVoteChange(video.id, "downVote", "increase")
                      }
                    >
                      <ThumbDownIcon className="text-[#797979] mr-3" />{" "}
                      <span>{video.votes.downVotes}</span>
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {loading ? (
                <LinearProgress
                  classes={{
                    colorPrimary: classes.colorPrimary,
                    barColorPrimary: classes.barColorPrimary,
                  }}
                />
              ) : (
                <div className="text-center">404 - Not Found</div>
              )}
            </>
          )}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <VideoGallery videos={videoList} loading={false} />
      </Grid>
    </>
  );
}
