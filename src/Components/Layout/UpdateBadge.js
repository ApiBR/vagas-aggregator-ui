import FormatDate from "../../Helpers/FormatDate";

const UpdateBadge = ({ date, recentIssues, mostRecentIssue }) => {
  return (
    <>
      <span className="badge bg-info">
        <i className="fa fa-clock-o"></i> Atualizado em:{" "}
        {FormatDate(new Date(date))}
      </span>
      {recentIssues && (
        <>
          <br />
          <span
            className="badge bg-warning"
            title="Vagas atualizadas nos últimos 2 meses"
          >
            <i className="fa fa-hashtag"></i> Vaga
            {recentIssues === 1 ? "" : "s"} recente
            {recentIssues === 1 ? "" : "s"}: {recentIssues}
          </span>
        </>
      )}
      {mostRecentIssue && (
        <>
          <br />
          <span className="badge bg-warning">
            <i className="fa fa-calendar"></i> Última vaga atualizada em:{" "}
            {FormatDate(new Date(mostRecentIssue))}
          </span>
        </>
      )}
    </>
  );
};

export default UpdateBadge;
