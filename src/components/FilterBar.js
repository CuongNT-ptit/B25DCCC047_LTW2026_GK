import { CATEGORIES } from "../data";

const FilterBar = ({ query, onQueryChange, category, onCategoryChange }) => (
  <div className="filter-bar">
    <div className="field">
      <label htmlFor="search">Tìm kiếm</label>
      <input id="search" type="text" value={query} onChange={onQueryChange} />
    </div>
    <div className="field">
      <label htmlFor="filter-category">Danh mục</label>
      <select id="filter-category" value={category} onChange={onCategoryChange}>
        <option value="Tất cả">Tất cả</option>
        {CATEGORIES.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default FilterBar;
