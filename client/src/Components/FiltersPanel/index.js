import React from "react";
import Dropdown from "../CustomDropdown";

export default function FiltersPanel(props) {
  return (
    <section className="bg-[#202020] pb-4">
      <div className="filters flex justify-center items-center text-white p-2 flex-wrap">
        <div className="flex justify-center flex-wrap items-center my-2">
          {props.genres.map((genre) => (
            <div
              onClick={() => props.onGenreChange(genre)}
              className={`${
                genre.isSelected
                  ? "bg-[#fff] text-[#000] px-4 py-2 m-2"
                  : "text-[#fff] m-4"
              } cursor-pointer rounded-2xl`}
              key={genre.value}
              id={genre.value}
            >
              {genre.label}
            </div>
          ))}
        </div>
        <div>
          <Dropdown
            dropdownOptions={props.sortBy}
            onSortByChange={props.onSortByChange}
          />
        </div>
      </div>

      <div className="filters flex justify-center flex-wrap items-center my-2">
        {props.contentRatings.map((cr) => (
          <div
            onClick={() => props.onContentRatingChange(cr)}
            className={`${
              cr.isSelected
                ? "bg-[#fff] text-[#000] px-4 py-2 m-2"
                : "text-[#fff] m-4"
            } cursor-pointer rounded-2xl`}
            key={cr.value}
            id={cr.value}
          >
            {cr.label}
          </div>
        ))}
      </div>
    </section>
  );
}
