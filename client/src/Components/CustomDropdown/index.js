import React, { useState } from "react";
import { BsArrowUpDown } from "react-icons/bs";
import Styles from "./CustomDropdown.module.scss";

export default function Dropdown({ dropdownOptions, onSortByChange }) {
  const [open, setOpen] = useState(false);

  const toggleDisplayOptionList = () => {
    setOpen(!open);
  };

  const selectedOptions = dropdownOptions.filter((opn) => opn.isSelected);

  return (
    <div className={Styles.ddWrapper}>
      <button className={Styles.ddHeader} onClick={toggleDisplayOptionList}>
        <span className="flex justify-center items-center mr-4">
          <BsArrowUpDown className="text-[#fff]" />
        </span>
        <span>{selectedOptions[0].label}</span>
      </button>
      {open && (
        <div className={Styles.ddList}>
          {dropdownOptions.map((opn) => (
            <button
              key={opn.value}
              onClick={() => {
                toggleDisplayOptionList();
                onSortByChange(opn);
              }}
              className={Styles.ddListItem}
            >
              {opn.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
