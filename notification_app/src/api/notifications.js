import { BASE_URL, TOKEN } from "../utils/constants";

export async function getNotifications() { const response = await fetch(
    `${BASE_URL}/notifications`,
    { headers: {
         Authorization: `Bearer ${TOKEN}`,
         "Content-Type": "application/json",
      },
    }
   );

  const data = await response.json();

console.log("Status:", response.status);
console.log("Data:", data);

  return data;}