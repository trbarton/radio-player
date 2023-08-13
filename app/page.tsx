import Image from "next/image";
import { env } from "@/env.mjs";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import RecordingCard from "@/components/RecordingCard/RecordingCard";

const S3 = new S3Client({
  region: "auto",
  endpoint: env.S3_ENDPOINT,
  credentials: {
    accessKeyId: env.ACCESS_KEY_ID,
    secretAccessKey: env.SECRET_ACCESS_KEY,
  },
});

export const dynamic = "force-dynamic";
export const revalidate = 30;

interface Stream {
  name: string;
  url: string;
}

async function fetchStreamUrls(): Promise<Stream[]> {
  // List the object in recordings bucket
  const { Contents } = await S3.send(
    // TODO - pagination
    new ListObjectsV2Command({ Bucket: env.S3_BUCKET })
  );

  if (!Contents) {
    return [];
  }

  const sortedContents = Contents.sort((a, b) => {
    if (!a.LastModified || !b.LastModified) {
      return 0;
    }
    if (a.LastModified < b.LastModified) {
      return 1;
    }
    if (a.LastModified > b.LastModified) {
      return -1;
    }
    return 0;
  });

  // TODO - sort by modified date first
  const urls = sortedContents.map((object) => {
    const recordingName = object.Key ?? "Unkown Recording";
    return {
      name: recordingName,
      url: `${env.PUBLIC_BUCKET_URL}/${recordingName}`,
    };
  });

  return urls;
}
export default async function Home() {
  // Fetch list of recordings from R2
  const streamUrls = await fetchStreamUrls();

  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-4 pt-8">
      <div className="mb-8">
        <Image
          src="/GeorgeFMLogo.svg"
          alt="Radio Logo"
          width={500}
          height={86}
          priority
        />
      </div>
      <div className="space-y-4 w-full max-w-3xl">
        {streamUrls.map((stream) => (
          <RecordingCard
            key={stream.name}
            name={stream.name}
            url={stream.url}
          />
        ))}
      </div>
    </main>
  );
}
