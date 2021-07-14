import React from "react";

export default function FiltersPanel(props) {
  return (
    <section>
      <div className="filters">
        <div>
          {props.genres.map((genre) => (
            <div
              onClick={props.handleGenreChange(genre)}
              className={`${
                props.selectedGenres.includes(genre.value)
                  ? "bg-[rgba(255, 255, 255, 0.87)] text-[#000]"
                  : "text-[rgba(255, 255, 255, 0.87)]"
              } cursor-pointer rounded-xl`}
              key={genre.value}
              id={genre.value}
            >
              {genre.label}
            </div>
          ))}
        </div>
        <div></div>
      </div>
      <div className="filters"></div>
    </section>
  );
}
