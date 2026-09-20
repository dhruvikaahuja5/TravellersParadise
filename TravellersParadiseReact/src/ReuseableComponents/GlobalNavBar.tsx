import React, { useEffect, useState } from "react";
import GlobalButton from "./GlobalButton";
import GlobalSearchBar from "./GlobalSearchBar";
import GlobalSideMenu from "./GlobalSideMenu";
import type { SideMenuItem } from "./GlobalSideMenu";
import { ButtonTypes } from "./ButtonTypes";

export interface GlobalNavBarProps {
  appIcon?: React.ReactNode;
  appTitle?: string;
  registerButtonTitle?: string;
  searchPlaceholder?: string;
  tabs?: string[];
  defaultSelectedTab?: string;
  onTabChange?: (selectedTab: string) => void;
  shareButtonTitle?: string;
  shareBadgeCount?: number;
  profileImage?: string;
  profileAlt?: string;
}

const GlobalNavBar = ({
  appIcon,
  appTitle,
  searchPlaceholder,
  tabs = [],
  defaultSelectedTab,
  onTabChange,
  shareButtonTitle,
  shareBadgeCount,
  profileImage,
  profileAlt = "Profile avatar",
}: GlobalNavBarProps) => {
  const [selectedTab, setSelectedTab] = useState<string>(
    defaultSelectedTab ?? tabs[0] ?? ""
  );
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 540);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 540;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTabChange = (tabTitle: string) => {
    setSelectedTab(tabTitle);
    onTabChange?.(tabTitle);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="global-nav-bar">
        {isMobile && (
          <button
            className="nav-hamburger"
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            ☰
          </button>
        )}

        <div className="nav-brand">
          <div className="nav-brand-badge">{appIcon}</div>
          <div className="nav-brand-text">{appTitle}</div>
        </div>

        {!isMobile && (
          <>
            <div className="nav-search-wrap">
              <GlobalSearchBar placeholder={searchPlaceholder} />
            </div>

            <div className="nav-menu">
              {tabs.map((tab) => (
                <GlobalButton
                  key={tab}
                  variant={ButtonTypes.BASIC}
                  label={tab}
                  selected={selectedTab === tab}
                  onClick={() => handleTabChange(tab)}
                />
              ))}
            </div>

            <div className="nav-share-area">
              {shareBadgeCount && shareBadgeCount > 0 && (
                <div className="nav-badge">{shareBadgeCount}</div>
              )}
              <GlobalButton
                variant={ButtonTypes.SECONDARY}
                label={shareButtonTitle}
                icon={<span className="share-icon">✓</span>}
              />
              <div className="nav-avatar">
                {profileImage ? (
                  <img src={profileImage} alt={profileAlt} className="nav-avatar-image" />
                ) : (
                  "P"
                )}
              </div>
            </div>
          </>
        )}
      </nav>

      {isMobile && (
        <GlobalSideMenu
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
          title="Travellers Paradise"
          subtitle="Menu"
          items={tabs.map(
            (tab): SideMenuItem => ({
              id: tab,
              label: tab,
              icon: <span>{tab.charAt(0)}</span>,
            })
          )}
          selectedId={selectedTab}
          onSelect={(item) => handleTabChange(item.label)}
        />
      )}
    </>
  );
};

export default GlobalNavBar;