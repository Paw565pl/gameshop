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
    <div className="flex flex-col justify-center mb-4">
      <h4 className="text-center text-sm mb-1">{title}</h4>
      {items.map((item) => (
        <div key={item.id} className="form-control">
          <label className="label cursor-pointer justify-normal text-xs">
            <input
              type="radio"
              name={title}
              value={item.slug}
              className="radio checked:bg-accent radio-xs"
              onChange={(e) => console.log(e.currentTarget.value)}
            />
            <span className="label-text ml-1">{item.name}</span>
          </label>
        </div>
      ))}
      <button className="btn btn-xs btn-ghost">Show more</button>
    </div>
  );
};

export default RadioFilter;
