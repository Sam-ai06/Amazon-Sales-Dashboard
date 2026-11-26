import {
  AppBar,
  Toolbar,
  Box,
  FormControl,
  Select,
  MenuItem,
  Avatar,
  Typography,
  type SelectChangeEvent,
} from '@mui/material';

interface NavbarUIProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function NavbarUI({
  categories,
  selectedCategory,
  onCategoryChange,
}: NavbarUIProps) {
  const handleChange = (event: SelectChangeEvent) => {
    onCategoryChange(event.target.value);
  };

  return (
    <AppBar
      position="static"
      sx={{
        width: '100%',
        margin: 0,
        boxSizing: 'border-box',
        backgroundColor: '#131921',
      }}
    >
      <Toolbar
        sx={{
          width: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 2,
          px: { xs: 1.5, sm: 2 },
          py: 0.5,
        }}
      >
        
        {/* logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            component="img"
            src={`${import.meta.env.BASE_URL}amazon-analytics-logo.svg`}
            alt="Amazon Analytics Logo"
            sx={{ height: 57, width: 'auto' }}
          />
        </Box>

        {/* filtro de categorias y perfil de usuario */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: { xs: 1.5, sm: 3 },
            flexWrap: 'wrap',
            minWidth: 0,
          }}
        >
          
        {/* filtro de categorias */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="caption" sx={{ color: '#ffffff', mb: 0.5, fontWeight: 500, fontSize: '0.8rem' }}>
              Categoría
            </Typography>
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <Select
                value={selectedCategory}
                onChange={handleChange}
                displayEmpty
                sx={{
                  backgroundColor: 'transparent',
                  color: '#ffffff',
                  borderRadius: '50px',
                  height: '35px',
                  '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.7)' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#ffffff' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ffffff' },
                  '.MuiSvgIcon-root': { color: '#dad7d7' },
                  '.MuiSelect-select': { py: 0.5, px: 2, fontSize: '0.85rem' }
                }}
              >
                <MenuItem value="Todas">Todas las categorias</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* usuario */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar sx={{ bgcolor: '#ff9900', color: '#131921', fontWeight: 'bold' }}>
              S
            </Avatar>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#ffffff', lineHeight: 1.2 }}>
                Samuel
              </Typography>
              <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                Sammyvilla3006@gmail.com
              </Typography>
            </Box>
          </Box>

        </Box>
      </Toolbar>
    </AppBar>
  );
}