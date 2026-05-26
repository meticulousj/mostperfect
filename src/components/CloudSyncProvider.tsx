import { useCloudSync } from "@/hooks/useCloudSync";

const CloudSyncProvider = ({ children }: { children: React.ReactNode }) => {
  useCloudSync();
  return <>{children}</>;
};

export default CloudSyncProvider;
