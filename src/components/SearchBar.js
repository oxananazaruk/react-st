export const SearchBar = ({
  filters,
  onUpdateTopic,
  onUpdateLevel,
  onReset,
}) => {
  return (
    <div>
      <input
        type="text"
        value={filters.topic}
        onChange={evt => onUpdateTopic(evt.target.value)}
        placeholder="Topic filter"
      />
      <select
        value={filters.level}
        onChange={evt => onUpdateLevel(evt.target.value)}
      >
        <option value="all">All</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
      <button onClick={onReset}>Reset</button>
    </div>
  );
};
