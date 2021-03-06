import { MongoClient, ObjectId } from "mongodb";

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const cluster = process.env.DB_CLUSTER;
const DB_CLUSTER = `mongodb+srv://${user}:${password}@cluster0.ud91g.mongodb.net/${cluster}?retryWrites=true&w=majority`;

/**
 * Retrieves all meetups from database
 */
export const getMeetups = async () => {
  const client = await MongoClient.connect(DB_CLUSTER);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetupsFromDb = await meetupsCollection.find().toArray();

  const meetups = meetupsFromDb.map((meetup) => {
    return {
      id: meetup._id.toString(),
      title: meetup.title,
      address: meetup.address,
      image: meetup.image,
    };
  });
  client.close();

  return meetups;
};

/**
 * Retrieves specified meetup from database
 * * @param {String} meetupId
 */
export const getMeetup = async (meetupId) => {
  const client = await MongoClient.connect(DB_CLUSTER);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetupFromDb = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return meetupFromDb;
};

/**
 * Creates a new meetup
 * @param {*} request
 */
export const createNewMeetUp = async (request) => {
  const data = request.body;
  const client = await MongoClient.connect(DB_CLUSTER);

  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const result = await meetupsCollection.insertOne(data);
  client.close();
  return result;
};
