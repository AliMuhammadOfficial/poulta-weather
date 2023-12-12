export async function POST(request: Request) {
  const {lat, lon, dateTimeString} = await request.json();
  console.log("LAT, LONG", lat, lon)
  console.log("dateTimeString", dateTimeString)
  const responseData = {
    version: "3.0",
    user: "eos_data_analytics",
    dateGenerated: "2023-11-29T09:38:12Z",
    status: "OK",
    data: [
      {
        parameter: "t_2m:C",
        coordinates: [
          {
            lat: 50.447235,
            lon: 30.522595,
            dates: [
              { date: "2023-05-25T00:00:00Z", value: 14.7 },
              { date: "2023-05-26T00:00:00Z", value: 15.9 },
              { date: "2023-05-27T00:00:00Z", value: 17 },
            ],
          },
        ],
      },
    ],
  };
  return Response.json(responseData)
}
