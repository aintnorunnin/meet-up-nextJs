import css from "./MeetupDetail.module.css";

const MeetUpDetail = (props) => {
  return (
    <div className={css.detail}>
      <h1>{props.title}</h1>
      <img src={props.image}></img>
      <h3>{props.description}</h3>
    </div>
  );
};

export default MeetUpDetail;
