import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useEffect } from 'react';
//
import { Form, useForm } from '../hooks/useForm';
//
const genderItems = [
  { id: 'male', title: 'Male' },
  { id: 'female', title: 'Female' },
  { id: 'other', title: 'Other' },
];
const initialValues = {
  fullName: '',
  email: '',
  phone: '',
  city: '',
  gender: 'male',
  date: new Date().toISOString(),
  department: '',
  fullTime: false,
};
//
const useStyles = makeStyles((theme) => ({
  btn: {
    margin: theme.spacing(1),
  },
}));
const UserForm = ({ addOrEdit, recordForEdit, departments }) => {
  const classes = useStyles();
  const validate = (inputValues = values) => {
    let temp = { ...errors };
    if ('fullName' in inputValues) {
      temp.fullName = inputValues.fullName ? '' : 'This Field is required';
    }
    if ('email' in inputValues) {
      temp.email =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          inputValues.email
        )
          ? ''
          : 'Email is not valid';
    }
    if ('phone' in inputValues) {
      temp.phone = inputValues.phone?.length === 10 ? '' : '10 numbers required';
    }
    if ('city' in inputValues) {
      temp.city = inputValues.city ? '' : 'This Field is required';
    }
    if ('department' in inputValues) {
      temp.department = inputValues.department ? '' : 'This Field is required';
    }
    setErrors({ ...temp });
    if (inputValues === values) {
      return Object.values(temp).every((i) => i === '');
    }
  };
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } = useForm(
    initialValues,
    true,
    validate
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };
  useEffect(() => {
    if (recordForEdit !== null) {
      setValues({ ...recordForEdit });
    }
  }, [recordForEdit]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <TextField
            variant='outlined'
            name='fullName'
            label='Full Name'
            onChange={handleInputChange}
            value={values.fullName}
            {...(errors.fullName && { error: true, helperText: errors.fullName })}
          />
          <TextField
            variant='outlined'
            name='email'
            label='Email'
            onChange={handleInputChange}
            value={values.email}
            {...(errors.email && { error: true, helperText: errors.email })}
          />
          <TextField
            variant='outlined'
            name='phone'
            label='Phone'
            onChange={handleInputChange}
            value={values.phone}
            {...(errors.phone && { error: true, helperText: errors.phone })}
          />
          <TextField
            variant='outlined'
            name='city'
            label='City'
            onChange={handleInputChange}
            value={values.city}
            {...(errors.city && { error: true, helperText: errors.city })}
          />
        </Grid>
        <Grid item xs={6}>
          {/* Radio Buttons */}
          <FormControl>
            <FormLabel>Gender</FormLabel>
            <RadioGroup name='gender' value={values.gender} onChange={handleInputChange} row>
              {genderItems.map((item) => (
                <FormControlLabel
                  key={item.id}
                  value={item.id}
                  label={item.title}
                  control={<Radio />}
                />
              ))}
            </RadioGroup>
          </FormControl>
          {/* Select */}
          <FormControl variant='outlined' {...(errors.department && { error: true })}>
            <InputLabel>Department</InputLabel>
            <Select
              value={values.department}
              label='Department'
              name='department'
              onChange={handleInputChange}
            >
              {/* <MenuItem value=''>None</MenuItem> */}
              {departments &&
                departments.map((item) => (
                  <MenuItem key={item.title} value={item.title}>
                    {item.title}
                  </MenuItem>
                ))}
            </Select>
            {errors.department && <FormHelperText>{errors.department}</FormHelperText>}
          </FormControl>
          {/* Date Picker */}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              inputVariant='outlined'
              variant='inline'
              format='dd/MM/yyyy'
              label='Date'
              name='date'
              margin='normal'
              color='primary'
              value={values.date}
              onChange={(e) => setValues({ ...values, date: e.toISOString() })}
            />
          </MuiPickersUtilsProvider>
          {/* CheckBox */}
          <FormControl>
            <FormControlLabel
              label='Full Time'
              control={
                <Checkbox
                  name='fullTime'
                  color='primary'
                  onChange={(e) => setValues({ ...values, [e.target.name]: e.target.checked })}
                  checked={values.fullTime}
                />
              }
            />
          </FormControl>
          <div>
            <Button className={classes.btn} color='primary' variant='contained' type='submit'>
              Submit
            </Button>
            <Button className={classes.btn} color='default' variant='outlined' onClick={resetForm}>
              Reset
            </Button>
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

export default UserForm;
