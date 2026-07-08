import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function HorizontalLinearStepper(props) {


    const handleNext = () => {
        props.setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        props.setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <div id="asset-value-now-stepper">

            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={props.activeStep}>
                    {props.steps.map((label) => {
                        const stepProps = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {props.activeStep === props.steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All Done
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={props.handleReset}>Reset</Button>
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>Step {props.activeStep + 1}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={props.activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleNext} disabled={props.nextStatus ? "" : "disable"}>
                                {props.activeStep === props.steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Box>
        </div>
    );
}
