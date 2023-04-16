import { useEffect, useState } from 'react';
import { TextField, Stack, Box, Autocomplete, CircularProgress, InputBase } from '@mui/material/';
import useDebounce from '../../hooks/debounce'
import { useLazySearchUsersQuery } from '../../store/services/user'
import { useAppSelector } from '../../hooks/redux';
import SearchItem from './UserSearchItem';

const UserSearch = () => {
  const [searchName, setSearchName] = useState('')
  const debouncedName = useDebounce(searchName, 500)
  const [searchUsers, { isLoading, isFetching }] = useLazySearchUsersQuery()
  const users = useAppSelector(state => state.user.users)

  useEffect(() => {
    if (debouncedName.length >= 3) {
      searchUsers(debouncedName)
    }
  }, [debouncedName])
  return (
    <Box sx={{ px: 2, minHeight: 64, display: 'flex', alignItems: 'center' }}>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Autocomplete
          noOptionsText='User not found'
          options={users}
          getOptionLabel={(option) => {
            // e.g value selected with enter, right from the input
            if (typeof option === 'string') {
              return option;
            }
            if (option.name) {
              return option.name;
            }
            return option.name;
          }}
          loading={isLoading}
          freeSolo
          renderOption={(props, option) => (
            <SearchItem user={option} key={option.name} />
          )}
          renderInput={(params) => <TextField

            {...params}
            size='small'
            onChange={(e) => setSearchName(e.target.value)}
            placeholder='Search users'
            InputProps={{
              ...params.InputProps,

              endAdornment: (
                <>
                  {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />}
        />
      </Stack>
    </Box>

  );
}

export default UserSearch