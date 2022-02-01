import { useRouter } from "next/router";
import MeetupItem from "./MeetupItem";
import classes from "./MeetupList.module.css";

const MeetupList = (props) => {
  const router = useRouter();

  function showDetailsHandler(meetupId) {
    router.push(`/${meetupId}`);
  }

  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => (
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
          showDetails={showDetailsHandler.bind(null, meetup.id)}
        />
      ))}
    </ul>
  );
};

export default MeetupList;
