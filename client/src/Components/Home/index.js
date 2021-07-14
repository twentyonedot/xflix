import React, { useState } from "react";
import Header from "../Header";
import filters from "../../utils/filtersData";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [genreFilters, setGenresFilters] = useState(filters.genreFilters);
  const [contentRatingFilters, setContentRatingFilters] = useState(
    filters.contentRatingFilters
  );
  const [videoList, setVideoList] = useState([]);
  const [sortBy, setSortBy] = useState("releaseDate");
  const [searchText, setSearchText] = useState("");

  const performApiCall = async () => {
    const paramsArray = [];

    const selectedGenreFilters = genreFilters.filter((genre) => genre.selected);
    const SelectedContentRatingFilters = contentRatingFilters.filter(
      (cr) => cr.selected
    );
  };
  return (
    <div>
      <Header />
    </div>
  );
}
