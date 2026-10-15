const CATEGORIES = ["All Categories", "Electronics", "Fashion", "Books", "Home"];

const SearchBar = ({ search, category, sort, onSearchChange, onCategoryChange, onSortChange }) => {
  return (
    <div className="search-filters">
      <div className="search-input-wrap">
        <input
          className="search-input"
          type="text"
          placeholder="Search products…"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>

      <select
        className="filter-select"
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        {CATEGORIES.map((item) => (
          <option key={item} value={item === "All Categories" ? "" : item}>
            {item}
          </option>
        ))}
      </select>

      <select
        className="filter-select"
        value={sort}
        onChange={(event) => onSortChange(event.target.value)}
      >
        <option value="">Newest First</option>
        <option value="price_asc">Price: Low → High</option>
        <option value="price_desc">Price: High → Low</option>
      </select>
    </div>
  );
};

export default SearchBar;
