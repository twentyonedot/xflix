const genreFilters = [
  {
    label: "All genre",
    value: "All",
    isSelected: true,
  },
  {
    label: "Education",
    value: "Education",
    isSelected: false,
  },
  {
    label: "Sports",
    value: "Sports",
    isSelected: false,
  },
  {
    label: "Comedy",
    value: "Comedy",
    isSelected: false,
  },
  {
    label: "Lifestyle",
    value: "Lifestyle",
    isSelected: false,
  },
];

const contentRatingFilters = [
  { label: "Anyone", value: "Anyone", isSelected: false },
  { label: "7+", value: "7+", isSelected: false },
  { label: "12+", value: "12+", isSelected: false },
  { label: "16+", value: "16+", isSelected: false },
  { label: "18+", value: "18+", isSelected: false },
];

const sortByFilters = [
  {
    label: "Release Date",
    value: "releaseDate",
    isSelected: true,
  },
  {
    label: "View Count",
    value: "viewCount",
    isSelected: false,
  },
];

module.exports = {
  genreFilters,
  contentRatingFilters,
  sortByFilters,
};
