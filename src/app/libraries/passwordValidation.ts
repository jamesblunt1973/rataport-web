import { AbstractControl } from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
        const password = AC.get('NewPassword').value; // to get value in input tag
        const confirmPassword = AC.get('ConfirmPassword').value; // to get value in input tag
        if (password !== confirmPassword) {
            console.log('false');
            AC.get('ConfirmPassword').setErrors({ MatchPassword: true });
        } else {
            console.log('true');
            return null;
        }
    }
}
