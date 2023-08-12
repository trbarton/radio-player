import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import AudioPlayerComponent from "./AudioPlayer";

function convertName(name: string): string {
  const removeExtension = name.replace(".mp3", "");
  const extractDate = removeExtension.split("-");
  const year = extractDate[3];
  const month = extractDate[2];
  const day = extractDate[1];
  const hour = extractDate[4].slice(0, 2);
  const minute = extractDate[4].slice(2, 4);
  const date = new Date(
    Date.UTC(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hour),
      parseInt(minute),
      0
    )
  );

  const prettyDate = format(date, "PPPP");
  return `George FM Drive: ${prettyDate}`;
}

export default function RecordingCard({
  name,
  url,
}: {
  name: string;
  url: string;
}) {
  const prettyName = convertName(name);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-bold">{prettyName}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* <audio controls preload="metadata" className="w-full">
          <source src={url} type="audio/mpeg" />
        </audio> */}
        <AudioPlayerComponent url={url} />
      </CardContent>
    </Card>
  );
}
