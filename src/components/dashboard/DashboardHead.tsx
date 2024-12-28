import { Helmet } from 'react-helmet';

interface DashboardHeadProps {
  title: string;
  description?: string;
}

export const DashboardHead = ({ title, description }: DashboardHeadProps) => {
  const baseTitle = 'Lander | Panel de Control';
  const fullTitle = title ? `${title} - ${baseTitle}` : baseTitle;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <meta name="robots" content="noindex, nofollow" /> {/* Proteger el dashboard de indexación */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#00DC8F" />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
    </Helmet>
  );
};
