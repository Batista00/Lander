import React from 'react';
import { Grid as MuiGrid, Box, IconButton } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface GridProps {
  items: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  onAdd?: () => void;
  onDelete?: (index: number) => void;
  columns?: number;
  spacing?: number;
  isEditing?: boolean;
}

export const Grid: React.FC<GridProps> = ({
  items,
  renderItem,
  onAdd,
  onDelete,
  columns = 3,
  spacing = 4,
  isEditing
}) => {
  return (
    <MuiGrid container spacing={spacing}>
      {items.map((item, index) => (
        <MuiGrid item xs={12} sm={6} md={12 / columns} key={item.id || index}>
          <Box sx={{ position: 'relative' }}>
            {isEditing && onDelete && (
              <IconButton
                size="small"
                onClick={() => onDelete(index)}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  zIndex: 1,
                  backgroundColor: 'background.paper',
                  '&:hover': {
                    backgroundColor: 'action.hover'
                  }
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}
            {renderItem(item, index)}
          </Box>
        </MuiGrid>
      ))}

      {isEditing && onAdd && (
        <MuiGrid item xs={12} sm={6} md={12 / columns}>
          <Box
            sx={{
              height: '100%',
              minHeight: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px dashed',
              borderColor: 'divider',
              borderRadius: 1,
              cursor: 'pointer',
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'action.hover'
              }
            }}
            onClick={onAdd}
          >
            <AddIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
          </Box>
        </MuiGrid>
      )}
    </MuiGrid>
  );
};
