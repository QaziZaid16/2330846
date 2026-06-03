export function calculatePriority(notification) {const weights = {
    Placement: 3,
    Result: 2,
    Event: 1,};

  const typeWeight = weights[notification.Type] || 0;

  const timestamp = new Date(notification.Timestamp).getTime() || 0;

  return typeWeight * 10000000000000 + timestamp;}