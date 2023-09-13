import React, { useEffect, useState } from 'react';

import { styled, alpha } from '@mui/material/styles';
import { AppBar, Box, InputBase, MenuItem, Select, FormControl, Toolbar, InputLabel } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


 const Search = styled('div')(({ theme }) => ({
          position: 'relative',
          borderRadius: theme.shape.borderRadius,
          backgroundColor: alpha(theme.palette.common.white, 0.5),
          '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.15),
          },
          marginRight: theme.spacing(6),
          marginLeft: 0,
          width: '100%',
          [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
          },
        }));
        
    
    const SearchIconWrapper = styled('div')(({ theme }) => ({
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
      color: 'inherit',
      '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      },
    }));
    
    
const SearchComponent = ( {list, setList, filterField = item => item, ...props} ) => {
    const [selection, setSelection] = useState('1');
    const [value, setValue] = useState('');
    
    const handleCategorieSearch = (e)=>{
        setSelection(e.target.value)
        props.rechercheType(e.target.value)
    }
    
    const handleValueChange = (e)=>{
        setValue(e.target.value)
    }
    
    useEffect(()=>{
        if(value){
            setList(filterList())
        } else {
            setList(list)
        }
    }, [value])
      
      
      const filterList = ()=>{
          return list.filter(item => filterField(item).toLowerCase().includes(value.toLocaleLowerCase()))
      }
      
  return (
    <Box sx={{ flexGrow: 1, width: '100%' }}>
      <AppBar position="static">
        <Toolbar sx={{backgroundColor: 'gray', padding: '20px'}}>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <FormControl className="alias-input">
                    <InputLabel> Recherche suivant </InputLabel>
                    <Select
                      value={selection}
                      label="Recherche suivant"
                      onChange={(e) => handleCategorieSearch(e)}
                    >
                      <MenuItem value={'1'}> les dates </MenuItem>
                      <MenuItem value={'2'}> les noms des clients </MenuItem>
                      <MenuItem value={'3'}> les dépenses </MenuItem>
                    </Select>
                  </FormControl>
              </Box>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  value = {value}
                  onChange={handleValueChange}
                />
              </Search>
        </Toolbar>
      </AppBar>
    </Box>

  )
}

export default SearchComponent




