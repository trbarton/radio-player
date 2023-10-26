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

export default async function IndividualStream({
  params,
}: {
  params: { details: string };
}) {
  const { details } = params;
  // Base 64 decode stream details
  const stream = JSON.parse(atob(decodeURIComponent(details))) as Stream;

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
        <RecordingCard key={stream.name} name={stream.name} url={stream.url} />
      </div>
    </main>
  );
}
