export interface NavigationBarProps {
  withoutBackButton?: boolean;
  renderCenterComponent?: (() => React.ReactElement | null) | null;
  renderRightComponent?: (() => React.ReactElement | null) | null;
  renderLeftComponent?: (() => React.ReactElement | null) | null;
}
