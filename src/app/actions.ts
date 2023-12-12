"use server";

import axios from "axios";

export async function getTemprature(formData: FormData) {
  console.log("formData", formData.get("name"));
  const data = {
    parameters: "t_2m:C/50.447235,30.522595/json",
  };

  const options = {
    method: "post",
    url: "https://api-connect.eos.com/weather/v1/meteomatics/2023-04-25T00:00:00Z--2023-04-27T00:00:00Z:P1D",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "apk.b4e38f048b78571f941e1ca959f8851758b16ed2ffd3aaa916f8575600e0f143",
    },
    data: data,
  };

  axios(options)
    .then(function (response) {
      const responseData = JSON.stringify(response.data);
    console.log(responseData);
    })
    .catch(function (error) {
      console.error(error);
    });
}
