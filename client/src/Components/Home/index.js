import React, { useState, useEffect } from "react";
import Header from "../Header";
import filters from "../../utils/filtersData";
import { config } from "../../App";
import FiltersPanel from "../FiltersPanel";
import VideoGallery from "../VideoGallery";

export default function Home() {
  useEffect(() => {
    getVideos();
  }, []);
  const [loading, setLoading] = useState(false);
  const [genreFilters, setGenresFilters] = useState(filters.genreFilters);
  const [sortByFilters, setSortByFilters] = useState(filters.sortByFilters);
  const [contentRatingFilters, setContentRatingFilters] = useState(
    filters.contentRatingFilters
  );
  const [videoList, setVideoList] = useState([]);
  const [searchText, setSearchText] = useState("");

  const performApiCall = async (params) => {
    let response;
    try {
      let url = `${config.endpoint}/videos${params ? "?" + params : ""}`;
      response = await fetch(url).then((res) => res.json());
      console.log("Api success", url);
    } catch (err) {
      console.log(`Api Error: ${err}`);
    }

    return response;
  };

  const getVideos = async () => {
    const paramsArray = [];

    if (searchText.length > 0) {
      paramsArray.push(`title=${searchText}`);
    }

    const selectedGenreFilters = genreFilters
      .filter((genre) => genre.isSelected)
      .map((genre) => genre.value);
    if (selectedGenreFilters.length > 0) {
      paramsArray.push(`genres=${selectedGenreFilters.join(",")}`);
    }

    const selectedSortByFilters = sortByFilters
      .filter((sortBy) => sortBy.isSelected)
      .map((sortBy) => sortBy.value);
    if (selectedSortByFilters.length > 0) {
      paramsArray.push(`sortBy=${selectedSortByFilters.join(",")}`);
    }

    const SelectedContentRatingFilters = contentRatingFilters
      .filter((cr) => cr.isSelected)
      .map((cr) => encodeURIComponent(cr.value));
    if (SelectedContentRatingFilters.length > 0) {
      paramsArray.push(
        `contentRating=${SelectedContentRatingFilters.join(",")}`
      );
    }

    const params = paramsArray.join("&");
    setLoading(true);
    const response = await performApiCall(params);
    setLoading(false);
    if (response) {
      setVideoList(response.videos);
      saveVideosLocally();
    }
  };

  const saveVideosLocally = async () => {
    localStorage.setItem("videos", JSON.stringify(videoList));
  };

  const onGenreChangeHandler = async (item) => {
    let genres;
    if (item.value === "All") {
      genres = genreFilters.map((genre) => {
        if (genre.value === "All") {
          genre.isSelected = true;
        } else {
          genre.isSelected = false;
        }
        return genre;
      });
    } else {
      genres = genreFilters.map((genre) => {
        if (genre.value === "All") {
          genre.isSelected = false;
        } else if (genre.value === item.value) {
          genre.isSelected = !genre.isSelected;
        }
        return genre;
      });
    }
    if (!genres.find((genre) => genre.isSelected)) {
      genres.every((genre) => {
        if (genre.value === "All") {
          genre.isSelected = true;
          return false;
        }
        return true;
      });
    }
    setGenresFilters(genres);
    getVideos();
  };

  const onContentRatingChangeHandler = async (item) => {
    const contentRatings = contentRatingFilters.map((contentRating) => {
      if (contentRating.value === item.value) {
        contentRating.isSelected = !contentRating.isSelected;
      } else {
        contentRating.isSelected = false;
      }
      return contentRating;
    });

    setContentRatingFilters(contentRatings);
    getVideos();
  };

  const onSortByChangeHandler = async (item) => {
    if (item.isSelected) {
      return;
    }
    const sortBy = sortByFilters.map((sb) => {
      if (sb.value === item.value) {
        sb.isSelected = true;
      } else {
        sb.isSelected = false;
      }
      return sb;
    });
    setSortByFilters(sortBy);
    getVideos();
  };

  return (
    <div>
      <Header
        isSearchVisible={true}
        isUploadVisible={true}
        refresh={getVideos}
      />

      <FiltersPanel
        genres={genreFilters}
        contentRatings={contentRatingFilters}
        sortBy={sortByFilters}
        onGenreChange={onGenreChangeHandler}
        onContentRatingChange={onContentRatingChangeHandler}
        onSortByChange={onSortByChangeHandler}
      />

      <VideoGallery videos={videoList} loading={loading} />
    </div>
  );
}
