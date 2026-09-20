import React, { useMemo, useState } from "react";
import GlobalButton from "./GlobalButton";
import { ButtonTypes } from "./ButtonTypes";

export interface SideMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number;
  isSectionHeader?: boolean;
  children?: SideMenuItem[];
}

export interface GlobalSideMenuProps {
  items: SideMenuItem[];
  isOpen?: boolean;
  onClose?: () => void;
  selectedId?: string;
  onSelect?: (item: SideMenuItem) => void;
  title?: string;
  subtitle?: string;
  profileImage?: string;
  profileAlt?: string;
  className?: string;
}

const GlobalSideMenu = ({
  items,
  isOpen = false,
  onClose,
  selectedId,
  onSelect,
  title,
  subtitle,
  profileImage,
  profileAlt = "Profile image",
  className = "",
}: GlobalSideMenuProps) => {
  const [internalSelectedId, setInternalSelectedId] = useState<string | undefined>(selectedId);

  const activeId = selectedId ?? internalSelectedId;

  const handleItemClick = (item: SideMenuItem) => {
    if (!item.isSectionHeader) {
      if (selectedId === undefined) {
        setInternalSelectedId(item.id);
      }
      onSelect?.(item);
      onClose?.();
    }
  };

  const renderedItems = useMemo(() => items, [items]);

  if (!isOpen) return null;

  return (
    <div className="global-side-menu-overlay" onClick={onClose}>
      <aside
        className={`global-side-menu ${className}`.trim()}
        onClick={(event) => event.stopPropagation()}
      >
        {(title || profileImage || subtitle) && (
          <div className="global-side-menu-header">
            {profileImage && (
              <img src={profileImage} alt={profileAlt} className="global-side-menu-avatar" />
            )}

            <div className="global-side-menu-header-text">
              {title && <div className="global-side-menu-title">{title}</div>}
            </div>
          </div>
        )}

        <nav className="global-side-menu-list">
          {renderedItems.map((item) => {
            const isSelected = activeId === item.id;

            return (
              <div key={item.id} className="global-side-menu-row-wrap">
                <GlobalButton
                  variant={ButtonTypes.BASIC}
                  label={item.label}
                  selected={isSelected}
                  onClick={() => handleItemClick(item)}
                />
              </div>
            );
          })}
        </nav>
      </aside>
    </div>
  );
};

export default GlobalSideMenu;
