import axios from "axios";

interface Location {
  latitude: string;
  longitude: string;
}

const api_key = process.env.EOS_API_KEY

export async function POST(request: Request) {
  const {
    locations,
    dateTimeString,
  }: { locations: Location[]; dateTimeString: string } = await request.json();
  const locs = locations.map((location: Location) => {
    const { latitude, longitude } = location;
    return `${latitude},${longitude}`;
  });

  const parametersString = locs.join("+");
  const data = {
    parameters: `t_mean_2m_1h:C/${parametersString}/json`,
  };
  const options = {
    method: "post",
    url: `https://api-connect.eos.com/weather/v1/meteomatics/${dateTimeString}`,
    headers: {
      "Content-Type": "text/plain",
      "x-api-key": api_key,
    },
    data: JSON.stringify(data),
  };

  const response = await axios(options);
  const responseData = JSON.stringify(response.data);
  console.log("responseData", responseData);
  return Response.json(responseData);
}
