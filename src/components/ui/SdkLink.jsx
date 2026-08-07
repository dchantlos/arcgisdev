import { EsriIcon } from './EsriIcon';

export const ARCGIS_SDK_URL = 'https://developers.arcgis.com/javascript/latest/';

/**
 * Inline link to the official ArcGIS Maps SDK for JavaScript docs, prefixed
 * with the Esri globe mark. Use anywhere the SDK is mentioned in prose.
 */
export function SdkLink({
  label = 'ArcGIS Maps SDK for JavaScript',
  className = '',
  onClick,
}) {
  return (
    <a
      href={ARCGIS_SDK_URL}
      target="_blank"
      rel="noreferrer"
      onClick={onClick}
      className={`inline-flex items-center gap-1 align-middle font-medium text-neon-cyan underline decoration-neon-cyan/40 underline-offset-2 transition-colors hover:text-white hover:decoration-white/60 ${className}`}
    >
      <EsriIcon className="h-3.5 w-3.5 shrink-0" />
      {label}
    </a>
  );
}

export default SdkLink;
