import Head from "next/head";
import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { getMeetups } from "../mongodb/mongo-db-client";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Meet Me Outside</title>
        <meta
          name="description"
          content="This is the world's leading site where saiyans can schedule meet ups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// Perform static generation (data fetching for pre rendering)
// so that the html that is initially served has data in it
// The data is populated during build phase "npm run build" not server side (i.e when requests are received)
export async function getStaticProps() {
  const meetups = await getMeetups();

  return {
    props: {
      meetups: meetups,
    },
    revalidate: 3600, //# of seconds next will wait before regenerating page for next incoming requests
  };
}

export default HomePage;
