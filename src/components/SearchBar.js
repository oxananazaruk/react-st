export const SearchBar = ({
  filters: { topic, level },
  // onUpdateTopic,
  // onUpdateLevel,
  onUpdateFilters,
  onReset,
}) => {
  return (
    <div>
      <input
        type="text"
        value={topic}
        onChange={evt => onUpdateFilters('topic', evt.target.value)}
        placeholder="Topic filter"
      />
      <select
        value={level}
        onChange={evt => onUpdateFilters('level', evt.target.value)}
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
