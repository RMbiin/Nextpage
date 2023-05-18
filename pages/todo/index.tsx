import TodoMain from "@/components/Todo";
import Seo from "@/components/common/Seo";

const Main = () => {
  return (
    <>
      <Seo title={`Todo`} />
      <TodoMain />
    </>
  );
};

export default Main;
