import FormatDate from "../../Helpers/FormatDate";

const UpdateBadge = ({ date }) => {
  return (
    <span className="badge bg-info">
      <i className="fa fa-clock-o"></i> Atualizado em:{" "}
      {FormatDate(new Date(date))}
    </span>
  );
};

export default UpdateBadge;
