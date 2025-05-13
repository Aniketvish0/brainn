export function timeToSeconds(timeString: string): number {
    const parts = timeString.split(':');
    if (parts.length === 3) {
      // Format: hh:mm:ss.ms
      const [hours, minutes, seconds] = parts;
      return (
        parseInt(hours, 10) * 3600 +
        parseInt(minutes, 10) * 60 +
        parseFloat(seconds)
      );
    } else if (parts.length === 2) {
      // Format: mm:ss.ms
      const [minutes, seconds] = parts;
      return parseInt(minutes, 10) * 60 + parseFloat(seconds);
    }
    return 0;
}
  