import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
} from "@mui/material";

export default function NotificationCard({
  notification,
}) {
  const getChipColor = (type) => {
    switch (type) {
      case "Placement":
        return "success";

      case "Result":
        return "primary";

      case "Event":
        return "warning";

      default:
        return "default";
    }
  };

  return (
    <Card
      elevation={4}
      sx={{
        mb: 2,
        borderRadius: 3,
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-3px)",
        },
      }}
    >
      <CardContent>
        <Stack spacing={1}>
          <Typography
            variant="h5"
            fontWeight="bold"
          >
            {notification.Message}
          </Typography>

          <Chip
            label={notification.Type}
            color={getChipColor(
              notification.Type
            )}
            sx={{ width: "fit-content" }}
          />

          <Typography
            variant="body2"
            color="text.secondary"
          >
            {new Date(
              notification.Timestamp
            ).toLocaleString()}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}