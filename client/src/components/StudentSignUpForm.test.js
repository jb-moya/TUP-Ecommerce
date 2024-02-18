import SignUpForm from "./StudentSignUpForm.js";
import axios from 'axios';

describe('StudentSignUpForm', () => {
    it('handle Sign Up', () => {
        SignUpForm.handleSignUp();
    });

    it('validate name', () => {
        SignUpForm.validateName();
    });
});