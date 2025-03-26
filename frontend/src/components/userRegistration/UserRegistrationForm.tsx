import { Formik, Form } from 'formik';
import { Role, User } from '../../interfaces/interfaces';
import { UserSchema } from '../../validations/userSchema';
import { Box, Button, MenuItem, Select, TextField } from '@mui/material';

interface UserRegistrationFormProps {
  onSave: (user: User) => void;
  initialValues: User;
  onClose: () => void;
  roles: Role[];
}

const UserRegistrationForm: React.FC<UserRegistrationFormProps> = ({
  onSave,
  initialValues,
  onClose,
  roles,
}) => {
  const handleSubmit = async (values: User, actions) => {
    try {
      await onSave(values);
      actions.setSubmitting(false);
    } catch (error) {
      console.error(error);
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ ...initialValues, confirmPassword: '' }}
      validationSchema={UserSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, handleChange, values, touched, errors }) => (
        <Form>
          <Box
            sx={{
              width: '90%',
              maxWidth: '600px', // limit width for a more readable form
              margin: '0 auto', // center the form container within its parent
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <TextField
              label="First Name"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              error={touched.firstName && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              error={touched.lastName && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />

            <Select
              name="roleId"
              fullWidth
              value={values.roleId}
              onChange={handleChange}
              displayEmpty
              error={touched.roleId && Boolean(errors.roleId)}
              renderValue={(selected) =>
                selected
                  ? roles.find((role) => role.id === Number(selected))?.name
                  : 'Select Role'
              }
            >
              <MenuItem value="" disabled>
                Select Role
              </MenuItem>
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name} - &nbsp;{'  '}
                  <span style={{ color: 'orange' }}>{role.description}</span>
                </MenuItem>
              ))}
            </Select>
            {touched.roleId && errors.roleId && (
              <div style={{ color: 'red', fontSize: '0.8rem' }}>
                {errors.roleId}
              </div>
            )}

            <TextField
              label="Email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              label="password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />

            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
            />

            <Box
              sx={{
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={onClose}
                sx={{ width: '50%' }}
              >
                {' '}
                Cancel{' '}
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{ width: '50%' }}
              >
                {isSubmitting ? 'Submiting...' : 'Submit'}
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default UserRegistrationForm;
