import { IoStarOutline, IoStarSharp } from "react-icons/io5";

function SelectableStars({ selectedStars, onStarClick }) {
  return (
    <div className="stars">
      {new Array(5).fill(0).map((_, i) => {
        if (i + 1 <= selectedStars) {
          return (
            <IoStarSharp
              key={i}
              size={20}
              onClick={() => onStarClick(i + 1)}
              style={{ cursor: "pointer" }}
            />
          );
        }
        return (
          <IoStarOutline
            key={i}
            size={20}
            onClick={() => onStarClick(i + 1)}
            style={{ cursor: "pointer" }}
          />
        );
      })}
    </div>
  );
}

export default SelectableStars;
