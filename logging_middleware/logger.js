import { BASE_URL, TOKEN } from "../notification_app/src/utils/constants";

export async function Log(
  stack,
  level,
  packageName,
  message
) {
  try {const response = await fetch(
      `${BASE_URL}/logs`,
      {method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },body: JSON.stringify({
          stack,
          level,
          package: packageName,
          message,
        }),});

    const data = await response.json();

    console.log("LOG RESPONSE:", data);

    return data;
  } catch (error) {console.error("Logging Error:", error);}
}