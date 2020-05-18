import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import useStyles from "./useStyles";
import firebase from '../../firebase/firebase';
import swal from 'sweetalert';
import md5 from 'md5';

const Register = () => {
    const classes = useStyles();
    const [usersRef, setUsersRef] = useState(firebase.database().ref('users'));
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const register = () => {
        firebase.auth().createUserWithEmailAndPassword(email, pass).then(
            (createdUser) => {
                createdUser.user.updateProfile({
                    displayName: firstName + " " +lastName,
                    photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}`,
                }).then(
                    usersRef.child(createdUser.user.uid).set({
                        email: createdUser.user.email,
                        firstName: firstName,
                        lastName: lastName,
                        photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}`,
                        lastSignInTimestamp: Date.now()
                    }));

            }).catch((error) => {
            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;
            swal(errorMessage, errorCode, "error");
        });
    };

    return (
        <>
            <Container component="main" maxWidth="xs"><CssBaseline />
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="FirstName"
                                    onChange={(event)=> {setFirstName(event.target.value) }}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    onChange={(event)=> {setLastName(event.target.value) }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    onChange={(event)=> {setEmail(event.target.value) }}
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    onChange={(event)=> {setPass(event.target.value) }}
                                    autoComplete="current-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={register}>
                            Sign Up
                        </Button>
                    </form>
                </div>
            </Container>
        </>
    );
};

export default Register;
