interface PageHeaderProps {
  title: string;
  headerText: string;
  subHeaderText: string;
}

export default function PageHeader({
  title,
  headerText,
  subHeaderText,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 bg-[#F0FDFA] p-20">
      <div className="flex flex-col gap-2 text-center">
        <div className="flex justify-center items-center">
          <p className="bg-white py-0.5 px-5 rounded-xl text-primary font-semibold">
            {title}
          </p>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
          {headerText}
        </h1>
        <div className="flex items-center justify-center">
          <p className="text-lg max-w-2xl text-gray-600">{subHeaderText}</p>
        </div>
      </div>
    </div>
  );
}
