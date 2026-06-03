import { useEffect, useMemo, useState } from "react";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { getNotifications } from "../api/notifications";
import NotificationCard from "../components/NotificationCard";
import { calculatePriority } from "../utils/priority";

export default function Dashboard() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    async function loadData() {try {
        const data = await getNotifications();

        const sorted = [...data.notifications].sort((a, b) => calculatePriority(b) - calculatePriority(a));

        setNotifications(sorted);
      } catch (error) {console.error(error);
      }
    }

    loadData();}, []);

  const filteredNotifications = useMemo(() => {
    let result = [...notifications];

    if (filter !== "All") {
      result = result.filter((item) => item.Type === filter);
    }

    return result.slice(0, limit);
  }, [notifications, filter, limit]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
      >
        Campus Notifications
      </Typography>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Notification Type</InputLabel>

          <Select
            value={filter}
            label="Notification Type"
            onChange={(e) =>setFilter(e.target.value)
            }
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Placement">
              Placement
            </MenuItem>
            <MenuItem value="Result">
              Result
            </MenuItem>
            <MenuItem value="Event">
              Event
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Top Notifications</InputLabel>

          <Select
            value={limit}
            label="Top Notifications"
            onChange={(e) =>
              setLimit(Number(e.target.value))
            }
          >
            <MenuItem value={10}>Top 10</MenuItem>
            <MenuItem value={15}>Top 15</MenuItem>
            <MenuItem value={20}>Top 20</MenuItem>
          </Select>
        </FormControl>
      </div>

      {filteredNotifications.map((item) => (
        <NotificationCard
          key={item.ID}
          notification={item}
        />
      ))}
    </Container>);
}