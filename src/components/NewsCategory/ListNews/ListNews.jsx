import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

const ListNews = ({ news }) => {
  return (
    <div className="py-4 md:py-8">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 border-b pb-2">
        Latest News
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <LeftSection news={news} />
        <RightSection />
      </div>
    </div>
  );
};

export default ListNews;
