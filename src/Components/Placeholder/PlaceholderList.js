import PlaceholderItem from "./PlaceholderItem";

const PlaceholderList = ({ quantity }) => {
  const items = [];
  for (let i = 0; i < quantity; i++) {
    items.push(<PlaceholderItem key={i} />);
  }
  return <>{items}</>;
};

export default PlaceholderList;