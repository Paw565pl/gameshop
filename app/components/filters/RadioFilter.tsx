"use client";

interface Item {
  id: number;
  name: string;
  slug: string;
  background_image: string;
}

interface SelectFilterProps {
  title: string;
  items: Item[];
  onChange: (value: string) => void;
}
// TODO: show more button downloads next pages from api
const RadioFilter = ({ title, items }: SelectFilterProps) => {
  return (
    <div className="mb-4 flex flex-col justify-center">
      <h4 className="mb-1 text-center text-sm">{title}</h4>
      {items.map((item) => (
        <div key={item.id} className="form-control">
          <label className="label cursor-pointer justify-normal text-xs">
            <input
              type="radio"
              name={title}
              value={item.slug}
              className="radio radio-xs checked:bg-accent"
              onChange={(e) => console.log(e.currentTarget.value)}
            />
            <span className="label-text ml-1">{item.name}</span>
          </label>
        </div>
      ))}
      <button className="btn btn-ghost btn-xs">Show more</button>
    </div>
  );
};

export default RadioFilter;