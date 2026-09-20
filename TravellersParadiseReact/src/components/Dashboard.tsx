import React from "react";
import GlobalNavBar from "../ReuseableComponents/GlobalNavBar";
import { useGetDashbaordQuery } from "../services/api";

export default function Dashboard() {
  const tabs = ["Explore Feed", "Travel Buddies", "Direct Messages"];

  // RTK Query hook — triggers fetch, provides loading/error/data states
  const { data, error, isLoading, isFetching, refetch } = useGetDashbaordQuery()

  return (
    <div>
    <GlobalNavBar
      appIcon={<span>✦</span>}
      appTitle="Travellers Paradise"
      searchPlaceholder="Search destinations, cool..."
      tabs={tabs}
      defaultSelectedTab="Explore Feed"
      onTabChange={(selectedTab) => console.log("Selected tab:", selectedTab)}
      shareButtonTitle="Share Experience"
      shareBadgeCount={2}
      profileImage="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
      profileAlt="Profile avatar"
    />
    <main style={{ padding: "1rem" }}>
      <header style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <h2>Explore Feed</h2>
          <button onClick={() => refetch()} disabled={isFetching}>
            Refresh
          </button>
      </header>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {JSON.stringify(error)}</p>}
      {data && Array.isArray(data) ? (
        <ul>
          {data.map((item: any) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      ): (
          !isLoading && <p>No Items found.</p>
        )}
    </main>
    </div>
  );
}

