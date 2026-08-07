/**
 * A simple globe mark used to denote Esri / the ArcGIS platform when linking
 * out to the official developer site. Inherits `currentColor`.
 */
export function EsriIcon({ className = '', title = 'Esri', ...rest }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label={title}
      className={className}
      {...rest}
    >
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
      <path d="M3 12h18" />
    </svg>
  );
}

export default EsriIcon;
