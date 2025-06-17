import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import type { CountryType } from '../../types/types';

type CountrySelectType = {
  countries: CountryType[];
  selected?: string;
  setSelected?: (country: string) => void;
  toSupportedId?: string;
}

export default function CountrySelect({ countries = [], selected, setSelected }: CountrySelectType) {
  return (
    <div className='w-full'>
      <Autocomplete
        options={countries}
        autoHighlight
        value={countries.find((c) => c.label === selected) || null}
        onChange={(_, newValue) => {
          if (newValue && setSelected) {
            setSelected(newValue.label);
          }
        }}
        sx={{
          fontSize: "16px",
          "& .MuiInputBase-input": {
            fontSize: "16px",
          },
          "& .MuiInputLabel-root": {
            fontSize: "16px",
          },
          "& .MuiAutocomplete-option": {
            fontSize: "16px",
          },
        }}
        getOptionLabel={(option) => option.label}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <Box
              key={key}
              component="li"
              sx={{ '& > img': { mr: 1, flexShrink: 0, } }}
              {...optionProps}
            >
              <img
                loading="lazy"
                width="20"
                src={option.img || ''}
                alt=""
              />
              {option.code}
            </Box>
          );
        }}
        renderInput={(params) => {
          const selectedOption = countries.find(
            (c) => c.label === params.inputProps.value
          );
          return (
            <TextField
              {...params}
              variant="standard"
              InputProps={{
                ...params.InputProps,
                disableUnderline: true,
                startAdornment: selectedOption ? (
                  <img
                    loading="lazy"
                    width="24"
                    src={selectedOption.img || ''}
                    alt=""
                    style={{ marginRight: 8, marginLeft: 4 }}
                  />
                ) : null,
              }}
              sx={{

                '& .MuiInputBase-root': {
                  width: '100%', // đảm bảo input wrapper dài ra
                },
                '& .MuiAutocomplete-clearIndicator': {
                  visibility: 'visible',
                },
                '& .MuiAutocomplete-inputRoot': {
                  paddingRight: '8px !important', // hoặc '32px' nếu bạn vẫn giữ nút clear
                },
                '& .MuiAutocomplete-popupIndicator': {
                  display: 'none',
                },
                '& input': {
                  paddingLeft: selectedOption ? '40px' : undefined, // tránh text đè lên icon
                },
              }}
            />
          );
        }}
      />
    </div>
  );
}

