import { createNewMeetUp } from "../../mongodb/mongo-db-client";

/**
 * API handler for /api/new-meetup endpoint.
 * Creates a new meetup
 * @param {*} request
 * @param {*} response
 */
const newMeetUpHandler = async (request, response) => {
  if (request.method === "POST") {
    const result = await createNewMeetUp(request);
    response.status(201).json({ message: "Meetup was created" });
  }
};

export default newMeetUpHandler;
