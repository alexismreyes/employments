import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  Modal,
  Typography,
} from '@mui/material';
import { Company, Job, JobCategory, User } from '../../interfaces/interfaces';
import { useJobApplicationManagement } from '../../hooks/useJobApplicationManagement';
import SnackBar from '../SnackBar';
import useSnackBarContext from '../../hooks/useSnackBarContext';
import { AxiosError } from 'axios';
import HasRole from '../HasRole';
import useLoadingContext from '../../hooks/useLoadingContext';

interface JobDetailsProps {
  open: boolean;
  job: Job | undefined;
  onClose: () => void;
  jobCategories: JobCategory[];
  companies: Company[];
  user: User | null;
}

const JobDetails: React.FC<JobDetailsProps> = ({
  open,
  job,
  onClose,
  jobCategories,
  companies,
  user,
}) => {
  const { createJobApplication } = useJobApplicationManagement();
  const { handleCloseSnack, snackStatus, setSnackStatus } =
    useSnackBarContext();
  const { isLoading } = useLoadingContext();

  if (!job) return null; // If no job is selected, don't render anything

  const category = jobCategories.find((cat) => cat.id === job.categoryId)?.name;
  const companyName = companies.find((com) => com.id === job.companyId)?.name;

  const handleApplyJob = async () => {
    try {
      if (user?.id && job.id) {
        const now = new Date().toISOString().split('T')[0]; // Ensure YYYY-MM-DD format to be send to the backend as this accept just date for the Datatype DATEONLY

        await createJobApplication({
          userId: user?.id,
          jobId: job.id,
          statusId: 1,
          requestDate: now,
        });

        // ✅ Set Snackbar Message when the job application is successful
        /* setSnackStatus({
          open: true,
          action: 'created',
          source: 'JobsDetails',
        }); */
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message = error.response?.data.error;
        console.error(message);
        /* setError(message); */

        setSnackStatus({
          open: true,
          message: message,
          severity: 'error',
          source: 'JobsDetails',
        });
      }
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Card
          sx={{
            boxShadow: 5,
            borderRadius: 3,
            maxWidth: 500,
            width: '90%',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '80vh',
          }}
        >
          {/* ✅ Fixed Header */}
          <Typography
            variant="h6"
            fontWeight="bold"
            textAlign="center"
            sx={{
              p: 2,
              borderBottom: '1px solid #ddd',
              position: 'sticky',
              top: 0,
              background: 'white',
              zIndex: 1,
            }}
          >
            {job.name}
          </Typography>

          {/* ✅ Scrollable Content */}
          <CardContent
            sx={{ flexGrow: 1, overflowY: 'auto', maxHeight: '60vh', p: 2 }}
          >
            <Grid container spacing={2}>
              {/* ✅ Category */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Category:
                </Typography>
                {category && <Chip label={category} color="primary" />}
              </Grid>

              {/* ✅ Description */}
              <Grid item xs={12}>
                <Typography variant="body1" fontWeight="bold">
                  Description:
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {job.description}
                </Typography>
              </Grid>

              {/* ✅ Company Name */}
              <Grid item xs={12}>
                <Typography variant="body1" fontWeight="bold">
                  Company:
                </Typography>
                <Typography variant="body1">{companyName}</Typography>
              </Grid>

              {/* ✅ Salary */}
              <Grid item xs={12}>
                <Typography variant="body1" fontWeight="bold">
                  Salary:
                </Typography>
                <Typography variant="h6" color="green" fontWeight="bold">
                  ${job.salary.toLocaleString()}
                </Typography>
              </Grid>

              {/* ✅ Contact Details */}
              <Grid item xs={12}>
                <Typography variant="body1" fontWeight="bold">
                  Email:
                </Typography>
                <Typography variant="body1">{job.emailContact}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" fontWeight="bold">
                  Phone:
                </Typography>
                <Typography variant="body1">{job.phoneContact}</Typography>
              </Grid>

              {/* ✅ Number of Vacancies */}
              <Grid item xs={6}>
                <Typography variant="body1" fontWeight="bold">
                  # Vacancies:
                </Typography>
                <Typography variant="body1">{job.vacancies}</Typography>
              </Grid>

              {/* ✅ Requirements */}
              <Grid item xs={12}>
                <Typography variant="body1" fontWeight="bold">
                  Requirements:
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {job.requirements}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>

          {/* ✅ Fixed Footer */}
          <CardActions
            sx={{
              justifyContent: 'center',
              p: 2,
              borderTop: '1px solid #ddd',
              position: 'sticky',
              bottom: 0,
              background: 'white',
              zIndex: 1,
            }}
          >
            {job.createdBy !== user?.id && (
              <HasRole role={2}>
                <Button
                  onClick={handleApplyJob}
                  variant="contained"
                  color="success"
                >
                  {isLoading ? (
                    <>
                      <CircularProgress
                        size={20}
                        sx={{ mr: 1 }}
                        thickness={10}
                        color="warning"
                      />{' '}
                      'Applying...'{' '}
                    </>
                  ) : (
                    'Apply'
                  )}
                </Button>
              </HasRole>
            )}
            <Button onClick={onClose} variant="contained" color="error">
              Close
            </Button>
          </CardActions>
        </Card>
      </Modal>
      <SnackBar
        parentComponent="JobsDetails"
        handleCloseSnack={handleCloseSnack}
        snackStatus={snackStatus}
      />
    </>
  );
};

export default JobDetails;
