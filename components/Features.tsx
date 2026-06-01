const features = [
  {
    title: "Fully Insured",
    description: "Drive with peace of mind",
    icon: (
      <path
        fillRule="evenodd"
        d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.75.75 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516 11.209 11.209 0 0 1-7.877-3.08ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
        clipRule="evenodd"
      />
    ),
  },
  {
    title: "Well Maintained",
    description: "Clean, reliable vehicles",
    icon: (
      <path d="M8.25 10.875a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0ZM8.25 3.375A2.625 2.625 0 1 1 5.625 6h12.75A2.625 2.625 0 1 1 15.75 3.375H8.25ZM4.875 20.25a.75.75 0 0 0 0 1.5h14.25a.75.75 0 0 0 0-1.5H4.875Z" />
    ),
  },
  {
    title: "Best Rates",
    description: "Transparent, fair pricing",
    icon: (
      <path
        fillRule="evenodd"
        d="M5.25 2.25a3 3 0 0 0-3 3v4.318a3 3 0 0 0 .879 2.121l9.58 9.58c1.14 1.14 3.02 1.14 4.16 0l1.06-1.06a2.94 2.94 0 0 0 0-4.16l-9.58-9.58A3 3 0 0 0 9.568 2.25H5.25ZM6 6a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
        clipRule="evenodd"
      />
    ),
  },
  {
    title: "Local Support",
    description: "Friendly Praslin team",
    icon: (
      <path
        fillRule="evenodd"
        d="M4.804 21.644A6.707 6.707 0 0 0 6 18.75h12c.69 0 1.352.104 1.978.3a6.707 6.707 0 0 0-1.174-2.25h-9.652a6.707 6.707 0 0 0-2.048 4.144ZM12 2.25c-2.905 0-5.26 2.355-5.26 5.26 0 2.905 2.355 5.26 5.26 5.26 2.905 0 5.26-2.355 5.26-5.26 0-2.905-2.355-5.26-5.26-5.26ZM2.25 7.51c0-5.376 4.359-9.735 9.735-9.735 5.376 0 9.735 4.359 9.735 9.735 0 5.376-4.359 9.735-9.735 9.735-5.376 0-9.735-4.359-9.735-9.735Z"
        clipRule="evenodd"
      />
    ),
  },
];

export default function Features() {
  return (
    <section className="bg-white py-12 sm:py-16 mt-10 " aria-label="Why choose us">
      <div className="mx-auto grid max-w-5xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 sm:px-6">
        {features.map(({ title, description, icon }) => (
          <div key={title} className="flex gap-3 items-center text-center sm:items-start sm:text-left">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6 text-brand-blue"
                aria-hidden
              >
                {icon}
              </svg>
            </div>
            <div>
            <h3 className="font-poppins text-base font-semibold text-gray-900">
              {title}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
