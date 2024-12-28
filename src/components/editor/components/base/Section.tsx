import React from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

interface SectionProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
  background?: 'default' | 'paper' | 'primary' | 'secondary';
  spacing?: 'none' | 'small' | 'medium' | 'large';
  isEditing?: boolean;
  onTitleEdit?: (title: string) => void;
  onSubtitleEdit?: (subtitle: string) => void;
}

const StyledSection = styled(Box, {
  shouldForwardProp: (prop) => 
    !['background', 'spacing'].includes(prop as string),
})<{
  background?: string;
  spacing?: string;
}>(({ theme, background, spacing }) => {
  const customTheme = theme as typeof theme & { custom: any };
  
  const getBackground = () => {
    switch (background) {
      case 'primary':
        return theme.palette.primary.main;
      case 'secondary':
        return theme.palette.secondary.main;
      case 'paper':
        return theme.palette.background.paper;
      default:
        return theme.palette.background.default;
    }
  };

  const getSpacing = () => {
    switch (spacing) {
      case 'small':
        return '2rem 0';
      case 'large':
        return '6rem 0';
      case 'none':
        return '0';
      default: // medium
        return customTheme.custom?.spacing?.section?.padding || '4rem 0';
    }
  };

  return {
    backgroundColor: getBackground(),
    padding: getSpacing(),
    transition: customTheme.custom?.effects?.transition || 'all 0.3s ease-in-out',
  };
});

export const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  children,
  fullWidth = false,
  background = 'default',
  spacing = 'medium',
  isEditing = false,
  onTitleEdit,
  onSubtitleEdit,
}) => {
  const theme = useTheme();

  const renderTitle = () => {
    if (!title) return null;

    return (
      <Typography
        variant="h2"
        align="center"
        gutterBottom
        sx={{ mb: subtitle ? 2 : 4 }}
        contentEditable={isEditing}
        suppressContentEditableWarning={true}
        onBlur={(e) => onTitleEdit?.(e.currentTarget.textContent || '')}
      >
        {title}
      </Typography>
    );
  };

  const renderSubtitle = () => {
    if (!subtitle) return null;

    return (
      <Typography
        variant="h5"
        align="center"
        color="text.secondary"
        sx={{ mb: 4 }}
        contentEditable={isEditing}
        suppressContentEditableWarning={true}
        onBlur={(e) => onSubtitleEdit?.(e.currentTarget.textContent || '')}
      >
        {subtitle}
      </Typography>
    );
  };

  return (
    <StyledSection background={background} spacing={spacing}>
      <Container maxWidth={fullWidth ? false : 'lg'}>
        {renderTitle()}
        {renderSubtitle()}
        {children}
      </Container>
    </StyledSection>
  );
};
