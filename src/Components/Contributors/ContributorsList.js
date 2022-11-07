import ContributorItem from "./ContributorItem";
const ContributorsList = ({ contributors }) => {
  const contributorsItems = contributors.map((contributor) => {
    return <ContributorItem contributor={contributor} key={contributor.id} />;
  });
  return <div className="row">{contributorsItems}</div>;
};

export default ContributorsList;