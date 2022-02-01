import MeetUpDetail from "../../components/meetups/MeetupDetail";
import { getMeetups, getMeetup } from "../../mongodb/mongo-db-client"

const MeetUpPage = (props) => {
  return (
    <MeetUpDetail
      image={props.image}
      title={props.title}
      description={props.description}
    />
  );
};

//Necessary so that NextJs can pre generate all versions of this page. (only need for dynamic pages)
//i.e /meetupId1 , /meetupId2 etc
//Returns an object containing a list of all possible param paths
//that should be statically rendered during build.
export async function getStaticPaths() {
  const meetups = await getMeetups();
  const allowedPaths = meetups.map((meetup) => {
    return {
      params: { meetUpId: meetup.id },
    };
  });

  return {
    fallback: false,
    paths: allowedPaths,
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetUpId;
  const meetup = await getMeetup(meetupId);
 
  return {
    props: {
      image: meetup.image,
      title: meetup.title,
      description: meetup.description,
    },
  };
}

export default MeetUpPage;
