const httpStatus = require("http-status");
const mongoose = require("mongoose");

const { Video } = require("../models");
const ApiError = require("../utils/ApiError");
const Values = require("../utils/values");

const addVideo = async (videoBody) => {
  const video = await Video.create(videoBody).catch((error) => {
    if (mongoose.Error.ValidationError) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Video Link already exist");
    }
  });
  return video;
};

const getVideos = async (title, contentRating, genres, sortBy) => {
  const titleMatch = { title: { $regex: title, $options: "i" } };

  const contentRatings = getPossibleContentRatings(contentRating);
  const contentRatingMatch = { contentRating: { $in: contentRatings } };

  let genreMatch = { genre: { $in: genres } };
  if (genres.includes("All")) {
    genreMatch = null;
  }

  const videos = await Video.find({
    ...titleMatch,
    ...contentRatingMatch,
    ...genreMatch,
  });

  const sortedVideos = sortVideos(videos, sortBy);

  return sortedVideos;
};

const getPossibleContentRatings = (contentRating) => {
  let contentRatings = [...Values.contentRatings];

  if (contentRating === "All") {
    return contentRatings;
  }

  const contentRatingIndex = contentRatings.indexOf(contentRating);

  const possibleContentRatings = contentRatings.splice(
    0,
    contentRatingIndex + 1
  );

  return possibleContentRatings;
};

const sortVideos = (videos, sortBy) => {
  videos.sort((video1, video2) => {
    let field1 = video1[sortBy];
    let field2 = video2[sortBy];

    if (sortBy === "releaseDate") {
      field1 = new Date(field1).getTime();
      field2 = new Date(field2).getTime();
    }

    if (field1 > field2) {
      return -1;
    }

    return 1;
  });

  return videos;
};

const findVideoById = async (id) => {
  const video = await Video.findById(id);

  if (!video) {
    throw new ApiError(httpStatus.NOT_FOUND, "No video found with matching id");
  }

  return video;
};

const getVideo = async (id) => {
  const video = await findVideoById(id);

  return video;
};

const changeViews = async (id) => {
  const video = await findVideoById(id);

  video.viewCount += 1;
  await video.save();
};

const changeVotes = async (id, voteType, changeType) => {
  const video = await findVideoById(id);

  let changeVoteType = "";

  if (voteType === "upVote") {
    changeVoteType = "upVotes";
  } else {
    changeVoteType = "downVotes";
  }

  const prevVotes = video.votes[changeVoteType];
  let newVotes = prevVotes;

  if (changeType === "increase") {
    newVotes += 1;
  } else {
    newVotes -= 1;
  }

  newVotes = Math.max(newVotes, 0);

  video.votes[changeVoteType] = newVotes;

  console.log(video);
  await video.save();
  return;
};

module.exports = {
  addVideo,
  getVideos,
  getVideo,
  changeVotes,
  changeViews,
};
